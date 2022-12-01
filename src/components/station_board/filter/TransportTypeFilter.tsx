"use client";

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Switch, Transition } from "@headlessui/react";
import Button from "../../ui/button/Button";
import { FaFilter } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";

export enum TransportType {
    NationalExpress = "nationalExpress",
    National = "national",
    RegionalExp = "regionalExp",
    Regional = "regional",
    Suburban = "suburban",
    Bus = "bus",
    Ferry = "ferry",
    Subway = "subway",
    Tram = "tram",
    Taxi = "taxi"
}

export const transportTypes = [
    TransportType.NationalExpress,
    TransportType.National,
    TransportType.RegionalExp,
    TransportType.Regional,
    TransportType.Suburban,
    TransportType.Subway,
    TransportType.Tram,
    TransportType.Bus,
    TransportType.Ferry,
    TransportType.Taxi
];

export type TransportTypeFilterProps = {
    transportTypes: TransportType[]
    setTransportTypes: Dispatch<SetStateAction<TransportType[]>>
}

export default function TransportTypeFilter(props: TransportTypeFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)} className={"px-3 h-full"}>
                <FaFilter />
            </Button>
            <Transition appear show={isOpen} as={"div"}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={"div"}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={"bg-neutral-800 p-5 rounded-lg text-violet-400 flex flex-col w-[90vw] md:w-[70vw] xl:w-[50vw]"}>
                                    <Dialog.Title className={"flex flex-row justify-between text-xl font-bold w-full"}>
                                        <p>transportation</p>
                                        <button className={"hover:bg-neutral-900 p-1 transition-all duration-200 rounded-md"}
                                                onClick={() => setIsOpen(false)}>
                                            <IoCloseOutline color={"white"} size={24} />
                                        </button>
                                    </Dialog.Title>
                                    <Dialog.Description as={"div"} className={"flex flex-col gap-4 w-full h-fit justify-start pt-5"}>
                                        {transportTypes.map(type => {
                                            return (
                                                <Fragment key={type}>
                                                    <TransportTypeToggle
                                                        transportTypes={props.transportTypes}
                                                        setTransportTypes={props.setTransportTypes}
                                                        transportType={type}
                                                    />
                                                </Fragment>
                                            );
                                        })}
                                        <Button className={"text-white"} onClick={() => props.setTransportTypes(transportTypes)}>
                                            Filter Reset
                                        </Button>
                                    </Dialog.Description>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

function TransportTypeToggle(props: TransportTypeFilterProps & { transportType: TransportType }) {

    const enabled = props.transportTypes.includes(props.transportType)

    return (
        <div className={"flex flex-row gap-2"}>
            <Switch
                checked={props.transportTypes.includes(props.transportType)}
                onChange={value => {
                    if (value) {
                        props.setTransportTypes(prevState => prevState.concat(props.transportType));
                    } else {
                        props.setTransportTypes(prevState => prevState.filter(filter => filter !== props.transportType));
                    }
                }}
                className={
                    clsx(enabled ? "bg-sky-500" : "bg-neutral-900",
                        "relative inline-flex w-11 h-6 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
                        "duration 200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    )
                }
            >
                <span className="sr-only">{getReadableName(props.transportType)}</span>
                <span
                    aria-hidden="true"
                    className={`${enabled ? "translate-x-5" : "translate-x-0"}
                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            <p className={"text-white/70 font-semibold truncate"}>{getReadableName(props.transportType)}</p>
        </div>
    );
}

export function getReadableName(transportType: TransportType): string {
    let readableName: string;
    switch (transportType) {
        case TransportType.NationalExpress:
            readableName = "National Express";
            break;
        case TransportType.National:
            readableName = "National";
            break;
        case TransportType.RegionalExp:
            readableName = "Regional Exp";
            break;
        case TransportType.Regional:
            readableName = "Regional";
            break;
        case TransportType.Suburban:
            readableName = "Suburban";
            break;
        case TransportType.Tram:
            readableName = "Tram";
            break;
        case TransportType.Subway:
            readableName = "Subway";
            break;
        case TransportType.Bus:
            readableName = "Bus";
            break;
        case TransportType.Ferry:
            readableName = "Ferry";
            break;
        case TransportType.Taxi:
            readableName = "Taxi";
            break;
    }
    return readableName;
}
