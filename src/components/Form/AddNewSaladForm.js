const AddNewSaladForm = ({
  ingredients,
  handleFormChange,
  handleFormSubmit,
}) => {

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <div className='mb-3'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          id='name'
          type='text'
          className='form-control'
          placeholder='Name of salad'
          onChange={(event) => handleFormChange(event.target)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='tag' className='form-label'>
          Tag
        </label>
        <input
          id='tag'
          type='text'
          className='form-control'
          placeholder='Tag for salad'
          onChange={(event) => handleFormChange(event.target)}
        />
      </div>
      {ingredients.length && (
        <div>
          <ul className='list-group'>
            {ingredients.map((item) => (
              <li className='list-group-item' key={item.id}>
                <span className='d-inline-block col-5'>{item.name}</span>
                <img
                  className='mx-2'
                  width='30'
                  height='24'
                  src={item.image}
                  alt={item.name}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  )
}

export default AddNewSaladForm
