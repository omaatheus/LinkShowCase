import { cn } from "@/app/lib/utils";

export default function Button({
    children,
    variant = "primary",
    isLoading = false,
    ...props
}: {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            disabled={isLoading || props.disabled}
            className={cn(
                "p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70 transition-all",
                "flex items-center justify-center gap-2",
                variant === "primary" && "bg-[#4200cd]",
                variant === "secondary" && "bg-background-tertiary",
                variant === "ghost" && "border-border-primary",
                props.className
            )}
        >
            {isLoading && (
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {children}
        </button>
    );
}