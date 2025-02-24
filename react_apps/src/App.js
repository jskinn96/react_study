import Btn from "./button";
import styles from "./app.module.css";

function App() {
  return (
    <div>
      <h1
      className={styles.title}
      >Welcome back!</h1>
      <Btn text="Test Button" />
    </div>
  );
}

export default App;