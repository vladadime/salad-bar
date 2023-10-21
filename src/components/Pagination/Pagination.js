import {useState} from "react";
import "./Pagination.css";
const Pagination = ({currentPage, setCurrentPage, totalRecords, perPage}) => {
    const [active,
        setActive] = useState(1);
    const totalPages = Math.ceil(totalRecords / perPage);
    const neighborNums = 3;

    const navigate = (item) => {
        if (item !== "...") {
            setActive(item);
            setCurrentPage(item);
        }
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setActive(currentPage + 1);
        } else if (currentPage === totalPages) {
            setActive(currentPage);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setActive(currentPage - 1);
        } else if (currentPage === 1) {
            setActive(currentPage);
        }
    }

    const getPagNumbers = () => {
        const pagNumbers = [];
        if(totalPages <= 3) {
            for(let i = 0; i < totalPages; i++) {
                pagNumbers.push(i + 1);
            }
        } else if (currentPage < neighborNums) {
            for (let i = 0; i < neighborNums; i++) {
                pagNumbers.push(i + 1);
            }
            pagNumbers.push("...");
            pagNumbers.push(totalPages);
        } else if (totalPages - currentPage < neighborNums) {
            for (let i = 0; i < neighborNums + 1; i++) {
                pagNumbers.push(totalPages - neighborNums + i);
            }
        } else {
            const mid = Math.floor(neighborNums / 2);
            for (let i = 0; i < neighborNums; i++) {
                pagNumbers.push(currentPage - mid + i);
            }
            pagNumbers.push("...");
            pagNumbers.push(totalPages);
        }

        return pagNumbers;
    }

    return (
        <div id="pagination">
            <ul>
                <li onClick={() => {
                    navigate(1)
                }}>&laquo;</li>
                <li onClick={prevPage}>&lsaquo;</li>
                {totalPages && getPagNumbers().map((item, index) => (
                    <li
                        key={index}
                        onClick={() => navigate(item)}
                        className={active === item
                        ? 'active'
                        : ''}>{item}</li>
                ))}
                <li onClick={nextPage}>&rsaquo;</li>
                <li
                    onClick={() => {
                    navigate(totalPages)
                }}>&raquo;</li>
            </ul>
        </div>
    )
}

export default Pagination