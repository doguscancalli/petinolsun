import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '@graphql/queries'
import { useEffect, useState, useMemo, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { sendToast } from '@features/ui/uiSlice'
import { useDispatch } from 'react-redux'
import { Button, Modal } from '@components/ui'
import { DELETE_USER } from '@graphql/mutations'
import UpdateForm from './UpdateForm'

const ExpandedComponent = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const UserDataTable = () => {
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  const [toggleCleared, setToggleCleared] = useState(false)
  const [filter, setFilter] = useState('')
  const [toggleModal, setToggleModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  const dispatch = useDispatch()

  const {
    data: getAllUsersData,
    loading: getAllUsersLoading,
    refetch,
  } = useQuery(GET_ALL_USERS, {
    variables: {
      input: {
        limit: perPage.toString(),
        ...filter,
      },
    },
    fetchPolicy: 'no-cache',
    onError: (error) => {
      dispatch(
        sendToast({
          type: 'error',
          message: error.message,
        })
      )
    },
  })

  useEffect(() => {
    if (getAllUsersData?.users) {
      setTotalRows(getAllUsersData.users.totalDocs)
    }
  }, [getAllUsersData])

  const [deleteUser, { data: deleteUserData, loading: deleteUserLoading }] =
    useMutation(DELETE_USER, {
      onError: (error) => {
        dispatch(
          sendToast({
            type: 'error',
            message: error.message,
          })
        )
      },
    })

  useEffect(() => {
    if (deleteUserData?.deleteUser) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Kullanıcı başarıyla silindi',
        })
      )
    }
  }, [deleteUserData])

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'İsim',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Eposta',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Admin',
      selector: (row) => row.isAdmin,
      sortable: true,
      format: (row) => (row.isAdmin ? 'Evet' : 'Hayır'),
    },
    {
      name: 'Engellenmiş',
      selector: (row) => row.isBanned,
      sortable: true,
      format: (row) => (row.isBanned ? 'Evet' : 'Hayır'),
    },
    {
      name: 'Oluşturulma Tarihi',
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) => moment(row.createdAt).format('lll'),
    },

    {
      name: 'Güncelleme Tarihi',
      selector: (row) => row.updatedAt,
      sortable: true,
      format: (row) => moment(row.updatedAt).format('lll'),
    },
  ]

  const handlePageChange = (page) => {
    setFilter({ ...filter, page: page.toString() })
    refetch()
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage)
  }

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows)
  }, [])

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `${selectedRows.map(
            (r) => r.email
          )} Kullanıcısını silmek istediğinizden emin misiniz?`
        )
      ) {
        setToggleCleared(!toggleCleared)
        deleteUser({ variables: { id: selectedRows[0].id } })
        refetch()
      }
    }

    const handleUpdate = () => {
      selectedRows.map((r) => setSelectedUser(r))
      setToggleModal(true)
    }

    return (
      <div className='flex gap-1'>
        <Button
          size='small'
          key='update'
          onClick={handleUpdate}
          loading={deleteUserLoading}
        >
          Güncelle
        </Button>
        <Button
          size='small'
          key='delete'
          onClick={handleDelete}
          loading={deleteUserLoading}
        >
          Sil
        </Button>
      </div>
    )
  }, [getAllUsersData, selectedRows, toggleCleared])

  return (
    <>
      {toggleModal && (
        <Modal>
          <UpdateForm
            setToggleModal={setToggleModal}
            data={selectedUser}
            refetch={refetch}
          />
        </Modal>
      )}
      <DataTable
        title='Kullanıcılar'
        columns={columns}
        data={getAllUsersData?.users?.docs}
        progressPending={getAllUsersLoading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
        selectableRowsSingle
        onSelectedRowsChange={handleRowSelected}
        contextActions={contextActions}
        clearSelectedRows={toggleCleared}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </>
  )
}

export default UserDataTable
