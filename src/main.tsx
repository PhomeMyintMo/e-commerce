import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./contexts/CartContext.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { WishlistProvider } from "./contexts/WishListContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 50 * 60,
      retry: 1, // Retry failed requests once
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <WishlistProvider>
          <App />
          <Toaster/>
          </WishlistProvider>
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
