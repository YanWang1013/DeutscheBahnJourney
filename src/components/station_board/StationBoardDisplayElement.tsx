import NameAndPlatformDisplay from "./elements/NameAndPlatformDisplay";
import StationsDisplay from "./elements/StationsDisplay";
import TimeDisplay from "./elements/TimeDisplay";
import { StationBoardTrain } from "../../data/station_board";

export type StationBoardDisplayElementProps = {
    train: StationBoardTrain;
};

export default function StationBoardDisplayElement(
    props: StationBoardDisplayElementProps
): JSX.Element {
    return (
        <div className="flex h-full w-full flex-row">
            <div className={"h-full w-full min-w-[100px] max-w-[120px]"}>
                <TimeDisplay
                    arrivalTime={props.train.arrival?.time}
                    departureTime={props.train.departure?.time}
                />
            </div>
            <div className="flex w-full flex-col truncate pr-1 align-middle justify-start">
                <div className="my-auto w-full">
                    <NameAndPlatformDisplay trainData={props.train} />
                </div>
                <div className="my-auto">
                    <StationsDisplay trainData={props.train} />
                </div>
            </div>
        </div>
    );
}
