import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-cyan-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-full font-medium transition duration-200 ease-in-out shadow-sm hover:shadow-md hover:opacity-90 ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
