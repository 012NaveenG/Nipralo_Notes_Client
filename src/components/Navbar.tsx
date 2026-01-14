import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <header>
            <nav>
                <NavLink
                 to={''}
                 className={({isActive})=>('')}
                 >Notes.io</NavLink>
            </nav>
        </header>
    )
}

export default Navbar