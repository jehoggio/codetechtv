// import { connectToDatabase } from '../util/mongodb';
import { signIn, signOut, useSession } from 'next-auth/client';
import { Container, Paper } from '@material-ui/core';
import Head from 'next/head';
import Hero from '../components/Hero';
import CategoriesButton from '../components/CategoriesButton';
import WatchButton from '../components/WatchButton';
import { YOUTUBE_ALL_VIDEOS_API } from '../constants/videoConstants';

export async function getServerSideProps() {
  const res = await fetch(
    `${YOUTUBE_ALL_VIDEOS_API}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data },
  };
}

export default function Home({ data }: any) {
  const [session, loading] = useSession();
  return (
    <Container>
      <Head>
        <title>CodeTech TV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />
      </main>
      <CategoriesButton />
      <WatchButton data={data} />
    </Container>
  );
}
