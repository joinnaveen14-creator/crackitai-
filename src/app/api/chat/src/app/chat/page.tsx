"use client";

import { useChat } from "ai/react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { 
  Send, 
  Plus, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Menu, 
  X,
  TrendingUp,
  BookOpen
} from "lucide-react";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Connects to your backend in src/app/api/chat/route.ts
  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } = useChat({
    api: "/api/chat",
  });

  // Auto-scroll to the bottom when new text appears
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const quickActions = [
    { label: "Predict my paper", icon: <TrendingUp size={14} /> },
    { label: "TS Movement MCQs", icon: <BookOpen size={14} /> },
    { label: "Today's Current Affairs", icon: <Sparkles size={14} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0A0F1C] text-[#F1F5F9] overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed md:relative z-50 w-72 h-full bg-[#0D121F] border-r border-[#1E293B] 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <span className="font-bold text-xl tracking-tighter uppercase">CrackIt AI</span>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100%-80px)]">
          <button 
            onClick={() => window.location.reload()}
            className="w-full flex items-center gap-2 bg-[#141B2D] border border-[#1E293B] p-3 rounded-xl text-sm font-bold hover:bg-white/5 transition-all mb-8"
          >
            <Plus size={16} /> New Chat
          </button>
          
          <div className="flex-1 overflow-y-auto space-y-2">
            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest px-2 mb-2">History</p>
            <div className="p-3 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-sm font-medium flex items-center gap-2 cursor-pointer">
              <MessageSquare size={14} /> Telangana Movement
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E293B]">
            <div className="flex items-center gap-3 p-2 bg-[#141B2D] rounded-xl border border-[#1E293B]">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6]"></div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">Aspirant</p>
                <p className="text-[10px] text-[#64748B]">SI 2026 Batch</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CHAT */}
      <main className="flex-1 flex flex-col relative min-w-0 bg-[#0A0F1C]">
        
        {/* Mobile Header */}
        <header className="md:hidden h-16 border-b border-[#1E293B] flex items-center px-4 justify-between bg-[#0A0F1C]">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="font-bold text-sm tracking-widest uppercase">CrackIt AI</span>
          <div className="w-6 h-6" />
        </header>

        {/* Message Container */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="p-4 bg-[#3B82F6]/10 rounded-full mb-6">
                <ShieldCheck className="text-[#3B82F6]" size={40} />
              </div>
              <h2 className="text-3xl font-black mb-3">Crack the Pattern.</h2>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Your AI senior for the Telangana Police Exam. Ask me to predict topics, explain the Movement, or generate MCQs.
              </p>
              <div className="grid grid-cols-1 gap-2 mt-8 w-full">
                {quickActions.map((action) => (
                  <button 
                    key={action.label}
                    onClick={() => setInput(action.label)}
                    className="p-3 bg-[#141B2D] border border-[#1E293B] rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:border-[#3B82F6]/50 transition-all"
                  >
                    {action.icon} {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[90%] md:max-w-[75%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-[#3B82F6]" : "bg-[#1E293B]"}`}>
                  {m.role === "user" ? <User size={16} /> : <Sparkles size={16} className="text-[#3B82F6]" />}
                </div>
                <div className={`p-4 md:p-5 rounded-2xl text-sm ${m.role === "user" ? "bg-[#3B82F6] text-white rounded-tr-none" : "bg-[#141B2D] border border-[#1E293B] text-[#F1F5F9] rounded-tl-none"}`}>
                  <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                    {m.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#141B2D] border border-[#1E293B] p-4 rounded-xl rounded-tl-none animate-pulse text-xs text-[#3B82F6]">
                CrackIt is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 md:p-8">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about the exam..."
              className="w-full bg-[#141B2D] border border-[#1E293B] rounded-2xl px-6 py-4 md:py-5 pr-14 text-sm focus:outline-none focus:border-[#3B82F6]/50 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#3B82F6] text-white rounded-xl hover:opacity-90 disabled:opacity-30 transition-all"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
