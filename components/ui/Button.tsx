import React from "react";

interface ButtonProps {
    text: string;
    width?: "full" | "auto";
    type?: "button" | "submit";
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    text,
    width = "full",
    type = "submit",
    onClick,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-${width} py-2 px-3 border border-primary bg-primary text-foreground rounded-lg 
            text-center hover:border-primary hover:bg-transparent transition-all duration-300 cursor-pointer`}
        >
            {text}
        </button>
    );
};

export default Button;
