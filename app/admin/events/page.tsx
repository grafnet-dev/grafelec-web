"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Eye, Pencil, Search, Trash2, Calendar, Clock } from "lucide-react"
import { EventFormDialog } from "@/components/events/event-form-dialog"
import { EventViewDialog } from "@/components/events/event-view-dialog"
import { DeleteEventDialog } from "@/components/events/delete-event-dialog"

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const itemsPerPage = 6
  const currentUserId = "current-user-id" // This would come from auth context

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: "event-001",
      title: "System Maintenance Window",
      description:
        "Scheduled maintenance for our primary servers. During this time, some services may be temporarily unavailable. We apologize for any inconvenience and appreciate your patience.",
      startDate: "2025-05-25 02:00",
      endDate: "2025-05-25 04:00",
      status: "UPCOMING",
      authorId: "current-user-id",
      authorName: "John Smith",
      image: "/placeholder.svg?height=200&width=400",
      createdAt: "2025-05-19T10:00:00Z",
      updatedAt: "2025-05-19T10:00:00Z",
    },
    {
      id: "event-002",
      title: "New Feature Release",
      description:
        "We're excited to announce the release of our new file attachment capabilities in the ticket system. This update will improve your experience when submitting support requests.",
      startDate: "2025-05-20 09:00",
      endDate: null,
      status: "FINISHED",
      authorId: "admin-002",
      authorName: "Sarah Johnson",
      image: null,
      createdAt: "2025-05-15T14:30:00Z",
      updatedAt: "2025-05-20T09:15:00Z",
    },
    {
      id: "event-003",
      title: "IT Department Town Hall",
      description:
        "Join us for our monthly town hall meeting where we'll discuss recent updates, upcoming projects, and answer any questions you may have about our IT services.",
      startDate: "2025-06-01 10:00",
      endDate: "2025-06-01 11:30",
      status: "UPCOMING",
      authorId: "admin-003",
      authorName: "Mike Wilson",
      image: "/placeholder.svg?height=200&width=400",
      createdAt: "2025-05-10T16:45:00Z",
      updatedAt: "2025-05-18T12:20:00Z",
    },
    {
      id: "event-004",
      title: "Security Training Workshop",
      description:
        "Mandatory security training for all employees. Learn about the latest cybersecurity threats and best practices to keep our organization safe.",
      startDate: "2025-05-22 14:00",
      endDate: "2025-05-22 16:00",
      status: "ONGOING",
      authorId: "current-user-id",
      authorName: "John Smith",
      image: null,
      createdAt: "2025-05-05T11:15:00Z",
      updatedAt: "2025-05-22T13:45:00Z",
    },
    {
      id: "event-005",
      title: "Network Infrastructure Upgrade",
      description:
        "We're upgrading our network infrastructure to provide faster and more reliable connectivity. Some brief interruptions may occur during the upgrade process.",
      startDate: "2025-05-30 20:00",
      endDate: "2025-05-31 06:00",
      status: "UPCOMING",
      authorId: "admin-004",
      authorName: "Lisa Chen",
      image: "/placeholder.svg?height=200&width=400",
      createdAt: "2025-05-12T09:30:00Z",
      updatedAt: "2025-05-19T15:10:00Z",
    },
  ])

  // Filter and sort events
  const filteredEvents = events
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || event.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "status":
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentEvents = filteredEvents.slice(startIndex, endIndex)

  // Statistics
  const totalEvents = events.length
  const upcomingCount = events.filter((event) => event.status === "UPCOMING").length
  const ongoingCount = events.filter((event) => event.status === "ONGOING").length
  const finishedCount = events.filter((event) => event.status === "FINISHED").length

  const handleEventCreated = (newEvent: any) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents])
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
  }

  const openViewDialog = (event: any) => {
    setSelectedEvent(event)
    setIsViewDialogOpen(true)
  }

  const openDeleteDialog = (event: any) => {
    setSelectedEvent(event)
    setIsDeleteDialogOpen(true)
  }

  const canDeleteEvent = (event: any) => {
    return event.authorId === currentUserId
  }

  const getAuthorDisplay = (event: any) => {
    return event.authorId === currentUserId ? "Vous" : event.authorName
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">à venir</Badge>
      case "ONGOING":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">en cours</Badge>
      case "FINISHED":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">terminé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non défini"
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Reset pagination when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    switch (filterType) {
      case "status":
        setStatusFilter(value)
        break
      case "sort":
        setSortBy(value)
        break
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gestion des Evènements</h1>
          <EventFormDialog onEventCreated={handleEventCreated} />
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total des Evènements</p>
                  <p className="text-2xl font-bold text-[#b60101]">{totalEvents}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">À venir</p>
                  <p className="text-2xl font-bold text-blue-600">{upcomingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">En cours</p>
                  <p className="text-2xl font-bold text-green-600">{ongoingCount}</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Terminé</p>
                  <p className="text-2xl font-bold text-gray-600">{finishedCount}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher événements par titre ou description..."
              className="pl-8 w-full md:w-[350px]"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="UPCOMING">À venir</SelectItem>
                <SelectItem value="ONGOING">En cours</SelectItem>
                <SelectItem value="FINISHED">Terminé</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value) => handleFilterChange("sort", value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent</SelectItem>
                <SelectItem value="oldest">Plus ancien</SelectItem>
                <SelectItem value="title">Titre A-Z</SelectItem>
                <SelectItem value="status">Statut</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Events Table */}
        <Card>
          <CardContent className="p-0">
            {/* Vue desktop - cachée sur mobile et tablette */}
            <div className="hidden xl:block overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Titre</TableHead>
                    <TableHead className="min-w-[300px]">Description</TableHead>
                    <TableHead className="w-[120px]">Date Début</TableHead>
                    <TableHead className="w-[120px]">Date Fin</TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                    <TableHead className="w-[120px]">Auteur</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {truncateText(event.description, 40)}
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(event.startDate)}</TableCell>
                      <TableCell className="text-sm">{formatDate(event.endDate)}</TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell className="text-sm">{getAuthorDisplay(event)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openViewDialog(event)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Voir</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          {canDeleteEvent(event) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => openDeleteDialog(event)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Vue tablette - affichée uniquement sur tablette */}
            <div className="hidden md:block xl:hidden overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">Titre / Description</TableHead>
                    <TableHead className="w-[100px]">Statut</TableHead>
                    <TableHead className="w-[120px]">Date Début</TableHead>
                    <TableHead className="w-[120px]">Auteur</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm leading-tight">{event.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {truncateText(event.description, 80)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell className="text-xs">{formatDate(event.startDate)}</TableCell>
                      <TableCell className="text-xs">{getAuthorDisplay(event)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => openViewDialog(event)}
                          >
                            <Eye className="h-3 w-3" />
                            <span className="sr-only">Voir</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-3 w-3" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          {canDeleteEvent(event) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => openDeleteDialog(event)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Vue mobile - affichée uniquement sur mobile */}
            <div className="block md:hidden">
              <div className="divide-y">
                {currentEvents.map((event) => (
                  <div key={event.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs text-muted-foreground mb-1">{event.id}</div>
                        <h3 className="font-medium text-sm leading-tight">{event.title}</h3>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{event.description}</div>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Date Début:</span>
                        <div className="font-medium">{formatDate(event.startDate)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date Fin:</span>
                        <div className="font-medium">{formatDate(event.endDate)}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Auteur:</span>
                        <div className="font-medium">{getAuthorDisplay(event)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Créé le:</span>
                        <div className="font-medium">{formatDate(event.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openViewDialog(event)}
                      >
                        <Eye className="mr-2 h-3 w-3" />
                        Voir
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      {canDeleteEvent(event) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => openDeleteDialog(event)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationContent className="flex-wrap gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage > 1) setCurrentPage(currentPage - 1)
                    }}
                    className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} text-xs sm:text-sm`}
                  />
                </PaginationItem>

                {/* Show fewer page numbers on mobile */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  const showOnMobile = page === 1 || page === totalPages || page === currentPage
                  const showOnDesktop = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)
                  
                  if (showOnDesktop) {
                    return (
                      <PaginationItem key={page} className={`${!showOnMobile ? "hidden sm:block" : ""}`}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                          className="text-xs sm:text-sm"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <PaginationItem key={page} className="hidden sm:block">
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                    }}
                    className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} text-xs sm:text-sm`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Results Info */}
        <div className="text-xs sm:text-sm text-muted-foreground text-center px-4">
          Affichage {startIndex + 1} de {Math.min(endIndex, filteredEvents.length)} sur {filteredEvents.length} événement{filteredEvents.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Dialogs */}
      {selectedEvent && (
        <>
          <EventViewDialog isOpen={isViewDialogOpen} onClose={() => setIsViewDialogOpen(false)} event={selectedEvent} />
          <DeleteEventDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            event={selectedEvent}
            onConfirm={handleDeleteEvent}
          />
        </>
      )}
    </AdminLayout>
  )
}