import { cn } from "../../lib/utils.ts"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
  children: React.ReactNode
};

const Label = ({ children, className, ...props }: LabelProps) => {
  return (
    <label {...props} className={cn('text-neutral-700 font-medium', className)}>{children}</label>
  )
}


export { Label }