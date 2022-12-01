import { arrivalBoard, ArrivalBoardResult, departureBoard, DepartureBoardResult } from "../requests/vendor/stationBoard";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

export default async function getStationBoardData(
    stationId: string,
    datetimeParam: number
) {
    dayjs.extend(utc)
    dayjs.extend(timezone)

    const datetime = new Date(datetimeParam);
    const germanDate = dayjs(datetime).tz("Europe/Berlin");
    const time = germanDate.format("HH:mm");
    const date = germanDate.format("YYYY-MM-DD");

    const body = {
        searchTime: time,
        searchDate: date,
        startStopId: stationId,
        transportation: []
    };

    const departure = await departureBoard(body);
    const arrival = await arrivalBoard(body);
    const result: StationBoardResponse = {
        trains: []
    };
    const map = new Map<string, (DepartureBoardResult | ArrivalBoardResult)[]>();

    if (departure) {
        departure.forEach((element) => {
            map.set(element.tripId, [element]);
        });
    }
    if (arrival) {
        arrival.forEach((element) => {
            const existing = map.get(element.tripId) ?? [];
            map.set(element.tripId, existing.concat(element));
        });
    }
    map.forEach((value, key) => {
        const first = value[0];
        const second = value[1];

        const arrival =
            first != null
                ? "when" in first
                    ? (first as ArrivalBoardResult)
                    : second != null
                        ? "when" in second
                            ? (second as ArrivalBoardResult)
                            : undefined
                        : undefined
                : undefined;

        const departure =
            first != null
                ? "when" in first
                    ? (first as DepartureBoardResult)
                    : second != null
                        ? "when" in second
                            ? (second as DepartureBoardResult)
                            : undefined
                        : undefined
                : undefined;

        if (arrival == null && departure == null) {
            throw new Error("arrival or departure should be defined");
        }
        const arrivalOrDeparture: ArrivalBoardResult | DepartureBoardResult =
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            arrival ?? departure!;

        const train: StationBoardTrain = {
            journeyId: key,
            plannedPlatform: arrivalOrDeparture.plannedPlatform,
            platform: arrivalOrDeparture.platform,
            product: arrivalOrDeparture.line.product,
            name: arrivalOrDeparture.line.name,
            shortName: arrivalOrDeparture.line.productName
        };

        if (arrival != null) {
            train.arrival = {
                origin: arrival.origin?arrival.origin.name:"",
                time: {
                    scheduledTime: arrival.plannedWhen,
                    time: arrival.when
                }
            };
        }
        if (departure != null) {
            train.departure = {
                destination: departure.destination?departure.destination.name:"",
                time: {
                    scheduledTime: departure.plannedWhen,
                    time: departure.when
                }
            };
        }

        result.trains.push(train);
    });
    result.trains.sort((a, b) => {
        const aTime =
            a.departure != null
                ? new Date(a.departure.time.scheduledTime).getTime()
                : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                new Date(a.arrival!.time.scheduledTime).getTime();
        const bTime =
            b.departure != null
                ? new Date(b.departure.time.scheduledTime).getTime()
                : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                new Date(b.arrival!.time.scheduledTime).getTime();

        return aTime - bTime;
    });

    return result;
}

export type StationBoardResponse = {
    trains: StationBoardTrain[];
};

export type StationBoardTrain = {
    journeyId: string;
    arrival?: {
        origin: string;
        time: Time;
    };
    departure?: {
        destination: string;
        time: Time;
    };
    product: string;
    shortName: string;
    name: string;
    plannedPlatform?: string;
    platform?: string;
};

export type Time = {
    scheduledTime: string;
    time?: string;
};
