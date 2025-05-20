import { UserLayout } from "@/components/layout/user-layout"
import { TicketForm } from "@/components/tickets/ticket-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, Clock, Eye, Pencil, Search, Trash2 } from "lucide-react"

export default function UserTickets() {
  // Sample ticket data
  const tickets = [
    {
      id: "TKT-1089",
      title: "Unable to access email",
      category: "Account",
      created: "May 18, 2025",
      status: "in_progress",
      urgency: "medium",
    },
    {
      id: "TKT-1082",
      title: "Software installation request",
      category: "Software",
      created: "May 15, 2025",
      status: "pending",
      urgency: "low",
    },
    {
      id: "TKT-1076",
      title: "Network connectivity issues",
      category: "Network",
      created: "May 10, 2025",
      status: "resolved",
      urgency: "high",
    },
    {
      id: "TKT-1070",
      title: "Printer not working",
      category: "Hardware",
      created: "May 5, 2025",
      status: "resolved",
      urgency: "medium",
    },
    {
      id: "TKT-1065",
      title: "Request for new laptop",
      category: "Hardware",
      created: "May 1, 2025",
      status: "in_progress",
      urgency: "low",
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
    <UserLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
          <TicketForm />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tickets..." className="pl-8 w-full md:w-[300px]" />
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

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="cards">Card View</TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Urgency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.title}</TableCell>
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>{ticket.created}</TableCell>
                        <TableCell>{renderStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{renderUrgencyBadge(ticket.urgency)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{ticket.title}</CardTitle>
                        <CardDescription>{ticket.id}</CardDescription>
                      </div>
                      {renderUrgencyBadge(ticket.urgency)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{ticket.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{ticket.created}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        {renderStatusBadge(ticket.status)}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  )
}
