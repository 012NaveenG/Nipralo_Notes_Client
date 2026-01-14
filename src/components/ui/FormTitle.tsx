import { cn } from "../../lib/utils.ts"

const FormTitle =  ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <h2 className={cn('text-xl font-semibold text-neutral-700 leading-4 tracking-wider ', className)}>{children}</h2>
    )
}

export default FormTitle

