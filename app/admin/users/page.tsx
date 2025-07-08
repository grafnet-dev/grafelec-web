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
import { Eye, Pencil, Search, Trash2, UserPlus, Shield, User, MoreVertical, Calendar, Mail, Clock } from "lucide-react"
import { UserRoleDialog } from "@/components/users/user-role-dialog"
import { DeleteUserDialog } from "@/components/users/delete-user-dialog"
import { UserProfileDialog } from "@/components/users/user-profile-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const itemsPerPage = 3
  const currentUserId = "user-001" // This would come from auth context

  // Sample users data
  const [users, setUsers] = useState([
    {
      id: "user-001",
      name: "John Smith",
      email: "john.smith@company.com",
      role: "admin",
      registrationDate: "15 Mars, 2024",
      lastLogin: "19 Mai, 2025 14h:30",
      status: "active",
    },
    {
      id: "user-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "user",
      registrationDate: "2 Avril, 2024",
      lastLogin: "19 Mai, 2025 13h:15",
      status: "active",
    },
    {
      id: "user-003",
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      role: "admin",
      registrationDate: "10 Février, 2024",
      lastLogin: "19 Mai, 2025 9h:45",
      status: "active",
    },
    {
      id: "user-004",
      name: "Emily Davis",
      email: "emily.davis@company.com",
      role: "user",
      registrationDate: "1 Mai, 2024",
      lastLogin: "18 Mai, 2025 16h:20",
      status: "active",
    },
    {
      id: "user-005",
      name: "Robert Brown",
      email: "robert.brown@company.com",
      role: "user",
      registrationDate: "20 Janvier, 2024",
      lastLogin: "17 Mai, 2025 11h:30",
      status: "active",
    },
    {
      id: "user-006",
      name: "Lisa Chen",
      email: "lisa.chen@company.com",
      role: "admin",
      registrationDate: "8 Mars, 2024",
      lastLogin: "19 Mai, 2025 8h:15",
      status: "active",
    },
    {
      id: "user-007",
      name: "David Miller",
      email: "david.miller@company.com",
      role: "user",
      registrationDate: "15 Avril, 2024",
      lastLogin: "16 Mai, 2025 15:45",
      status: "active",
    },
    {
      id: "user-008",
      name: "Jessica Lee",
      email: "jessica.lee@company.com",
      role: "user",
      registrationDate: "28 Février, 2024",
      lastLogin: "19 Mai, 2025 12h:00",
      status: "active",
    },
    {
      id: "user-009",
      name: "Michael Taylor",
      email: "michael.taylor@company.com",
      role: "user",
      registrationDate: "10 Mai, 2024",
      lastLogin: "15 Mai, 2025 14h:20",
      status: "active",
    },
    {
      id: "user-010",
      name: "Amanda White",
      email: "amanda.white@company.com",
      role: "user",
      registrationDate: "25 Mars, 2024",
      lastLogin: "18 Mai, 2025 17h:10",
      status: "active",
    },
    {
      id: "user-011",
      name: "James Anderson",
      email: "james.anderson@company.com",
      role: "user",
      registrationDate: "8 Avril, 2024",
      lastLogin: "14 Mai, 2025 10h:30",
      status: "active",
    },
    {
      id: "user-012",
      name: "Maria Garcia",
      email: "maria.garcia@company.com",
      role: "user",
      registrationDate: "15 Janvier, 2024",
      lastLogin: "19 Mai, 2025 7h:45",
      status: "active",
    },
  ])

  // Filter users based on search term and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

  // Statistics
  const totalUsers = users.length
  const adminCount = users.filter((user) => user.role === "admin").length
  const userCount = users.filter((user) => user.role === "user").length

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
  }

  const openRoleDialog = (user: any) => {
    setSelectedUser(user)
    setIsRoleDialogOpen(true)
  }

  const openDeleteDialog = (user: any) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const openProfileDialog = (user: any) => {
    setSelectedUser(user)
    setIsProfileDialogOpen(true)
  }

  const canDeleteUser = (user: any) => {
    return user.id !== currentUserId // Can't delete own account
  }

  // Mobile Card Component
  const UserCard = ({ user }: { user: any }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Mail className="h-3 w-3" />
              <span className="truncate">{user.email}</span>
            </div>
          </div>
          <Badge variant={user.role === "admin" ? "destructive" : "secondary"} className="ml-2">
            {user.role === "admin" ? "Admin" : "User"}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Inscrit: {user.registrationDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Dernière connexion: {user.lastLogin}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openProfileDialog(user)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Voir
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openRoleDialog(user)}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openProfileDialog(user)}>
                <Eye className="h-4 w-4 mr-2" />
                Voir profil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openRoleDialog(user)}>
                <Pencil className="h-4 w-4 mr-2" />
                Changer le rôle
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => openDeleteDialog(user)}
                disabled={!canDeleteUser(user)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Gestion des Utilisateurs</h1>
          {/* Uncomment if needed
          <Button className="bg-[#b60101] hover:bg-[#b60101]/90 w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            <span className="sm:hidden">Ajouter</span>
            <span className="hidden sm:inline">Add New Users</span>
          </Button>
          */}
        </div>

        {/* Statistics Cards*/}

     


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Utilisateurs Total</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#b60101]">{totalUsers}</p>
                </div>
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Administrateurs</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#b60101]">{adminCount}</p>
                </div>
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card >
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Utilisateurs</p>
                  <p className="text-xl sm:text-2xl font-bold text-[#b60101]">{userCount}</p>
                </div>
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Recherche par nom ou email..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filtrer par rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="admin">Administrateurs</SelectItem>
                <SelectItem value="user">Utilisateurs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Users Display - Table for desktop, Cards for mobile */}
        <div className="block">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[150px]">Nom et prénom</TableHead>
                        <TableHead className="min-w-[200px]">E-mail</TableHead>
                        <TableHead className="min-w-[100px]">Rôle</TableHead>
                        <TableHead className="min-w-[130px]">Date d'inscription</TableHead>
                        <TableHead className="min-w-[150px]">Dernière connexion</TableHead>
                        <TableHead className="min-w-[120px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                              {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{user.registrationDate}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openProfileDialog(user)}
                                title="Voir profil"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Voir profil</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openRoleDialog(user)}
                                title="Changer le rôle"
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Changer le rôle</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => openDeleteDialog(user)}
                                disabled={!canDeleteUser(user)}
                                title={!canDeleteUser(user) ? "Impossible de supprimer votre propre compte" : "Supprimer l'utilisateur"}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Supprimer utilisateur</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tablet Table */}
          <div className="hidden md:block lg:hidden">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Inscription</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground truncate max-w-[200px]">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                              {user.role === "admin" ? "Admin" : "User"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            <div>{user.registrationDate}</div>
                            <div className="text-xs text-muted-foreground">{user.lastLogin}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openProfileDialog(user)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openRoleDialog(user)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => openDeleteDialog(user)}
                                disabled={!canDeleteUser(user)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {currentUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>

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
          Affichage {startIndex + 1} de {Math.min(endIndex, filteredUsers.length)} sur {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Dialogs */}
      {selectedUser && (
        <>
          <UserRoleDialog
            isOpen={isRoleDialogOpen}
            onClose={() => setIsRoleDialogOpen(false)}
            user={selectedUser}
            onConfirm={handleRoleChange}
          />
          <DeleteUserDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            user={selectedUser}
            onConfirm={handleDeleteUser}
          />
          <UserProfileDialog
            isOpen={isProfileDialogOpen}
            onClose={() => setIsProfileDialogOpen(false)}
            user={selectedUser}
          />
        </>
      )}
    </AdminLayout>
  )
}