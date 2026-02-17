import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, Edit, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";

export default {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Semantic HTML table with accessible headers, responsive layout, and composable cells.",
      },
    },
  },
};

export const Basic = {
  render: () => (
    <div className="w-[480px] rounded-md border">
      <Table>
        <TableCaption>Q1 2026 Revenue Summary</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="text-right">Growth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { month: "January", revenue: "$12,400", orders: 89, growth: "+8%" },
            { month: "February", revenue: "$15,200", orders: 112, growth: "+22%" },
            { month: "March", revenue: "$18,900", orders: 134, growth: "+24%" },
          ].map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-medium">{row.month}</TableCell>
              <TableCell>{row.revenue}</TableCell>
              <TableCell>{row.orders}</TableCell>
              <TableCell className="text-right text-emerald-500 font-medium">
                {row.growth}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

const USERS = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", role: "Designer", status: "active", initials: "SJ" },
  { id: 2, name: "Mike Chen", email: "mike@example.com", role: "Engineer", status: "active", initials: "MC" },
  { id: 3, name: "Alex Rivera", email: "alex@example.com", role: "Product", status: "pending", initials: "AR" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "Marketing", status: "inactive", initials: "EW" },
  { id: 5, name: "James Park", email: "james@example.com", role: "Engineer", status: "active", initials: "JP" },
];

const statusConfig = {
  active: { label: "Active", class: "bg-emerald-500 hover:bg-emerald-600 text-white" },
  pending: { label: "Pending", variant: "outline" },
  inactive: { label: "Inactive", variant: "secondary" },
};

export const UsersTable = {
  name: "Real World — Users Table",
  render: () => {
    const [sort, setSort] = useState({ field: "name", dir: "asc" });

    const sorted = [...USERS].sort((a, b) => {
      const v = a[sort.field] < b[sort.field] ? -1 : 1;
      return sort.dir === "asc" ? v : -v;
    });

    const toggleSort = (field) =>
      setSort((s) =>
        s.field === field
          ? { field, dir: s.dir === "asc" ? "desc" : "asc" }
          : { field, dir: "asc" }
      );

    return (
      <div className="w-[640px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" />
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 gap-1"
                  onClick={() => toggleSort("name")}
                >
                  Name
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((user) => {
              const sc = statusConfig[user.status];
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.id % 2 === 0 ? undefined : "https://github.com/shadcn.png"}
                        alt={user.name}
                      />
                      <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs font-normal">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={sc.variant}
                      className={sc.class}
                    >
                      {sc.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const InvoiceTable = {
  name: "Real World — Invoice Table",
  render: () => {
    const invoices = [
      { id: "INV-001", date: "Jan 5, 2026", amount: "$250.00", status: "paid" },
      { id: "INV-002", date: "Jan 20, 2026", amount: "$180.00", status: "paid" },
      { id: "INV-003", date: "Feb 3, 2026", amount: "$320.00", status: "pending" },
      { id: "INV-004", date: "Feb 15, 2026", amount: "$95.00", status: "overdue" },
    ];
    const statusStyles = {
      paid: "bg-emerald-500 hover:bg-emerald-600 text-white",
      pending: "outline",
      overdue: "destructive",
    };
    return (
      <div className="w-[480px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell className="text-muted-foreground">{inv.date}</TableCell>
                <TableCell className="font-medium">{inv.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={typeof statusStyles[inv.status] === "string" && !statusStyles[inv.status].includes("bg-") ? statusStyles[inv.status] : undefined}
                    className={statusStyles[inv.status].includes("bg-") ? statusStyles[inv.status] : ""}
                  >
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Download</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};
