import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState, ReactNode } from "react";
import Landing from "./pages/Landing";
import CreditCardComparator from "./pages/CreditCardComparator";
import BrokerageComparator from "./pages/BrokerageComparator";
import Comparateurs from "./pages/Comparateurs";
import CardDetail from "./pages/CardDetail";
import Calculateurs from "./pages/Calculateurs";
import InteretsComposes from "./pages/calculateurs/InteretsComposes";
import EpargneREER from "./pages/calculateurs/EpargneREER";
import EpargneCELIAPP from "./pages/calculateurs/EpargneCELIAPP";
import ConsolidationDettes from "./pages/calculateurs/ConsolidationDettes";
import ValeurNette from "./pages/calculateurs/ValeurNette";
import ImpotCanada from "./pages/calculateurs/ImpotCanada";
import Budget from "./pages/calculateurs/Budget";
import Hypotheque from "./pages/calculateurs/Hypotheque";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Library from "./pages/Library";
import BookDetail from "./pages/BookDetail";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import DivulgationAffiliation from "./pages/DivulgationAffiliation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition wrapper component
const PageTransition = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Trigger fade in animation
    setIsVisible(false);
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div
      className={`transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
      }`}
    >
      {children}
    </div>
  );
};

const AppRoutes = () => (
  <PageTransition>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/comparateurs" element={<Comparateurs />} />
      <Route path="/comparateurs/cartes-de-credit" element={<CreditCardComparator />} />
      <Route path="/comparateurs/courtage" element={<BrokerageComparator />} />
      <Route path="/carte/:slug" element={<CardDetail />} />
      <Route path="/calculateurs" element={<Calculateurs />} />
      <Route path="/calculateurs/interets-composes" element={<InteretsComposes />} />
      <Route path="/calculateurs/reer" element={<EpargneREER />} />
      <Route path="/calculateurs/celiapp" element={<EpargneCELIAPP />} />
      <Route path="/calculateurs/consolidation-dettes" element={<ConsolidationDettes />} />
      <Route path="/calculateurs/valeur-nette" element={<ValeurNette />} />
      <Route path="/calculateurs/impot" element={<ImpotCanada />} />
      <Route path="/calculateurs/budget" element={<Budget />} />
      <Route path="/calculateurs/hypotheque" element={<Hypotheque />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/bibliotheque" element={<Library />} />
      <Route path="/bibliotheque/:slug" element={<BookDetail />} />
      <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
      <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
      <Route path="/divulgation-affiliation" element={<DivulgationAffiliation />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </PageTransition>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
