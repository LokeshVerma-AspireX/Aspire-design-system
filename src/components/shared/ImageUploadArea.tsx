"use client"

import * as React from "react"
import { UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadAreaProps {
  previewUrl?: string
  onFileSelect?: (file: File) => void
  onRemove?: () => void
  recommendedSize?: string
  className?: string
  isDragOver?: boolean
}

function ImageUploadArea({
  previewUrl,
  onFileSelect,
  onRemove,
  recommendedSize = "Recommended: 1200x630px",
  className,
}: ImageUploadAreaProps) {
  const [dragOver, setDragOver] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(true)
  }

  function handleDragLeave() {
    setDragOver(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      onFileSelect?.(file)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect?.(file)
  }

  if (previewUrl) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg border border-border", className)}>
        <img
          src={previewUrl}
          alt="Offer preview"
          className="h-full w-full object-cover"
        />
        <button
          onClick={onRemove}
          className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-foreground/70 text-background hover:bg-foreground transition-colors"
          aria-label="Remove image"
        >
          <X className="size-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors",
        dragOver && "border-primary/60 bg-primary/5",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <div className="flex size-12 items-center justify-center rounded-full border border-border bg-background">
        <UploadCloud className="size-5 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">
          Add an image to make this offer stand out
        </p>
        <p className="text-xs text-muted-foreground">{recommendedSize}</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleChange}
        aria-label="Upload image"
      />
    </div>
  )
}

export { ImageUploadArea, type ImageUploadAreaProps }
