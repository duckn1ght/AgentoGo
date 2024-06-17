import { createFileRoute } from '@tanstack/react-router'
import { EditProfile } from '../../../pages/profile/edit/EditProfile'

export const Route = createFileRoute('/profile/edit/')({
  component: () => <EditProfile />
})