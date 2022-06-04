import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_REPORTS } from '@graphql/queries'
import { useEffect, useState, useMemo, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { sendToast } from '@features/ui/uiSlice'
import { useDispatch } from 'react-redux'
import { Button } from '@components/ui'
import { DELETE_REPORT } from '@graphql/mutations'

const ExpandedComponent = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

const ReportDataTable = () => {
  const [totalRows, setTotalRows] = useState(0)
  const [perPage, setPerPage] = useState(10)
  const [selectedRows, setSelectedRows] = useState([])
  const [toggleCleared, setToggleCleared] = useState(false)
  const [filter, setFilter] = useState('')

  const dispatch = useDispatch()

  const {
    data: getAllReportsData,
    loading: getAllReportsLoading,
    error: getAllReportsError,
    refetch,
  } = useQuery(GET_ALL_REPORTS, {
    variables: {
      input: {
        limit: perPage.toString(),
        ...filter,
      },
    },
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (getAllReportsData) {
      setTotalRows(getAllReportsData.reports.totalDocs)
    }
  }, [getAllReportsData])

  const [
    deleteReport,
    {
      data: deleteReportData,
      loading: deleteReportLoading,
      error: deleteReportError,
    },
  ] = useMutation(DELETE_REPORT, {
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (deleteReportData?.deleteReport) {
      dispatch(
        sendToast({
          type: 'success',
          message: 'Rapor başarıyla silindi',
        })
      )
    }
  }, [deleteReportData])

  useEffect(() => {
    let error
    if (getAllReportsError) error = getAllReportsError
    if (deleteReportError) error = getAllUsersError
    if (error) {
      error.graphQLErrors.forEach((error) =>
        dispatch(
          sendToast({
            type: 'error',
            message: error?.extensions?.originalError?.message,
          })
        )
      )
    }
  }, [getAllReportsError, deleteReportError])

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Rapor Eden',
      selector: (row) => row.reportedBy.email,
      sortable: true,
    },
    {
      name: 'İlan/Gönderi',
      selector: (row) =>
        row.reportedTopicId.name
          ? row.reportedTopicId.name
          : row.reportedTopicId.title,
      sortable: true,
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
      if (window.confirm(`Raporu silmek istediğinizden emin misiniz?`)) {
        setToggleCleared(!toggleCleared)
        deleteReport({ variables: { id: selectedRows[0].id } })
        refetch()
      }
    }

    const handleSlug = () => {
      selectedRows.map((r) => {
        const type = r.reportedTopic
        const url = type === 'PetPost' ? '/ilan' : '/gonderi'
        const slug = r.reportedTopicId.slug
        window.open(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${url}/${slug}`,
          '_blank'
        )
      })
    }

    return (
      <div className='flex gap-1'>
        <Button size='small' key='slug' onClick={handleSlug}>
          İlana/Gönderiye git
        </Button>
        <Button
          size='small'
          key='delete'
          onClick={handleDelete}
          loading={deleteReportLoading}
        >
          Sil
        </Button>
      </div>
    )
  }, [getAllReportsData, selectedRows, toggleCleared])

  return (
    <>
      <DataTable
        title='Raporlar'
        columns={columns}
        data={getAllReportsData?.reports?.docs}
        progressPending={getAllReportsLoading}
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

export default ReportDataTable
