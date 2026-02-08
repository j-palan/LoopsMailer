/**
 * Loops Email Component for Convex
 *
 * A reusable Convex component for sending transactional emails via Loops.so.
 *
 * ## Quick Start
 *
 * 1. Install in your convex.config.ts:
 *    ```ts
 *    import loops from "./components/loops/convex.config";
 *    app.use(loops);
 *    ```
 *
 * 2. Set your API key:
 *    ```sh
 *    npx convex env set LOOPS_API_KEY <your-key>
 *    ```
 *
 * 3. Call from your app:
 *    ```ts
 *    import { components } from "./_generated/api";
 *    await ctx.runAction(components.loops.actions.sendEmail, {
 *      email: "user@example.com",
 *      transactionalId: "your-template-id",
 *    });
 *    ```
 */

export type { SendEmailInput, SendEmailResult } from "./types";
