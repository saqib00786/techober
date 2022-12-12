import { createContext, useContext, useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";


export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [isConnected, setIsConnected] = useState()

    useEffect(() => {
        const unSubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected)
        })
        // NetInfo.fetch().then((state) => {
        //     setIsConnected(state.isConnected)
        // })

        return unSubscribe
    }, [isConnected])

    return (
        <AppContext.Provider
            value={{
                isConnected,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}