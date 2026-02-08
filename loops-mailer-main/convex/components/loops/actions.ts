import { action } from "./_generated/server";
import { v } from "convex/values";
import type { SendEmailResult } from "./types";

const LOOPS_API_URL = "https://app.loops.so/api/v1/transactional";

/**
 * Sends a transactional email via the Loops API.
 *
 * Requires the `LOOPS_API_KEY` environment variable to be set
 * in your Convex deployment.
 */
export const sendEmail = action({
  args: {
    email: v.string(),
    transactionalId: v.string(),
    dataVariables: v.optional(v.any()),
    addToAudience: v.optional(v.boolean()),
    /** Pass from parent so env is available when component runs in a sandbox. */
    apiKey: v.optional(v.string()),
  },
  handler: async (_ctx, args): Promise<SendEmailResult> => {
    // --- Validate inputs ---
    if (!args.email || !args.email.includes("@")) {
      throw new Error(
        `[Loops] Invalid email address: "${args.email}". Provide a valid email.`
      );
    }

    if (!args.transactionalId) {
      throw new Error(
        "[Loops] Missing transactionalId. Find this in your Loops dashboard under Transactional Emails."
      );
    }

    // --- Resolve API key (prefer passed-in key; components may not see deployment env) ---
    const apiKey = args.apiKey ?? process.env.LOOPS_API_KEY;
    if (!apiKey) {
      throw new Error(
        "[Loops] LOOPS_API_KEY is not set. Set it in your app deployment and pass it when calling the component, or set it for this deployment.\n" +
          "  npx convex env set LOOPS_API_KEY <your-key>\n" +
          "  Get your key at https://app.loops.so/settings?page=api"
      );
    }

    // --- Build payload ---
    const payload: Record<string, unknown> = {
      transactionalId: args.transactionalId,
      email: args.email,
    };

    if (args.dataVariables) {
      payload.dataVariables = args.dataVariables;
    }

    if (args.addToAudience !== undefined) {
      payload.addToAudience = args.addToAudience;
    }

    // --- Call Loops API ---
    const response = await fetch(LOOPS_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.message || data?.error || JSON.stringify(data);
      throw new Error(
        `[Loops] API error (${response.status}): ${errorMessage}`
      );
    }

    return {
      success: true,
      message: data.message ?? "Email sent successfully.",
    };
  },
});
