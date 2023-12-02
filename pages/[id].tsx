import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useData } from '../hooks/useData';

interface Props {
 id: string;
}

const DynamicPage: React.FC<Props> = ({ id }) => {
 const router = useRouter();
 const [data, loading] = useData(id);
 console.log(data);
 

 if (router.isFallback) {
    return <div>Loading...</div>;
 }

 if (loading) {
    return <div>Loading data...</div>;
 }

 return (
    <div>
      <h1>{data?.id}</h1>
      <p>{data?.content}</p>
    </div>
 );
};

export const getStaticPaths: GetStaticPaths = async () => {
 const paths = ['page1', 'page2', 'page3'].map((id) => ({
    params: { id },
 }));

 return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
 const id = context.params?.id as string;

 return {
    props: { id },
    revalidate: 1,
 };
};

export default DynamicPage;