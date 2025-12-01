import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import ChatInterface from "@/components/ChatInterface";
import heroMeditation from "@/assets/hero-meditation.png";
import botAvatar from "@/assets/bot-avatar.png";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation user={user} />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-block">
              <img 
                src={botAvatar} 
                alt="WellBot" 
                className="w-32 h-32 rounded-full shadow-elevated"
              />
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Mental Health Chatbot
              </span>
            </h1>
            
            <div className="bg-card rounded-3xl p-6 shadow-soft border-l-4 border-primary">
              <p className="text-lg italic text-muted-foreground">
                "If you want to live a happy life, tie it to a goal, not to people or things."
              </p>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Your safe space for emotional support and mental wellness. 
              I'm here to listen, understand, and help you navigate life's challenges 
              with compassion and care.
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-right duration-700 delay-200">
            <img 
              src={heroMeditation} 
              alt="Person meditating" 
              className="w-full rounded-3xl shadow-elevated"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-300">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Start Your Conversation
          </h2>
          <ChatInterface />
        </div>
      </main>
    </div>
  );
};

export default Index;
