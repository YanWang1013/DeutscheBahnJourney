export async function getStationInfoData(
    stationId: string
): Promise<StationInfo> {
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: `{"query":"query Query {station(id: ${stationId}) {id name isMeta}}","operationName":"Query"}`,
    };
    const stationInfo: StationInfoResponse = await fetch(
        "https://hafas-graphql-cf.nycode.dev/",
        options
    ).then((response) => response.json());

    // { id: 8011160, name: 'Berlin Hbf', isMeta: false }
    return stationInfo.data.station;
}

type StationInfoResponse = {
    data: {
        station: StationInfo;
    };
};

type StationInfo = {
    id: number;
    name: string;
    isMeta: boolean;
};
