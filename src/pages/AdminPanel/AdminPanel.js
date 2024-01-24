import { useContext, useEffect, useState } from 'react'
import './AdminPanel.css'
import Context from '../../contexts/ContextProvider'
import ModalDialog from '../../components/ModalDialog/ModalDialog'
import Table from '../../components/Table/Table'

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: true,
  },
  {
    field: 'image',
    headerName: 'Image',
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

const AdminPanel = () => {
  const {
    activeModal,
    currentPage,
    filters,
    filterSearch,
    filterToggle,
    getIngredients,
    ingredients,
    modalDisplay,
    modalToggle,
    setActiveModal,
    sortIngredients,
    searchText,
  } = useContext(Context)
  const [tags, setTags] = useState([])
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {
    getIngredients()
  }, [])

  useEffect(() => {
    const getTags = () => {
      const newTags = ingredients.reduce((acc, item) => {
        if (!acc.includes(item.tag)) {
          return [...acc, item.tag]
        }
        return acc
      }, tags)

      setTags(newTags)
    }
    getTags()
  }, [ingredients, tags])

  const getFilteredIngredients = () => {
    let output = ingredients
    if (filters.length > 0) {
      output = ingredients.filter((item) => {
        if (filters.includes(item.tag)) {
          return item
        }
      })
    }

    if (searchText.length > 0) {
      output = output.filter((item) =>
        item.name.toLowerCase().startsWith(searchText),
      )
    }

    return output
  }

  const handleCheckboxChange = (item) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems }

      if (newCheckedItems[item.name]) {
        delete newCheckedItems[item.name]
      } else {
        newCheckedItems[item.name] = item
        newCheckedItems[item.name].checked = true
      }

      return newCheckedItems
    })
  }

  return (
    <div className='container-fluid'>
      <div className='d-flex mx-5'>
        <div className='col-3 col-md-2 my-auto'>
          <div className='mb-4'>
            <h5>Tag</h5>
            <ul className='p-0'>
              {tags &&
                tags.map((item, index) => (
                  <li key={index} className='list-group-item'>
                    <input
                      type='checkbox'
                      value={item}
                      onChange={filterToggle}
                    />
                    <span className='mx-1'>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className='col-9 col-md-10 table-responsive'>
          <ModalDialog
            isOpen={modalDisplay}
            onClose={modalToggle}
            modalContent={activeModal}
          />
          <div className='d-flex flex-row justify-content-center mt-5'>
            <div className='col-4 mt-5 text-center'>
              <button
                className='btn btn-primary'
                type='submit'
                onClick={() => {
                  modalToggle(true)
                  setActiveModal({ type: 'addIngredient' })
                }}
              >
                Add new ingredient
              </button>
            </div>
            <div className='col-4 mt-5 text-center'>
              <div className='d-flex'>
                <input
                  className='form-control'
                  type='search'
                  placeholder='Enter ingredient name'
                  aria-label='Search'
                  onChange={filterSearch}
                />
              </div>
            </div>
            <div className='col-4 mt-5 text-center'>
              <button
                className='btn btn-primary'
                type='submit'
                onClick={() => {
                  modalToggle(true)
                  setActiveModal({
                    type: 'addSalad',
                    data: Object.values(checkedItems),
                  })
                }}
              >
                Make salad
              </button>
            </div>
          </div>
          <Table
            headCols={columns}
            data={getFilteredIngredients()}
            actions={{
              delete: 'deleteIngredient',
              edit: 'editIngredient',
            }}
            sort={sortIngredients}
            selectable={true}
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
