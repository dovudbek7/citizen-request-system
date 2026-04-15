import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AppLayout } from "@/components/layout/app-layout";
import { LocaleProvider } from "@/hooks/use-locale";
import { HomePage } from "@/pages/home-page";
import { DirectoryPage } from "@/pages/directory-page";
import { FaqPage } from "@/pages/faq-page";
import { RequestSelectionModal } from "@/features/request/request-selection-modal";
import { ContactDetailModal } from "@/features/request/contact-detail-modal";
import { RatingModal } from "@/features/rating/rating-modal";
import type { ContactEntity, DirectoryType } from "@/lib/types";

function AnimatedPage({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.24 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [activeType, setActiveType] = useState<DirectoryType>("employees");
  const [selectedItem, setSelectedItem] = useState<ContactEntity | null>(null);
  const [callingMode, setCallingMode] = useState<"audio" | "video" | null>(null);
  const [ratingOpen, setRatingOpen] = useState(false);

  useEffect(() => {
    if (!callingMode) return;

    const timer = window.setTimeout(() => {
      setCallingMode(null);
      setRatingOpen(true);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [callingMode]);

  const handleTypeSelect = (type: DirectoryType) => {
    setActiveType(type);
    setSelectionOpen(false);
    navigate("/directory");
  };

  const handleCall = (mode: "audio" | "video") => {
    setCallingMode(mode);
  };

  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            path="/"
            element={
              <AnimatedPage>
                <HomePage onOpenSelection={() => setSelectionOpen(true)} />
              </AnimatedPage>
            }
          />
          <Route
            path="/directory"
            element={
              <AnimatedPage>
                <DirectoryPage
                  activeType={activeType}
                  onOpenDetail={setSelectedItem}
                  onTypeChange={setActiveType}
                  selectedItem={selectedItem}
                />
              </AnimatedPage>
            }
          />
          <Route
            path="/faq"
            element={
              <AnimatedPage>
                <FaqPage />
              </AnimatedPage>
            }
          />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>

      <RequestSelectionModal open={selectionOpen} onClose={() => setSelectionOpen(false)} onSelect={handleTypeSelect} />
      <ContactDetailModal item={selectedItem} callingMode={callingMode} onCall={handleCall} onClose={() => setSelectedItem(null)} />
      <RatingModal open={ratingOpen} onClose={() => setRatingOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <LocaleProvider>
      <AppRoutes />
    </LocaleProvider>
  );
}
