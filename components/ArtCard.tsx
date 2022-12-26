import { ImageCard } from "../types/imageTypes"
import Image from "next/image"
import { useState } from "react"

export default function ArtCard({ imgCard }: { imgCard: ImageCard }) {
    const [isLoading, setLoading] = useState(true);

    const onClickImage = (src: string) => {
        const newWindow = window.open(src, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    return (
        <div className="shadow-md shadow-zinc-500 rounded-2xl bg-white border w-80 h-[36rem] flex flex-col">
            <div className="basis-3/4 pt-4 px-1 pb-1">
                <div className="relative h-full cursor-pointer" onClick={() => onClickImage(imgCard.link)}>
                    <Image src={imgCard.link} alt={imgCard.meta.join(', ')} fill style={{
                        "objectFit": "contain",
                    }}
                        onLoadingComplete={() => setLoading(false)} sizes="310px"
                    />
                    {
                        isLoading ?
                            <div className="h-full w-full flex justify-center items-center z-30">
                                <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-stone-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div> : null
                    }
                </div>
            </div>
            <article className="mx-6 my-4">
                <p className="text-xl my-2">Fandom: {imgCard.meta.join(', ')}</p>
                <p className="my-2">Artist: {imgCard.artists.join(', ')}</p>
            </article>
        </div>
    )
}