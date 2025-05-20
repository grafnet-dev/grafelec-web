import { AdminLayout } from "@/components/layout/admin-layout"
import { TicketDetail } from "@/components/tickets/ticket-detail"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function AdminTicketDetailPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/tickets">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Ticket Details</h1>
        </div>

        <TicketDetail isAdmin={true} />
      </div>
    </AdminLayout>
  )
}
