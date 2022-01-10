import Head from "next/head";
import Link from "next/link";
import Script, { ScriptProps } from "next/script";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" // controls when the script is loaded
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        } // callback when the script is loaded
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}

// import Image from 'next/image'

// const YourComponent = () => (
//   <Image
//     src="/images/profile.jpg" // Route of the image file
//     height={144} // Desired size with correct aspect ratio
//     width={144} // Desired size with correct aspect ratio
//     alt="Your Name"
//   />
// )
