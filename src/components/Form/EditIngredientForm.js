import React from 'react'

const EditIngredientForm = ({ingredient}) => {
  return (
    <form>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
                type="text"
                className="form-control"
                defaultValue={ingredient.name}
                placeholder="Name of ingredient"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Image</label>
            <input
                type="text"
                className="form-control"
                defaultValue={ingredient.image}
                placeholder="Image url"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Calories</label>
            <input
                type="number"
                className="form-control"
                defaultValue={ingredient.calories}
                placeholder="Number of ingredient's calories"
            />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Tag</label>
            <input
                type="text"
                className="form-control"
                defaultValue={ingredient.tag}
            />
        </div>
    </form>
  )
}

export default EditIngredientForm