export type MaritimeGlobeMode = "ships" | "flow";

export type RawShipPoint = {
    lat: number;
};
export type FormattedShipPoint = {
    lat: number;
    lng: number;
    radius: number;
    color: string;
};