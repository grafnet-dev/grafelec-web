import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserLayout } from "@/components/layout/user-layout"
import { AlertCircle, CheckCircle, Clock, Ticket } from "lucide-react"

export default function UserDashboard() {
  return (
    <UserLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        {/* Ticket Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#024b94]">12</div>
              <p className="text-xs text-muted-foreground">All tickets submitted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-[#f59e0b]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#f59e0b]">4</div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <AlertCircle className="h-4 w-4 text-[#3b82f6]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3b82f6]">5</div>
              <p className="text-xs text-muted-foreground">Currently being worked on</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-[#10b981]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#10b981]">3</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Stay updated on your ticket status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <AlertCircle className="h-4 w-4 text-[#024b94]" />
                </div>
                <div>
                  <p className="font-medium">Ticket #1089 status updated</p>
                  <p className="text-sm text-muted-foreground">Your ticket has been marked as In Progress</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <CheckCircle className="h-4 w-4 text-[#10b981]" />
                </div>
                <div>
                  <p className="font-medium">Ticket #1076 resolved</p>
                  <p className="text-sm text-muted-foreground">Your network access issue has been resolved</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-3">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Ticket className="h-4 w-4 text-[#024b94]" />
                </div>
                <div>
                  <p className="font-medium">New comment on Ticket #1082</p>
                  <p className="text-sm text-muted-foreground">Admin: "We're looking into this issue..."</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Latest Events */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Latest Events</CardTitle>
              <CardDescription>Upcoming events and announcements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#024b94]">System Maintenance</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    Upcoming
                  </span>
                </div>
                <p className="text-sm mt-2">
                  Scheduled maintenance on May 25, 2025. System may be unavailable from 2-4 AM.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Posted by Admin • May 19, 2025</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#024b94]">New Feature Release</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                    Announcement
                  </span>
                </div>
                <p className="text-sm mt-2">We've added new file attachment capabilities to the ticket system.</p>
                <p className="text-xs text-muted-foreground mt-2">Posted by Admin • May 15, 2025</p>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#024b94]">IT Department Town Hall</h3>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
                    Event
                  </span>
                </div>
                <p className="text-sm mt-2">Join us for a virtual town hall meeting on June 1, 2025 at 10:00 AM.</p>
                <p className="text-xs text-muted-foreground mt-2">Posted by Admin • May 10, 2025</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  )
}
