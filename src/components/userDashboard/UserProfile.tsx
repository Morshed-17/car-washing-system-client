import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Phone, Mail } from 'lucide-react'
import { UpdateUserModal } from "@/components/userDashboard/UpdateUserModal"

interface UserProfileProps {
  user: {
    name: string
    email: string
    phone: string
    address: string
  }
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
          />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            {user.name} <UpdateUserModal />
          </h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{user.address}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

