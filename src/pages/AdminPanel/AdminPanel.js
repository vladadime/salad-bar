import {useContext, useEffect, useState} from "react";
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
        searchText
    } = useContext(Context);
    const [tags,
        setTags] = useState([]);
    useEffect(() => {
        getIngredients();
    }, []);

    useEffect(() => {
        const getTags = () => {
            const newTags = ingredients.reduce((acc, item) => {
                if (!acc.includes(item.tag)) {
                    return [
                        ...acc,
                        item.tag
                    ];
                }
                return acc;
            }, tags);

            setTags(newTags);
        };
        getTags();
    }, [ingredients, tags]);

    const getFilteredIngredients = () => {
        let output = ingredients;
        if (filters.length > 0) {
            output = ingredients.filter((item) => {
                if (filters.includes(item.tag)) {
                    return item;
                }
            });
        }

        if (searchText.length > 0) {
            output = output.filter((item) => item.name.toLowerCase().includes(searchText));
        }

        return output;
    };

    const perPage = 5;
    return (
        <div className="container-fluid">
            <div className="d-flex mx-5">
                <div className="col-3 col-md-2 my-auto">
                    <div className="mb-4">
                        <h5>Tag</h5>
                        <ul className="p-0">
                            {tags && tags.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <input type="checkbox" value={item} onChange={filterToggle}/>
                                    <span className="mx-1">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-9 col-md-10 table-responsive">
                    <ModalDialog
                        isOpen={modalDisplay}
                        onClose={modalToggle}
                        modalContent={activeModal}/>
                    <div className="d-flex flex-row justify-content-center mt-5">
                        <div className="col-4 col-md-3 mt-5">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                onClick={() => {
                                modalToggle(true);
                                setActiveModal({type: "addIngredient"});
                            }}>Add new ingredient</button>
                        </div>
                        <div className="col-6 col-md-5 mt-5">
                            <div className="d-flex">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Enter tag name"
                                    aria-label="Search"
                                    onChange={filterSearch}/>
                            </div>
                        </div>

                    </div>
                    <table className="table align-middle my-5">
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index}>
                                        {column.sortable
                                            ? <span
                                                    role="button"
                                                    onClick={() => sortIngredients(ingredients, column.headerName.toLowerCase())}>{column.headerName}</span>
                                            : <span>{column.headerName}</span>}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {getFilteredIngredients() && <tbody className="table-group-divider">
                            {getFilteredIngredients().map((row, index) => {
                                if (perPage * (currentPage - 1) <= index && index < perPage * currentPage) {
                                    return <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td><img className="small-img" src={row.image} alt=""/></td>
                                        <td>{row.calories}</td>
                                        <td>{row.tag}</td>
                                        <td>
                                            <PencilSquare
                                                className="me-3 text-primary"
                                                onClick={() => {
                                                modalToggle(true);
                                                setActiveModal({type: "editIngredient", data: row});
                                            }}/>
                                            <TrashFill
                                                className="text-danger"
                                                onClick={() => {
                                                modalToggle(true);
                                                setActiveModal({type: "deleteIngredient", data: row});
                                            }}/>
                                        </td>
                                    </tr>
                                }
                            })}
                        </tbody>}
                    </table>
                    {getFilteredIngredients().length && <Pagination
                        currentPage={currentPage}
                        totalRecords={getFilteredIngredients().length}
                        perPage={perPage}/>}
                </div>
            </div>
        </div>
    )
}

export default AdminPanel