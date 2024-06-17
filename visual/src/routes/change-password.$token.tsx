import { createFileRoute } from '@tanstack/react-router'
import { ChangePassword } from '../pages/auth/ChangePassword'

export const Route = createFileRoute('/change-password/$token')({
  component: () => <ChangePassword />
})