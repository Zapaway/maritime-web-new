import { MutableRefObject, useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods, GlobeProps } from "react-globe.gl";
import { FormattedShipPoint, MaritimeGlobeMode } from "./types";

const point = { lat: 42.360081, lng: -71.058884, color: "#ffffff", radius: 10 };
const point2 = { lat: 9.077751, lng: 8.6774567, color: "yellow", radius: 1 };

export const MaritimeGlobe = ({ mode }: { mode: MaritimeGlobeMode }) => {
  const [points, setPoints] = useState<FormattedShipPoint[]>([]);
  const [currentPoint, setCurrentPoint] = useState<HTMLCanvasElement | null>();
  const globeContainer = useRef<GlobeMethods | undefined>();

  // switch modes
  useEffect(() => {
    if (mode === "ships") {
      setPoints([point, point2]);
    }
  }, [mode]);

  // track current point clicked on
  useEffect(() => {
    if (!currentPoint) return;

    const observer = new MutationObserver((mutationList, observer) => {
      console.log(mutationList)
    });
    observer.observe(currentPoint, { attributes: true, subtree: true })

    return () => observer.disconnect();
  }, [currentPoint])

  // allow auto-rotation
  useEffect(() => {
    if (globeContainer.current) {
      globeContainer.current.controls().autoRotate = true;
      globeContainer.current.controls().autoRotateSpeed = 0.25;
    }
  }, [])

  const transformShips = (rawPoint: {}) => {
    return {} as FormattedShipPoint;
  };

  return (
    <div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        ref={globeContainer}
        pointsData={points}
        pointColor={"color"}
        pointRadius={"radius"}
        onPointClick={(point, e, { lat, lng, alt }) => {
          setCurrentPoint(e.target as HTMLCanvasElement);
          console.log(e.x, e.y);
        }}
      />
      {/* { currentPoint && <div className="text-black">
        {currentPoint.radius}
        </div>} */}
    </div>
  );
};
