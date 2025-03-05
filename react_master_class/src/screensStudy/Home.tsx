import Users from "../testDb/UserDbTest";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
    
    //g ErrorComponent 출력 테스트
    // type user = {
    //     user : string;
    // };
    // const users:user[] = [];
    
    //g url 파라미터 값을 설정할 수 있게 하는 리액트 라우터 기능
    const [readSearchParams, setSearchParams] = useSearchParams();

    /**
     * g 이외에도 useLoaderData(데이터를 패치를 통해 받을 필요 없이 라우터로 받음), useActionData(폼 이벤트 동작 시, 자동적으로 실행되는 기능) 같은 기능들이 존재함
     * g react-router-dom 제작자와 Remix 제작자가 동일하여 해당 기능들은 Remix에서도 이용 가능
     * g 다만 해당 기능들은 라우팅이랑은 크게 관련이 없어서 궁금하면 참고해도 좋음 
    */

    console.log(readSearchParams.has('test'));
    console.log(readSearchParams.get('test'));
    useEffect(() => {

        setTimeout(() => {
            setSearchParams({
                test : "2"
            });
        }, 3000)
    }, [readSearchParams]);

    return (
        // <h1>{users[0].user}</h1>
        <div>
            <h1>Users</h1>
            <ul>
                {
                    Users.map((el) => {
                        return (
                            <li key={el.id}>
                                <Link to={"/user/" + el.id}>{el.name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Home;