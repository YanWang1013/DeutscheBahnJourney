import { StationBoardTrain } from "../../../data/station_board";

export type StationsDisplayProps = {
    trainData: StationBoardTrain;
};

export default function StationsDisplay(
    props: StationsDisplayProps
): JSX.Element {
    const arrival = props.trainData.arrival;
    const departure = props.trainData.departure;

    function getElement(): JSX.Element {
        if (arrival && departure) {
            return (
                <>
                    <div className={"flex truncate font-sans text-zinc-400"}>
                        From: <p className={"ml-2 truncate text-white"}>{arrival.origin}</p>
                    </div>
                    <div className={"flex truncate font-sans text-zinc-400"}>
                        Next:
                        <p className={"ml-2 truncate text-white"}>
                            {departure.destination}
                        </p>
                    </div>
                </>
            );
        }

        if (arrival && !departure) {
            return (
                <div className={"flex truncate font-sans text-zinc-400"}>
                    From: <p className={"ml-2 truncate text-white"}>{arrival.origin}</p>
                </div>
            );
        }

        if (!arrival && departure) {
            return (
                <div className={"flex truncate font-sans text-zinc-400"}>
                    Next:
                    <p className={"ml-2 truncate text-white"}>{departure.destination}</p>
                </div>
            );
        }

        return <></>;
    }

    return (
        <div className="flex max-w-full flex-col truncate text-sm">
            {getElement()}
        </div>
    );
}
