import {useState} from "react";
import {Pagination} from "../../components";
import "./AdminPanel.css";
import {ArrowUp, ArrowDown, PencilSquare, TrashFill} from 'react-bootstrap-icons';

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

const rows = [
    {
        id: 1,
        name: "Tomato",
        image: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-56196,resizemode-75,msi' +
                'd-95423731/magazines/panache/5-reasons-why-tomatoes-should-be-your-favourite-fru' +
                'it-this-year/tomatoes-canva.jpg',
        calories: 18,
        tag: "vegan",
        edit: "Edit",
        delete: "Delete"
    }, {
        id: 2,
        name: "Carrot",
        image: 'https://seed2plant.in/cdn/shop/products/carrotseeds.jpg?v=1604032858',
        calories: 41,
        tag: "vegan"
    }, {
        id: 3,
        name: "Lettuce",
        image: 'https://cdn.britannica.com/77/170677-050-F7333D51/lettuce.jpg',
        calories: 13,
        tag: "vegan"
    }, {
        id: 4,
        name: "Cucumber",
        image: 'https://www.jiomart.com/images/product/original/590003548/cucumber-500-g-product' +
                '-images-o590003548-p590003548-0-202203152002.jpg?im=Resize=(420,420)',
        calories: 12,
        tag: "vegan"
    }, {
        id: 5,
        name: "Onion",
        image: 'https://chefsmandala.com/wp-content/uploads/2018/03/Onion-Red.jpg',
        calories: 40,
        tag: "vegan"
    }, {
        id: 6,
        name: "Cabbage",
        image: 'https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Cabbage-1024x536.png',
        calories: 25,
        tag: "vegan"
    }
];
const AdminPanel = () => {
    const [currentPage,
        setCurrentPage] = useState(1);
    const [totalRecords,
        setTotalRecords] = useState(rows.length);
    
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
                    <tbody className="table-group-divider">
                        {rows.map((row, index) => {
                            console.log(currentPage);
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
                    </tbody>
                </table>
                {totalRecords && <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalRecords={totalRecords}
                    perPage={perPage}/>}
            </div>
        </div>
    )
}

export default AdminPanel