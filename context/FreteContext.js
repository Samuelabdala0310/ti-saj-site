"use client";
import { createContext, useContext, useState } from "react";

const FreteContext = createContext();

export function FreteProvider({ children }) {
    const [frete, setFrete] = useState(0);
    const [nomeFrete, setNomeFrete] = useState("");

    return (
        <FreteContext.Provider
            value={{
                frete,
                setFrete,
                nomeFrete,
                setNomeFrete,
            }}
        >
            {children}
        </FreteContext.Provider>
    );
}

export function useFrete() {
    return useContext(FreteContext);
}