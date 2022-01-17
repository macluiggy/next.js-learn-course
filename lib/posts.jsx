import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // remove the ".md" from the file name to get the id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName); // get the full path
    const fileContents = fs.readFileSync(fullPath, "utf8"); // read file as string

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data, // this is the data we want to use
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory); // this method returns an array of file names in the posts directory
  console.log(fileNames);
  //this is the array that must be inside the getStaticPaths returned object
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ""),
        },
      };
    })
    .concat({ params: { id: "about" } });
}

export /* async */ function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // Read markdown file as string
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  /*
  this is what matterResult looks like:
   {
    content: '\n' +
      'We recommend using **Static Generation** (with and without data) whenever possible ....
    data: {
      title: 'When to Use Static Generation v.s. Server-side Rendering',
      date: '2020-01-02'
    },
    isEmpty: false,
    excerpt: '',
    orig: <Buffer 2d 2d 2d 0a 74 69 74 6c 65 3a 20 22 57 68 65 6e 20 74 6f 20 55 73 65 20 53 74 61 74 69 63 20 47 65 6e 65 72 61 74 69 6f 6e 20 76 2e 73 2e 20 53 65 72 ... 987 more bytes> 
    */
  // console.log(matterResult);
  // // Use remark to convert markdown into HTML string
  const markdownContent = matterResult.content; // this is the markdown content
  const processedContent = /* await */ remark()
    .use(html)
    .processSync(markdownContent); // we need to use remark to convert markdown to html
  const contentHtml = processedContent.toString(); // this is the html content
  // Combine the data with the id
  return {
    id,
    // content: processedContent,
    ...matterResult.data,
    contentHtml,
  };
}
