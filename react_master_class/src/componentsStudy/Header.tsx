import { Link, useNavigate } from "react-router-dom";

const Header = () => {

    //g Link 없이 이벤트 함수로 라우팅 시키는 기능
    const navigateFn = useNavigate();

    const navigateFunc = () => {
        navigateFn("/About");
    };

    return (
        <header>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li onClick={navigateFunc}>
                    About
                </li>
            </ul>
        </header>
    )
}

export default Header;