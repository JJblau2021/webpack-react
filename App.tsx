import "./index.less";
import styles from "./app.module.less";
export default function App() {
  return (
    <div className="appWrap">
      <span>appWrap</span>
      <span className="app">App</span>
      <div className={styles.appWrap}>
        <span>appWrap</span>
        <span className={styles.app}>App</span>
      </div>
    </div>
  );
}
