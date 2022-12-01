export type StationSearchRequest = {
    locationTypes: string[];
    searchTerm: string;
};

export type StationSearchResponse = StationSearchResult[];

export type StationSearchResult = {
    location: {
        latitude: number;
        longitude: number;
    };
    id: string;
    type: string;
    name: string;
    products: string[];
};

const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default async function searchStation(
    body: StationSearchRequest
): Promise<StationSearchResponse> {
    const response = await fetch(`${getBaseUrl()}/api/vendor/search`, {
        method: "POST",
        body: JSON.stringify(body),
    });
    return response.json();
}