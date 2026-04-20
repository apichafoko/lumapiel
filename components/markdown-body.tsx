import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  content: string
  className?: string
}

export function MarkdownBody({ content, className }: Props) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-heading text-3xl font-semibold text-primary">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-heading mt-10 text-2xl font-semibold text-primary">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-heading mt-8 text-xl font-semibold text-primary">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-primary underline-offset-4 hover:underline">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
