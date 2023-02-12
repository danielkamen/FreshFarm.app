import { ContextProvider } from "./providers/ContextProvider";
import { RouteProvider } from "./providers/RouteProvider";


function App() {
  return (
    <ContextProvider>
      <RouteProvider />
    </ContextProvider>
  );
}

export default App;
