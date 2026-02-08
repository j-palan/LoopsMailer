// Example app: register the Loops component
import { defineApp } from "convex/server";
import loops from "./components/loops/convex.config";

const app = defineApp();
app.use(loops);

export default app;
