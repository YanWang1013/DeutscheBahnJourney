"use client";

import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

export default function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    return (
        <button
            {...props}
            className={clsx(
                `transition-all duration-100 rounded-md p-2`,
                props.disabled ? "bg-neutral-700/60" : "bg-sky-700 hover:bg-sky-800",
                props.className
            )}
        >
            {props.children}
        </button>
    );
}