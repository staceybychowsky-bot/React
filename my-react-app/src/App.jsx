import { useState } from "react";
//import Lifecycle from "./components/Lifecycle";
//import WelcomeBanner from "./components/WelcomeBanner";
//import AutoHideAlert from "./components/AutoHideAlert"; 
import CounterLogger from "./components/CounterLogger"; 
import StopWatch from "./components/StopWatch"; 
import StopwatchToggle from "./components/StopwatchToggle"; 
import "./App.css";

function App() {  
  const [showLifecycle, setShowLifecycle] = useState(true);

  return (  
    //<div className="app">
      //<button onClick={() => setShowLifecycle((current) => !current)}>
        //{showLifecycle ? "Hide" : "Show"} Component
      //</button>

      //{showLifecycle && <Lifecycle />}
    //</div>

    //<div className="app">
     // <WelcomeBanner />
     // <AutoHideAlert />   
   // </div> 
   
    <div className="app">
      <CounterLogger />
      <StopWatch />
      <StopwatchToggle />
    </div>  
  );
}

export default App;