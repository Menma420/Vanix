import { StreamVideoClient, User as StreamUserType } from "@stream-io/video-react-sdk";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Call } from "@stream-io/video-react-sdk";

interface User {
    username: string,
    name: string,
}

interface UserContextProps{
    user: User | null,
    setUser: (user: User | null) => void,
    client: StreamVideoClient | undefined,
    setClient: (client: StreamVideoClient | undefined) => void,
    call: Call | undefined,
    setCall: (call: Call | undefined) => void;
    isLoadingClient: boolean,
}

const UserContext = createContext<UserContextProps | undefined >(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = (props: UserProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const [call, setCall] = useState<Call>();
    const [client, setClient] = useState<StreamVideoClient>();
    const [isLoadingClient, setIsLoadingClient] = useState<boolean>(true);

    useEffect(() => {
        const token = Cookies.get("token");
        const username = Cookies.get("username");
        const name = Cookies.get("name");

        if(!token || !username || !name){
            setIsLoadingClient(false);
            return;
        } 

        const user: StreamUserType ={
            id: username,
            name
        };

        const myClient = new StreamVideoClient({
            apiKey: "8kg95evm8sbv",
            user,
            token,
        });

        setClient(myClient);
        setUser({username, name});
        setIsLoadingClient(false);

        return () => {
            myClient.disconnectUser();
            setClient(undefined);
            setUser(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser, client, setClient, call, setCall, isLoadingClient}}>
            {" "}
            {props.children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);

    if(!context){
        throw new Error("useUser must be within a Provider");
    }

    return context;
}