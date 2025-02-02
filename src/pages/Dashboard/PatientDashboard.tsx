"use client"

import type React from "react"
import InvestigationList from "../../components/dashboard/InvestigationList"
import ImageUpload from "../../components/dashboard/ImageUpload"
import ChatBox from "../../components/dashboard/ChatBox"

const PatientDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Left Side - Investigations (15%) */}
      <div className="w-[15%] p-4">
        <InvestigationList />
      </div>

      {/* Center - Image Upload & Toolset (60%) */}
      <div className="w-[60%] p-4">
        <ImageUpload />
      </div>

      {/* Right Side - Chat (25%) */}
      <div className="w-[25%] p-4">
        <ChatBox />
      </div>
    </div>
  )
}

export default PatientDashboard

