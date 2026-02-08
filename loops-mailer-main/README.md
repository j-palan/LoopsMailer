# LoopsMailer

Send transactional emails via [Loops.so](https://loops.so) using [Convex](https://convex.dev). The app uses a Convex **Loops component** for the API call and a React frontend to send test emails.

## Tech stack

- **Frontend:** Vite, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Convex (actions only; no database)
- **Email:** Loops.so transactional API via Convex component

## Setup

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Convex & Loops**

   - Link or create a Convex project and run the dev server so the dashboard creates your deployment URL:

     ```sh
     npx convex dev
     ```

   - Set your Loops API key for the deployment you use (e.g. development):

     ```sh
     npx convex env set LOOPS_API_KEY <your-loops-api-key>
     ```

     Get the key at [Loops → Settings → API](https://app.loops.so/settings?page=api).

3. **Frontend**

   - In another terminal, start the Vite dev server:

     ```sh
     npm run dev
     ```

   - Convex will add `VITE_CONVEX_URL` to `.env.local` when you run `npx convex dev`; the app uses this to talk to your Convex backend.

## Project structure

- **`convex/`** – Convex backend
  - `convex.config.ts` – Registers the Loops component
  - `sendEmail.ts` – Wrapper action that reads `LOOPS_API_KEY` and calls the component
  - `components/loops/` – Loops Convex component (sends email via Loops API)
- **`src/`** – React app
  - `App.tsx` – Wraps app with `ConvexProvider`
  - `components/SendEmailForm.tsx` – Form that calls `api.sendEmail.send` to send emails
  - `pages/Index.tsx` – Main page with form and usage notes

## Sending an email

1. Run `npx convex dev` and `npm run dev`.
2. Open the app in the browser.
3. Enter **Recipient Email** and **Transactional ID** (from Loops dashboard → Transactional Emails).
4. Optionally set subject/body as data variables.
5. Click **Send Email**.

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `npm run dev`     | Start Vite dev server          |
| `npm run build`   | Production build               |
| `npx convex dev`  | Convex dev (push + watch)      |
| `npx convex env set LOOPS_API_KEY <key>` | Set Loops API key for current deployment |
