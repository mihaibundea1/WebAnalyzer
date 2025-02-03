"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Send, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

const models = [
  { name: "GPT-4", description: "Most capable model, best for complex tasks" },
  { name: "GPT-3.5", description: "Faster and more cost-effective" },
  { name: "Claude", description: "Specialized in medical analysis" },
]

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; from: "patient" | "llm" }[]>([])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState(models[0])

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, from: "patient" }])
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "I'm sorry, I didn't understand that. Could you please clarify?", from: "llm" },
      ])
      setInput("")
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedModel.name}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] bg-white">
            {models.map((model) => (
              <DropdownMenuItem
                key={model.name}
                onClick={() => setSelectedModel(model)}
                className="flex flex-col items-start"
              >
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${message.from === "patient" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.from === "llm" ? "/doctor-avatar.png" : "/patient-avatar.png"} />
                <AvatarFallback>{message.from === "llm" ? "Dr" : "Me"}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-3 py-2 max-w-[80%] ${
                  message.from === "patient" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message the doctor..."
            className="flex-1"
          />
          <Button className="bg-black" type="submit" size="icon">
            <Send className="h-4 w-4 text-white" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChatBox

