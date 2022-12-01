export type JourneyBoardRequest = {
    searchTime: string;
    searchDate: string;
    startStopId: string;
    transportation: string[];
};

export type DepartureBoardResult = {
    tripId: string;
    stop: {
        type: string;
        id: string;
        location: {
            latitude: number;
            longitude: number;
        };
        products: string[];
    };
    when: string;
    plannedWhen: string;
    platform: string;
    plannedPlatform: string;
    delay: string;
    direction: string;
    line: {
        type: string;
        id: string;
        name: string;
        productName: string;
        mode: string;
        product: string;
        operator: {
            type: string;
            id: string;
            name: string;
        }
    };
    remarks: {
        type: string;
        code: string;
        text: string;
    };
    destination: {
        type: string;
        id: string;
        name: string;
        location: {
            latitude: number;
            longitude: number;
        };
        products: string[];
    };
};

export type ArrivalBoardResult = {
    tripId: string;
    stop: {
        type: string;
        id: string;
        location: {
            latitude: number;
            longitude: number;
        };
        products: string[];
    };
    when: string;
    plannedWhen: string;
    platform: string;
    plannedPlatform: string;
    delay: string;
    direction: string;
    line: {
        type: string;
        id: string;
        name: string;
        productName: string;
        mode: string;
        product: string;
        operator: {
            type: string;
            id: string;
            name: string;
        }
    };
    remarks: {
        type: string;
        code: string;
        text: string;
    };
    origin: {
        type: string;
        id: string;
        name: string;
        location: {
            latitude: number;
            longitude: number;
        };
        products: string[];
    };
};

export async function departureBoard(
    body: JourneyBoardRequest
): Promise<DepartureBoardResult[]> {
    const when = body.searchDate+"T"+body.searchTime;
    const response = await fetch(`https://v5.db.transport.rest/stops/${body.startStopId}/departures?when=${when}`);
    return response.json();
}

export async function arrivalBoard(
    body: JourneyBoardRequest
): Promise<ArrivalBoardResult[]> {
    const when = body.searchDate+"T"+body.searchTime;
    const response = await fetch(`https://v5.db.transport.rest/stops/${body.startStopId}/arrivals?when=${when}`);
    return response.json();
}