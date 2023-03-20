import type { NextPage } from 'next';
import Head from 'next/head';
import Login from '../components/Login';
import AuthCheck from '../firebase/AuthCheck';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Firebase - Next</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='mx-auto max-w-7xl flex flex-col items-center justify-center'>
        <AuthCheck>
          <Login />
        </AuthCheck>
      </main>
    </>
  );
};

export default Home;
