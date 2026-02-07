import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import CategoryPage from "./pages/CategoryPage";
import TeamPage from "./pages/TeamPage";
import TeamRingPage from "./pages/TeamRingPage";
import TeamSliderPage from "./pages/TeamSliderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/event/:eventId" element={<EventPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team-v1" element={<TeamRingPage />} />
          <Route path="/team-v2" element={<TeamSliderPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
