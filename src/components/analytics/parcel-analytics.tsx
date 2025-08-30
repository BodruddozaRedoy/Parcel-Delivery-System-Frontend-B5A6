import React from "react"
import type { Parcel } from "@/types/index.types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis, Cell } from "recharts"

type Props = { data: Parcel[] }

const monthKey = (dateStr: string) => {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

const formatMonthLabel = (key: string) => {
  const [y, m] = key.split("-")
  const d = new Date(Number(y), Number(m) - 1, 1)
  return d.toLocaleString(undefined, { month: "short" })
}

function computeMonthlyCounts(data: Parcel[]) {
  const counts = new Map<string, number>()
  data.forEach((p) => {
    if (!p?.createdAt) return
    const k = monthKey(p.createdAt)
    counts.set(k, (counts.get(k) || 0) + 1)
  })
  const arr = Array.from(counts.entries()).sort(([a], [b]) => (a > b ? 1 : -1))
  const last = arr.slice(-6)
  return last.map(([key, value]) => ({ month: formatMonthLabel(key), count: value }))
}

function computeDailyTrend(data: Parcel[]) {
  const now = new Date()
  const days = 30
  const series: { date: string; count: number }[] = []
  const bucket = new Map<string, number>()
  data.forEach((p) => {
    if (!p?.createdAt) return
    const d = new Date(p.createdAt)
    const key = d.toISOString().slice(0, 10)
    bucket.set(key, (bucket.get(key) || 0) + 1)
  })
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(now.getDate() - i)
    const key = d.toISOString().slice(0, 10)
    series.push({
      date: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      count: bucket.get(key) || 0,
    })
  }
  return series
}

function computeStatusDist(data: Parcel[]) {
  const statuses = [
    "requested",
    "approved",
    "dispatched",
    "in_transit",
    "delivered",
    "canceled",
  ] as const
  const counts = new Map<string, number>()
  statuses.forEach((s) => counts.set(s, 0))
  data.forEach((p) => {
    const s = String(p.currentStatus || "").toLowerCase()
    counts.set(s, (counts.get(s) || 0) + 1)
  })
  return statuses
    .map((s) => ({ name: s.replace(/_/g, " "), value: counts.get(s) || 0, key: s }))
    .filter((d) => d.value > 0)
}

const monthlyConfig: ChartConfig = {
  count: { label: "Shipments", color: "hsl(var(--primary))" },
}

const trendConfig: ChartConfig = {
  count: { label: "Daily Shipments", color: "hsl(var(--primary))" },
}

const statusConfig: ChartConfig = {
  requested: { label: "Requested", color: "#64748b" },
  approved: { label: "Approved", color: "#22c55e" },
  dispatched: { label: "Dispatched", color: "#0ea5e9" },
  in_transit: { label: "In Transit", color: "#f59e0b" },
  delivered: { label: "Delivered", color: "#10b981" },
  canceled: { label: "Canceled", color: "#ef4444" },
}

export function ParcelAnalytics({ data }: Props) {
  const monthly = computeMonthlyCounts(data)
  const trend = computeDailyTrend(data)
  const status = computeStatusDist(data)

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @4xl/main:grid-cols-3">
      {/* Monthly Shipments (Bar) */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Monthly Shipments</CardTitle>
          <CardDescription>Last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={monthlyConfig} className="h-[250px] w-full">
            <BarChart data={monthly}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis allowDecimals={false} width={28} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={6} fill="var(--color-count)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Status Distribution (Pie) */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Status Distribution</CardTitle>
          <CardDescription>Based on current status</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={statusConfig} className="h-[250px] w-full">
            <PieChart>
              <Pie data={status} dataKey="value" nameKey="name" innerRadius={40} outerRadius={80} strokeWidth={4}>
                {status.map((entry) => (
                  <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="key" />} />
              <ChartTooltip content={<ChartTooltipContent nameKey="key" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Parcel Trend (Line) */}
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Parcel Trend</CardTitle>
          <CardDescription>Last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trendConfig} className="h-[250px] w-full">
            <LineChart data={trend}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis allowDecimals={false} width={28} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ParcelAnalytics
