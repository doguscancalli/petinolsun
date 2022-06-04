import { AdminLayout, StatsCards } from '@components/common'
import { ClientOnly } from '@components/shared'

const AdminDashboard = () => {
  return (
    <ClientOnly>
      <StatsCards />
    </ClientOnly>
  )
}

AdminDashboard.Layout = AdminLayout
export default AdminDashboard
