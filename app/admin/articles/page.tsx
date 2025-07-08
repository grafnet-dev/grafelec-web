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
import { Eye, Pencil, Search, Trash2, FileText, ExternalLink } from "lucide-react"
import { ArticleFormDialog } from "@/components/articles/article-form-dialog"
import { ArticleViewDialog } from "@/components/articles/article-view-dialog"
import { DeleteArticleDialog } from "@/components/articles/delete-article-dialog"

export default function AdminArticles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const itemsPerPage = 4
  const currentUserId = "current-user-id" // This would come from auth context

  // Sample articles data
  const [articles, setArticles] = useState([
    {
      id: "article-001",
      title: "Best Practices for IT Security in 2025",
      keywords: ["security", "cybersecurity", "best practices", "IT", "2025"],
      url: "https://example.com/articles/it-security-2025",
      summary:
        "A comprehensive guide covering the latest security practices and recommendations for IT departments in 2025.",
      image: "/placeholder.svg?height=200&width=400",
      authorId: "current-user-id",
      authorName: "John Smith",
      createdAt: "2025-05-19T10:00:00Z",
      updatedAt: "2025-05-19T10:00:00Z",
    },
    {
      id: "article-002",
      title: "Cloud Migration Strategies for Small Businesses",
      keywords: ["cloud", "migration", "small business", "strategy", "AWS", "Azure"],
      url: "https://example.com/articles/cloud-migration-guide",
      summary: "Learn how small businesses can successfully migrate to cloud infrastructure with minimal disruption.",
      image: null,
      authorId: "admin-002",
      authorName: "Sarah Johnson",
      createdAt: "2025-05-15T14:30:00Z",
      updatedAt: "2025-05-18T09:15:00Z",
    },
    {
      id: "article-003",
      title: "Remote Work Technology Setup Guide",
      keywords: ["remote work", "technology", "setup", "productivity", "tools"],
      url: "https://example.com/articles/remote-work-setup",
      summary: "Essential technology setup recommendations for remote workers to maintain productivity and security.",
      image: "/placeholder.svg?height=200&width=400",
      authorId: "admin-003",
      authorName: "Mike Wilson",
      createdAt: "2025-05-10T16:45:00Z",
      updatedAt: "2025-05-17T12:20:00Z",
    },
    {
      id: "article-004",
      title: "Database Optimization Techniques",
      keywords: ["database", "optimization", "performance", "SQL", "indexing"],
      url: "https://example.com/articles/database-optimization",
      summary: "Advanced techniques for optimizing database performance and reducing query execution times.",
      image: null,
      authorId: "current-user-id",
      authorName: "John Smith",
      createdAt: "2025-05-05T11:15:00Z",
      updatedAt: "2025-05-16T13:45:00Z",
    },
    {
      id: "article-005",
      title: "Introduction to DevOps Practices",
      keywords: ["DevOps", "CI/CD", "automation", "deployment", "development"],
      url: "https://example.com/articles/devops-introduction",
      summary: "A beginner-friendly introduction to DevOps practices and how they can improve development workflows.",
      image: "/placeholder.svg?height=200&width=400",
      authorId: "admin-004",
      authorName: "Lisa Chen",
      createdAt: "2025-05-12T09:30:00Z",
      updatedAt: "2025-05-19T15:10:00Z",
    },
    {
      id: "article-006",
      title: "Network Troubleshooting Fundamentals",
      keywords: ["network", "troubleshooting", "diagnostics", "connectivity", "tools"],
      url: "https://example.com/articles/network-troubleshooting",
      summary: "Essential network troubleshooting techniques and tools for IT professionals.",
      image: null,
      authorId: "admin-005",
      authorName: "David Miller",
      createdAt: "2025-05-08T14:20:00Z",
      updatedAt: "2025-05-15T10:30:00Z",
    },
  ])

  // Filter and sort articles
  const filteredArticles = articles
    .filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "title":
          return a.title.localeCompare(b.title)
        case "author":
          return a.authorName.localeCompare(b.authorName)
        default:
          return 0
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentArticles = filteredArticles.slice(startIndex, endIndex)

  // Statistics
  const totalArticles = articles.length
  const myArticles = articles.filter((article) => article.authorId === currentUserId).length

  const handleArticleCreated = (newArticle: any) => {
    setArticles((prevArticles) => [newArticle, ...prevArticles])
  }

  const handleDeleteArticle = (articleId: string) => {
    setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId))
  }

  const openViewDialog = (article: any) => {
    setSelectedArticle(article)
    setIsViewDialogOpen(true)
  }

  const openDeleteDialog = (article: any) => {
    setSelectedArticle(article)
    setIsDeleteDialogOpen(true)
  }

  const canDeleteArticle = (article: any) => {
    return article.authorId === currentUserId
  }

  const getAuthorDisplay = (article: any) => {
    return article.authorId === currentUserId ? "Vous" : article.authorName
  }

  const truncateText = (text: string, maxLength = 50) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Reset pagination when filters change
  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  return (
    <AdminLayout>
      <div className="space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Gestion des Articles</h1>
          <ArticleFormDialog onArticleCreated={handleArticleCreated} />
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
                  <p className="text-2xl font-bold text-[#b60101]">{totalArticles}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mes Articles</p>
                  <p className="text-2xl font-bold text-[#b60101]">{myArticles}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
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
              placeholder="Rechercher articles par titre ou mots-clés..."
              className="pl-8 w-full md:w-[350px]"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent</SelectItem>
                <SelectItem value="oldest">Plus ancien</SelectItem>
                <SelectItem value="title">Titre A-Z</SelectItem>
                <SelectItem value="author">Auteur A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Articles Table */}
        <Card>
          <CardContent className="p-0">
            {/* Vue desktop - cachée sur mobile et tablette */}
            <div className="hidden xl:block overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[250px]">Titre</TableHead>
                    <TableHead className="min-w-[200px]">Mots-clés</TableHead>
                    <TableHead className="w-[120px]">URL</TableHead>
                    <TableHead className="w-[120px]">Auteur</TableHead>
                    <TableHead className="w-[120px]">Créé le</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        <div className="truncate" title={article.title}>
                          {article.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {article.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                          {article.keywords.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{article.keywords.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                            title={article.url}
                          >
                            <ExternalLink className="h-3 w-3" />
                            <span className="text-xs">Link</span>
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="text-sm">{getAuthorDisplay(article)}</TableCell>
                      <TableCell className="text-sm">{formatDate(article.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openViewDialog(article)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Voir</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          {canDeleteArticle(article) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => openDeleteDialog(article)}
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
                    <TableHead className="min-w-[200px]">Titre / Mots-clés</TableHead>
                    <TableHead className="w-[100px]">URL</TableHead>
                    <TableHead className="w-[120px]">Auteur</TableHead>
                    <TableHead className="w-[120px]">Créé le</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm leading-tight">{article.title}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {article.keywords.slice(0, 2).map((keyword, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                            {article.keywords.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{article.keywords.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell className="text-xs">{getAuthorDisplay(article)}</TableCell>
                      <TableCell className="text-xs">{formatDate(article.createdAt)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => openViewDialog(article)}
                          >
                            <Eye className="h-3 w-3" />
                            <span className="sr-only">Voir</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Pencil className="h-3 w-3" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          {canDeleteArticle(article) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => openDeleteDialog(article)}
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
                {currentArticles.map((article) => (
                  <div key={article.id} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs text-muted-foreground mb-1">{article.id}</div>
                        <h3 className="font-medium text-sm leading-tight">{article.title}</h3>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{article.summary}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {article.keywords.slice(0, 4).map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                      {article.keywords.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.keywords.length - 4}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Auteur:</span>
                        <div className="font-medium">{getAuthorDisplay(article)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Créé le:</span>
                        <div className="font-medium">{formatDate(article.createdAt)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openViewDialog(article)}
                      >
                        <Eye className="mr-2 h-3 w-3" />
                        Voir
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ouvrir le lien"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Modifier</span>
                      </Button>
                      {canDeleteArticle(article) && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={() => openDeleteDialog(article)}
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
          Affichage {startIndex + 1} de {Math.min(endIndex, filteredArticles.length)} sur {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* Dialogs */}
      {selectedArticle && (
        <>
          <ArticleViewDialog
            isOpen={isViewDialogOpen}
            onClose={() => setIsViewDialogOpen(false)}
            article={selectedArticle}
          />
          <DeleteArticleDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            article={selectedArticle}
            onConfirm={handleDeleteArticle}
          />
        </>
      )}
    </AdminLayout>
  )
}