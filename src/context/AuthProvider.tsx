import { createContext, ProviderProps } from "react";
import { useLocalStorage } from "@mantine/hooks";

interface AuthContextValue {
    zeplinAccessToken: string
    setZeplinAccessToken: (token: string) => void
}

const defaultAuthContextValue: AuthContextValue = {
    zeplinAccessToken: '',
    setZeplinAccessToken: () => {},
}

export const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue)

const AuthProvider = ({ children }: Omit<ProviderProps<AuthContextValue>, 'value'>) => {
    const [zeplinAccessToken, setZeplinAccessToken] = useLocalStorage({key: 'zeplinAccessToken', defaultValue: ''})

    return (
        <AuthContext.Provider value={{zeplinAccessToken, setZeplinAccessToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
