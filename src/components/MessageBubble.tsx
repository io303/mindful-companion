import botAvatar from "@/assets/bot-avatar.png";
import { User } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

const MessageBubble = ({ role, content }: MessageBubbleProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full ${isUser ? "bg-primary" : "bg-card"} flex items-center justify-center shadow-soft overflow-hidden`}>
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <img src={botAvatar} alt="WellBot" className="w-full h-full object-cover" />
        )}
      </div>
      
      <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-soft ${
        isUser 
          ? "bg-primary text-primary-foreground rounded-tr-sm" 
          : "bg-card text-card-foreground rounded-tl-sm"
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
