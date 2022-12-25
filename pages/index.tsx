import ArtCard from '../components/ArtCard'
import Header from '../components/Header';
import { ImageCard, ImageCfg } from '../types/imageTypes';
import { getDocs, limit, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { imageCol, imageBucket } from '../utils/databases';
import Head from 'next/head';
import { useState } from 'react';
import Filter from '../components/Filter';

type Props = {
  allImages: Array<ImageCard>;
  allCharacters: Array<string>;
  allMetas: Array<string>;
  allArtists: Array<string>;
}

export async function getStaticProps() {
  const docs = await getDocs(query(imageCol));
  const allImages: Array<ImageCard> = []
  const characters: Set<string> = new Set();
  const metas: Set<string> = new Set();
  const artists: Set<string> = new Set();

  await Promise.all(docs.docs.map(async (doc) => {
    const data = doc.data()
    const imgLink = await getDownloadURL(ref(imageBucket, data.blob));

    allImages.push({
      artists: data.artists,
      characters: data.characters,
      meta: data.meta,
      link: imgLink,
    })

    data.artists.forEach((artist) => artists.add(artist));
    data.characters.forEach((character) => characters.add(character));
    data.meta.forEach((meta) => metas.add(meta));
  }))

  return {
    props: {
      allImages: allImages,
      allCharacters: Array.from(characters).sort(),
      allMetas: Array.from(metas).sort(),
      allArtists: Array.from(artists).sort(),
    },
    revalidate: 86400
  }
}

export default function Home(props: Props) {
  const { allImages, allArtists, allCharacters, allMetas } = props;

  const [images, setImages] = useState(allImages);
  const [artistFilter, setArtistFilter] = useState<Array<string>>([]);
  const [characterFilter, setCharacterFilter] = useState<Array<string>>([]);
  const [metaFilter, setMetaFilter] = useState<Array<string>>([]);

  return (
    <>
      <Head>
        <title>EWA Catalog</title>
        <meta name='application-name' content="EWA's Catalog" />
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="EWA's catalog website" />
        <meta name="author" content="TraceL" />
      </Head>
      <div className='min-h-screen w-screen bg-gray-50'>
        <Header/>
        <Filter 
        allArtist={allArtists}
        allChar={allCharacters}
        allMeta={allMetas}
        currArtist={artistFilter}
        currChar={characterFilter}
        currMeta={metaFilter}
        setArtist={(artist) => setArtistFilter(artist)}
        setChar={(char) => setCharacterFilter(char)}
        setMeta={(meta) => setMetaFilter(meta)}
        />
        <div className='flex flex-wrap gap-4 justify-center xl:mx-24 lg:mx-14 md:mx-8 mx-4'>
          {allImages.map((imageCard, index) => <ArtCard imgCard={imageCard} key={index} />)}
        </div>
      </div>
    </>
  );
}
