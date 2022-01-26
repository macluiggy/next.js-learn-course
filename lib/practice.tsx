// import { useState, useEffect } from "react/cjs/react.production.min";
export const fetchData = async () => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await result.json();
  console.log("fetching data");
  return data[0];
};
