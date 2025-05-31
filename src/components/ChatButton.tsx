import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Headphones, User, Bot } from "lucide-react";

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
  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "error"
  >("connected");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionId = useRef<string>(
    `SESSION_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const pollingInterval = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateId = useRef<number>(0);

  // Telegram API Configuration
  const TELEGRAM_CONFIG = {
    BOT_TOKEN: "8137827400:AAFsH5HsZqEysesIQN4IejJqcvwz1Qk4m0Y",
    CHAT_ID: "471795698",
    API_BASE: "https://api.telegram.org/bot",
  };

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

  // Send message to Telegram
  const sendToTelegram = async (message: string): Promise<boolean> => {
    try {
      setIsConnecting(true);

      const telegramMessage = `🔔 แชทสดจากเว็บไซต์
━━━━━━━━━━━━━━━━━━━━
👤 ผู้ใช้: Anonymous User
📱 Session: ${chatSessionId.current}
💬 ข้อความ: ${message}
⏰ เวลา: ${new Date().toLocaleString("th-TH")}
🌐 ที่มา: Portfolio Website Chat
━━━━━━━━━━━━━━━━━━━━

📞 ตอบกลับในแชทนี้เพื่อสื่อสารกับผู้ใช้โดยตรง`;

      console.log("Sending message to Telegram:", message);

      const response = await fetch(
        `${TELEGRAM_CONFIG.API_BASE}${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.CHAT_ID,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        }
      );

      const result = await response.json();
      console.log("Telegram API response:", result);

      if (result.ok) {
        setConnectionStatus("connected");

        // Force an immediate poll to check for responses
        setTimeout(() => {
          pollTelegramUpdates();
        }, 1000);

        return true;
      } else {
        console.error("Telegram API Error:", result);
        setConnectionStatus("error");
        return false;
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      setConnectionStatus("error");
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Poll Telegram for new messages
  const pollTelegramUpdates = async () => {
    try {
      // Add logging to debug
      console.log("Polling for updates, lastUpdateId:", lastUpdateId.current);

      const response = await fetch(
        `${TELEGRAM_CONFIG.API_BASE}${
          TELEGRAM_CONFIG.BOT_TOKEN
        }/getUpdates?offset=${lastUpdateId.current + 1}&timeout=10`
      );

      const result = await response.json();

      if (result.ok) {
        console.log("Telegram updates received:", result.result.length);

        if (result.result.length > 0) {
          for (const update of result.result) {
            console.log("Processing update:", update);

            // ปรับเงื่อนไขการตรวจสอบข้อความจาก Telegram
            if (
              update.message &&
              update.message.chat &&
              update.message.chat.id.toString() === TELEGRAM_CONFIG.CHAT_ID
            ) {
              // Accept all messages from the chat ID as valid responses
              const botMessage: Message = {
                id: `telegram_${update.message.message_id || Date.now()}`,
                text: update.message.text || "ได้รับข้อความใหม่",
                sender: "bot",
                timestamp: new Date(
                  (update.message.date || Date.now() / 1000) * 1000
                ),
                telegram_message_id: update.message.message_id,
              };

              console.log("Adding bot message to chat:", botMessage);

              setMessages((prev) => {
                // Check if message already exists to avoid duplicates
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
        console.error("Failed to get updates:", result);
        setConnectionStatus("error");
      }
    } catch (error) {
      console.error("Error polling Telegram updates:", error);
      setConnectionStatus("error");
    }
  };

  const startPollingTelegramUpdates = () => {
    if (pollingInterval.current) return;

    console.log("Starting to poll for Telegram updates");

    // Initial poll
    pollTelegramUpdates();

    // Set up polling interval - ปรับให้ถี่ขึ้นเป็นทุก 2 วินาที
    pollingInterval.current = setInterval(pollTelegramUpdates, 2000);
  };

  const stopPollingTelegramUpdates = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
      pollingInterval.current = null;
    }
  };

  // Send message handler
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

    // Send to Telegram
    const success = await sendToTelegram(messageToSend);

    if (!success) {
      // Add error message if send failed
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

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
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
        <div className="relative">
          {/* Status Indicator */}
          <motion.div
            className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor()} rounded-full z-10 border-2 border-white`}
            animate={{
              scale: connectionStatus === "connected" ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: connectionStatus === "connected" ? Infinity : 0,
              repeatType: "reverse",
            }}
          />

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 border-2 border-orange-400/30"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(249, 115, 22, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: "transform" }}
          >
            <div className="relative">
              {isOpen ? (
                <X size={28} className="text-white" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-orange-400/30 rounded-full animate-ping"></div>
                  <Headphones size={28} className="text-white relative z-10" />
                  <motion.div
                    className="absolute -right-2 -bottom-1 w-4 h-4 bg-white rounded-full border-2 border-orange-500 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-[9998] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
                  <Headphones size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">
                    ทีมสนับสนุน
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30 font-normal flex items-center">
                      <span
                        className={`w-1.5 h-1.5 ${getStatusColor()} rounded-full mr-1 animate-pulse`}
                      ></span>
                      สด
                    </span>
                  </div>
                  <div className="text-orange-100 text-xs flex items-center gap-1">
                    <div
                      className={`w-2 h-2 ${getStatusColor()} rounded-full`}
                    ></div>
                    {getStatusText()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.sender === "user" && (
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="rounded-2xl px-4 py-3 bg-orange-500 text-white rounded-br-md">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.text}
                        </p>
                        <p className="text-xs mt-2 text-orange-100">
                          {message.timestamp.toLocaleTimeString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User size={16} className="text-white" />
                      </div>
                    </div>
                  )}

                  {message.sender !== "user" && (
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                          message.sender === "bot"
                            ? "bg-orange-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {message.sender === "bot" ? (
                          <Bot size={16} className="text-white" />
                        ) : (
                          <X size={16} className="text-white" />
                        )}
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.sender === "bot"
                            ? "bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm"
                            : "bg-yellow-50 border border-yellow-200 text-yellow-800 text-center rounded-md"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {message.text}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            message.sender === "bot"
                              ? "text-gray-500"
                              : "text-yellow-600"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString("th-TH", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Connecting Indicator */}
              {isConnecting && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          กำลังส่งข้อความ...
                        </span>
                      </div>
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
                />
                <button
                  onClick={sendMessage}
                  disabled={isConnecting || inputMessage.trim() === ""}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl transition-colors flex items-center justify-center min-w-[48px]"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatButton;
