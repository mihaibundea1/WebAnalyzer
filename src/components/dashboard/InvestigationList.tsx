import type React from "react"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

interface Investigation {
  name: string
  dateUploaded: string
}

const investigations: Investigation[] = [
  { name: "Chest X-ray", dateUploaded: "2025-01-20" },
  { name: "MRI Brain", dateUploaded: "2025-01-18" },
  { name: "Blood Test", dateUploaded: "2025-01-10" },
  { name: "CT Scan", dateUploaded: "2025-01-05" },
  { name: "Ultrasound", dateUploaded: "2024-12-28" },
]

const InvestigationList: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-border">
        <Button variant="outline" className="w-full justify-start gap-2">
          <Plus className="h-4 w-4" />
          New Investigation
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="mb-2 text-sm font-semibold">Recent Investigations</h2>
          <div className="space-y-1">
            {investigations.map((investigation, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start text-sm font-normal h-auto py-2">
                <div className="flex flex-col items-start">
                  <span>{investigation.name}</span>
                  <span className="text-xs text-muted-foreground">{investigation.dateUploaded}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default InvestigationList