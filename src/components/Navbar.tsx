import { Link, useNavigate } from "react-router-dom"
import Button from "./ui/Button"
import { Logs, X } from "lucide-react"
import { useState } from "react"


const links: NavLink[] = [
    {
        title: 'About',
        href: '#'
    },
    {
        title: 'Pricing',
        href: '#'
    },
    {
        title: 'Testimonials',
        href: '#'
    }
]
interface NavLink {
    title: string,
    href: string
}
const Navbar = () => {
    const navigate = useNavigate()

    const [mobileNavOpen, setMobileNavOpen] = useState<false | true>(false)
    return (
        <header className="w-full sm:max-w-6xl mx-auto">
            <nav className="relative flex items-center justify-between">
                <Link
                    to={'/'}
                    className="text-primary font-semibold text-lg"
                >Notes.<span className="italic">io</span></Link>
                <div className="hidden sm:flex items-center justify-center gap-10">
                    {links.map((link) => (
                        <Link
                            className="text-blue-900 font-semibold text-sm"
                            key={link.title}
                            to={link.href}
                        >{link.title}</Link>
                    ))}
                </div>
                <div className="hidden sm:block">
                    <Button
                        onClick={() => navigate('/login')}
                        className="text-sm">Login</Button>
                </div>

                <div className="sm:hidden">
                    {mobileNavOpen ?
                        <X
                            className="transition-all duration-900 ease-in-out"
                            onClick={() => setMobileNavOpen((prev) => !prev)} />
                        :
                        <Logs
                            className="transition-all duration-900 ease-in-out"
                            onClick={() => setMobileNavOpen((prev) => !prev)} />
                    }
                </div>
                {mobileNavOpen && <MobileNavTray />}
            </nav>
        </header>
    )
}

export default Navbar

const MobileNavTray = () => {
    const links: NavLink[] = [
        {
            title: 'About',
            href: '#'
        },
        {
            title: 'Pricing',
            href: '#'
        },
        {
            title: 'Testimonials',
            href: '#'
        }
    ]
    return (
        <div className="absolute  sm:hidden flex flex-col top-10 -left-4 p-2  w-screen  bg-neutral-100 shadow-input transition-all duration-150 ease-linear">
            {links.map((link) => (
                <Link
                    key={link.title}
                    className="text-xl font-medium my-2 text-neutral-700"
                    to={'#'}>
                    {link.title}
                </Link>
            ))}

        </div>
    )
}