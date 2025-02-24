import PropTypes from "prop-types";
/**
 * g button.module.css 파일을 styles라는 명칭으로 가져와서 사용한다.
 * g module.css만 붙는다면 앞에 이름이 무엇이 되던 상관 없다.
 * g class를 랜덤한 이름으로 변경하여 같은 클래스여도 다른 파일이면 중복 클래스가 생성되지 않게 막는다.
*/
import styles from "./button.module.css";

const Btn = ({text = 'btn'}) => {

    return (
        <button
        className={styles.btn}
        >{text}</button>
    )
}

Btn.propTypes = {
    text: PropTypes.string,
}

export default Btn;