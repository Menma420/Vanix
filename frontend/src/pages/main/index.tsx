import { StreamVideo } from "@stream-io/video-react-sdk"
import { useUser } from "../../user-context";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as CryptoJS from "crypto-js";
import { Call } from "@stream-io/video-react-sdk";


interface NewRoom {
    name: string,
    description: string,
}

interface Room {
    id: string;
    title: string;
    description: string;
    participantsLength: number;
    createdBy: string;
}

type CustomCallData = {
    description?: string;
    title?: string;
}

export const MainPage = () => {
    const {client, user, setCall, isLoadingClient} = useUser();
    const [newRoom, setNewRoom] = useState<NewRoom>({name: "", description: ""});
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(client) fetchListofCalls();
    }, [client])

    const hashRoomName = (roomName: string): string => {
        const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
        return hash.replace(/[^a-zA-Z0-9_-]/g, "")
    } 

    const createRoom = async () => {
        const {name, description} = newRoom;

        if(!name || !client || !user || !description) return;

        const call = client.call( "audio_room",hashRoomName(name));
        await call.join({
            create: true,
            data: {
                members: [{user_id: user.username}],
                custom: {
                    title: name,
                    description,
                },
            },
        })

        setCall(call);
        navigate("/room");
    }

    const fetchListofCalls = async () => {
        const callsQueryResponse = await client?.queryCalls({
            filter_conditions: {
                ongoing: true
            },
            limit: 4,
            watch: true,
        })

        if(!callsQueryResponse){
            alert("Error getting calls query response");
        }else{

            const getCallInfo = async (call: Call): Promise<Room> => {
                const callInfo = await call.get();
                const customData = callInfo.call.custom;
                const {title, description} = (customData || {}) as CustomCallData;
                const participantsLength = callInfo.members.length ?? 0;
                const createdBy = callInfo.call.created_by.name?? ""
                const id = callInfo.call.id?? ""

                return {
                    id,
                    title: title?? "",
                    description: description?? "",
                    participantsLength,
                    createdBy,
                }
            }

            const roomPromises = await callsQueryResponse.calls.map((call) => (getCallInfo(call)));

            const rooms = await Promise.all(roomPromises);
            setAvailableRooms(rooms);
        }
    }

    const joinCall = async(callID: string) => {
        const call = client?.call("audio_room", callID);

        try{
            await call?.join();
            setCall(call);
            navigate("/room")
        }catch(error){
            alert("Error while joining call. Wait for room to be live");
        }
    }

    if(isLoadingClient) return <h1>...</h1>

    if((!isLoadingClient && !user) || (!isLoadingClient && !client)) return <Navigate to="/sign-in"/>

    return (
        <StreamVideo client = {client!}>
            <div className="home">
                <h1>Welcome, {user?.name}</h1>
                <div className="form">
                    <h2>Create Your Own Room</h2>
                    <input placeholder="Room name..."
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                            setNewRoom((prev) => ({...prev, name: event.target.value}))
                    }
                    />
                    <input placeholder="Room description..."
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                            setNewRoom((prev) => ({...prev, description: event.target.value}))
                    }
                    />
                    <button 
                    onClick={createRoom}
                    style={{backgroundColor: "rgb(125, 7, 236)"}}
                    >
                        {" "}
                        Create Room
                    </button>
                </div>
                {availableRooms.length !== 0 ?
                    <>
                    <h2>Available Rooms</h2>
                    <div className="grid">
                        {" "}
                        {availableRooms.map((room) => (
                            <div className="card" key={room.id} 
                            onClick={() => joinCall(room.id)}>
                                {" "}
                                <h4>{room.title}</h4>
                                <p>{room.description}</p>
                                <p>{room.participantsLength} participants</p>
                                <p>CreatedBy : {room.createdBy}</p>
                                <div className="shine"></div>
                            </div>
                        ))}{" "}
                    </div>
                    </> 
                    
                    : 
                    
                    <h2>No rooms available at the moment</h2>
                }
            </div>
        </StreamVideo>
        
    ); 
}