import React from "react";

import "../styles/globals.css";

import "@fontsource/ubuntu";
import "@fontsource/source-sans-pro";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <html lang="en">
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Journey Board" />
                <meta
                    property="og:description"
                    content="The user should be able to specify the name of the city or the station she wants to start her journey,
                    along with the day and time, and get back the journey’s details"
                />
                <meta property="og:site_name" content="Jonrney Board" />
                <meta property="og:url" content="https://rail.stckoverflw.net" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={"bg-neutral-900"}>{children}</body>
            </html>
        </>
    );
}
