"use client";

import { useElementSize, useLocalStorage } from "@mantine/hooks";
import { CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import StationBoardDisplayElement from "./StationBoardDisplayElement";
import { StationBoardResponse } from "../../data/station_board";
import { useRouter } from "next/navigation";
import { TransportType, transportTypes } from "./filter/TransportTypeFilter";

export type StationBoardDisplayContainerProps = {
    data: StationBoardResponse;
};

export default function StationBoardDisplayContainer(
    props: StationBoardDisplayContainerProps
): JSX.Element {
    const { ref, width, height } = useElementSize();

    const [currentTransportTypes] = useLocalStorage<TransportType[]>({
        key: "transport-types",
        defaultValue: transportTypes
    });
    // const currentTransportTypes = transportTypes;
    const filteredData = props.data.trains.filter(train => {
        let isIncluded = false;
        currentTransportTypes.forEach(value => {
            const productTypes = getProductTypesFromTransportType(value);
            if (productTypes && productTypes.length > 0) {
                if (productTypes.includes(train.product)) {
                    isIncluded = true;
                }
            }
        })
        return isIncluded;
    })
    const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        const trainData = filteredData[index]!;

        const router = useRouter()

        return (
            <div style={style}>
                <button
                    className={
                        "h-full w-full border-b-[1px] border-zinc-600 pr-2 hover:bg-neutral-800/50"
                    }
                    key={trainData.journeyId}
                    onClick={() => {
                        router.push(`/journey/${encodeURIComponent(trainData.journeyId+"-"+trainData.name)}}`)
                    }}
                >
                    <StationBoardDisplayElement train={trainData} />
                </button>
            </div>
        );
    };

    return (
        <div className={"flex h-full w-full"} ref={ref}>
            <List
                itemSize={100}
                height={height}
                itemCount={filteredData.length}
                width={width}
            >
                {Row}
            </List>
        </div>
    );

}


function getProductTypesFromTransportType(transportType: TransportType): string[] {
    let productTypes: string[];
    switch (transportType) {
        case TransportType.NationalExpress:
            productTypes = ["nationalExpress", "ICE"]
            break;
        case TransportType.National:
            productTypes = ["national", "IC"];
            break;
        case TransportType.RegionalExp:
            productTypes = ["regionalExp"]; // idk
            break;
        case TransportType.Regional:
            productTypes = ["regional", "RE"];
            break;
        case TransportType.Suburban:
            productTypes = ["suburban", "S"];
            break;
        case TransportType.Tram:
            productTypes = ["tram", "STR"];
            break;
        case TransportType.Subway:
            productTypes = ["subway", "U"];
            break;
        case TransportType.Bus:
            productTypes = ["bus", "Bus"];
            break;
        case TransportType.Ferry:
            productTypes = ["ferry"];
            break;
        case TransportType.Taxi:
            productTypes = ["taxi"];
            break;
        }

    return productTypes
}
