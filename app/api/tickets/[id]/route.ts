// app/api/tickets/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { z } from 'zod'

const updateTicketSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères.").optional(),
  category: z.enum(['HARDWARE', 'SOFTWARE', 'NETWORK', 'ACCOUNT', 'OTHER']).optional(),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères.").optional(),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
  assigneeId: z.string().nullable().optional(),
  attachments: z.array(z.string()).optional()
})

// PUT - Modifier complètement un ticket
export async function PUT(
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
    const validatedData = updateTicketSchema.parse(body)

    // Vérifier que le ticket existe
    const existingTicket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    })

    if (!existingTicket) {
      return NextResponse.json(
        { error: 'Ticket non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions
    const isAdmin = session.user.role === 'ADMIN'
    const isAuthor = existingTicket.authorId === session.user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      )
    }

    // Les utilisateurs normaux ne peuvent pas modifier le statut ou l'assignation
    if (!isAdmin && (validatedData.status || validatedData.assigneeId !== undefined)) {
      return NextResponse.json(
        { error: 'Seuls les admins peuvent modifier le statut et l\'assignation' },
        { status: 403 }
      )
    }

    // Si on assigne à quelqu'un, vérifier que c'est un admin
    if (validatedData.assigneeId) {
      const assignee = await prisma.user.findUnique({
        where: { id: validatedData.assigneeId }
      })
      
      if (!assignee || assignee.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'L\'assigné doit être un administrateur' },
          { status: 400 }
        )
      }
    }

    // Mettre à jour le ticket
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ...validatedData,
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
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Ticket mis à jour avec succès',
      ticket: updatedTicket
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du ticket:', error)
    
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

// PATCH - Modifier partiellement un ticket (statut, assignation, etc.)
export async function PATCH(
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
    const validatedData = updateTicketSchema.parse(body)

    // Vérifier que le ticket existe
    const existingTicket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    })

    if (!existingTicket) {
      return NextResponse.json(
        { error: 'Ticket non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions
    const isAdmin = session.user.role === 'ADMIN'
    const isAuthor = existingTicket.authorId === session.user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json(
        { error: 'Accès refusé' },
        { status: 403 }
      )
    }

    // Les utilisateurs normaux ne peuvent pas modifier le statut ou l'assignation
    if (!isAdmin && (validatedData.status || validatedData.assigneeId !== undefined)) {
      return NextResponse.json(
        { error: 'Seuls les admins peuvent modifier le statut et l\'assignation' },
        { status: 403 }
      )
    }

    // Si on assigne à quelqu'un, vérifier que c'est un admin
    if (validatedData.assigneeId) {
      const assignee = await prisma.user.findUnique({
        where: { id: validatedData.assigneeId }
      })
      
      if (!assignee || assignee.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'L\'assigné doit être un administrateur' },
          { status: 400 }
        )
      }
    }

    // Mettre à jour uniquement les champs fournis
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ...validatedData,
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
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Ticket mis à jour avec succès',
      ticket: updatedTicket
    })

  } catch (error) {
    console.error('Erreur lors de la mise à jour du ticket:', error)
    
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

// GET - Récupérer un ticket spécifique
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
    
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        comments: {
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
        }
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

    return NextResponse.json({ ticket })

  } catch (error) {
    console.error('Erreur lors de la récupération du ticket:', error)
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}

// DELETE - Supprimer un ticket
export async function DELETE(
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
    const existingTicket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    })

    if (!existingTicket) {
      return NextResponse.json(
        { error: 'Ticket non trouvé' },
        { status: 404 }
      )
    }

    // Vérifier les permissions (seuls les admins peuvent supprimer)
    const isAdmin = session.user.role === 'ADMIN'

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Seuls les admins peuvent supprimer des tickets' },
        { status: 403 }
      )
    }

    // Supprimer le ticket (les commentaires seront supprimés automatiquement grâce à onDelete: Cascade)
    await prisma.ticket.delete({
      where: { id: ticketId }
    })

    return NextResponse.json({
      message: 'Ticket supprimé avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la suppression du ticket:', error)
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}
