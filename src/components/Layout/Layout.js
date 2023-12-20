import {Header} from "../Header";
import {Footer} from "../Footer";

const Layout = ({children}) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header/> {children}
            <Footer/>
        </div>
    )
}

export default Layout