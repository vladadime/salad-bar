import {useContext, useEffect} from "react";
import {Pagination} from "../../components";
import "./AdminPanel.css";
import {ArrowUp, ArrowDown, PencilSquare, TrashFill} from 'react-bootstrap-icons';
import Context from "../../contexts/ContextProvider";

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
    const {currentPage, ingredients, getIngredients} = useContext(Context);
    useEffect(() => {
        getIngredients();
    }, []);
    
    const perPage = 5;
    return (
        <div className="container">
            <div className="table-responsive">
                <div className="d-flex flex-row justify-content-center mt-5">
                    <div className="col-md-4">
                        <div className="d-flex mt-5">
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
                                return <th key={index}>{column.headerName} {column.sortable && <ArrowDown className="ms-2"/>}</th>
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
                                <td><PencilSquare className="me-3 text-primary"/><TrashFill className="text-danger"/></td>
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