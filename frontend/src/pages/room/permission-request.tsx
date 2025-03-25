import { PermissionRequestEvent, useCall } from "@stream-io/video-react-sdk"
import { useCallback, useEffect, useState } from "react"

export const PermissionRequestPanel = () => {

    const [permissionRequests, setPermissionRequests] = useState<PermissionRequestEvent[]>([]);
    const call = useCall();

    useEffect(() => {
        return call?.on("call.permission_request", (event) => {
            const request = event as PermissionRequestEvent;
            setPermissionRequests((reqs) => [...reqs, request]);
        })
    }, [call]);

    const handlePermissionRequest = useCallback(async (request: PermissionRequestEvent, accept: boolean) => {
        const {user, permissions} = request;
        try{
            if(accept){
                await call?.grantPermissions(user.id, permissions);
            }else{
                await call?.revokePermissions(user.id, permissions);
            }
            setPermissionRequests((reqs) => reqs.filter((req) => req !== request));
        }catch(error){
            alert("Error while approving/denying request");
        }
    }, [call]);

    if(!permissionRequests.length) return;

    return (
        <div className="permission-requests">
            <h4>Permission Requests</h4>
            {permissionRequests.map((reqs) => (
                <div className="permission-request" key = {reqs.user.id}>
                    <span> {reqs.user.name} requested permission to {reqs.permissions.join(", ")} </span>
                    <button onClick={() => handlePermissionRequest(reqs, true)} style={{backgroundColor: "green"}}>Approve</button>
                    <button onClick={() => handlePermissionRequest(reqs, false)}>Deny</button>
                </div>
            ))}
        </div>
    )

}