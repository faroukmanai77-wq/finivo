import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import DivulgationAffiliation from "./pages/DivulgationAffiliation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
            <Route path="/divulgation-affiliation" element={<DivulgationAffiliation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
