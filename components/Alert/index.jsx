import styles from "./alert.module.css";
import cn from "classnames";
import { useState, useEffect } from "react";

export default function Alert({ children, type }) {
  const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetch("https://jsonplaceholder.typicode.com/users");
  //     const data = await result.json();
  //     console.log("fetching data");
  //     setData(data[1]);
  //   };
  //   fetchData();
  // }, []);
  const fetchData = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await result.json();
    console.log("fetching data");
    setData(data[1]);
  };
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
      <div>
        <h1>{data.name}</h1>
        <button onClick={fetchData}>fetchData</button>
      </div>
    </div>
  );
}
