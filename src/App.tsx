import { ThemeProvider } from "@/lib/theme-context";
import { AppRouter } from "@/router";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AppRouter />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;