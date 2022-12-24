import ArtCard from '../components/ArtCard'
import Header from '../components/Header';
import { ImageCard, ImageCfg } from '../types/imageTypes';
import { getDocs, limit, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { imageCol, imageBucket } from '../utils/databases';
import Head from 'next/head';

type Props = {
  images: Array<ImageCard>;
}

export async function getStaticProps() {
  const docs = await getDocs(query(imageCol));
  const images: Array<ImageCard> = []

  await Promise.all(docs.docs.map(async (doc) => {
    const data = doc.data()
    const imgLink = await getDownloadURL(ref(imageBucket, data.blob));
    console.log("Got download link for doc" + doc.id);

    images.push({
      artists: data.artists,
      characters: data.characters,
      meta: data.meta,
      link: imgLink,
    })
  }))

  return {
    props: {
      images
    },
    revalidate: 86400
  }
}

export default function Home(props: Props) {
  const images = props.images;

  return (
    <>
      <Head>
        <title>EWA Catalog</title>
        <meta name='application-name' content="EWA's Catalog" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="EWA's catalog website" />
        <meta name="author" content="TraceL" />
      </Head>
      <div className='min-h-screen w-screen bg-slate-100'>
        <Header/>
        <div className='flex flex-wrap gap-4 justify-center'>
          {images.map((imageCard, index) => <ArtCard imgCard={imageCard} key={index} />)}
        </div>
      </div>
    </>
  );
}
