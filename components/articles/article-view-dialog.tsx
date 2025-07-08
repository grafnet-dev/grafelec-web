"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, User, Clock } from "lucide-react"

interface ArticleViewDialogProps {
  isOpen: boolean
  onClose: () => void
  article: {
    id: string
    title: string
    keywords: string[]
    url: string
    summary?: string | null
    image?: string | null
    authorName: string
    createdAt: string
    updatedAt: string
  }
}

export function ArticleViewDialog({ isOpen, onClose, article }: ArticleViewDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{article.title}</DialogTitle>
          <DialogDescription>Article details and information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Author and URL */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Created by {article.authorName}</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                View Article
              </a>
            </Button>
          </div>

          {/* Article Image */}
          {article.image && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Article Image</h3>
              <div className="rounded-lg border overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                  }}
                />
              </div>
            </div>
          )}

          {/* Keywords */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Summary */}
          {article.summary && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Summary</h3>
              <div className="rounded-md border p-4 bg-muted/40">
                <p className="text-sm whitespace-pre-wrap">{article.summary}</p>
              </div>
            </div>
          )}

          {/* URL */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Article URL</h3>
            <div className="rounded-md border p-3 bg-muted/40">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 break-all"
              >
                {article.url}
              </a>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Created: </span>
                <span>{formatDate(article.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">Updated: </span>
                <span>{formatDate(article.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button asChild className="bg-[#b60101] hover:bg-[#b60101]/90">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Article
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
