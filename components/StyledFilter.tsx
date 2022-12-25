import { Listbox, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"
import { CheckIcon } from "@heroicons/react/24/solid"

type Props<T> = {
    selectedItems: T[];
    allItems: T[];
    setItems: (items: T[]) => void;
    buttonLabel: string;
}

type SimpleDOMRect = {
    top: number,
    left: number,
    width: number,
    height: number,
}

export default function StyledFilter<T extends ReactNode>(props: Props<T>) {
    const { selectedItems, allItems, setItems, buttonLabel } = props;

    const [currButtonRect, setButtonRect] = useState<SimpleDOMRect>({
        height: 0,
        left: 0,
        top: 0,
        width: 0,
    });
    const buttonNode = useRef<HTMLButtonElement>(null);

    const setButtonRectCallback = () => {
        if (buttonNode.current) {
            const trueRect = buttonNode.current.getBoundingClientRect();
            const rect: SimpleDOMRect = {
                height: trueRect.height,
                width: trueRect.width,
                left: trueRect.left,
                top: trueRect.top,
            }

            setButtonRect(rect);
        };
    }

    const getTopLeftStyle: () => React.CSSProperties = () => {
        const buttonMiddle = currButtonRect.left + (currButtonRect.width / 2)
        const targetLeft = buttonMiddle;

        return {
            top: currButtonRect.top + currButtonRect.height - 8,
            left: currButtonRect.left - 8,
            width: currButtonRect.width
        }
    }

    useEffect(() => {
        setButtonRectCallback();

        window.addEventListener('resize', setButtonRectCallback);

        return () => {
            window.removeEventListener('resize', setButtonRectCallback);
        }
    }, [])

    return (
        <Listbox value={selectedItems} onChange={setItems} multiple>
            <Listbox.Button ref={buttonNode} className="flex flex-row items-center justify-between md:w-36 lg:w-56 relative m-2 p-2 bg-stone-200 rounded-xl transition-all ease-in-out hover:shadow-inner hover:bg-stone-400">
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
                <Listbox.Options className="absolute mt-3 m-2 p-2 z-10 bg-stone-200 rounded-xl" style={getTopLeftStyle()}>
                    {allItems.map((item, idx) => (
                        <Listbox.Option
                            value={item}
                            key={idx}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li className={"flex flex-row items-center gap-2 py-1" + " " + (selected ? "" : "") + " " + (active ? "bg-stone-400" : "")}>
                                    <span className="w-5 h-5">
                                        {selected ? <CheckIcon/> : null}
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