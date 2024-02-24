import { useState } from "react";
import "./App.css";
import { MaritimeGlobe, type MaritimeGlobeMode} from "./components/MaritimeGlobe";


function App() {
  const [globeMode, setGlobeMode] = useState<MaritimeGlobeMode>("ships");

  return (
    <main>
      <MaritimeGlobe mode={globeMode} />
    </main>
  );
}

export default App;
