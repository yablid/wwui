// src/pages/errorPage.tsx
import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error: React.FC = () => {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is a RouteErrorResponse
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = "Unknown Error";
    }

    return (
        <div id="error-page">
            <h1>¯\_(ツ)_/¯</h1>
            <p>no bueno</p>
            <p>
                <i>{ errorMessage }</i>
            </p>
        </div>
    );
};

export default Error;