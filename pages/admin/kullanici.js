import { ClientOnly } from '@components/shared'
import { AdminLayout, UserDataTable } from '@components/common'

const AdminUsers = () => {
  return (
    <ClientOnly>
      <UserDataTable />
    </ClientOnly>
  )
}

AdminUsers.Layout = AdminLayout
export default AdminUsers
