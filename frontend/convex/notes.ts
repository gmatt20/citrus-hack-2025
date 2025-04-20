import { getAuthUserId } from "@convex-dev/auth/server";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import {RateLimiter, MINUTE, HOUR} from "@convex-dev/rate-limiter"
import {components} from "./_generated/api"
const rateLimiter = new RateLimiter(components.rateLimiter, {
  createNote: { kind: "fixed window", rate: 5, period: MINUTE}
});
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
    
    await rateLimiter.limit(ctx, "createNote", {key: userID, throws:true});

    await ctx.db.insert("notes", {
      userID,
      note: args.note,
      genre: args.genre,
      language: args.language,
    });
  },
});

export const getNotes = query ({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("notes").collect();
  }
});

export const deleteAll = internalMutation({
  args: {},
  handler: async (ctx, args) => {
    const notes = await ctx.db.query("notes").collect();
    await Promise.all(notes.map((note)=> ctx.db.delete(note._id)))
  }
})
