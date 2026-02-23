"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plug,
  ShoppingBag,
  Share2,
  MessageSquare,
  BarChart3,
  Link2,
  Plus,
  Settings,
  RefreshCw,
  Copy,
  Trash2,
  MoreHorizontal,
  Check,
  AlertCircle,
  Key,
  Eye,
  EyeOff,
} from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────────

type IntegrationStatus = "connected" | "error" | "not_connected"

type IntegrationCategory =
  | "e-commerce"
  | "social"
  | "communication"
  | "analytics"

interface Integration {
  id: string
  name: string
  category: IntegrationCategory
  status: IntegrationStatus
  icon: React.ReactNode
  iconBg: string
  description: string
  connectedAccount?: string
  lastSync?: string
}

interface ApiKey {
  id: string
  name: string
  key: string
  lastFour: string
  created: string
  lastUsed: string
}

// ── Data ───────────────────────────────────────────────────────────────────────

const integrations: Integration[] = [
  {
    id: "shopify",
    name: "Shopify",
    category: "e-commerce",
    status: "connected",
    icon: <ShoppingBag className="size-5 text-white" />,
    iconBg: "bg-green-600",
    description: "Sync products, orders, and discount codes from your Shopify store.",
    connectedAccount: "aspire-store.myshopify.com",
    lastSync: "2 min ago",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    category: "e-commerce",
    status: "not_connected",
    icon: <ShoppingBag className="size-5 text-white" />,
    iconBg: "bg-purple-600",
    description: "Connect your WooCommerce store for product and order syncing.",
  },
  {
    id: "meta",
    name: "Meta Business",
    category: "social",
    status: "connected",
    icon: <Share2 className="size-5 text-white" />,
    iconBg: "bg-blue-600",
    description: "Manage Facebook and Instagram campaigns and creator partnerships.",
    connectedAccount: "Aspire Marketing",
  },
  {
    id: "tiktok",
    name: "TikTok for Business",
    category: "social",
    status: "connected",
    icon: <Share2 className="size-5 text-white" />,
    iconBg: "bg-gray-900",
    description: "Track TikTok creator content and campaign performance.",
    connectedAccount: "AspireHQ",
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "social",
    status: "error",
    icon: <Share2 className="size-5 text-white" />,
    iconBg: "bg-red-600",
    description: "Monitor YouTube creator videos and channel analytics.",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    category: "social",
    status: "not_connected",
    icon: <Share2 className="size-5 text-white" />,
    iconBg: "bg-red-500",
    description: "Connect Pinterest to track pins and creator boards.",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "communication",
    status: "connected",
    icon: <MessageSquare className="size-5 text-white" />,
    iconBg: "bg-red-500",
    description: "Send and receive emails directly within Aspire.",
    connectedAccount: "team@aspire.io",
  },
  {
    id: "slack",
    name: "Slack",
    category: "communication",
    status: "connected",
    icon: <MessageSquare className="size-5 text-white" />,
    iconBg: "bg-purple-500",
    description: "Receive real-time notifications and updates in Slack.",
    connectedAccount: "#aspire-notifications",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    category: "analytics",
    status: "connected",
    icon: <BarChart3 className="size-5 text-white" />,
    iconBg: "bg-yellow-500",
    description: "Track website traffic and conversion data from campaigns.",
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    category: "analytics",
    status: "not_connected",
    icon: <BarChart3 className="size-5 text-white" />,
    iconBg: "bg-emerald-600",
    description: "Sync email marketing data and customer segments.",
  },
]

const initialApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_••••••••••••a4f2",
    lastFour: "a4f2",
    created: "Jan 15, 2026",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    name: "Staging API Key",
    key: "sk_test_••••••••••••b8e1",
    lastFour: "b8e1",
    created: "Feb 3, 2026",
    lastUsed: "5 days ago",
  },
  {
    id: "3",
    name: "Webhook Signing Key",
    key: "whsec_••••••••••••c7d3",
    lastFour: "c7d3",
    created: "Feb 10, 2026",
    lastUsed: "1 hour ago",
  },
]

