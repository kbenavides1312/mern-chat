import RegisterAndLogin from "./RegisterAndLoginForm.jsx";
import { useContext } from "react";
import { UserContext } from "./UserContext";        
import Chat from "./Chat.jsx";

export default function Routes(){
    const {username, id} = useContext(UserContext);

    if (username){
        return <Chat/>;
    }

    return(
        <RegisterAndLogin/>
    );
}