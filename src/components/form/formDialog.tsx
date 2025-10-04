import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import type { FormField, FormValues } from "@/types/form"
import { Textarea } from "@/components/ui/textarea"

export type FormDialogProps = {
  title: string
  description?: string
  fields: FormField[]
  submitLabel?: string
  cancelLabel?: string
  initialValues?: Partial<FormValues>
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: FormValues) => void | Promise<void>
  statusLabel?: string
}

export default function FormDialog({
  title,
  description,
  fields,
  submitLabel = "Guardar",
  cancelLabel = "Cancelar",
  initialValues,
  className,
  open,
  onOpenChange,
  onSubmit,
  statusLabel,
}: FormDialogProps) {
  const [values, setValues] = React.useState<FormValues>(() => {
    const base: FormValues = {}
    for (const f of fields) {
      if (f.type === "hidden" && f.defaultValue) base[f.name] = f.defaultValue
      else base[f.name] = (initialValues?.[f.name] as string) ?? ""
    }
    return base
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    // reset when fields change or dialog reopens
    if (open) {
      const base: FormValues = {}
      for (const f of fields) {
        if (f.type === "hidden" && f.defaultValue) base[f.name] = f.defaultValue
        else base[f.name] = (initialValues?.[f.name] as string) ?? ""
      }
      setValues(base)
      setErrors({})
    }
  }, [open, fields, initialValues])

  function setValue(name: string, v: string) {
    setValues((prev) => ({ ...prev, [name]: v }))
  }

  function validate(): boolean {
    const next: Record<string, string> = {}
    for (const f of fields) {
      if (f.required && !values[f.name]?.toString().trim()) {
        next[f.name] = "Campo requerido"
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    try {
      setSubmitting(true)
      await onSubmit(values)
      onOpenChange(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-lg max-h-[80vh] flex flex-col", className)}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{title}</span>
            {statusLabel && (
              <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                {statusLabel}
              </span>
            )}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-2 min-h-0">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 grid gap-4">
          {fields.map((f) => {
            if (f.type === "hidden") {
              return <input key={f.name} type="hidden" name={f.name} value={values[f.name] ?? ""} />
            }
            return (
              <div key={f.name} className="grid gap-2 mx-2">
                <label className="text-sm font-medium text-foreground" htmlFor={f.name}>
                  {f.label}
                </label>
                {f.type === "text" && (
                  <input
                    id={f.name}
                    name={f.name}
                    placeholder={f.placeholder}
                    className="h-10 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValue(f.name, e.target.value)}
                  />
                )}
                {f.type === "textarea" && (
                  <Textarea
                    id={f.name}
                    name={f.name}
                    placeholder={f.placeholder}
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValue(f.name, e.target.value)}
                  />
                )}
                {f.type === "select" && "options" in f && (
                  <select
                    id={f.name}
                    name={f.name}
                    className="h-10 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    value={values[f.name] ?? ""}
                    onChange={(e) => setValue(f.name, e.target.value)}
                  >
                    <option value="" disabled>
                      {f.placeholder ?? "Seleccione"}
                    </option>
                    {f.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
                {errors[f.name] && (
                  <span className="text-xs text-red-400">{errors[f.name]}</span>
                )}
                {f.helperText && (
                  <span className="text-xs text-muted-foreground">{f.helperText}</span>
                )}
              </div>
            )
          })}
          </div>

          <div className="mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              {cancelLabel}
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-primary/80 text-primary-foreground hover:bg-primary"
            >
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}