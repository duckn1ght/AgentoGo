import { createFileRoute } from '@tanstack/react-router'
import { EditPassword } from '../../../pages/profile/edit/EditPassword'

export const Route = createFileRoute('/profile/edit/password')({
  component: () => <EditPassword />
})