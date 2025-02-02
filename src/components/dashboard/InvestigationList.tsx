import React from 'react';

interface Investigation {
  name: string;
  dateUploaded: string;
}

const investigations: Investigation[] = [
  { name: 'Chest X-ray', dateUploaded: '2025-01-20' },
  { name: 'MRI Brain', dateUploaded: '2025-01-18' },
  { name: 'Blood Test', dateUploaded: '2025-01-10' },
];

const InvestigationList: React.FC = () => {
  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">My Investigations</h2>
      <ul className="space-y-2">
        {investigations.map((investigation, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm font-medium text-gray-700">{investigation.name}</span>
            <span className="text-xs text-gray-500">{investigation.dateUploaded}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestigationList;
