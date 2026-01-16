import { cn } from "../../lib/utils.ts"


type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
};

const Textarea = ({ className, ...props }: TextareaProps) => {
    return (
        <textarea
            {...props}
            className={cn(
                'outline-none rounded px-4 py-2 shadow-input border border-primary',
                'focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:border-none',
                'placeholder:text-neutral-400  placeholder:tracking-tight',
                'transition-all duration-200 ease-linear  ',
                className)}
        />
    )
}

export default Textarea
