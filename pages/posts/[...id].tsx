import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
// Add this import at the top of the file
import utilStyles from "../../styles/utils.module.css";
import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
export default function Post({
  postData: { title, date, id, contentHtml },
  /*text, */
}) {
  // const [text, setText] = useState("");
  // const fetchText = async () => {
  //   const response = await fetch("https://localhost:3000/api/hello");
  //   const data = await response.json();
  //   console.log(data);

  //   setText(data.text);
  // };
  // useEffect(() => {
  //   fetchText();
  // });
  return (
    <Layout home={false}>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>
          {title} {/*{text} */}
        </h1>
        <div className={utilStyles.lightText}>
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
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
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let postData;
  if (params.id[0] === "about") {
    postData = {
      id: params.id,
      title: "About",
      date: "2020-01-01",
    };
  } else {
    postData = /* await */ getPostData(params.id);
  }
  // const response = await fetch("http://localhost:3000/api/hello");
  // const data = await response.json();
  // console.log(data);
  return {
    props: {
      postData,
      // ...data,
    },
  };
};
