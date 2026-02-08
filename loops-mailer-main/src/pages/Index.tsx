import SendEmailForm from "@/components/SendEmailForm";
import CodeBlock from "@/components/CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Zap, Shield, Code2 } from "lucide-react";

const installCode = `// convex/convex.config.ts
import { defineApp } from "convex/server";
import loops from "./components/loops/convex.config";

const app = defineApp();
app.use(loops);

export default app;`;

const usageCode = `// convex/sendEmail.ts
import { action } from "./_generated/server";
import { components } from "./_generated/api";

export const send = action({
  args: { email: v.string(), transactionalId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.runAction(
      components.loops.actions.sendEmail,
      { email: args.email, transactionalId: args.transactionalId }
    );
  },
});`;

const features = [
  {
    icon: Zap,
    title: "Simple API",
    description: "One action to send emails. No boilerplate.",
  },
  {
    icon: Shield,
    title: "Validated & Safe",
    description: "Input validation, clear errors, no leaked secrets.",
  },
  {
    icon: Code2,
    title: "Idiomatic Convex",
    description: "Follows Components SDK patterns. Drop-in ready.",
  },
  {
    icon: Package,
    title: "Extensible",
    description: "Add data variables, audience sync, and more.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              L
            </div>
            <span className="text-lg font-semibold tracking-tight">
              convex-loops
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            v1.0.0
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero */}
        <section className="mb-16 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">
            Loops Email Component for Convex
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A production-ready Convex component that makes sending transactional
            emails via{" "}
            <a
              href="https://loops.so"
              className="font-medium text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Loops.so
            </a>{" "}
            dead simple.
          </p>
        </section>

        {/* Features */}
        <section className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-border/50 bg-card p-5"
            >
              <f.icon className="mb-3 h-5 w-5 text-primary" />
              <h3 className="mb-1 text-sm font-semibold">{f.title}</h3>
              <p className="text-xs text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </section>

        <Separator className="mb-16" />

        {/* Demo + Code side by side */}
        <section className="mb-16 grid items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-1 text-xl font-semibold">Try it out</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              This form demonstrates the example app's UI. In production, it
              calls the Convex action.
            </p>
            <SendEmailForm />
          </div>

          <div className="space-y-4">
            <h2 className="mb-1 text-xl font-semibold">Quick Start</h2>
            <p className="mb-2 text-sm text-muted-foreground">
              Register the component, set your API key, and call the action.
            </p>
            <CodeBlock title="1. Install the component" code={installCode} />
            <CodeBlock title="2. Use in your app" code={usageCode} />
            <div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Set your API key:</strong>
              <code className="ml-2 rounded bg-muted px-2 py-0.5 text-xs">
                npx convex env set LOOPS_API_KEY your-key
              </code>
            </div>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* File structure */}
        <section className="mb-16">
          <h2 className="mb-4 text-xl font-semibold">Component Structure</h2>
          <CodeBlock
            title="File tree"
            code={`convex/
├── components/
│   └── loops/
│       ├── convex.config.ts   # Component definition
│       ├── actions.ts         # sendEmail action (Loops API call)
│       ├── types.ts           # TypeScript interfaces
│       └── index.ts           # Public exports & docs
├── convex.config.ts           # Example app: registers the component
└── sendEmail.ts               # Example app: thin wrapper action`}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        Built as a reusable Convex Component · MIT License
      </footer>
    </div>
  );
};

export default Index;
