import { ImageCard } from "../types/imageTypes"
import Image from "next/image"

export default function ArtCard({ imgCard }: {imgCard: ImageCard}) {
    const onClickImage = (src: string) => {
        const newWindow = window.open(src, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    return (
    <div className="shadow-md shadow-zinc-500 rounded-2xl bg-white border w-80 h-[36rem] flex flex-col">
        <div className="basis-3/4 pt-4 px-1 pb-1">
            <div className="relative h-full cursor-pointer" onClick={() => onClickImage(imgCard.link)}>
                <Image src={imgCard.link} alt={imgCard.meta.join(' ')} fill style=
                {{
                    "objectFit":"contain",
                }}
                sizes="20vw"/>
            </div>
        </div>
        <div>
            <p>Hello!</p>
        </div>
    </div>
    )
}