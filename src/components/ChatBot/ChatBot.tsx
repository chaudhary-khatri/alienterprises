"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";

type Message = {
  content: string;
  isBot: boolean;
  timestamp: number;
};

interface ChatNode {
  id: string;
  text: string;
  options?: Option[];
}

interface Option {
  text: string;
  nextNodeId?: string;
  action?: () => void;
}

const COMPANY_NAME = "Ali Enterprises";

const conversationConfig: Record<string, ChatNode> = {
  root: {
    id: "root",
    text: `👋 Hi! Welcome to ${COMPANY_NAME}. How can I assist you today?`,
    options: [
      { text: "I have a question", nextNodeId: "general-questions" },
      { text: "Tell me more about your machines", nextNodeId: "machine-info" },
      { text: "Buy a machine", nextNodeId: "buy-process" },
      { text: "Buy spare parts", nextNodeId: "purchase-parts" },
    ],
  },
  "general-questions": {
    id: "general-questions",
    text: "What would you like to know about our products?",
    options: [
      { text: "How can I buy a machine?", nextNodeId: "buy-process" },
      { text: "What machine models do you offer?", nextNodeId: "machine-models" },
      { text: "How can I get spare parts?", nextNodeId: "purchase-parts" },
    ],
  },
  "buy-process": {
    id: "buy-process",
    text: "You can buy a machine from us either online by filling google form or at our physical store. How would you like to proceed?",
    options: [
      {
        text: "Buy online",
        action: () =>
          (window.location.href = "https://forms.gle/LQwMAdZdsjA54Ytn8"),
      },
      {
        text: "Get store details",
        action: () =>
          window.open("https://maps.app.goo.gl/QgT3y8VGmt9Sb3F66", "_blank"),
      },
    ],
  },
  "machine-models": {
    id: "machine-models",
    text: "We offer three Brick Making machine models: 1. Double Die, 2. Triple Die, and 3. Five Die. Which model would you like to know more about?",
    options: [
      {
        text: "Double Die Machine",
        action: () => window.location.href = "/productsection/products?model=1"
      },
      {
        text: "Triple Die Machine",
        action: () => window.location.href = "/productsection/products?model=2"
      },
      {
        text: "Five Die Machine",
        action: () => window.location.href = "/productsection/products?model=3"
      },
    ],
  },
  "specific-parts": {
    id: "specific-parts",
    text: "Please select the preferred option in which you are comfortable buying parts.",
    options: [
      {
        text: "WhatsApp",
        action: () => {
          const phoneNumber = "+919756300040";
          const message = encodeURIComponent(
            "Hello, I need assistance with motor parts."
          );
          window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
        },
      },
      {
        text: "Text Message",
        action: () => {
          const phoneNumber = "+919756300040";
          const message = encodeURIComponent("I need help with mold parts.");
          window.open(`sms:${phoneNumber}?body=${message}`, "_blank");
        },
      },
      {
        text: "Email",
        action: () => {
          const email = "alienterprises54@yahoo.com";
          const subject = encodeURIComponent("Conveyor Parts Inquiry");
          const body = encodeURIComponent(
            "Hello,\n\nI need assistance with conveyor parts.\n\n[Please provide details here]"
          );
          window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_blank");
        },
      },
    ],
  },
  "part-help": {
    id: "part-help",
    text: "Ok, do you need assistance with anything else?",
    options: [
      { text: "Yes, I need Assistance", nextNodeId: "general-questions" },
      { text: "Not now", action: () => (window.location.href = "/") },
    ],
  },
  "machine-info": {
    id: "machine-info",
    text: "We provide machines for brick production. Would you like more information on how our machines work or view specific models?",
    options: [
      { text: "How our machines work", nextNodeId: "machine-technology" },
      { text: "View models", nextNodeId: "machine-models" },
    ],
  },
  "machine-technology": {
    id: "machine-technology",
    text: "Our machines use advanced technology to create high-quality bricks at large scale. Would you like to know more about our technology or see models?",
    options: [
      {
        text: "See Video Demo about your products",
        action: () =>
        (window.location.href =
          "https://www.youtube.com/@alienterprises7509/videos"),
      },
      { text: "See models", nextNodeId: "machine-models" },
    ],
  },
  "purchase-parts": {
    id: "purchase-parts",
    text: "You can directly buy the spare parts from us. Would you like to proceed to buy spare parts?",
    options: [
      { text: "Yes, I want to Buy.", nextNodeId: "specific-parts" },
      { text: "Not now", nextNodeId: "part-help" },
    ],
  },
};

const ChatBot = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<ChatNode>(conversationConfig.root);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  useEffect(() => {
    addBotMessage(currentNode.text);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentNode]);

  const addBotMessage = (text: string) => {
    setIsBotTyping(true);
    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { content: text, isBot: true, timestamp: Date.now() },
      ]);
      setIsBotTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { content: text, isBot: false, timestamp: Date.now() },
    ]);
  };

  const handleOptionSelect = (option: Option) => {
    addUserMessage(option.text);
    if (option.action) {
      timeoutRef.current = setTimeout(option.action, 1500);
      return;
    }
    if (option.nextNodeId) {
      timeoutRef.current = setTimeout(() => {
        const nextNode = conversationConfig[option.nextNodeId!];
        setCurrentNode(nextNode || conversationConfig.root);
      }, 1000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 mx-4 mb-4 sm:bottom-4 sm:right-4 sm:left-auto w-full sm:max-w-md bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-slide-up"
    >
      <div className="flex items-center justify-between p-3 sm:p-4 bg-teal-600 text-white">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold text-sm sm:text-base">
            {COMPANY_NAME} Support
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 sm:p-2 hover:bg-teal-700 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 sm:p-4 overflow-y-auto bg-gray-50 h-[40vh] sm:h-96">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.timestamp}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-2 rounded-lg ${message.isBot
                  ? "bg-white text-gray-800 border border-gray-200"
                  : "bg-teal-600 text-white"
                  }`}
              >
                <p className="text-xs sm:text-sm">{message.content}</p>
                <span className="text-[0.6rem] sm:text-xs mt-1 block opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isBotTyping && (
            <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-xs">Typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-1 gap-2">
          {currentNode.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={isBotTyping}
              className="text-left p-2 sm:p-3 text-xs sm:text-sm bg-teal-50 text-teal-800 rounded-lg hover:bg-teal-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Select option: ${option.text}`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
