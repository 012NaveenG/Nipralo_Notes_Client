import { cn } from "../../lib/utils.ts"

const FormDescription = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <p className={cn(' font-semibold text-neutral-600 text-sm', className)}>
            {children}
        </p>
    )
}

export default FormDescription
