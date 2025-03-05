import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../screensStudy/Home";
import About from "../screensStudy/About";
import NotFound from "../screensStudy/NotFound";
import ErrorComponent from "../screensStudy/ErrorComponent";
import User from "../screensStudy/user";
import Follower from "../screensStudy/Follower";

//g 메인 errorElement는 잘못된 패스로 갔을 때, 출력되는 컴포넌트
//g 자식 중에서 처음 errorElement는 컴포넌트에서 오류가 있을 때 출력되는 컴포넌트
//g /follower로 하면 절대 경로라서 /follower로 출력됨...follower만 써야 상대경로로 출력 가능~~~/follower
const router = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        errorElement : <NotFound />,
        children : [
            {
                path : "",
                element : <Home />,
                errorElement : <ErrorComponent />
            },
            {
                path : "About",
                element : <About />
            },
            {
                path : "user/:userId",
                element : <User />,
                children : [
                    {
                        path : "follower",
                        element : <Follower />
                    }
                ]
            }
        ]
    }
]);

export default router;