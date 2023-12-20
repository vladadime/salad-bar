const AddNewIngredientForm = ({handleFormChange, handleFormSubmit}) => {

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                id="name"
                type="text"
                className="form-control"
                placeholder="Name of ingredient"
                onChange={(event) => handleFormChange(event.target)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input
                id="image"
                type="text"
                className="form-control"
                placeholder="Image url"
                onChange={(event) => handleFormChange(event.target)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="calories" className="form-label">Calories</label>
            <input
                id="calories"
                type="number"
                className="form-control"
                placeholder="Number of ingredient's calories"
                onChange={(event) => handleFormChange(event.target)}
            />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
                id="tag"
                type="text"
                className="form-control"
                onChange={(event) => handleFormChange(event.target)}
            />
        </div>
    </form>
  )
}

export default AddNewIngredientForm