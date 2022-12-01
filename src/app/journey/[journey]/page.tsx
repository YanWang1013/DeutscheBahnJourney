import journeyDetails from "../../../requests/vendor/journeyDetails";
import React from "react";
import StopTimeDisplay from "./StopTimeDisplay";
import clsx from "clsx";
import NoticeDisplay from "./NoticeDisplay";
import GoBackButton from "../../../components/ui/button/GoBackButton";

export default async function Page({ params }: { params: { journey: string} }): Promise<JSX.Element> {
    const tripId = params.journey.split("-")[0];
    const lineNumber = params.journey.split("-")[1];
    const data = await journeyDetails(tripId?tripId:"", lineNumber?lineNumber:"");

    return (
        <>
            <div className={"h-screen text-white"}>
                <div
                    className={
                        "fixed flex h-14 border-b-4 border-b-zinc-700 bg-neutral-800 w-full justify-start z-10"
                    }
                >
                    <div className={"flex flex-row gap-1 sm:gap-2 my-auto ml-3 text-md sm:text-lg font-semibold truncate mr-1"}>
                        <GoBackButton />
                        <div className={"my-auto "}>
                            {data.line.name}
                        </div>
                        <div className={"my-auto text-sm uppercase text-zinc-400"}>
                            next
                        </div>
                        <div className={"my-auto truncate"}>
                            {data.direction}
                        </div>
                    </div>
                    <div className={"absolute flex h-full px-3 right-0"}>
                    </div>
                </div>
                <div className={"flex align-middle pt-14 w-full"}>
                    <div className={"flex flex-col sm:flex-row gap-0 sm:gap-1 sm:m-auto text-lg font-bold p-2 text-zinc-400"}>
                        <span
                            className={"text-white"}>{data.line.name} {data.line.product === "RB" && `(${data.line.fahrtNt})`}
                        </span>
                    </div>
                </div>
                <div className={"mb-5 flex w-full flex-col gap-1 p-2"}>
                    {data.remarks.map((notice) => (
                        <NoticeDisplay
                            text={notice.text}
                            key={notice.text}
                        />
                    ))}
                </div>
                <div className={"h-screen w-full"}>
                    {data.stopovers.map(stop => {
                        const plannedPlatform = stop.plannedArrivalPlatform;
                        const platform = stop.arrivalPlatform;

                        const isDifferentPlatform =
                            plannedPlatform != null
                                ? platform != null
                                    ? plannedPlatform !== platform
                                    : undefined
                                : undefined;

                        return (
                            <div className="flex w-full flex-row border-t-[1px] border-zinc-600 p-2 min-h-[5.5rem]" key={stop.stop.name}>
                                <div className={"w-full min-w-[100px] max-w-[120px]"}>
                                    <StopTimeDisplay
                                        plannedArrival={stop.plannedArrival}
                                        arrival={stop.arrival}
                                        plannedDeparture={stop.plannedDeparture}
                                        departure={stop.departure}
                                    />
                                </div>
                                <div className="flex w-full flex-col truncate pr-4 align-middle justify-start">
                                    <div className={"text-lg font-bold truncate mr-6"}>{stop.stop.name}</div>
                                </div>
                                {stop.remarks && stop.remarks.length > 0 && (
                                    <>
                                        {stop.remarks.map((notice) => (
                                            <div
                                                className={"truncate text-red-500"}
                                                key={notice.text}
                                            >
                                                {notice.text}
                                            </div>
                                        ))}
                                    </>
                                )}
                                {stop.arrivalPlatform != null && (
                                    <div className={"absolute right-0 flex flex-row p-1 z-0 bg-neutral-700 rounded-md mr-2"}>
                                        <div className={"flex flex-row m-auto"}>
                                            <p className={""}>Gl.</p>
                                            <div
                                                className={clsx(
                                                    "my-auto pl-1",
                                                    isDifferentPlatform === true && "text-red-500 line-through"
                                                )}
                                            >
                                                {plannedPlatform}
                                            </div>
                                            {isDifferentPlatform === true && (
                                                <>
                                                    <div className={"my-auto pl-1"}>{platform}</div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}