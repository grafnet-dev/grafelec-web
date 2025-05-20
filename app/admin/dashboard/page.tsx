"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout } from "@/components/layout/admin-layout"
import { AlertCircle, CheckCircle, Clock, Ticket, Users } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"


export default function AdminDashboard() {
  // Sample data for charts
  const ticketTrends = [
    { name: "Mon", tickets: 12 },
    { name: "Tue", tickets: 18 },
    { name: "Wed", tickets: 15 },
    { name: "Thu", tickets: 25 },
    { name: "Fri", tickets: 20 },
    { name: "Sat", tickets: 8 },
    { name: "Sun", tickets: 5 },
  ]

  const ticketsByCategory = [
    { category: "Hardware", count: 25 },
    { category: "Software", count: 40 },
    { category: "Network", count: 30 },
    { category: "Account", count: 15 },
    { category: "Other", count: 10 },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        

        {/* Ticket Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#b60101]">120</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-[#f59e0b]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f59e0b]">42</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-[#3b82f6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3b82f6]">38</div>
              <p className="text-xs text-muted-foreground">-5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#10b981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#10b981]">40</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Trends</CardTitle>
              <CardDescription>Daily ticket submissions over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    tickets: {
                      label: "Tickets",
                      color: "hsl(0, 98%, 36%)",
                    },
                  }}
                >
                  <LineChart
                    data={ticketTrends}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="name" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
                    <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                    <Line
                      type="monotone"
                      dataKey="tickets"
                      strokeWidth={2}
                      activeDot={{
                        r: 6,
                        style: { fill: "hsl(0, 98%, 36%)" },
                      }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tickets by Category</CardTitle>
              <CardDescription>Distribution of tickets across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(217, 91%, 60%)",
                    },
                  }}
                >
                  <BarChart
                    data={ticketsByCategory}
                    margin={{
                      top: 5,
                      right: 10,
                      left: 10,
                      bottom: 20,
                    }}
                    layout="vertical"
                  >
                    <XAxis type="number" tickLine={false} axisLine={false} />
                    <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Tickets</CardTitle>
            <CardDescription>Tickets requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
                      <AlertCircle className="h-4 w-4 text-[#b60101]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Server Outage - Database Cluster</h3>
                      <p className="text-sm text-muted-foreground">Ticket #2045 • Opened 1 hour ago</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full dark:bg-red-900 dark:text-red-200">
                    Critical
                  </span>
                </div>
                <p className="mt-3 text-sm">Main database cluster is unresponsive affecting multiple departments.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">IT Department</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-[#024b94] hover:underline">Assign</button>
                    <button className="text-xs text-[#024b94] hover:underline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
                      <AlertCircle className="h-4 w-4 text-[#f59e0b]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Service Degradation</h3>
                      <p className="text-sm text-muted-foreground">Ticket #2042 • Opened 3 hours ago</p>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full dark:bg-orange-900 dark:text-orange-200">
                    High
                  </span>
                </div>
                <p className="mt-3 text-sm">Users reporting delays in email delivery and intermittent access issues.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Marketing Team</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-[#024b94] hover:underline">Assign</button>
                    <button className="text-xs text-[#024b94] hover:underline">View Details</button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900">
                      <AlertCircle className="h-4 w-4 text-[#f59e0b]" />
                    </div>
                    <div>
                      <h3 className="font-medium">VPN Connection Issues</h3>
                      <p className="text-sm text-muted-foreground">Ticket #2039 • Opened 5 hours ago</p>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full dark:bg-orange-900 dark:text-orange-200">
                    High
                  </span>
                </div>
                <p className="mt-3 text-sm">Remote workers unable to connect to VPN from certain regions.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Remote Team</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs text-[#024b94] hover:underline">Assign</button>
                    <button className="text-xs text-[#024b94] hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
