/**
 * g Switch => Routes
 * g Route path="/" element={< Home / >}
 * g BrowserRouter : 해당 컴포넌트로 감싸진 부분은 페이지 새로고침 없이 렌더링 한다.
 * g Routes(Switch) : Route컴포넌트의 부모
 * g Route : 특정 경로에 대한 컴포넌트를 지정, path = url, element = 렌더링할 컴포넌트
 * g Link : movieStudy 파일 참고...새로고침 없이 리렌더링(클라이언트 사이드 이동) 하게 해주는 컴포넌트 
*/
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./routes/homeStudy";
import Detail from "./routes/detailStudy";

function App() {

    return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Detail />} />
        </Routes>
    </Router>
    );
}

export default App; 