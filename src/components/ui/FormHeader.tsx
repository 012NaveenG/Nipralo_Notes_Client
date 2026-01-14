import { cn } from "../../lib/utils.ts"

const FormHeader = ({ children, className }: {
  children: React.ReactNode,
  className?: string
}) => {
  return (
    <div className={cn('py-2', className)}>
      {children}
    </div>
  )
}

export default FormHeader


