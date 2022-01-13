import Alert from "../../components/Alert/index.jsx";
import { fetchData } from "../../lib/practice.jsx";
export async function getStaticProps() {
  const data = await fetchData();
  return {
    props: {
      data,
    },
  };
}
export default function Practice({ data }) {
  return (
    <div>
      <Alert>
        <h1>hello</h1>
      </Alert>
      <h1>{data.name}</h1>
    </div>
  );
}
