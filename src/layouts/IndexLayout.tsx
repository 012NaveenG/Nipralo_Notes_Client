import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.tsx"
import { Toaster } from "react-hot-toast"

const IndexLayout = () => {
    return (
        <div className="min-h-screen w-screen bg-linear-to-b from-white via-gray-50  to-blue-200 p-4 ">
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    )
}

export default IndexLayout
