import { AdminLayout, StatsCards } from '@components/common'
import { ClientOnly } from '@components/shared'

const Dashboard = () => {
  return (
    <ClientOnly>
      <StatsCards />
    </ClientOnly>
  )
}

Dashboard.Layout = AdminLayout
export default Dashboard
