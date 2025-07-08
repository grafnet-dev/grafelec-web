// app/api/tickets/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // Ajustez le chemin selon votre structure
import { auth } from '@/lib/auth' // Votre instance better-auth
import { headers } from 'next/headers'
import { z } from 'zod'

const createTicketSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères."),
  category: z.enum(['HARDWARE', 'SOFTWARE', 'NETWORK', 'ACCOUNT', 'OTHER']),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères."),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  attachments: z.array(z.string()).optional()
})

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification avec better-auth
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Parser le body
    const body = await request.json()
    
    // Valider les données
    const validatedData = createTicketSchema.parse(body)

    // Créer le ticket en base
    const ticket = await prisma.ticket.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        urgency: validatedData.urgency,
        attachments: validatedData.attachments || [],
        authorId: session.user.id,
        status: 'OPEN'
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

    return NextResponse.json(
      { 
        message: 'Ticket créé avec succès',
        ticket 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur lors de la création du ticket:', error)
    
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


// app/api/tickets/route.ts - Ajoutez cette fonction GET
export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification avec better-auth
    const session = await auth.api.getSession({
      headers: await headers()
    })
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Récupérer les tickets selon le rôle
    const isAdmin = session.user.role === 'ADMIN'
    
    const tickets = await prisma.ticket.findMany({
      where: isAdmin ? {} : { authorId: session.user.id }, // Admin voit tout, user voit ses tickets
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      tickets,
      count: tickets.length
    })

  } catch (error) {
    console.error('Erreur lors de la récupération des tickets:', error)
    
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}