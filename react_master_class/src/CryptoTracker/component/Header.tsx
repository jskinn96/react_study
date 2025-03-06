import styled from "styled-components"
import { Link } from "react-router-dom";

const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    background-color: #1a202c;
    color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const TitleCont = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.025em;
`;
const TitleHighlight = styled.span`
    color: #facc15;
`;

const Header = () => {
    
    return (
        <Container>
            <Link to={"/"}>
                <TitleCont>
                    <TitleHighlight>CRYPTO</TitleHighlight> TRACKER
                </TitleCont>
            </Link>
        </Container>
    );
}

export default Header;