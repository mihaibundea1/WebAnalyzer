"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; from: "patient" | "llm" }[]>([])
  const [input, setInput] = useState("")

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
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Chat with Doctor</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-[calc(100vh-200px)]">
          {messages.map((message, index) => (
            <div key={index} className={`flex mb-4 ${message.from === "patient" ? "justify-end" : "justify-start"}`}>
              {message.from === "llm" && (
                <Avatar className="mr-2">
                  <AvatarImage src="/doctor-avatar.png" alt="Doctor" />
                  <AvatarFallback>Dr</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg ${
                  message.from === "patient" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.text}
              </div>
              {message.from === "patient" && (
                <Avatar className="ml-2">
                  <AvatarImage src="/patient-avatar.png" alt="Patient" />
                  <AvatarFallback>Me</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          className="flex w-full gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

export default ChatBox

