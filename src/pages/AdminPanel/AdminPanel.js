import {useContext, useEffect} from "react";
import {Pagination} from "../../components";
import "./AdminPanel.css";
import {PencilSquare, TrashFill} from 'react-bootstrap-icons';
import Context from "../../contexts/ContextProvider";
import ModalDialog from "../../components/ModalDialog/ModalDialog";

const columns = [
    {
        field: 'name',
        headerName: 'Name',
        sortable: true
    }, {
        field: 'image',
        headerName: 'Image'
    }, {
        field: 'calories',
        headerName: 'Calories',
        sortable: true
    }, {
        field: 'tag',
        headerName: 'Tag'
    }, {
        field: 'actions',
        headerName: 'Actions'
    }
];

const AdminPanel = () => {
    const {addIngredient, currentPage, ingredients, getIngredients, modalDisplay, modalToggle, sortIngredients, setActiveModal, activeModal, deleteIngredient} = useContext(Context);
    useEffect(() => {
        getIngredients();
    }, []);
    
    const perPage = 5;
    return (
        <div className="container">
            <div className="table-responsive">
                <ModalDialog isOpen={modalDisplay} onClose={modalToggle} modalContent={activeModal} />
                <div className="d-flex flex-row justify-content-center mt-5">
                    <div className="col-4 col-md-3 mt-5">
                        <button className="btn btn-primary" type="submit" onClick={() => { modalToggle(true); setActiveModal({type: "addIngredient"}); }}>Add new ingredient</button>
                    </div>
                    <div className="col-6 col-md-5 mt-5">
                        <div className="d-flex">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Enter tag name"
                                aria-label="Search"/>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </div>
                    </div>
                    
                </div>
                <table className="table align-middle my-5">
                    <thead>
                        <tr>
                            {columns.map((column, index) => {
                                return <th key={index}>
                                    {column.sortable ? <span role="button" onClick={() => sortIngredients(ingredients, column.headerName.toLowerCase())}>{column.headerName}</span> : <span>{column.headerName}</span>}
                                    </th>
                            })}
                        </tr>
                    </thead>
                    {ingredients && <tbody className="table-group-divider">
                        {ingredients.map((row, index) => {
                            if(perPage * (currentPage - 1) <= index && index < perPage * currentPage) {
                            return <tr key={row.id}>
                                <td>{row.name}</td>
                                <td><img className="small-img" src={row.image} alt=""/></td>
                                <td>{row.calories}</td>
                                <td>{row.tag}</td>
                                <td>
                                    <PencilSquare className="me-3 text-primary" onClick={() => {modalToggle(true); setActiveModal({type: "editIngredient", data: row});}} />
                                    <TrashFill className="text-danger" onClick={() => {modalToggle(true); setActiveModal({type: "deleteIngredient", data: row});}} />
                                </td>
                            </tr>
                            }
                        })}
                    </tbody>}
                </table>
                {ingredients.length && <Pagination
                    currentPage={currentPage}
                    totalRecords={ingredients.length}
                    perPage={perPage}/>}
            </div>
        </div>
    )
}

export default AdminPanel