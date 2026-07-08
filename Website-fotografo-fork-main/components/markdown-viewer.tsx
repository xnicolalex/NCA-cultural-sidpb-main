import ReactMarkdown from "react-markdown"

export function MarkdownViewer({ content }: { content: string }) {
  return (
    <div className="w-full">
      <ReactMarkdown
        components={{
          // Parágrafo normal
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed text-base mb-4">
              {children}
            </p>
          ),

          // Negrito (**)
          strong: ({ children }) => (
            <strong className="text-foreground font-semibold">{children}</strong>
          ),

          // Itálico (*)
          em: ({ children }) => (
            <em className="italic text-muted-foreground">{children}</em>
          ),

          // Citação (>) — caixa azul
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#0056A4] bg-primary/10 rounded-r-xl px-5 py-4 text-[#0056A4] text-sm my-4 not-italic">
              {children}
            </blockquote>
          ),

          // Lista com bullets (-)
          ul: ({ children }) => (
            <ul className="space-y-3 my-4">{children}</ul>
          ),

          li: ({ children }) => (
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 rounded-full bg-[#0056A4] flex-shrink-0"
              />
              <span className="text-muted-foreground leading-relaxed text-base">
                {children}
              </span>
            </li>
          ),

          // Código inline (`backticks`)
          code: ({ children }) => (
            <code className="font-mono text-sm bg-neutral-100 px-2 py-0.5 rounded text-foreground">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}