import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WikiHome from "./pages/WikiHome";
import DepartmentView from "./pages/DepartmentView";
import ArticleView from "./pages/ArticleView";
import RequestContent from "./pages/RequestContent";
import AdminPanel from "./pages/AdminPanel";
import ArticleEditor from "./pages/ArticleEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />}>
              <Route index element={<WikiHome />} />
              <Route path="department/:department" element={<DepartmentView />} />
            <Route path="department/:department/:articleId" element={<ArticleView />} />
            <Route path="requests" element={<RequestContent />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="editor" element={<ArticleEditor />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
