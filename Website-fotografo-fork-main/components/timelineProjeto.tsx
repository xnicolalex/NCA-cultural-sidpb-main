import { Calendar } from "lucide-react"
import { BadgeCultural } from "@/components/ui/badge-cultural"

interface TimelineItem {
  phase: string
  period: string
  status: "Concluída" | "Em Andamento" | "Planejada" | string
  description: string
}

interface ProjectTimelineProps {
  items: TimelineItem[]
}

export function ProjectTimeline({ items }: ProjectTimelineProps) {
  return (
    <section className="py-16 md:py-20 bg-muted/30" id="timeline">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="rounded-lg bg-primary/10 p-3">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">Timeline do Projeto</h2>
        </div>
        
        <div className="max-w-4xl">
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  {/* Círculo da Timeline */}
                  <div
                    className={`rounded-full p-3 ${
                      item.status === "Concluída"
                        ? "bg-green-100 text-green-600"
                        : item.status === "Em Andamento"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="h-3 w-3 rounded-full bg-current" />
                  </div>
                  
                  {/* Linha Conectora Vertical */}
                  {index < items.length - 1 && (
                    <div className="h-full w-0.5 bg-border mt-2" style={{ minHeight: "60px" }} />
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{item.phase}</h3>
                    <BadgeCultural
                      variant={
                        item.status === "Concluída"
                          ? "default"
                          : item.status === "Em Andamento"
                            ? "bumba"
                            : "default"
                      }
                    >
                      {item.status}
                    </BadgeCultural>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.period}</p>
                  <p className="text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}