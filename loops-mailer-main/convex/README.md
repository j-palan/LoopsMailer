# Convex backend (LoopsMailer)

This directory contains the Convex backend for LoopsMailer. It has **no database**; it only defines actions that send transactional emails via the Loops.so API.

## Layout

- **`convex.config.ts`** – Defines the app and registers the Loops component.
- **`sendEmail.ts`** – Public action your frontend calls. It:
  - Reads `LOOPS_API_KEY` from the deployment environment.
  - Forwards the request (and API key) to the Loops component’s `sendEmail` action.
- **`components/loops/`** – Reusable Convex component that talks to the Loops transactional API.
  - `actions.ts` – `sendEmail` action (accepts optional `apiKey` from the parent).
  - `convex.config.ts` – Component definition.
  - `types.ts` – Shared types.

## Environment variables

Set in the Convex dashboard (per deployment) or via CLI:

```sh
npx convex env set LOOPS_API_KEY <your-key>
```

The **parent** action in `sendEmail.ts` reads this and passes it into the component so the key is available even when the component runs in a sandbox.

## Frontend usage

The React app calls the wrapper action:

```ts
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

const sendEmail = useAction(api.sendEmail.send);
await sendEmail({
  email: "user@example.com",
  transactionalId: "your-transactional-id",
  subject: "Optional subject",
  body: "Optional body",
});
```

## CLI

- Push and watch: `npx convex dev`
- List env vars: `npx convex env list`
- Help: `npx convex -h`  
- Docs: `npx convex docs`
