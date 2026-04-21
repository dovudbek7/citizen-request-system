import type { ReactNode } from "react"
import { useState } from "react"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { AppLayout } from "@/components/layout/app-layout"
import { LocaleProvider } from "@/hooks/use-locale"
import { ThemeProvider } from "@/hooks/use-theme"
import { HomePage } from "@/pages/home-page"
import { DirectoryPage } from "@/pages/directory-page"
import { FaqPage } from "@/pages/faq-page"
import { AnalyticsPage } from "@/pages/analytics-page"
import { RequestSelectionModal } from "@/features/request/request-selection-modal"
import { ContactDetailModal } from "@/features/request/contact-detail-modal"
import { MessageModal } from "@/features/request/message-modal"
import { RatingModal } from "@/features/rating/rating-modal"
import type { ContactEntity, DirectoryType, MessageMode } from "@/lib/types"
import AiWomen from "./pages/ai-woemn"

function AnimatedPage({ children }: { children: ReactNode }) {
  const location = useLocation()

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
  )
}

function AppRoutes() {
  const navigate = useNavigate()
  const [selectionOpen, setSelectionOpen] = useState(false)
  const [activeType, setActiveType] = useState<DirectoryType>("employees")
  const [selectedItem, setSelectedItem] = useState<ContactEntity | null>(null)
  const [messageOpen, setMessageOpen] = useState(false)
  const [messageMode, setMessageMode] = useState<MessageMode | null>(null)
  const [ratingOpen, setRatingOpen] = useState(false)

  const handleTypeSelect = (type: DirectoryType) => {
    setActiveType(type)
    setSelectionOpen(false)
    navigate("/directory")
  }

  const handleOpenMessage = (mode: MessageMode) => {
    setMessageMode(mode)
    setMessageOpen(true)
  }

  const handleCloseMessage = () => {
    setMessageOpen(false)
    setMessageMode(null)
    setSelectedItem(null)
  }

  const handleSentMessage = () => {
    setRatingOpen(true)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<AiWomen />} />

        <Route element={<AppLayout />}>
          <Route
            path="/home"
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
            path="/analytics"
            element={
              <AnimatedPage>
                <AnalyticsPage />
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
        </Route>

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>

      <RequestSelectionModal
        open={selectionOpen}
        onClose={() => setSelectionOpen(false)}
        onSelect={handleTypeSelect}
      />
      <ContactDetailModal
        item={selectedItem}
        messagingMode={messageMode}
        onClose={() => setSelectedItem(null)}
        onMessage={handleOpenMessage}
      />
      <MessageModal
        item={selectedItem}
        mode={messageMode}
        onClose={handleCloseMessage}
        onSent={handleSentMessage}
        open={messageOpen}
      />
      <RatingModal open={ratingOpen} onClose={() => setRatingOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AppRoutes />
      </LocaleProvider>
    </ThemeProvider>
  )
}
