import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
// Add this import at the top of the file
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData: { title, date, id, contentHtml } }) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  /*
  getStaticPaths() is a special function that allows you to define the paths, this paths will be used to generate the pages.
  the function returns an object that looks like this:
  {
    paths: [
      { params: { id: 'ssg-ssr' } },
      { params: { id: 'pre-rendering' } }
    ],
    fallback: false
  }

  every object in the paths array will be used to generate a page. depending on the id, the page will be generated. this returned object will be passed as a parameter to getStaticProps()
  */
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export /* async */ function getStaticProps({ params }) {
  let postData;
  if (params.id === "about") {
    postData = {
      id: params.id,
      title: "About",
      date: "2020-01-01",
    };
  } else {
    postData = /* await */ getPostData(params.id);
  }
  return {
    props: {
      postData,
    },
  };
}
