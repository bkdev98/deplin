import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import LatestScreenVersion from "./pages/LatestScreenVersion";
import Screens from "./pages/Screens";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/:projectId" element={<Screens />} />
            <Route
              path="/:projectId/:screenId"
              element={<LatestScreenVersion />}
            />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
