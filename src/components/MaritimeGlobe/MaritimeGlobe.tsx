import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import {
  MaritimeGlobeMode,
  PlottableMicroplasticPoint,
} from "./types";
import { getPoints } from "./getPoints";


export const MaritimeGlobe = ({
  mode,
  // year,
}: {
  mode: MaritimeGlobeMode;
  // year: string;
}) => {
  const [points, setPoints] = useState<PlottableMicroplasticPoint[]>([]);
  const [currentPoint, setCurrentPoint] =
    useState<PlottableMicroplasticPoint | null>();
  const globeContainer = useRef<GlobeMethods | undefined>();

  useEffect(() => {
    (async () => {
      const csvPoints = await getPoints();
      setPoints(csvPoints);
    })();
  }, []);

  // switch modes
  useEffect(() => {
    if (mode === "ships") {
      // parse csv here
      (async () => {
        const csvPoints = await getPoints();
        setPoints(csvPoints);
      })();

      return () => setPoints([]);
    }
  }, [mode]);

  // // track current point clicked on
  // useEffect(() => {
  //   if (!currentPoint) return;

  //   const observer = new MutationObserver((mutationList, observer) => {
  //     console.log(mutationList)
  //   });
  //   observer.observe(currentPoint, { attributes: true, subtree: true })

  //   return () => observer.disconnect();
  // }, [currentPoint])

  // allow auto-rotation
  useEffect(() => {
    if (globeContainer.current) {
      globeContainer.current.controls().autoRotate = true;
      globeContainer.current.controls().autoRotateSpeed = 0.25;
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        className={`absolute bottom-0 left-0 right-0 top-0 grid place-items-center text-white z-10 ${
          currentPoint ? "visible" : "hidden"
        }`}
      >
        {currentPoint && (
          <div className="w-full h-1/2 bg-white rounded-md text-black font-display relative">
            <div className="flex flex-row justify-between p-4 items-end">
              <p className="text-2xl font-semibold">{currentPoint["Oceans"]}</p>
              <p>
                {currentPoint["Latitude"]}°N, {currentPoint["Longitude"]}°W
              </p>
            </div>
            <div className="space-y-2 px-4">
              <p>This was discovered on {currentPoint["Date"]}.</p>
              <p>
                In this area, there is a{" "}
                {currentPoint["Concentration Class"].toLowerCase()}{" "}
                concentration of microplastics.
              </p>
              <p>
                There are {currentPoint["Microplastics Measurement (density)"]}{" "}
                microplastics per cubic meter.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 mx-2 my-2 px-4 py-2 bg-slate-300 rounded-md">
              <button onClick={() => {setCurrentPoint(null)}}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        // bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        ref={globeContainer}
        pointsData={points}
        pointColor={"color"}
        pointRadius={"radius"}
        pointAltitude={"height"}
        onPointClick={(point, e) => {
          setCurrentPoint(point as PlottableMicroplasticPoint);

          console.log(e.x, e.y);
        }}
      />
    </div>
  );
};


