"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/shared/Pagination"

// ─── Types ───────────────────────────────────────────────────────────────────

interface OfferItem {
  id: string
  creator: string
  offerType: string
  amount: string
  status: string
  sentDate: string
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_OFFERS: OfferItem[] = [
  { id: "o1", creator: "Sophia Turner", offerType: "Flat Fee", amount: "$250.00", status: "Accepted", sentDate: "Jan 16, 2026" },
  { id: "o2", creator: "Marcus Lee", offerType: "Flat Fee", amount: "$180.00", status: "Pending", sentDate: "Jan 18, 2026" },
  { id: "o3", creator: "Aisha Johnson", offerType: "Flat Fee", amount: "$400.00", status: "Accepted", sentDate: "Jan 15, 2026" },
  { id: "o4", creator: "Dylan Park", offerType: "Per Post", amount: "$150.00", status: "Sent", sentDate: "Jan 20, 2026" },
  { id: "o5", creator: "Priya Sharma", offerType: "Flat Fee", amount: "$320.00", status: "Accepted", sentDate: "Jan 17, 2026" },
]

const statusColors: Record<string, string> = {
  Accepted: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
}

// ─── Component ───────────────────────────────────────────────────────────────

function OffersTab({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 p-6", className)}>
      <div className="overflow-clip rounded-xl border border-stone-200 shadow-sm dark:border-stone-800">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="h-14 border-b border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
                <th className="w-12 px-4"><Checkbox aria-label="Select all" /></th>
                <th className="px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Creator</th>
                <th className="w-[140px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Offer Type</th>
                <th className="w-[140px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Amount</th>
                <th className="w-[140px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Status</th>
                <th className="w-[150px] px-3 text-left text-sm font-medium text-stone-500 dark:text-stone-400">Sent Date</th>
                <th className="w-[120px] px-3 text-right text-sm font-medium text-stone-500 dark:text-stone-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_OFFERS.map((item) => (
                <tr key={item.id} className="h-14 border-b border-stone-200 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900/20">
                  <td className="w-12 px-4"><Checkbox aria-label={`Select ${item.creator}`} /></td>
                  <td className="px-3 text-sm text-stone-900 dark:text-stone-100">{item.creator}</td>
                  <td className="px-3 text-sm text-stone-900 dark:text-stone-100">{item.offerType}</td>
                  <td className="px-3 text-sm font-medium text-stone-900 dark:text-stone-100">{item.amount}</td>
                  <td className="px-3">
                    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[item.status] ?? "bg-stone-100 text-stone-600")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 text-sm text-stone-600 dark:text-stone-400">{item.sentDate}</td>
                  <td className="px-3 text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                  </td>
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

export { OffersTab }
