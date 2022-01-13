import Alert from "../../components/Alert/index.jsx";
import { fetchData } from "../../lib/practice.jsx";
import { useState, useEffect } from "react";
import useSWR from "swr";

function Profile() {
  const { data, error } = useSWR("/api/user", fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: {
      data,
    },
  };
}
export default function Practice({ data: { name } }) {
  return (
    <div>
      <Alert>
        <h1>hello</h1>
      </Alert>
      <h1>{name}</h1>
      <Profile />
    </div>
  );
}
