import { Listbox, Switch, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useLayoutEffect, useRef, useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { CheckIcon } from "@heroicons/react/24/solid"
import { useFloating } from "@floating-ui/react-dom";
import { autoUpdate, offset } from "@floating-ui/react-dom";

type Props<T> = {
    selectedItems: T[];
    allItems: T[];
    setItems: (items: T[]) => void;
    anyFilter: boolean;
    setAnyFilter: (set: boolean) => void;
    buttonLabel: string;
}

export default function StyledFilter<T extends ReactNode>(props: Props<T>) {
    const { selectedItems, allItems, setItems, buttonLabel, anyFilter, setAnyFilter } = props;

    const {x, y, reference, floating, strategy} = useFloating<HTMLButtonElement>({
        whileElementsMounted: autoUpdate,
        middleware: [offset({crossAxis: -8, mainAxis: -8})]
    });

    return (
        <Listbox value={selectedItems} onChange={setItems} multiple>
            <Listbox.Button ref={reference} className="flex flex-row items-center justify-between w-72 md:w-48 lg:w-72 relative m-2 p-2 bg-stone-200 rounded-xl transition-all ease-in-out hover:shadow-inner hover:bg-stone-400">
                <span className="mx-2">
                    {selectedItems.length == 0 ? `${buttonLabel}...` : `${buttonLabel} (${selectedItems.length})`}
                </span>
                <span className="h-5 w-5">
                    <ChevronUpDownIcon />
                </span>
            </Listbox.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Listbox.Options ref={floating} 
                style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                }}
                className="absolute w-72 md:w-48 lg:w-72 mt-3 m-2 z-10 shadow-inner outline outline-2 outline-stone-200 bg-white rounded-xl overflow-y-scroll h-64"
                >
                    <div className="flex items-center justify-center sticky top-0 bg-white">
                        <div className="text-md tracking-tight font-light">
                            Any
                        </div>
                        <Switch
                            onChange={setAnyFilter}
                            checked={anyFilter}
                            className={`${anyFilter ? 'bg-blue-600' : 'bg-gray-200'
                                }  rounded-xl w-12 h-6 mx-4 my-2 transition-colors`}
                        >
                            <span className={`${anyFilter ? 'translate-x-3' : '-translate-x-3'} transform-gpu transition ease-in-out rounded-full bg-stone-100 w-6 h-6 inline-block shadow-lg`}>

                            </span>
                        </Switch>
                        <div className="text-md tracking-tight font-light">
                            All
                        </div>
                    </div>
                    {allItems.map((item, idx) => (
                        <Listbox.Option
                            value={item}
                            key={idx}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li className={"flex flex-row items-center gap-2 py-1 text-sm tracking-tight transition-colors duration-75 cursor-default" + " "
                                    + (selected ? "font-bold" : "font-light") + " "
                                    + (active ? "bg-stone-400" : "") + " "
                                    + (idx == allItems.length - 1 ? "rounded-b-xl" : "")}
                                >
                                    <span className="w-5 h-5 ml-1">
                                        {selected ? <CheckIcon /> : null}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}