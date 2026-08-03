import { Suspense } from "react";
import View from "./routes/View";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <View />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
