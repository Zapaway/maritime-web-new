// @ts-expect-error Bypass this "error".
import microplasticPoints from "../../assets/world_oceans.csv";
import { RawMicroplasticPoint, PlottableMicroplasticPoint } from "./types";


const COLOR_CODES = {"Very Low": "#04F100", "Low": "#87F100", "Medium": "#FFDC00", "High": "#F19600", "Very High": "#F10000",}
const HEIGHT_CODES = {"Very Low": 0.1, "Low": 0.15, "Medium": 0.2, "High": 0.25, "Very High": 0.3,}
// const RADIUS_CODES = {"Very Low": "#04F100", "Low": "#87F100", "Medium": "#FFDC00", "High": "#F19600", "Very High": "#F10000",}


export async function getPoints() {
    const points = microplasticPoints as RawMicroplasticPoint[];
    const plottablePoints: PlottableMicroplasticPoint[] = [];
    
    for (const point of points) {
        plottablePoints.push({
            ...point, 
            lat: Number(point["Latitude"]),
            lng: Number(point["Longitude"]),
            color: COLOR_CODES[point["Concentration Class"]],
            height: HEIGHT_CODES[point["Concentration Class"]],
            radius: 0.25
        })
    }

    return plottablePoints;
}