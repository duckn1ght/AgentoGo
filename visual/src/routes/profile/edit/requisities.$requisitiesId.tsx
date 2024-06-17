import { createFileRoute } from '@tanstack/react-router'
import { EditRequisities } from '../../../pages/profile/edit/EditRequisities'

export const Route = createFileRoute('/profile/edit/requisities/$requisitiesId')({
  component: () => <EditRequisities />
})