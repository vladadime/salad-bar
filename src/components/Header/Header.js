import "./Header.css";
const NavButton = ({title, path}) => {
    return (
        <li className="nav-item">
            <a className="nav-link text-white fw-bold" href={`/${path}`}>{title}</a>
        </li>
    )
}

const Header = () => {
    const navbarItems = [
        {
            title: "Home",
            path: ""
        }, {
            title: "Admin panel",
            path: "admin"
        }
    ];
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <button
                    className="navbar-toggler bg-light"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navbarItems.map((item, index) => <NavButton key={index} title={item.title} path={item.path}/>)}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header