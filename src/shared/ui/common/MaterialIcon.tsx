type MaterialIconProps = {
    name: string;
    className?: string;
    size?: number;
};

export function MaterialIcon({ name, className = "", size = 20 }: MaterialIconProps) {
    return (
        <span
            aria-hidden
            className={`material-symbols-outlined leading-none ${className}`}
            style={{ fontSize: `${size}px` }}
        >
            {name}
        </span>
    );
}
