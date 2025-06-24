import React from "react";

export const TituloH1 = ({ titulo, parrafo }) => {
    return (
        <>
            <h1>{titulo}</h1>
            <p>{parrafo}</p>
        </>
    );
};


export const TituloH2 = ({ titulo, parrafo }) => {
    return (
        <>
            <h2>{titulo}</h2>
            <p>{parrafo}</p>
        </>
    );
};


export const TituloH3 = ({ titulo, parrafo }) => {
    return (
        <>
            <h3>{titulo}</h3>
            <p>{parrafo}</p>
        </>
    );
};
