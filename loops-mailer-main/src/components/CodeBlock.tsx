interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

const CodeBlock = ({ title, code }: CodeBlockProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border/50 bg-card">
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/50 px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code className="text-foreground/90">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
