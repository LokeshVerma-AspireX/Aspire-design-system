"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Task {
  id: string
  title: string
  assignee: string
  initials: string
  dueDate: string
  completed: boolean
}

// ─── Sample data ─────────────────────────────────────────────────────────────

const SAMPLE_TASKS: Task[] = [
  { id: "t1", title: "Send creative brief to all creators", assignee: "Lokesh Verma", initials: "LV", dueDate: "Feb 20, 2026", completed: true },
  { id: "t2", title: "Review submitted content batch 1", assignee: "Sarah Kim", initials: "SK", dueDate: "Feb 25, 2026", completed: true },
  { id: "t3", title: "Process payments for approved creators", assignee: "Lokesh Verma", initials: "LV", dueDate: "Mar 1, 2026", completed: false },
  { id: "t4", title: "Schedule social media posts", assignee: "Mia Johnson", initials: "MJ", dueDate: "Mar 5, 2026", completed: false },
  { id: "t5", title: "Compile campaign performance report", assignee: "Sarah Kim", initials: "SK", dueDate: "Mar 15, 2026", completed: false },
  { id: "t6", title: "Follow up with pending creators", assignee: "Lokesh Verma", initials: "LV", dueDate: "Feb 22, 2026", completed: false },
]

// ─── Component ───────────────────────────────────────────────────────────────

function TasksTab({ className }: { className?: string }) {
  const [tasks, setTasks] = React.useState(SAMPLE_TASKS)

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  return (
    <div className={cn("flex flex-col gap-4 p-6", className)}>
      <div className="rounded-xl border border-stone-200 dark:border-stone-800">
        <div className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-stone-50 dark:hover:bg-stone-900/20"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                aria-label={`Mark "${task.title}" as done`}
              />
              <span
                className={cn(
                  "flex-1 text-sm",
                  task.completed
                    ? "text-stone-400 line-through dark:text-stone-500"
                    : "text-stone-900 dark:text-stone-100"
                )}
              >
                {task.title}
              </span>
              <Avatar className="size-7 shrink-0">
                <AvatarFallback className="bg-stone-200 text-[10px] font-medium text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                  {task.initials}
                </AvatarFallback>
              </Avatar>
              <span className="w-[110px] shrink-0 text-right text-xs text-stone-500 dark:text-stone-400">
                {task.dueDate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { TasksTab }
