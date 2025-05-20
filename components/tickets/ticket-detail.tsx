"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, Clock, Paperclip, Send } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TicketDetailProps {
  isAdmin?: boolean
}

export function TicketDetail({ isAdmin = false }: TicketDetailProps) {
  const [newComment, setNewComment] = useState("")
  const [status, setStatus] = useState("in_progress")

  // Sample ticket data
  const ticket = {
    id: "TKT-1089",
    title: "Unable to access email",
    description:
      "I'm unable to access my work email since this morning. I've tried restarting my computer and clearing browser cache, but I still get an error message saying 'Connection failed'.",
    category: "Account",
    created: "May 18, 2025 09:15 AM",
    status: "in_progress",
    urgency: "medium",
    user: "John Doe",
    assigned: isAdmin ? "Mike Wilson" : "Unassigned",
    attachments: [
      { name: "screenshot.png", size: "245 KB" },
      { name: "error_log.txt", size: "12 KB" },
    ],
  }

  // Sample comments
  const comments = [
    {
      id: 1,
      user: "John Doe",
      isAdmin: false,
      content: "I've tried accessing from my phone as well, but getting the same error.",
      timestamp: "May 18, 2025 09:30 AM",
    },
    {
      id: 2,
      user: "Mike Wilson",
      isAdmin: true,
      content:
        "Thank you for reporting this issue. I'm checking our email server status. Could you please provide your email address and the exact error message you're seeing?",
      timestamp: "May 18, 2025 10:15 AM",
    },
    {
      id: 3,
      user: "John Doe",
      isAdmin: false,
      content:
        "My email is john.doe@company.com. The exact error message is: 'Connection to mail server failed. Please try again later or contact your administrator.'",
      timestamp: "May 18, 2025 10:22 AM",
    },
    {
      id: 4,
      user: "Mike Wilson",
      isAdmin: true,
      content:
        "I've identified the issue. We're experiencing some problems with our email server. Our team is working on it and we expect to have it resolved within the next hour. I'll update you once it's fixed.",
      timestamp: "May 18, 2025 10:45 AM",
    },
  ]

  // Sample status history
  const statusHistory = [
    {
      status: "pending",
      timestamp: "May 18, 2025 09:15 AM",
      user: "System",
    },
    {
      status: "in_progress",
      timestamp: "May 18, 2025 10:15 AM",
      user: "Mike Wilson",
    },
  ]

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log("Submitting comment:", newComment)
      setNewComment("")
    }
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    console.log("Status changed to:", value)
  }

  // Function to render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-[#f59e0b]" />
            <span className="text-sm font-medium text-[#f59e0b]">Pending</span>
          </div>
        )
      case "in_progress":
        return (
          <div className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-[#3b82f6]" />
            <span className="text-sm font-medium text-[#3b82f6]">In Progress</span>
          </div>
        )
      case "resolved":
        return (
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-[#10b981]" />
            <span className="text-sm font-medium text-[#10b981]">Resolved</span>
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="text-xl">{ticket.title}</CardTitle>
              <CardDescription>Ticket ID: {ticket.id}</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {renderStatusBadge(ticket.status)}
              {renderUrgencyBadge(ticket.urgency)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Submitted by</p>
              <p>{ticket.user}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date Created</p>
              <p>{ticket.created}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p>{ticket.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
              <p>{ticket.assigned}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
            <div className="rounded-md border p-4 bg-muted/40">
              <p className="text-sm">{ticket.description}</p>
            </div>
          </div>

          {ticket.attachments.length > 0 && (
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Attachments</p>
              <div className="space-y-2">
                {ticket.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Update Status</p>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-1/2">
                <p className="text-sm font-medium text-muted-foreground mb-2">Assign To</p>
                <Select defaultValue="mike">
                  <SelectTrigger>
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mike">Mike Wilson</SelectItem>
                    <SelectItem value="lisa">Lisa Chen</SelectItem>
                    <SelectItem value="david">David Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusHistory.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  {item.status === "pending" && <Clock className="h-4 w-4 text-[#f59e0b]" />}
                  {item.status === "in_progress" && <AlertCircle className="h-4 w-4 text-[#3b82f6]" />}
                  {item.status === "resolved" && <CheckCircle className="h-4 w-4 text-[#10b981]" />}
                </div>
                <div>
                  <p className="text-sm">
                    Status changed to <span className="font-medium">{item.status.replace("_", " ")}</span> by{" "}
                    {item.user}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        comment.isAdmin ? "bg-[#b60101]/10 text-[#b60101]" : "bg-[#024b94]/10 text-[#024b94]"
                      }`}
                    >
                      {comment.isAdmin ? "A" : "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{comment.user}</p>
                      <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                    </div>
                  </div>
                  {comment.isAdmin && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full dark:bg-red-900 dark:text-red-200">
                      Admin
                    </span>
                  )}
                </div>
                <div className="ml-10 rounded-md border p-3 bg-muted/40">
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-4">
          <div className="w-full space-y-4">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Paperclip className="mr-2 h-4 w-4" />
                Attach File
              </Button>
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className={isAdmin ? "bg-[#b60101] hover:bg-[#b60101]/90" : "bg-[#024b94] hover:bg-[#024b94]/90"}
              >
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
