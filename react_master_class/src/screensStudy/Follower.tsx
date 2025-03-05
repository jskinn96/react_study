import { useOutletContext } from "react-router-dom";

interface userDataType {
    userName : string;
}

const Follower = () => {
    
    const { userName } = useOutletContext<userDataType>();
    
    //g Outlet context를 통해 부모 컴포넌트에서 넘겨 받은 userName값
    return (
        <div>Im {userName}'s Follower</div>
    )
}

export default Follower;