import Image from "next/image"
import logo from "../public/EWA-min.png"

export default function Header() {
    return(
        <header className="px-24 py-8">
            <div className="flex flex-col items-center">
                <Image src={logo} alt="EWA logo" style={{"mixBlendMode": "darken"}} height={124}/>
                <p className="tracking-wide font-extralight text-4xl">Catalog</p>
            </div>
        </header>
    )
}