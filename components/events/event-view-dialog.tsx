"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User } from "lucide-react";

interface EventViewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    description: string;
    startDate?: string | null;
    endDate?: string | null;
    status: string;
    authorName: string;
    image?: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export function EventViewDialog({
  isOpen,
  onClose,
  event,
}: EventViewDialogProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "ONGOING":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "FINISHED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
          <DialogDescription>Event details and information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status and Author */}
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Created by {event.authorName}</span>
            </div>
          </div>

          {/* Event Image */}
          {event.image && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Event Image</h3>
              <div className="rounded-lg border overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Description</h3>
            <div className="rounded-md border p-4 bg-muted/40">
              <p className="text-sm whitespace-pre-wrap">{event.description}</p>
            </div>
          </div>

          {/* Date Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Start Date</h3>
              </div>
              {event.startDate && (
                <p className="text-sm text-muted-foreground pl-6">
                  {formatDate(event.startDate)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">End Date</h3>
              </div>
              {event.endDate && (
                <p className="text-sm text-muted-foreground pl-6">
                  {formatDate(event.endDate)}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Created: </span>
                <span>{formatDate(event.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Updated: </span>
                <span>{formatDate(event.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
