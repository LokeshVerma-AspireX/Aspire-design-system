import * as React from "react"
import { cn } from "@/lib/utils"

interface RateRow {
  platform: string
  contentType: string
  rateRange: string
}

interface ContentRatesTableProps {
  rates: RateRow[]
  className?: string
}

function ContentRatesTable({ rates, className }: ContentRatesTableProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Platform</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Content Type</th>
            <th className="px-3 py-2 text-right text-xs font-medium text-muted-foreground">Rate Range</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-3 py-2.5 text-sm font-medium text-foreground">{row.platform}</td>
              <td className="px-3 py-2.5 text-sm text-muted-foreground">{row.contentType}</td>
              <td className="px-3 py-2.5 text-right text-sm font-semibold text-foreground">{row.rateRange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { ContentRatesTable, type ContentRatesTableProps, type RateRow }
