import { MaritimeGlobe } from "./components/MaritimeGlobe";
import Slider from "rc-slider";

function App() {
  return (
    <main>
      <div className="">
        <Slider className=" z-10" />
        <MaritimeGlobe mode={"ships"} />
      </div>
    </main>
  );
}

export default App;
