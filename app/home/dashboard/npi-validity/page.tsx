'use client'

import { useState } from 'react'

export default function ChatAssistantPage() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    setMessage('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I understand you\'re asking about healthcare data analysis. How can I help you with your provider data insights?' 
      }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Chat Messages Area */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        {messages.length === 0 ? (
          <div className="text-center max-w-2xl">
            <h1 className="text-3xl font-medium text-gray-900 mb-8">
              What are you working on?
            </h1>
          </div>
        ) : (
          <div className="w-full max-w-4xl space-y-6 mb-8">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl px-4 py-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white border border-gray-300 rounded-full shadow-sm">
            <div className="flex items-center px-4 py-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything"
                className="flex-1 px-3 py-2 text-gray-900 placeholder-gray-500 border-none outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
