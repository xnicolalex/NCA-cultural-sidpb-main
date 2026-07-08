import { Fragment } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  number: number
  title: string
  description: string
}

type StepIndicatorProps = {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-start justify-between">
      {steps.map((step, index) => (
        <Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                currentStep >= step.number
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground",
              )}
            >
              {currentStep > step.number ? (
                <Check className="h-6 w-6" />
              ) : (
                <span className="font-semibold">{step.number}</span>
              )}
            </div>
            <div className="mt-3 text-center hidden sm:block">
              <p
                className={cn(
                  "text-sm font-semibold",
                  currentStep >= step.number ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "flex-1 h-0.5 mt-[23px] transition-colors mx-2",
                currentStep > step.number ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}