// ── Category helpers ───────────────────────────────────────────────────────────

const categoryMap: Record<string, IntegrationCategory | "all"> = {
  all: "all",
  "e-commerce": "e-commerce",
  social: "social",
  communication: "communication",
  analytics: "analytics",
}

const categoryLabels: Record<string, string> = {
  all: "All",
  "e-commerce": "E-commerce",
  social: "Social Media",
  communication: "Communication",
  analytics: "Analytics",
}

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Plug className="size-4" />,
  "e-commerce": <ShoppingBag className="size-4" />,
  social: <Share2 className="size-4" />,
  communication: <MessageSquare className="size-4" />,
  analytics: <BarChart3 className="size-4" />,
}

// ── Status Dot ─────────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: IntegrationStatus }) {
  return (
    <span
      className={cn(
        "inline-block size-2 rounded-full",
        status === "connected" && "bg-green-500",
        status === "error" && "bg-red-500",
        status === "not_connected" && "bg-gray-400"
      )}
    />
  )
}

function StatusLabel({ status }: { status: IntegrationStatus }) {
  const labels: Record<IntegrationStatus, string> = {
    connected: "Connected",
    error: "Connection Error",
    not_connected: "Not Connected",
  }
  return (
    <span
      className={cn(
        "flex items-center gap-1.5 text-xs font-medium",
        status === "connected" && "text-green-600 dark:text-green-400",
        status === "error" && "text-red-600 dark:text-red-400",
        status === "not_connected" && "text-muted-foreground"
      )}
    >
      <StatusDot status={status} />
      {labels[status]}
    </span>
  )
}

