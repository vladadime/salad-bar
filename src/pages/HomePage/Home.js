import Context from '../../contexts/ContextProvider'
import ModalDialog from '../../components/ModalDialog/ModalDialog'
import { useContext } from 'react'
import Table from '../../components/Table/Table'

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: true,
  },
  {
    field: 'calories',
    headerName: 'Calories',
    sortable: true,
  },
  {
    field: 'tag',
    headerName: 'Tag',
  },
]

const Home = () => {
  const {
    activeModal,
    filterSearch,
    modalDisplay,
    modalToggle,
    salads,
    setActiveModal,
    sortSalads,
  } = useContext(Context)
  const perPage = 5
  return (
    <div className='container-fluid'>
      <div className='col-9 col-md-10 table-responsive'></div>
      <ModalDialog
        isOpen={modalDisplay}
        onClose={modalToggle}
        modalContent={activeModal}
      />
      <div className='d-flex flex-row justify-content-center mt-5'>
        <div className='col-4 col-md-3 mt-5'>
          <button
            className='btn btn-primary'
            type='submit'
            onClick={() => {
              modalToggle(true)
              setActiveModal({ type: 'addSalad' })
            }}
          >
            Add new salad
          </button>
        </div>
        <div className='col-6 col-md-5 mt-5'>
          <div className='d-flex'>
            <input
              className='form-control'
              type='search'
              placeholder='Enter tag name'
              aria-label='Search'
              onChange={filterSearch}
            />
          </div>
        </div>
      </div>
      <Table
        headCols={columns}
        data={salads}
        perPage={perPage}
        actions={{
          delete: 'deleteSalad',
          edit: 'editSalad',
        }}
        sort={sortSalads}
      />
    </div>
  )
}

export default Home
