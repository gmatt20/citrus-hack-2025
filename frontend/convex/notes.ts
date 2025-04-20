import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const createNote = mutation ({
    args: {
        note: v.string(),
    },
    handler: async (convexToJson, args) => {
        const userID = await getAuthUserId(convexToJson);
        if (!userID) {
            throw new Error ("Unauthorized")
        }
        await convexToJson.db.insert ("notes", {
            userID,
            note: args.note,
        });
    },
});