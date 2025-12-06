"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
    label: string;
    placeholder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name: string;
    value: string;
    error?: string;
    background?: string;
}

const InputComponent: React.FC<InputProps> = ({
    label,
    placeholder,
    onChange,
    type = "text",
    name,
    value,
    error,
    background = "#262626",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
        type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="w-full">
            <label className="text-foreground font-semibold">{label}</label>

            <div className="w-full relative">
                <input
                    className="w-full mt-1.5 py-2 px-3 rounded-lg focus:border focus:outline-none focus:border-primary text-foreground placeholder:text-para"
                    type={inputType}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    style={{ background }}
                />

                {type === "password" && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground cursor-pointer"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>

            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default InputComponent;
