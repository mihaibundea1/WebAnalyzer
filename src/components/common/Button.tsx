// Button.tsx
import React from 'react';

interface ButtonProps {
    label: string;
    type: 'submit' | 'button';
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, type, icon, onClick, className }) => {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${className}`}
            onClick={onClick}
        >
            {icon && <span className="mr-2">{icon}</span>}
            <span>{label}</span>
        </button>
    );
};

export default Button;
