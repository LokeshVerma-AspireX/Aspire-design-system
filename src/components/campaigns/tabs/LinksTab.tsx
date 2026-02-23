"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/shared/Pagination"

// ─── Types ───────────────────────────────────────────────────────────────────

interface LinkItem {
  id: string
  link: string
  creator: string
  clicks: number
  conversions: number
  revenue: string
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_LINKS: LinkItem[] = [
  { id: "l1", link: "aspire.co/summer-sophia", creator: "Sophia Turner", clicks: 1240, conversions: 48, revenue: "$2,400" },
  { id: "l2", link: "aspire.co/summer-aisha", creator: "Aisha Johnson", clicks: 3560, conversions: 124, revenue: "$6,200" },
  { id: "l3", link: "aspire.co/summer-priya", creator: "Priya Sharma", clicks: 890, conversions: 32, revenue: "$1,600" },
  { id: "l4", link: "aspire.co/summer-noah", creator: "Noah Garcia", clicks: 456, conversions: 18, revenue: "$900" },
  { id: "l5", link: "aspire.co/summer-olivia", creator: "Olivia Kim", clicks: 5120, conversions: 210, revenue: "$10,500" },
]

// ─── Component ───────────────────────────────────────────────────────────────

function LinksTab({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 p-6", className)}>
      <div className="overflow-clip rounded-xl border border-stone-200 shadow-sm dark:border-stone-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-b border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
                <th className="w-12 px-4"><Checkbox aria-label="Select all" /></th>
                <th className="px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Link</th>
                <th className="w-[180px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Creator</th>
                <th className="w-[120px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">Clicks</th>
                <th className="w-[140px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">Conversions</th>
                <th className="w-[140px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_LINKS.map((item) => (
                <tr key={item.id} className="h-14 border-b border-stone-200 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/20">
                  <td className="w-12 px-4"><Checkbox aria-label={`Select ${item.link}`} /></td>
                  <td className="px-3">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.link}</span>
                  </td>
                  <td className="px-3 text-sm text-stone-900 dark:text-stone-100">{item.creator}</td>
                  <td className="px-3 text-right text-sm text-stone-900 dark:text-stone-100">{item.clicks.toLocaleString()}</td>
                  <td className="px-3 text-right text-sm text-stone-900 dark:text-stone-100">{item.conversions}</td>
                  <td className="px-3 text-right text-sm font-medium text-stone-900 dark:text-stone-100">{item.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={1} totalPages={1} totalItems={5} pageSize={50} onPageChange={() => {}} className="border-t border-stone-200 dark:border-stone-800" />
      </div>
    </div>
  )
}

export { LinksTab }
