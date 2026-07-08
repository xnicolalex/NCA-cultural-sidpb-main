import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"

type IconButtonProps = ComponentProps<typeof Button> & {
  label: string
}

export function IconButton({ label, children, ...props }: IconButtonProps) {
  return (
    <Button aria-label={label} title={label} size="icon" {...props}>
      {children}
    </Button>
  )
}
