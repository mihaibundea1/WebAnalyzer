import React from 'react';
import InvestigationList from '../../components/dashboard/InvestigationList';
import ImageUpload from '../../components/dashboard/ImageUpload';
import ChatBox from '../../components/dashboard/ChatBox';

const PatientDashboard: React.FC = () => {
  return (
    <div className="flex w-screen h-screen bg-gray-100">
      {/* Left Side - Investigations (25%) */}
      <div className="w-[15%] bg-white p-4 shadow-lg">
        <InvestigationList />
      </div>

      {/* Center - Image Upload & Toolset (50%) */}
      <div className="w-[75%] p-4 space-y-6">
        <ImageUpload />
      </div>

      {/* Right Side - Chat (25%) */}
      <div className="w-[25%] bg-white p-4 shadow-lg">
        <ChatBox />
      </div>
    </div>
  );
};

export default PatientDashboard;
