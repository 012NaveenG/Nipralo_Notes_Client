import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.tsx"

const IndexLayout = () => {
    return (
        <div className="min-h-screen w-screen bg-linear-to-b from-white via-gray-50  to-blue-200 p-4 ">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default IndexLayout
