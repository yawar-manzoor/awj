import React, { createContext, useState } from 'react'

const LoginContext = createContext()

const LoginContextProvider = ({ children }) => {
    const [temporarySignOut, setTemporarySignOut] = useState(false)

    return (
        <LoginContext.Provider
            value={{ temporarySignOut, setTemporarySignOut }}
        >
            {children}
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginContextProvider }
