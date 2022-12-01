export type JourneyDetails = {
    line: {
        type?: string,
        id: string,
        fahrtNt: string,
        name: string,
        productName: string,
        product: string,
        operator?: {
            type: string,
            id: string,
            name: string
        }
    },
    departure?: string,
    plannedDeparture?: string,
    arrival?: string,
    plannedArrival?: string,
    arrivalPlatform?: string,
    plannedArrivalPlatform?: string,
    departurePlatform?: string,
    plannedDeparturePlatform?: string,
    stopovers: Stop[],
    remarks: remarkNotice[],
    direction: string,
    tripId: string
}

type remarkNotice = {
    text: string,
    type: string,
    code: string,
    summary: string
}

type stopRemarkNotice = {
    type: string,
    code: string,
    text: string
}

type Stop = {
    plannedArrival?: string,
    plannedDeparture?: string,
    arrival?: string,
    departure?: string,
    stop: {
        type: string,
        id: string,
        name: string
    },
    arrivalPlatform?: string,
    plannedArrivalPlatform?: string,
    departurePlatform?: string,
    plannedDeparturePlatform?: string,
    remarks?: stopRemarkNotice[]
}

type JourneyDetailResponse = {
    line: {
        type?: string,
        id: string,
        fahrtNt: string,
        name: string,
        productName: string,
        product: string
    },
    departure?: string,
    plannedDeparture?: string,
    arrival?: string,
    plannedArrival?: string,
    arrivalPlatform?: string,
    plannedArrivalPlatform?: string,
    departurePlatform?: string,
    plannedDeparturePlatform?: string,
    stopovers: {
        plannedArrival?: string,
        plannedDeparture?: string,
        arrival?: string,
        departure?: string,
        stop: {
            type: string,
            id: string,
            name: string
        },
        arrivalPlatform?: string,
        plannedArrivalPlatform?: string,
        departurePlatform?: string,
        plannedDeparturePlatform?: string,
        remarks?: stopRemarkNotice[]
    }[],
    remarks: remarkNotice[],
    direction: string,
    tripId: string
}

export default async function journeyDetails(tripId: string, lineNumber: string): Promise<JourneyDetails> {

    const rawResponse = await fetch(`https://v5.db.transport.rest/trips/${tripId}?lineName=${lineNumber}`);
    const response: JourneyDetailResponse = await rawResponse.json();

    return {
        line: {
            type: response.line.type,
            id: response.line.id,
            fahrtNt: response.line.fahrtNt,
            name: response.line.name,
            productName: response.line.productName,
            product: response.line.product
        },
        departure: response.departure,
        plannedDeparture: response.plannedDeparture,
        arrival: response.arrival,
        plannedArrival: response.plannedArrival,
        arrivalPlatform: response.arrivalPlatform,
        plannedArrivalPlatform: response.plannedArrivalPlatform,
        departurePlatform: response.departurePlatform,
        plannedDeparturePlatform: response.plannedDeparturePlatform,
        stopovers: response.stopovers.map(value => {
            return {
                plannedArrival: value.plannedArrival,
                plannedDeparture: value.plannedDeparture,
                arrival: value.arrival,
                departure: value.departure,
                stop: {
                    type: value.stop.type,
                    id: value.stop.id,
                    name: value.stop.name
                },
                arrivalPlatform: value.arrivalPlatform,
                plannedArrivalPlatform: value.plannedArrivalPlatform,
                departurePlatform: value.departurePlatform,
                plannedDeparturePlatform: value.plannedDeparturePlatform,
                remarks: value.remarks && value.remarks.map(value2 => {
                    return {
                        type: value2.type,
                        code: value2.code,
                        text: value2.text
                    }
                }),
            };
        }),
        remarks: response.remarks.map(value => {
            return {
                text: value.text,
                type: value.type,
                code: value.code,
                summary: value.summary
            }
        }),
        direction: response.direction,
        tripId: response.tripId
    };
}