import { cn } from "../../lib/utils.ts"


const Group = ({ children, className }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (
        <div className={cn(
            'flex flex-col gap-2 my-2',
            className)
        }>{children}</div>
    )
}

export { Group }