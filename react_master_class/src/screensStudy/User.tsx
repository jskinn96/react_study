import { useParams, Link, Outlet } from "react-router-dom";
import Users from "../testDb/UserDbTest";

const User = () => {

    //g 제너릭으로 userId 타입 지정...기본적으로는 string | undefined 가 지정되어 있음
    const { userId }    = useParams<{userId : string}>(); 
    const userIdNum     = Number(userId);
    const userIdx       = userIdNum - 1;

    //g /follower로 하면 절대 경로라서 /follower로 출력됨...follower만 써야 상대경로로 출력 가능~~~/follower
    //g Outlet에서 context를 이용하여 원하는 값을 해당 자식 컴포넌트에게 넘겨줄 수 있다.
    return (
        <div>
            <h1>ID : {Users[userIdx].id}</h1>
            <h1>Name : {Users[userIdx].name}</h1>
            <hr />
            <Link to={"follower"}>See followers</Link>
            <Outlet context={
                {
                    userName: Users[userIdx].name
                }
            } />
        </div>
    );
}

export default User;