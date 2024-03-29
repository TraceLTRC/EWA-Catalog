import Image from "next/image"
import logo from "../public/EWA-min.png"

export default function Header() {
    return(
        <header className="px-24 pt-8 pb-4">
            <div className="flex flex-col items-center">
                <Image src={logo} alt="EWA logo" height={124}/>
                <p className="tracking-wide font-extralight text-2xl md:text-4xl">Catalog</p>
            </div>
        </header>
    )
}