import React, { Suspense } from "react";
import { getStationInfoData } from "../../../data/station_info";
import { asyncComponent } from "../../../utils/async_component_fix";
import ReloadButton from "./ReloadButton";
import GoBackButton from "../../../components/ui/button/GoBackButton";
import FilterButtonContainer from "./FilterButtonContainer";

export default async function Layout({ children, params }: {
    children?: React.ReactNode;
    params?: { station?: string };
}) {
    return (
        <div className={"h-screen text-white"}>
            <div
                className={
                    "fixed flex h-14 w-full border-b-4 border-b-zinc-700 bg-neutral-800 align-middle"
                }
            >
                <div className={"absolute flex h-full ml-3 left-0"}>
                    <GoBackButton className={"my-[9px]"} />
                </div>
                <div className={"my-auto sm:m-auto ml-14 text-lg font-semibold"}>
                    <Suspense fallback={""}>
                        <StationName stationId={params?.station ?? "8000105"} />
                    </Suspense>
                </div>
                <div className={"absolute flex h-full px-2 right-0 gap-1"}>
                    <ReloadButton stationId={params?.station ?? "8000105"} className={"my-auto text-sm"} />
                    <FilterButtonContainer />
                </div>
            </div>
            {children}
        </div>
    );
}

const StationName = asyncComponent(async (props: { stationId: string }) => {
    const data = await getStationInfoData(props.stationId);
    return (
        <h1>{data.name}</h1>
    );
});
