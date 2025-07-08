

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { z } from 'zod'

const createCommentSchema = z.object({
  content: z.string().min(5, "Le commentaire doit contenir au moins 5 caractères."),
  isInternal: z.boolean().default(false)
})
// app/api/tickets/[id]/comments/[commentId]/route.ts
// Pour modifier ou supprimer un commentaire spécifique

// PUT - Modifier un commentaire
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id: ticketId, commentId } = params
    const body = await request.json()
    
    // Valider les données
    const validatedData = createCommentSchema.parse(body)

    // Vérifier que le commentaire existe
    const existingComment = await prisma.ticketComment.findUnique({
      where: { id: commentId },
      include: {
        ticket: {
          select: {
            id: true,
            authorId: true
          }
        }
      }
    })

    if (!existingComment || existingComment.ticketId !== ticketId) {
      return NextResponse.json(
        { error: 'Commentaire non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions
    const isAdmin = session.user.role === 'ADMIN'
    const isCommentAuthor = existingComment.authorId === session.user.id

    if (!isAdmin && !isCommentAuthor) {
      return NextResponse.json(
        { error: 'Seuls les admins et l\'auteur peuvent modifier ce commentaire' },
        { status: 403 }
      )
    }

    // Seuls les admins peuvent modifier le caractère interne
    if (validatedData.isInternal && !isAdmin) {
      return NextResponse.json(
        { error: 'Seuls les admins peuvent créer des commentaires internes' },
        { status: 403 }
      )
    }

    // Mettre à jour le commentaire
    const updatedComment = await prisma.ticketComment.update({
      where: { id: commentId },
      data: {
        content: validatedData.content,
        isInternal: validatedData.isInternal,
        updatedAt: new Date()
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Commentaire mis à jour avec succès',
      comment: updatedComment
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du commentaire:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Données invalides',
          details: error.errors 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un commentaire
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; commentId: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id: ticketId, commentId } = params
    
    // Vérifier que le commentaire existe
    const existingComment = await prisma.ticketComment.findUnique({
      where: { id: commentId },
      include: {
        ticket: {
          select: {
            id: true,
            authorId: true
          }
        }
      }
    })

    if (!existingComment || existingComment.ticketId !== ticketId) {
      return NextResponse.json(
        { error: 'Commentaire non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions
    const isAdmin = session.user.role === 'ADMIN'
    const isCommentAuthor = existingComment.authorId === session.user.id

    if (!isAdmin && !isCommentAuthor) {
      return NextResponse.json(
        { error: 'Seuls les admins et l\'auteur peuvent supprimer ce commentaire' },
        { status: 403 }
      )
    }

    // Supprimer le commentaire
    await prisma.ticketComment.delete({
      where: { id: commentId }
    })

    return NextResponse.json({
      message: 'Commentaire supprimé avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error)
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}