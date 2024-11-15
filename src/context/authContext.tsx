import { createContext, useState,Dispatch, SetStateAction , ReactNode} from "react";

interface ContextType {
    authorized: boolean;
    setAuthorized: Dispatch<SetStateAction<boolean>>;
    redirected: string;
    setRedirected: Dispatch<SetStateAction<string>>;
}


export const Context = createContext<ContextType>({
    authorized: false,
    setAuthorized: () => {},
    redirected: '',
    setRedirected: () => {}
});

export const Provider:React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);
    const [redirected, setRedirected] = useState('');

    return (
        <Context.Provider value={{ authorized, setAuthorized, redirected, setRedirected}}>
            {children}
        </Context.Provider>
    )
}