

import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle, Clock, Eye, MessageCircle, Search, User } from "lucide-react"

export default function AdminTickets() {
  // Sample ticket data
  const tickets = [
    {
      id: "TKT-2045",
      title: "Server Outage - Database Cluster",
      user: "John Smith",
      category: "Network",
      created: "May 19, 2025",
      status: "pending",
      urgency: "critical",
      assigned: "Unassigned",
    },
    {
      id: "TKT-2042",
      title: "Email Service Degradation",
      user: "Sarah Johnson",
      category: "Software",
      created: "May 19, 2025",
      status: "in_progress",
      urgency: "high",
      assigned: "Mike Wilson",
    },
    {
      id: "TKT-2039",
      title: "VPN Connection Issues",
      user: "Robert Davis",
      category: "Network",
      created: "May 19, 2025",
      status: "in_progress",
      urgency: "high",
      assigned: "Lisa Chen",
    },
    {
      id: "TKT-2035",
      title: "New Software Installation Request",
      user: "Emily White",
      category: "Software",
      created: "May 18, 2025",
      status: "pending",
      urgency: "medium",
      assigned: "Unassigned",
    },
    {
      id: "TKT-2030",
      title: "Password Reset Request",
      user: "Michael Brown",
      category: "Account",
      created: "May 18, 2025",
      status: "resolved",
      urgency: "low",
      assigned: "Lisa Chen",
    },
    {
      id: "TKT-2025",
      title: "Printer Configuration Issue",
      user: "Jessica Lee",
      category: "Hardware",
      created: "May 17, 2025",
      status: "resolved",
      urgency: "medium",
      assigned: "Mike Wilson",
    },
    {
      id: "TKT-2020",
      title: "New Employee Onboarding",
      user: "David Miller",
      category: "Account",
      created: "May 17, 2025",
      status: "in_progress",
      urgency: "medium",
      assigned: "Lisa Chen",
    },
  ]

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-[#f59e0b]" />
            <span className="text-xs font-medium text-[#f59e0b]">Pending</span>
          </div>
        )
      case "in_progress":
        return (
          <div className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3 text-[#3b82f6]" />
            <span className="text-xs font-medium text-[#3b82f6]">In Progress</span>
          </div>
        )
      case "resolved":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-[#10b981]" />
            <span className="text-xs font-medium text-[#10b981]">Resolved</span>
          </div>
        )
      default:
        return null
    }
  }

  // Function to render urgency badge
  const renderUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "low":
        return (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Low
          </span>
        )
      case "medium":
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Medium
          </span>
        )
      case "high":
        return (
          <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            High
          </span>
        )
      case "critical":
        return (
          <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
            Critical
          </span>
        )
      default:
        return null
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Ticket Management</h1>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets by ID, title, or user..."
              className="pl-8 w-full md:w-[350px]"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Admins</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="mike">Mike Wilson</SelectItem>
                <SelectItem value="lisa">Lisa Chen</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="urgency">Urgency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-medium">{ticket.id}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.user}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>{ticket.created}</TableCell>
                    <TableCell>{renderStatusBadge(ticket.status)}</TableCell>
                    <TableCell>{renderUrgencyBadge(ticket.urgency)}</TableCell>
                    <TableCell>
                      {ticket.assigned === "Unassigned" ? (
                        <span className="text-muted-foreground text-sm">Unassigned</span>
                      ) : (
                        ticket.assigned
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MessageCircle className="h-4 w-4" />
                          <span className="sr-only">Comment</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <User className="h-4 w-4" />
                          <span className="sr-only">Assign</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
