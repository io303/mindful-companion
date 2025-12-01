import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Heart, Shield, MessageCircle } from "lucide-react";

const About = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation user={user} />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-center bg-gradient-hero bg-clip-text text-transparent">
            About WellBot
          </h1>
          
          <p className="text-xl text-center text-muted-foreground mb-12">
            Your compassionate AI companion for mental wellness
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-3xl p-8 shadow-elevated text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Empathetic Support</h3>
              <p className="text-muted-foreground">
                WellBot provides compassionate, judgment-free support whenever you need it.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-elevated text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
              <p className="text-muted-foreground">
                Your conversations are confidential and protected with industry-standard security.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 shadow-elevated text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-muted-foreground">
                Access support anytime, anywhere. WellBot is always here to listen.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-3xl p-8 shadow-elevated">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              WellBot was created to make mental health support more accessible to everyone. 
              We understand that sometimes you just need someone to talk to, and that's where 
              WellBot comes in.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              While WellBot provides valuable support and coping strategies, it's important to 
              remember that it's not a replacement for professional mental health care. If you're 
              experiencing a crisis or severe mental health issues, please reach out to a 
              qualified mental health professional or crisis helpline.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our goal is to complement traditional mental health services by providing immediate, 
              accessible support for everyday challenges and emotional wellness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
