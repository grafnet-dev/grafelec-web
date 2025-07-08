// app/api/tickets/[id]/comments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { z } from 'zod'

const createCommentSchema = z.object({
  content: z.string().min(5, "Le commentaire doit contenir au moins 5 caractères."),
  isInternal: z.boolean().default(false)
})

// GET - Récupérer tous les commentaires d'un ticket
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const ticketId = params.id
    
    // Vérifier que le ticket existe
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      select: {
        id: true,
        authorId: true
      }
    })

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions
    const isAdmin = session.user.role === 'ADMIN'
    const isAuthor = ticket.authorId === session.user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      )
    }

    // Récupérer les commentaires
    // Les utilisateurs normaux ne voient pas les commentaires internes
    const comments = await prisma.ticketComment.findMany({
      where: {
        ticketId: ticketId,
        ...(isAdmin ? {} : { isInternal: false }) // Filtrer les commentaires internes pour les non-admins
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
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return NextResponse.json({
      comments,
      count: comments.length
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des commentaires:', error)
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

// POST - Ajouter un commentaire à un ticket
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
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

    const ticketId = params.id
    const body = await request.json()
    
    // Valider les données
    const validatedData = createCommentSchema.parse(body)

    // Vérifier que le ticket existe
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      select: {
        id: true,
        authorId: true
      }
    })

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions
    const isAdmin = session.user.role === 'ADMIN'
    const isAuthor = ticket.authorId === session.user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      )
    }

    // Seuls les admins peuvent créer des commentaires internes
    if (validatedData.isInternal && !isAdmin) {
      return NextResponse.json(
        { error: 'Seuls les admins peuvent créer des commentaires internes' },
        { status: 403 }
      )
    }

    // Créer le commentaire
    const comment = await prisma.ticketComment.create({
      data: {
        content: validatedData.content,
        isInternal: validatedData.isInternal,
        ticketId: ticketId,
        authorId: session.user.id
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
      message: 'Commentaire ajouté avec succès',
      comment
    }, { status: 201 })

  } catch (error) {
    console.error('Erreur lors de la création du commentaire:', error)
    
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