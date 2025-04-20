import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createNote = mutation({
  args: {
    note: v.string(),
    genre: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    const userID = await getAuthUserId(ctx);
    if (!userID) {
      throw new Error("Unauthorized");
    }

    await ctx.db.insert("notes", {
      userID,
      note: args.note,
      genre: args.genre,
      language: args.language,
    });
  },
});
