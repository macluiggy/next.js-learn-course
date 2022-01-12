import styles from "./alert.module.css";
import cn from "classnames";

export default function Alert({ children, type }) {
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      <h1 className={styles.success} style={{ color: "red" }}>
        hellosss
      </h1>
    </div>
  );
}
