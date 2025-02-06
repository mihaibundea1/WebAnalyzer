

import React from "react"
import { useState } from "react"
import InvestigationList from "../../components/dashboard/InvestigationList"
import ImageUpload from "../../components/dashboard/ImageUpload"
import ChatBox from "../../components/dashboard/ChatBox"
import { Button } from "../..//components/ui/button"
import { Menu, MessageCircle, Search } from "lucide-react"
import { cn } from "../../lib/utils"

const PatientDashboard: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showChat, setShowChat] = useState(false)

  // Function to handle mobile view switches
  const handleMobileToggle = (type: "sidebar" | "chat") => {
    if (type === "sidebar") {
      setShowChat(false)
      setShowSidebar(!showSidebar)
    } else {
      setShowSidebar(false)
      setShowChat(!showChat)
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Sidebar */}
      <div
        className={cn(
          "w-80 bg-muted/50 border-r border-border transition-all duration-300 ease-in-out",
          showSidebar ? "translate-x-0" : "-translate-x-full",
          "fixed md:relative h-full z-30",
          "md:translate-x-0 md:w-80",
          "md:hidden md:data-[show=true]:block", // Hide by default on mobile, show based on state
        )}
        data-show={showSidebar}
      >
        <InvestigationList />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Header */}
        <header className="h-14 border-b border-border flex items-center gap-2 px-4 sticky top-0 bg-background/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleMobileToggle("sidebar")}
            className={cn("h-8 w-8 transition-transform duration-200", showSidebar && "rotate-90 md:rotate-0")}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex-1 flex items-center">
            <Button variant="ghost" className="text-sm gap-2 px-2">
              <Search className="h-4 w-4" />
              Search images...
            </Button>
          </div>
          <div className="h-6 w-px bg-border mx-2" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleMobileToggle("chat")}
            className={cn("h-8 w-8 transition-transform duration-200", !showChat && "-rotate-90")}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto relative">
          <div
            className={cn(
              "mx-auto p-4 transition-all duration-300",
              "max-w-full md:max-w-[1000px]",
              !showSidebar && !showChat && "md:max-w-[1400px]",
              (showSidebar || showChat) && "md:max-w-[1000px]",
              showSidebar && showChat && "md:max-w-[800px]",
            )}
          >
            <ImageUpload />
          </div>
        </main>
      </div>

      {/* Right Chat Sidebar */}
      <div
        className={cn(
          "w-96 bg-muted/50 border-l border-border transition-all duration-300 ease-in-out",
          showChat ? "translate-x-0" : "translate-x-full",
          "fixed right-0 md:relative h-full z-30",
          "md:translate-x-0 md:w-96",
          "md:hidden md:data-[show=true]:block", // Hide by default on mobile, show based on state
        )}
        data-show={showChat}
      >
        <ChatBox />
      </div>

      {/* Mobile Overlay */}
      {(showSidebar || showChat) && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 md:hidden"
          onClick={() => {
            setShowSidebar(false)
            setShowChat(false)
          }}
        />
      )}
    </div>
  )
}

export default PatientDashboard

