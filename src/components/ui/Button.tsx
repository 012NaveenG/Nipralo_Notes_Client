import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={cn(
                "outline-none bg-primary px-8 py-2 rounded-full text-white font-semibold text-center",
                "transition-all duration-100 ease-linear cursor-pointer",
                "hover:scale-105 hover:-translate-y-0.5 active:scale-90",
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
