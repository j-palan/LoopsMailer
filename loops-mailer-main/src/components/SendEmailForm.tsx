import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const SendEmailForm = () => {
  const sendEmail = useAction(api.sendEmail.send);
  const [email, setEmail] = useState("");
  const [transactionalId, setTransactionalId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !transactionalId) {
      setStatus("error");
      setMessage("Email and Transactional ID are required.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      await sendEmail({
        email,
        transactionalId,
        subject: subject || undefined,
        body: body || undefined,
      });
      setStatus("success");
      setMessage(`Email queued for delivery to ${email}`);
      setEmail("");
      setSubject("");
      setBody("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to send email.");
    }
  };

  return (
    <Card className="w-full max-w-lg border-border/50 shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Send Email</CardTitle>
        </div>
        <CardDescription>
          Send a transactional email via Loops using the Convex component.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionalId">Transactional ID *</Label>
            <Input
              id="transactionalId"
              type="text"
              placeholder="clfq6dinn000yl70fgwwyp82l"
              value={transactionalId}
              onChange={(e) => setTransactionalId(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Find this in your Loops dashboard → Transactional Emails
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject (data variable)</Label>
            <Input
              id="subject"
              type="text"
              placeholder="Welcome to our platform"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Body (data variable)</Label>
            <Textarea
              id="body"
              placeholder="Write your message here..."
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          {/* Feedback */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-md bg-primary/10 p-3 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SendEmailForm;
