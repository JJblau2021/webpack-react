import "./index.less";
import styles from "./app.module.less";
// import For from "Components/For";
export default function App() {
  return (
    <div className="appWrap">
      <span>appWrap</span>
      <span className="app">App</span>
      <div className={styles.appWrap}>
        <span>appWrap</span>
        <span className={styles.app}>App</span>
      </div>
      <For
        items={[1, 2, 3, 4]}
        render={(num) => <div key={num}>{num + "haha"}</div>}
      />
    </div>
  );
}
