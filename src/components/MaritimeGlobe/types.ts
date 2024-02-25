export type MaritimeGlobeMode = "ships" | "flow";

export type RawMicroplasticPoint = {
    "Concentration Class": "Very Low" | "Low" | "Medium" | "High" | "Very High";
    ID: string;
    Oceans: string;
    Date: string;
    Latitude: string;
    Longitude: string;
    "Microplastics Measurement (density)": string;
    Unit: string;
    "Water Sample Depth (m)": string;
}

export type PlottableMicroplasticPoint = RawMicroplasticPoint & {
    lat: number;
    lng: number;
    color: string;
    radius: number;
    height: number;
}