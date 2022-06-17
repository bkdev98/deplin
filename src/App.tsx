import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import LatestScreenVersion from "./pages/LatestScreenVersion";
import Screens from "./pages/Screens";
import AuthProvider from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RequireAuth><Projects /></RequireAuth>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/project/:projectId" element={<RequireAuth><Screens /></RequireAuth>} />
              <Route
                path="/project/:projectId/screen/:screenId"
                element={<RequireAuth><LatestScreenVersion /></RequireAuth>}
              />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
