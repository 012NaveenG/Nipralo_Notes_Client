import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { cn } from "../lib/utils"
import Sidebar from "../components/Sidebar"

const AppLayout = () => {
    return (
        <div className="min-h-screen w-screen bg-linear-to-b from-white via-gray-50  to-blue-200 py-4 px-10 ">
            <Navbar />
            <div className="max-w-8xl mx-auto overflow-hidden  ">
                <LayoutBackground >
                    <Sidebar />
                    <Outlet />
                </LayoutBackground>
            </div>
        </div>
    )
}

export default AppLayout



const LayoutBackground = ({ children }: {
    children: React.ReactNode,
}) => {
    return (
        <div
            className={cn(
                " h-screen w-screen flex  gap-5 p-2  rounded-md my-4 bg-transparent-50",
                "bg-[radial-gradient(var(--color-primary)_0.7px,transparent_0.7px)]",

                "bg-size-[10px_10px]",
                // "mask-[radial-gradient(circle_at_center,white,transparent)]",
                // " mask-t-from-10%"
            )}>{children}</div>
    )
}