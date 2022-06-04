import { AdminLayout, ReportDataTable } from '@components/common'
import { ClientOnly } from '@components/shared'

const Reports = () => {
  return (
    <ClientOnly>
      <ReportDataTable />
    </ClientOnly>
  )
}

Reports.Layout = AdminLayout
export default Reports