// ── Integration Card ───────────────────────────────────────────────────────────

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                integration.iconBg
              )}
            >
              {integration.icon}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">{integration.name}</h3>
                <StatusLabel status={integration.status} />
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {integration.description}
              </p>
              {integration.status === "connected" && integration.connectedAccount && (
                <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <Link2 className="size-3" />
                  {integration.connectedAccount}
                  {integration.lastSync && (
                    <span className="text-muted-foreground/60">
                      {" "}
                      &middot; Synced {integration.lastSync}
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {integration.status === "connected" && (
            <>
              <Button variant="outline" size="sm">
                <Settings className="size-3.5" />
                Configure
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                Disconnect
              </Button>
            </>
          )}
          {integration.status === "error" && (
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950">
              <RefreshCw className="size-3.5" />
              Reconnect
            </Button>
          )}
          {integration.status === "not_connected" && (
            <Button size="sm">
              <Plus className="size-3.5" />
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// ── Shopify Spotlight Card ─────────────────────────────────────────────────────

function ShopifySpotlightCard() {
  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-600">
              <ShoppingBag className="size-5 text-white" />
            </div>
            <div className="flex items-center gap-2.5">
              <CardTitle className="text-base">Shopify</CardTitle>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              >
                <Check className="size-3" />
                Connected
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-lg font-semibold">1,247</p>
            <p className="text-muted-foreground text-xs">Products synced</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-lg font-semibold">2 min ago</p>
            <p className="text-muted-foreground text-xs">Last sync</p>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 text-center">
            <p className="text-lg font-semibold">3,891</p>
            <p className="text-muted-foreground text-xs">Orders tracked</p>
          </div>
        </div>
        <Separator className="mt-4" />
        <div className="mt-4 flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="size-3.5" />
            Sync Now
          </Button>
          <Button variant="outline" size="sm">
            View Products
          </Button>
          <Button variant="outline" size="sm">
            Manage Codes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// ── API Keys Section ───────────────────────────────────────────────────────────

function ApiKeysSection() {
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>(initialApiKeys)
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [visibleKeys, setVisibleKeys] = React.useState<Set<string>>(new Set())
  const [generateDialogOpen, setGenerateDialogOpen] = React.useState(false)
  const [newKeyName, setNewKeyName] = React.useState("")
  const [revokeDialogOpen, setRevokeDialogOpen] = React.useState(false)
  const [keyToRevoke, setKeyToRevoke] = React.useState<ApiKey | null>(null)

  const handleCopy = (apiKey: ApiKey) => {
    setCopiedId(apiKey.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleToggleVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleRevoke = () => {
    if (keyToRevoke) {
      setApiKeys((prev) => prev.filter((k) => k.id !== keyToRevoke.id))
      setKeyToRevoke(null)
      setRevokeDialogOpen(false)
    }
  }

  const handleGenerate = () => {
    if (newKeyName.trim()) {
      const newKey: ApiKey = {
        id: String(Date.now()),
        name: newKeyName.trim(),
        key: "sk_new_••••••••••••x9z0",
        lastFour: "x9z0",
        created: "Feb 23, 2026",
        lastUsed: "Never",
      }
      setApiKeys((prev) => [...prev, newKey])
      setNewKeyName("")
      setGenerateDialogOpen(false)
    }
  }

  return (
    <Card className="bg-card rounded-xl border p-6">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="size-5 text-muted-foreground" />
            <CardTitle className="text-base">API Keys</CardTitle>
          </div>
          <Dialog open={generateDialogOpen} onOpenChange={setGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-3.5" />
                Generate New Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate New API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key for accessing the Aspire API. Store your key
                  securely — it will only be shown once.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-2">
                <label htmlFor="key-name" className="text-sm font-medium">
                  Key Name
                </label>
                <Input
                  id="key-name"
                  placeholder="e.g. Production API Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setGenerateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerate} disabled={!newKeyName.trim()}>
                  Generate Key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apiKeys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="font-medium">{apiKey.name}</TableCell>
                <TableCell>
                  <code className="text-muted-foreground bg-muted rounded px-1.5 py-0.5 text-xs font-mono">
                    {visibleKeys.has(apiKey.id)
                      ? `sk_...${apiKey.lastFour}`
                      : apiKey.key}
                  </code>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {apiKey.created}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {apiKey.lastUsed}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleToggleVisibility(apiKey.id)}
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeOff className="size-3.5" />
                      ) : (
                        <Eye className="size-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleCopy(apiKey)}
                    >
                      {copiedId === apiKey.id ? (
                        <Check className="size-3.5 text-green-500" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        setKeyToRevoke(apiKey)
                        setRevokeDialogOpen(true)
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Revoke confirmation dialog */}
      <Dialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke{" "}
              <span className="font-medium text-foreground">
                {keyToRevoke?.name}
              </span>
              ? This action cannot be undone and any applications using this key
              will lose access immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRevoke}>
              Revoke Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────

function IntegrationsSettings() {
  const [activeTab, setActiveTab] = React.useState("all")

  const filteredIntegrations = React.useMemo(() => {
    if (activeTab === "all") return integrations
    return integrations.filter(
      (integration) => integration.category === activeTab
    )
  }, [activeTab])

  const showShopifySpotlight = activeTab === "all" || activeTab === "e-commerce"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Connect your favorite tools and platforms to streamline your workflow.
        </p>
      </div>

      {/* Tab Filter */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <TabsTrigger key={key} value={key} className="gap-1.5">
              {categoryIcons[key]}
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(categoryLabels).map((tabKey) => (
          <TabsContent key={tabKey} value={tabKey}>
            <div className="space-y-6">
              {/* Shopify Spotlight */}
              {(tabKey === "all" || tabKey === "e-commerce") && (
                <ShopifySpotlightCard />
              )}

              {/* Integration Cards Grid */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {(tabKey === "all"
                  ? integrations
                  : integrations.filter((i) => i.category === tabKey)
                ).map((integration) => (
                  <IntegrationCard
                    key={integration.id}
                    integration={integration}
                  />
                ))}
              </div>

              {/* API Keys Section */}
              <ApiKeysSection />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export { IntegrationsSettings }
