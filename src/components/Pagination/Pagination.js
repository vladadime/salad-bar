import "./Pagination.css";
const Pagination = () => {
    return (
        <div className="">
            <ul className="pagination d-flex flex-row justify-content-center">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo; Prev</span>
                    </a>
                </li>

                <li className="page-input page-item mx-2">
                    <input type="text" className="form-control" placeholder="Go to page..."/>
                </li>

                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">Next &raquo;</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination