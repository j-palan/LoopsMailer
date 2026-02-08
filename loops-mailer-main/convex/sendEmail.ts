/**
 * Example: expose a mutation/action that your frontend can call.
 *
 * This thin wrapper calls the Loops component's sendEmail action.
 */
"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { components } from "./_generated/api";

export const send = action({
  args: {
    email: v.string(),
    transactionalId: v.string(),
    subject: v.optional(v.string()),
    body: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const dataVariables: Record<string, string> = {};
    if (args.subject) dataVariables.subject = args.subject;
    if (args.body) dataVariables.body = args.body;

    // Read API key in parent (has deployment env); component may not see env in sandbox
    const apiKey = process.env.LOOPS_API_KEY;
    if (!apiKey) {
      throw new Error(
        "[Loops] LOOPS_API_KEY is not set. Run: npx convex env set LOOPS_API_KEY <your-key>"
      );
    }

    const result = await ctx.runAction(
      components.loops.actions.sendEmail,
      {
        email: args.email,
        transactionalId: args.transactionalId,
        dataVariables:
          Object.keys(dataVariables).length > 0 ? dataVariables : undefined,
        apiKey,
      }
    );

    return result;
  },
});
