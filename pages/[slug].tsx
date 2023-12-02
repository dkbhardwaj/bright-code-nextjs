// import { GetStaticProps, GetStaticPaths } from "next";

// interface BlogData {
//   title: string;
//   posts: Array<{ id: number; title: string; content: string }>;
// }

// interface HomeProps {
//   data: BlogData;
// }

// export default function Home({ data }: HomeProps) {
//   return (
//     <div>
//       <h1>{data.title}</h1>
//       <ul>
//         {data.posts.map((post) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.content}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await fetch("../data/pages.json");
//   const data = await response.json();

//   console.log(data);

//   return {
//     props: {
//       data,
//     },
//   };
// };
// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };
