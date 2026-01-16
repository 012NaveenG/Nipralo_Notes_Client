import { NotepadTextDashed, SendToBack } from "lucide-react";
import { NavLink } from "react-router-dom";

interface sidebarLinks {
    title: string;
    href: string;
    icon: React.ReactElement
}
const Sidebar = () => {
    const links: sidebarLinks[] = [
        {
            title: 'mynotes',
            href: '/app',
            icon: <NotepadTextDashed size={16}/>
        },
        {
            title: "Shared Notes",
            href: "/app/shared-notes",
            icon: <SendToBack size={16}/>
        }
    ]
    return (
        <div className="h-screen w-64 py-5 px-2 bg-gray-50/80 shadow-input">
            <div className="flex flex-col gap-2">
                {links.map((link) => (
                    <NavLink
                        key={link.title}
                        to={link.href}
                        end
                        className={({ isActive }) =>
                            [
                                "px-3 py-2 rounded-md transition-all duration-150 flex items-center justify-start capitalize",
                                "text-sm font-medium",
                                isActive
                                    ? "bg-primary text-white shadow-md"
                                    : "text-neutral-700 hover:bg-neutral-200"
                            ].join(" ")
                        }
                    >
                        {link.icon}
                        {link.title}
                    </NavLink>

                ))}
            </div>
        </div>
    )
}

export default Sidebar
