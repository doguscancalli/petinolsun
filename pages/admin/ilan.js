import { AdminLayout, PetDataTable } from '@components/common'
import { ClientOnly } from '@components/shared'

const AdminPetPosts = () => {
  return (
    <ClientOnly>
      <PetDataTable />
    </ClientOnly>
  )
}

AdminPetPosts.Layout = AdminLayout
export default AdminPetPosts
