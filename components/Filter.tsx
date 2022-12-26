import { Listbox } from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import StyledFilter from "./StyledFilter";

type Props = {
    currArtist: string[];
    allArtist: string[];
    setArtist: (artist: string[]) => void;
    filterAllArtist: boolean;
    setFilterAllArtist: (set: boolean) => void

    currMeta: string[];
    allMeta: string[];
    setMeta: (meta: string[]) => void;
    filterAllMeta: boolean;
    setFilterAllMeta: (set: boolean) => void

    currChar: string[];
    allChar: string[];
    setChar: (char: string[]) => void;
    filterAllChar: boolean;
    setFilterAllChar: (set: boolean) => void
}

export default function Filter(props: Props) {
    const { 
        currArtist, allArtist, setArtist, filterAllArtist, setFilterAllArtist,
        currMeta, allMeta, setMeta, filterAllMeta, setFilterAllMeta,
        currChar, allChar, setChar, filterAllChar, setFilterAllChar,
    } = props

    return (
        <div className="flex items-center justify-center sticky top-0 z-50 drop-shadow-md">
            <div className="mb-8 mt-4 mx-12 md:mx-24 w-min shadow-2xl bg-white rounded-xl flex flex-col md:flex-row md:gap-4 justify-center">
                <StyledFilter allItems={allArtist} selectedItems={currArtist} setItems={setArtist} buttonLabel="Artist" anyFilter={filterAllArtist} setAnyFilter={setFilterAllArtist}/>
                <StyledFilter allItems={allChar} selectedItems={currChar} setItems={setChar} buttonLabel="Character" anyFilter={filterAllChar} setAnyFilter={setFilterAllChar}/>
                <StyledFilter allItems={allMeta} selectedItems={currMeta} setItems={setMeta} buttonLabel="Fandom" anyFilter={filterAllMeta} setAnyFilter={setFilterAllMeta}/>
            </div>
        </div>
    )
}