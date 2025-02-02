import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Investigations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-150px)]">
          <ul className="space-y-2">
            {investigations.map((investigation, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-muted transition-colors duration-200"
              >
                <span className="font-medium">{investigation.name}</span>
                <span className="text-sm text-muted-foreground">{investigation.dateUploaded}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default InvestigationList

