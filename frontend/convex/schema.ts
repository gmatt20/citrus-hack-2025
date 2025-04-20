import { defineSchema, defineTable } from "convex/server";
import {authTables} from "@convex-dev/auth/server";
import { v } from "convex/values";
export default defineSchema({
    ...authTables,
    notes: defineTable({
        userID: v.id("users"),
        note: v.string()
    })
});