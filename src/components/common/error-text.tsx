import React from "react";
interface ErrorTextprops {
    error: string;
}

export const ErrorText = ({ error }: ErrorTextprops) => {
    return (
        <>
            {error && (
                <p className="" style={{ color: "red", fontSize: 14 }}>
                    {error}
                </p>
            )
            }
        </>
    )
}