"use client";

import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { TabSelection } from "../components/ui/TabSelection";
import { Ticket } from "tabler-icons-react";
import StationBoardPanel from "./StationBoardPanel";

export default function HomePage() {
    const isKeyboardOpen = useDetectKeyboardOpen();

    return (
        <Tab.Group>
            <Tab.Panels className="flex w-full justify-center py-3 text-white">
                <Tab.Panel key={"station_board"}>
                    <StationBoardPanel />
                </Tab.Panel>
            </Tab.Panels>
            <div className="flex w-screen justify-center align-middle">
                <Tab.List
                    className={clsx(
                        "bottom-0 flex h-16 w-screen flex-row bg-neutral-800 md:w-[70vw] md:rounded-t-md xl:w-[50vw]",
                        isKeyboardOpen ? "hidden" : "absolute"
                    )}
                >
                    <TabSelection
                        key={"station_board"}
                        selection="Station Board"
                        icon={<Ticket color="white" />}
                    />
                </Tab.List>
            </div>
        </Tab.Group>
    );
}
