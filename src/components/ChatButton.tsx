import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Megaphone, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "system";
  timestamp: Date;
  telegram_message_id?: number;
}

const ChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 สวัสดีครับ! ยินดีให้บริการ\nสอบถามข้อมูลหรือขอใบเสนอราคาได้เลยครับ",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAdminTyping, setIsAdminTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "error"
  >("connected");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionId = useRef<string>(
    `SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const pollingInterval = useRef<TimeoutId | null>(null);
  const lastUpdateId = useRef<number>(0);



  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Start polling for Telegram updates when chat is opened
  useEffect(() => {
    if (isOpen) {
      startPollingTelegramUpdates();
    } else {
      stopPollingTelegramUpdates();
    }

    return () => stopPollingTelegramUpdates();
  }, [isOpen]);

  // ส่งข้อความผ่าน Worker (แทน Telegram โดยตรง)
const sendToTelegram = async (message: string): Promise<boolean> => {
  try {
    setIsConnecting(true);

    const response = await fetch(
      "https://telegram-proxy.ipbpower.workers.dev/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          sessionId: chatSessionId.current,
        }),
      }
    );

    const result = await response.json();
    console.log("Worker response:", result);

    if (result.ok) {
      setConnectionStatus("connected");
      setIsAdminTyping(true);
      setTimeout(() => {
        setIsAdminTyping(false);
      }, 3000 + Math.random() * 2000);

      // ดึงข้อความตอบกลับทันที
      setTimeout(() => {
        pollTelegramUpdates();
      }, 1000);

      return true;
    } else {
      console.error("Worker error:", result);
      setConnectionStatus("error");
      return false;
    }
  } catch (error) {
    console.error("Error sending via Worker:", error);
    setConnectionStatus("error");
    return false;
  } finally {
    setIsConnecting(false);
  }
};

// ดึงข้อความตอบกลับจาก Worker (แทน getUpdates โดยตรง)
const pollTelegramUpdates = async () => {
  try {
    console.log("Polling for updates, lastUpdateId:", lastUpdateId.current);

    const response = await fetch(
      `https://telegram-proxy.ipbpower.workers.dev/poll?offset=${
        lastUpdateId.current + 1
      }&timeout=10`
    );

    const result = await response.json();

    if (result.ok) {
      console.log("Updates received:", result.result?.length || 0);

      if (result.result?.length > 0) {
        for (const update of result.result) {
          console.log("Processing update:", update);

          if (update.message && update.message.chat) {
            // ไม่ต้องตรวจสอบ chat_id อีกต่อไป — Worker กรองให้แล้ว
            setIsAdminTyping(false);

            const botMessage: Message = {
              id: `telegram_${update.message.message_id || Date.now()}`,
              text: update.message.text || "ได้รับข้อความใหม่",
              sender: "bot",
              timestamp: new Date(
                (update.message.date || Date.now() / 1000) * 1000
              ),
              telegram_message_id: update.message.message_id,
            };

            console.log("Adding bot message:", botMessage);

            setMessages((prev) => {
              const exists = prev.some(
                (msg) => msg.telegram_message_id === update.message.message_id
              );
              if (!exists && update.message.message_id) {
                return [...prev, botMessage];
              }
              return prev;
            });
          }

          lastUpdateId.current = Math.max(
            lastUpdateId.current,
            update.update_id
          );
        }
      }
      setConnectionStatus("connected");
    } else {
      console.error("Poll failed:", result);
      setConnectionStatus("error");
    }
  } catch (error) {
    console.error("Poll error:", error);
    setConnectionStatus("error");
  }
};

// ฟังก์ชันอื่นๆ ไม่ต้องเปลี่ยน
const startPollingTelegramUpdates = () => {
  if (pollingInterval.current) return;
  console.log("Starting to poll for Telegram updates");
  pollTelegramUpdates();
  pollingInterval.current = setInterval(pollTelegramUpdates, 2000);
};

const stopPollingTelegramUpdates = () => {
  if (pollingInterval.current) {
    clearInterval(pollingInterval.current);
    pollingInterval.current = null;
  }
};

const sendMessage = async () => {
  if (inputMessage.trim() === "" || isConnecting) return;

  const userMessage: Message = {
    id: `user_${Date.now()}`,
    text: inputMessage.trim(),
    sender: "user",
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  const messageToSend = inputMessage.trim();
  setInputMessage("");

  const success = await sendToTelegram(messageToSend);

  if (!success) {
    const errorMessage: Message = {
      id: `error_${Date.now()}`,
      text: "❌ ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง",
      sender: "system",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  }
};

const handleKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};

const getStatusText = () => {
  switch (connectionStatus) {
    case "connected":
      return "เชื่อมต่อแล้ว";
    case "error":
      return "เชื่อมต่อขัดข้อง";
    default:
      return "กำลังเชื่อมต่อ";
  }
};

  return (
    <>
      {/* Floating Support Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
          aria-label={isOpen ? "ปิดหน้าต่างแชท" : "เปิดหน้าต่างแชทสนับสนุน"}
          title={isOpen ? "ปิดแชท" : "แชทสด"}
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Megaphone size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[9998] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-orange-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Megaphone size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">ฝ่ายสนับสนุน</div>
                  <div className="text-orange-100 text-xs">
                    {getStatusText()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {message.sender === "user" && (
                    <div className="flex items-end gap-2 max-w-[80%] group">
                      <div className="relative">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl rounded-br-lg px-4 py-3 shadow-lg group-hover:shadow-xl transition-all duration-200">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                            {message.text}
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-2">
                            <p className="text-xs text-orange-100 opacity-75">
                              {message.timestamp.toLocaleTimeString("th-TH", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <div className="flex gap-0.5">
                              <div className="w-1 h-1 bg-orange-200 rounded-full"></div>
                              <div className="w-1 h-1 bg-orange-200 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        {/* Message tail */}
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 transform rotate-45 translate-x-1.5 translate-y-1.5"></div>
                      </div>

                      <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white">
                        <User size={14} className="text-white" />
                      </div>
                    </div>
                  )}

                  {message.sender !== "user" && (
                    <div className="flex items-end gap-2 max-w-[80%] group">
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white">
                        <Bot size={14} className="text-white" />
                      </div>

                      <div className="relative">
                        <div
                          className={`rounded-3xl rounded-bl-lg px-4 py-3 shadow-lg group-hover:shadow-xl transition-all duration-200 ${
                            message.sender === "bot"
                              ? "bg-white border border-gray-100 text-gray-800"
                              : "bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 text-yellow-800"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                            {message.text}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <p
                              className={`text-xs ${
                                message.sender === "bot"
                                  ? "text-gray-500"
                                  : "text-yellow-600"
                              } opacity-75`}
                            >
                              {message.timestamp.toLocaleTimeString("th-TH", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                        {/* Message tail */}
                        <div
                          className={`absolute bottom-0 left-0 w-3 h-3 transform rotate-45 -translate-x-1.5 translate-y-1.5 ${
                            message.sender === "bot"
                              ? "bg-white border-l border-b border-gray-100"
                              : "bg-gradient-to-br from-yellow-50 to-yellow-100 border-l border-b border-yellow-200"
                          }`}
                        ></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Admin Typing Indicator */}
              {isAdminTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="relative">
                      <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-lg px-4 py-3 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0.3,
                              }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: 0.6,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            Admin กำลังพิมพ์...
                          </span>
                        </div>
                      </div>
                      {/* Message tail */}
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-white border-l border-b border-gray-100 transform rotate-45 -translate-x-1.5 translate-y-1.5"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Connecting Indicator */}
              {isConnecting && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-end gap-2 max-w-[80%]">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Bot size={14} className="text-white" />
                      </motion.div>
                    </div>
                    <div className="relative">
                      <div className="bg-blue-50 border border-blue-200 rounded-3xl rounded-bl-lg px-4 py-3 shadow-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-blue-600 font-medium">
                            กำลังส่งข้อความ...
                          </span>
                        </div>
                      </div>
                      {/* Message tail */}
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-blue-50 border-l border-b border-blue-200 transform rotate-45 -translate-x-1.5 translate-y-1.5"></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="พิมพ์ข้อความของคุณ..."
                  disabled={isConnecting}
                  className="flex-1 bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500"
                  aria-label="ช่องป้อนข้อความแชท"
                />
                <button
                  onClick={sendMessage}
                  disabled={isConnecting || inputMessage.trim() === ""}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-colors flex items-center justify-center min-w-[48px]"
                  aria-label={isConnecting ? "กำลังส่งข้อความ" : "ส่งข้อความ"}
                  title={isConnecting ? "กำลังส่งข้อความ" : "ส่งข้อความ"}
                >
                  {isConnecting ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>

              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  ข้อความจะถูกส่งถึงทีมสนับสนุนของเราโดยตรง
                  <br />
                  <span className="text-orange-600 font-medium">
                    ตอบกลับภายใน 2-5 นาที
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
