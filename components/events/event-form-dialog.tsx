"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Upload } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface EventFormDialogProps {
  onEventCreated: (event: any) => void
  trigger?: React.ReactNode
}

export function EventFormDialog({ onEventCreated, trigger }: EventFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    image: "",
    status: "UPCOMING" as "UPCOMING" | "ONGOING" | "FINISHED",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters."
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters."
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date."
    }

    if (formData.image && formData.image.length > 0) {
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = "Please enter a valid URL."
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newEvent = {
        id: `event-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate ? format(formData.startDate, "yyyy-MM-dd HH:mm") : null,
        endDate: formData.endDate ? format(formData.endDate, "yyyy-MM-dd HH:mm") : null,
        image: formData.image || null,
        status: formData.status,
        authorId: "current-user-id", // This would come from auth context
        authorName: "John Smith", // This would come from auth context
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onEventCreated(newEvent)
      setIsSubmitting(false)
      setIsOpen(false)
      setFormData({
        title: "",
        description: "",
        startDate: undefined,
        endDate: undefined,
        image: "",
        status: "UPCOMING",
      })
      setErrors({})
    }, 1000)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const defaultTrigger = (
    <Button className="bg-[#b60101] hover:bg-[#b60101]/90">
      <Plus className="mr-2 h-4 w-4" />
      Create Event
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new event. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            <p className="text-sm text-muted-foreground">A clear and descriptive title for your event.</p>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              className={cn("min-h-[120px]", errors.description ? "border-red-500" : "")}
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            <p className="text-sm text-muted-foreground">Provide detailed information about the event.</p>
          </div>

          {/* Date Fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full pl-3 text-left font-normal", !formData.startDate && "text-muted-foreground")}
                  >
                    {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => updateFormData("startDate", date)}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-muted-foreground">When the event starts (optional).</p>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full pl-3 text-left font-normal", !formData.endDate && "text-muted-foreground")}
                  >
                    {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => updateFormData("endDate", date)}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
              <p className="text-sm text-muted-foreground">When the event ends (optional).</p>
            </div>
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <Label>Status *</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "UPCOMING" | "ONGOING" | "FINISHED") => updateFormData("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UPCOMING">Upcoming</SelectItem>
                <SelectItem value="ONGOING">Ongoing</SelectItem>
                <SelectItem value="FINISHED">Finished</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Current status of the event.</p>
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => updateFormData("image", e.target.value)}
              className={errors.image ? "border-red-500" : ""}
            />
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
            <p className="text-sm text-muted-foreground">Optional image URL for the event banner.</p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="event-image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
                </div>
                <input id="event-image-upload" type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#b60101] hover:bg-[#b60101]/90" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
