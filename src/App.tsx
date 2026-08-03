import { Suspense } from "react";
import View from "./routes/View";
function App() {
  return (
    <>
      <Suspense>
        <View />
      </Suspense>
    </>
  );
}

export default App;
