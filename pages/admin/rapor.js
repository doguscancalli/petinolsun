import { AdminLayout, ReportDataTable } from '@components/common'
import { ClientOnly } from '@components/shared'

const AdminReports = () => {
  return (
    <ClientOnly>
      <ReportDataTable />
    </ClientOnly>
  )
}

AdminReports.Layout = AdminLayout
export default AdminReports
