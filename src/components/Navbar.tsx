import { Link } from "react-router-dom"


interface NavLink {
    title: string,
    href: string
}
const Navbar = () => {

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
        <header className="sm:max-w-4xl mx-auto">
            <nav className="flex items-center justify-between">
                <Link
                    to={'/'}
                    className="text-primary font-semibold"
                >Notes.io</Link>
                <div className="flex items-center justify-center gap-10">
                    {links.map((link) => (
                        <Link
                        className="text-blue-900 font-semibold text-sm"
                            key={link.title}
                            to={link.href}
                        >{link.title}</Link>
                    ))}
                </div>
                <div></div>

            </nav>
        </header>
    )
}

export default Navbar