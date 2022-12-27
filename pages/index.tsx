import ArtCard from '../components/ArtCard'
import Header from '../components/Header';
import { ImageCard, ImageCfg } from '../types/imageTypes';
import { Primitive } from 'firebase/firestore';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Filter from '../components/Filter';
import createFirebaseApp from '../utils/firebaseClient';
import admin from '../utils/firebaseAdmin';
import useOnScreen from '../hooks/useOnScreen';
import { ArrowUpIcon } from '@heroicons/react/20/solid';

type Props = {
  allImages: Array<ImageCard>;
  allCharacters: Array<string>;
  allMetas: Array<string>;
  allArtists: Array<string>;
}

export async function getStaticProps() {
  const imageBucket = await admin.storage().bucket();
  const docs = await admin.firestore().collection('images').get()

  const allImages: Array<ImageCard> = []
  const characters: Set<string> = new Set();
  const metas: Set<string> = new Set();
  const artists: Set<string> = new Set();

  await Promise.all(docs.docs.map(async (doc) => {
    const data: ImageCfg = doc.data() as ImageCfg
    const [imgLink] = await imageBucket.file(data.blob).getSignedUrl({
      action: 'read',
      expires: Date.now() + (86400 * 1000),
    })

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

function arraysEqualAll<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  const aCopy = [...a].sort();
  const bCopy = [...b].sort();

  for (var i = 0; i < aCopy.length; ++i) {
    if (aCopy[i] !== bCopy[i]) return false;
  }
  return true;
}

function arraysEqualAny<T extends Primitive>(a: T[], b: T[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;

  for (const el of a) {
    if (b.includes(el)) return true;
  }

  return false;
}

export default function Home(props: Props) {
  const { allImages, allArtists, allCharacters, allMetas } = props;

  const filterRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<Array<ImageCard>>(allImages)
  const [artistFilter, setArtistFilter] = useState<Array<string>>([]);
  const [characterFilter, setCharacterFilter] = useState<Array<string>>([]);
  const [metaFilter, setMetaFilter] = useState<Array<string>>([]);

  const [isFilterAllArtist, setFilterAllArtist] = useState<boolean>(false);
  const [isFilterAllChar, setFilterAllChar] = useState<boolean>(false);
  const [isFilterAllMeta, setFilterAllMeta] = useState<boolean>(false);

  const isOnScreen = useOnScreen(filterRef, true);

  // Firebase stuff
  useEffect(() => {
    const app = createFirebaseApp();

    console.log("We are logging the performance and analytics of the website! Please keep that in mind. Thank you!")
  }, [])

  useEffect(() => {
    function filterArtists(imagesToFilter: ImageCard[]) {
      if (artistFilter.length == 0) return imagesToFilter;

      if (isFilterAllArtist) {
        return imagesToFilter.filter((img) => arraysEqualAll(img.artists, artistFilter));
      } else {
        return imagesToFilter.filter((img) => arraysEqualAny(img.artists, artistFilter))
      }
    }

    function filterChars(imagesToFilter: ImageCard[]) {
      if (characterFilter.length == 0) return imagesToFilter;

      if (isFilterAllChar) {
        return imagesToFilter.filter((img) => arraysEqualAll(img.characters, characterFilter));
      } else {
        return imagesToFilter.filter((img) => arraysEqualAny(img.characters, characterFilter))
      }
    }

    function filterMetas(imagesToFilter: ImageCard[]) {
      if (metaFilter.length == 0) return imagesToFilter;

      if (isFilterAllMeta) {
        return imagesToFilter.filter((img) => arraysEqualAll(img.meta, metaFilter));
      } else {
        return imagesToFilter.filter((img) => arraysEqualAny(img.meta, metaFilter))
      }
    }

    const filteredArtists = filterArtists(allImages);
    const filteredChars = filterChars(filteredArtists);
    const filteredImages = filterMetas(filteredChars);

    setImages(filteredImages);
  }, [artistFilter, characterFilter, metaFilter, isFilterAllArtist, isFilterAllChar, isFilterAllMeta])

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
        <Header />
        <Filter
          ref={filterRef}
          allArtist={allArtists}
          allChar={allCharacters}
          allMeta={allMetas}
          currArtist={artistFilter}
          currChar={characterFilter}
          currMeta={metaFilter}
          setArtist={(artist) => setArtistFilter(artist)}
          setChar={(char) => setCharacterFilter(char)}
          setMeta={(meta) => setMetaFilter(meta)}
          filterAllArtist={isFilterAllArtist}
          filterAllChar={isFilterAllChar}
          filterAllMeta={isFilterAllMeta}
          setFilterAllArtist={(bool) => setFilterAllArtist(bool)}
          setFilterAllChar={(bool) => setFilterAllChar(bool)}
          setFilterAllMeta={(bool) => setFilterAllMeta(bool)}
        />
        <div className='flex flex-wrap gap-4 justify-center xl:mx-24 lg:mx-14 md:mx-8 mx-4 mb-8'>
          {images.map((imageCard, index) => <ArtCard imgCard={imageCard} key={index} priority={index < 4} />)}
        </div>
        <div className='fixed mx-4 mb-4 bottom-0 right-0 h-16 w-16 drop-shadow-2xl z-50'>
          <button className={
            'shadow-2xl shadow-black transform transition-all ease-in-out duration-500 w-full h-full bg-blue-500 rounded-full flex justify-center items-center z-50' + " "
            + (isOnScreen ? "translate-y-32" : "translate-y-0")
          } onClick={() => window.scroll({ top: 0 })}>
            <span className='text-white h-8 w-8'>
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
