import React, { createContext, useState } from 'react'

export const ContextVin = createContext() // context is being created and exported

export default function ContextProvider({children}) {

    const [vin, setVin] = useState('')

    // function to be used in the child component that will consume the context
    const handleVin = value => {
        setVin(value)
    }

    return (
        <ContextVin.Provider value = {{vin, handleVin}}>
            {children}
        </ContextVin.Provider>
    )

}
