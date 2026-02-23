"use client"

import * as React from "react"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/shared/Pagination"

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContentItem {
  id: string
  creator: string
  contentType: string
  platform: string
  status: string
  submittedDate: string
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_CONTENT: ContentItem[] = [
  { id: "c1", creator: "Sophia Turner", contentType: "Instagram Post", platform: "Instagram", status: "Approved", submittedDate: "Feb 10, 2026" },
  { id: "c2", creator: "Sophia Turner", contentType: "Instagram Story", platform: "Instagram", status: "Pending", submittedDate: "Feb 12, 2026" },
  { id: "c3", creator: "Aisha Johnson", contentType: "TikTok Video", platform: "TikTok", status: "Approved", submittedDate: "Feb 8, 2026" },
  { id: "c4", creator: "Priya Sharma", contentType: "Instagram Reel", platform: "Instagram", status: "In Review", submittedDate: "Feb 15, 2026" },
  { id: "c5", creator: "Noah Garcia", contentType: "Instagram Post", platform: "Instagram", status: "Approved", submittedDate: "Feb 14, 2026" },
  { id: "c6", creator: "Olivia Kim", contentType: "Instagram Post", platform: "Instagram", status: "Revision Requested", submittedDate: "Feb 16, 2026" },
]

const statusColors: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "In Review": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Revision Requested": "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
}

// ─── Component ───────────────────────────────────────────────────────────────

function ContentTab({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 p-6", className)}>
      <div className="overflow-clip rounded-xl border border-stone-200 shadow-sm dark:border-stone-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-b border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
                <th className="w-12 px-4"><Checkbox aria-label="Select all" /></th>
                <th className="px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Creator</th>
                <th className="w-[160px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Content Type</th>
                <th className="w-[140px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Platform</th>
                <th className="w-[160px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Status</th>
                <th className="w-[150px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Submitted Date</th>
                <th className="w-[120px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_CONTENT.map((item) => (
                <tr key={item.id} className="h-14 border-b border-stone-200 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/20">
                  <td className="w-12 px-4"><Checkbox aria-label={`Select ${item.creator}`} /></td>
                  <td className="px-3 text-sm text-stone-900 dark:text-stone-100">{item.creator}</td>
                  <td className="px-3 text-sm text-stone-900 dark:text-stone-100">{item.contentType}</td>
                  <td className="px-3 text-sm text-stone-900 dark:text-stone-100">{item.platform}</td>
                  <td className="px-3">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[item.status] ?? "bg-stone-100 text-stone-600")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 text-sm text-stone-600 dark:text-stone-400">{item.submittedDate}</td>
                  <td className="px-3 text-right">
                    <Button variant="outline" size="sm">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={1} totalPages={1} totalItems={6} pageSize={50} onPageChange={() => {}} className="border-t border-stone-200 dark:border-stone-800" />
      </div>
    </div>
  )
}

export { ContentTab }
