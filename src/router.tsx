import { createContext, useContext, useState } from "react";
import { Dashboard } from "@/pages/dashboard";
import { Elections } from "@/pages/elections";
import { Candidates } from "@/pages/candidates";
import { VoterLists } from "@/pages/voter-lists";
import { Analytics } from "@/pages/analytics";
import { Reports } from "@/pages/reports";
import { SecurityLogs } from "@/pages/security-logs";
import Settings from "@/pages/settings";
import { Layout } from "@/components/layout";

type Route =
  | "dashboard"
  | "elections"
  | "candidates"
  | "voter-lists"
  | "analytics"
  | "reports"
  | "security-logs"
  | "settings";

interface RouterContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentRoute: "dashboard",
  navigate: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useRouter = () => useContext(RouterContext);

export function AppRouter() {
  const [currentRoute, setCurrentRoute] = useState<Route>("dashboard");

  const navigate = (route: Route) => {
    setCurrentRoute(route);
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      <Layout>
        {currentRoute === "dashboard" && <Dashboard />}
        {currentRoute === "elections" && <Elections />}
        {currentRoute === "candidates" && <Candidates />}
        {currentRoute === "voter-lists" && <VoterLists />}
        {currentRoute === "analytics" && <Analytics />}
        {currentRoute === "reports" && <Reports />}
        {currentRoute === "security-logs" && <SecurityLogs />}
        {currentRoute === "settings" && <Settings />}
      </Layout>
    </RouterContext.Provider>
  );
}
