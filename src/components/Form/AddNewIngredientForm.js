import React from 'react'

const AddNewIngredientForm = () => {
  return (
    <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                type="text"
                className="form-control"
                placeholder="Name of ingredient"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Image</label>
            <input
                type="text"
                className="form-control"
                placeholder="Image url"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Calories</label>
            <input
                type="number"
                className="form-control"
                placeholder="Number of ingredient's calories"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Tag</label>
            <input
                type="text"
                className="form-control"
            />
        </div>
    </form>
  )
}

export default AddNewIngredientForm