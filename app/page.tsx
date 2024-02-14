import '@/app/styles/styles.scss';
import type { NextPage } from 'next/types';
import ShortenURL from '@/app/components/ShortenURL';
import OriginalURL from '@/app/components/OriginalURL';

const Home: NextPage = () => {
  return (
    <main className='main-layout'>
      <ShortenURL />
      <OriginalURL />
    </main>
  );
};

export default Home;
