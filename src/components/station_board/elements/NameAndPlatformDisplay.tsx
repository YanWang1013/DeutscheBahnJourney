import clsx from "clsx";
import { StationBoardTrain } from "../../../data/station_board";

export type NameDisplayProps = {
    trainData: StationBoardTrain;
};

export default function NameAndPlatformDisplay(
    props: NameDisplayProps
): JSX.Element {
    const plannedPlatform = props.trainData.plannedPlatform;
    const platform = props.trainData.platform;

    const isDifferentPlatform =
        plannedPlatform != null
            ? platform != null
                ? plannedPlatform !== platform
                : undefined
            : undefined;

    return (
        <div className={"relative flex h-full w-full flex-row align-middle"}>
            <div className="my-auto text-lg font-semibold">
                {props.trainData.name}
            </div>
            {props.trainData.plannedPlatform != null && (
                <div className={"absolute right-0 flex flex-row bg-neutral-700 rounded-md"}>
                    <div className={"flex flex-row p-1"}>
                        <p className={"m-auto"}>Gl.</p>
                        <div
                            className={clsx(
                                "my-auto pl-1",
                                isDifferentPlatform === true && "text-red-500 line-through"
                            )}
                        >
                            {props.trainData.plannedPlatform}
                        </div>
                        {isDifferentPlatform === true && (
                            <>
                                <div className={"my-auto pl-1"}>{props.trainData.platform}</div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
