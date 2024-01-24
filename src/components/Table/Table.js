import React, { useContext } from 'react'
import Context from '../../contexts/ContextProvider'
import { PencilSquare, TrashFill } from 'react-bootstrap-icons'
import Pagination from '../Pagination/Pagination'

const Table = ({ actions, data, headCols, sort, selectable, checkedItems, handleCheckboxChange }) => {
  const { currentPage, modalToggle, setActiveModal } = useContext(Context)
  const perPage = 5

  return (
    <div>
      <table className='table align-middle my-5'>
        <thead>
          <tr>
            {selectable && <th></th>}
            {headCols.map((column, index) => (
              <th key={index}>
                {column.sortable && sort ? (
                  <span
                    role='button'
                    onClick={() =>
                      sort && sort(data, column.headerName.toLowerCase())
                    }
                  >
                    {column.headerName}
                  </span>
                ) : (
                  <span>{column.headerName}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {data && (
          <tbody className='table-group-divider'>
            {data.map((row, index) => {
              if (
                perPage * (currentPage - 1) <= index &&
                index < perPage * currentPage
              ) {
                return (
                  <tr key={row.id}>
                    {selectable && (
                      <td>
                        <input type='checkbox' checked={checkedItems[row.name] && checkedItems[row.name].checked ? true: false} value={row.name} onChange={(e) => handleCheckboxChange(row)} />
                      </td>
                    )}
                    <td>{row.name}</td>
                    <td>
                      <img className='small-img' src={row.image} alt='' />
                    </td>
                    <td>{row.calories}</td>
                    <td>{row.tag}</td>
                    {actions && Object.keys(actions).length && (
                      <td>
                        {actions.edit && (
                          <PencilSquare
                            className='me-3 text-primary'
                            onClick={() => {
                              modalToggle(true)
                              setActiveModal({ type: actions.edit, data: row })
                            }}
                          />
                        )}
                        {actions.delete && (
                          <TrashFill
                            className='text-danger'
                            onClick={() => {
                              modalToggle(true)
                              setActiveModal({
                                type: actions.delete,
                                data: row,
                              })
                            }}
                          />
                        )}
                      </td>
                    )}
                  </tr>
                )
              }
            })}
          </tbody>
        )}
      </table>
      {data.length && (
        <Pagination
          currentPage={currentPage}
          totalRecords={data.length}
          perPage={perPage}
        />
      )}
    </div>
  )
}

export default Table
