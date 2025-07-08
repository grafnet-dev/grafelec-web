"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface DeleteArticleDialogProps {
  isOpen: boolean
  onClose: () => void
  article: {
    id: string
    title: string
    authorName: string
  }
  onConfirm: (articleId: string) => void
}

export function DeleteArticleDialog({ isOpen, onClose, article, onConfirm }: DeleteArticleDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      onConfirm(article.id)
      setIsDeleting(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Delete Article
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this article? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
            <div className="space-y-2">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">Article to be deleted:</p>
              <div className="text-sm text-red-700 dark:text-red-300">
                <p>
                  <strong>Title:</strong> {article.title}
                </p>
                <p>
                  <strong>Author:</strong> {article.authorName}
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              <strong>This will permanently:</strong>
            </p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Remove the article from the system</li>
              <li>Delete all associated metadata</li>
              <li>Remove it from search results</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Article"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
