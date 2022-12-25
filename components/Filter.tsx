import { Listbox } from "@headlessui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import StyledFilter from "./StyledFilter";

type Props = {
    currArtist: string[];
    allArtist: string[];
    setArtist: (artist: string[]) => void;

    currMeta: string[];
    allMeta: string[];
    setMeta: (meta: string[]) => void;

    currChar: string[];
    allChar: string[];
    setChar: (char: string[]) => void;
}

export default function Filter(props: Props) {
    const { currArtist, allArtist, setArtist, currMeta, allMeta, setMeta, currChar, allChar, setChar } = props

    return (
        <div className="flex items-center justify-center">
            <div className="my-2 mx-12 md:mx-24 w-full md:w-min shadow-2xl bg-white rounded-xl flex flex-col md:flex-row md:gap-11 justify-center">
                <StyledFilter allItems={allArtist} selectedItems={currArtist} setItems={setArtist} buttonLabel="Artist" />
                <StyledFilter allItems={allChar} selectedItems={currChar} setItems={setChar} buttonLabel="Character" />
                <StyledFilter allItems={allMeta} selectedItems={currMeta} setItems={setMeta} buttonLabel="Fandom" />
            </div>
        </div>
    )
}