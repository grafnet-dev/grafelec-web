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
import { Badge } from "@/components/ui/badge"
import { Plus, Upload, X } from "lucide-react"

interface ArticleFormDialogProps {
  onArticleCreated: (article: any) => void
  trigger?: React.ReactNode
}

export function ArticleFormDialog({ onArticleCreated, trigger }: ArticleFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    keywords: [] as string[],
    url: "",
    summary: "",
    image: "",
  })
  const [currentKeyword, setCurrentKeyword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters."
    }

    if (formData.keywords.length === 0) {
      newErrors.keywords = "At least one keyword is required."
    }

    if (!formData.url) {
      newErrors.url = "URL is required."
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = "Please enter a valid URL."
      }
    }

    if (formData.image && formData.image.length > 0) {
      try {
        new URL(formData.image)
      } catch {
        newErrors.image = "Please enter a valid image URL."
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
      const newArticle = {
        id: `article-${Date.now()}`,
        title: formData.title,
        keywords: formData.keywords,
        url: formData.url,
        summary: formData.summary || null,
        image: formData.image || null,
        authorId: "current-user-id", // This would come from auth context
        authorName: "John Smith", // This would come from auth context
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onArticleCreated(newArticle)
      setIsSubmitting(false)
      setIsOpen(false)
      setFormData({
        title: "",
        keywords: [],
        url: "",
        summary: "",
        image: "",
      })
      setCurrentKeyword("")
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

  const addKeyword = () => {
    if (currentKeyword.trim() && !formData.keywords.includes(currentKeyword.trim())) {
      const newKeywords = [...formData.keywords, currentKeyword.trim()]
      updateFormData("keywords", newKeywords)
      setCurrentKeyword("")
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = formData.keywords.filter((keyword) => keyword !== keywordToRemove)
    updateFormData("keywords", newKeywords)
  }

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword()
    }
  }

  const defaultTrigger = (
    <Button className="bg-[#b60101] hover:bg-[#b60101]/90">
      <Plus className="mr-2 h-4 w-4" />
      Create Article
    </Button>
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Article</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new article. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter article title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            <p className="text-sm text-muted-foreground">A clear and descriptive title for your article.</p>
          </div>

          {/* Keywords Field */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords *</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="keywords"
                  placeholder="Enter a keyword and press Enter"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                  className={errors.keywords ? "border-red-500" : ""}
                />
                <Button type="button" onClick={addKeyword} variant="outline" size="sm">
                  Add
                </Button>
              </div>
              {formData.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {errors.keywords && <p className="text-sm text-red-500">{errors.keywords}</p>}
            <p className="text-sm text-muted-foreground">Add relevant keywords to help categorize your article.</p>
          </div>

          {/* URL Field */}
          <div className="space-y-2">
            <Label htmlFor="url">Article URL *</Label>
            <Input
              id="url"
              placeholder="https://example.com/article"
              value={formData.url}
              onChange={(e) => updateFormData("url", e.target.value)}
              className={errors.url ? "border-red-500" : ""}
            />
            {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
            <p className="text-sm text-muted-foreground">The full URL where the article can be accessed.</p>
          </div>

          {/* Summary Field */}
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Enter a brief summary of the article"
              className="min-h-[100px]"
              value={formData.summary}
              onChange={(e) => updateFormData("summary", e.target.value)}
            />
            <p className="text-sm text-muted-foreground">Optional brief description of the article content.</p>
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
            <p className="text-sm text-muted-foreground">Optional image URL for the article thumbnail.</p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="article-image-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
                </div>
                <input id="article-image-upload" type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#b60101] hover:bg-[#b60101]/90" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
