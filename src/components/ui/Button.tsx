import { cn } from "../../lib/utils.ts"

const Button = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div className={cn('outline-none bg-primary px-8 py-2 rounded-full text-white font-semibold text-center ',
            'transition-all duration-100 ease-linear cursor-pointer',
            ' hover:scale-105 hover:-translate-y-0.5 active:scale-90',
            className)}>
            {children}
        </div>
    )
}

export default Button
