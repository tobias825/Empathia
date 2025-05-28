
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { MessageCircle, TrendingUp, HeartHandshake, Smile, Users, Zap } from 'lucide-react';

const StickFiguresHoldingHands = () => (
  <svg width="180" height="70" viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg" className="text-primary/70 dark:text-primary/60 group-hover:text-primary transition-colors duration-300">
    <style>{`
      .person-group circle { transition: fill 0.3s ease; }
      .person-group line { transition: stroke 0.3s ease; }
      .person-group:hover circle { fill: hsl(var(--accent)); }
      .person-group:hover line { stroke: hsl(var(--accent)); }
    `}</style>
    {/* Person 1 */}
    <g className="person-group">
      <circle cx="30" cy="20" r="8" fill="currentColor" />
      <line x1="30" y1="28" x2="30" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="38" x2="30" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="42" y1="38" x2="30" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="40" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>

    {/* Person 2 */}
    <g className="person-group">
      <circle cx="90" cy="20" r="8" fill="currentColor" />
      <line x1="90" y1="28" x2="90" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="78" y1="38" x2="90" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="102" y1="38" x2="90" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="50" x2="80" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="50" x2="100" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>
    
    {/* Person 3 */}
    <g className="person-group">
      <circle cx="150" cy="20" r="8" fill="currentColor" />
      <line x1="150" y1="28" x2="150" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="138" y1="38" x2="150" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="162" y1="38" x2="150" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="50" x2="160" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>
    
    {/* Connecting Hands (simple lines) */}
    <line x1="42" y1="36" x2="78" y2="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round"/>
    <line x1="102" y1="36" x2="138" y2="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round"/>
  </svg>
);

const CalmingSwirls = () => (
  <svg width="120" height="60" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg" className="text-accent/60 dark:text-accent/50 group-hover:text-accent transition-colors duration-300">
     <style>{`
      .swirl-path { transition: stroke 0.3s ease, opacity 0.3s ease; }
      g:hover .swirl-path { stroke: hsl(var(--primary)); opacity: 1; }
    `}</style>
    <g>
      <path d="M10 30 Q 25 10, 40 30 T 70 30 Q 85 50, 100 30 T 110 30" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" className="swirl-path"/>
      <path d="M15 40 Q 30 20, 45 40 T 75 40 Q 90 60, 105 40 T 115 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" className="swirl-path"/>
    </g>
  </svg>
);


export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl text-foreground">
              Find Your Calm with <span className="text-primary">Sereno AI</span>
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
              An empathetic AI companion designed to provide emotional support, understand your feelings, and guide you towards peace.
            </p>
          </div>
          <div className="mx-auto mt-6 flex gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">I have an account</Link>
            </Button>
          </div>
        </section>

        <section className="py-12 bg-secondary/30">
          <div className="container">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Features</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <MessageCircle size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Empathetic Chat</h3>
                <p className="text-muted-foreground">
                  Engage in meaningful conversations with our AI, designed to listen and respond with understanding and care.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <TrendingUp size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Sentiment Insights</h3>
                <p className="text-muted-foreground">
                  Gain insights into your emotional patterns. Our AI analyzes chat history to help you understand your feelings better.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <HeartHandshake size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">Resource Hub</h3>
                <p className="text-muted-foreground">
                  Access a curated list of mental health resources, hotlines, and information for additional support when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              A Space for <span className="text-primary">Comfort &amp; Connection</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-10">
              Sereno is more than just an app; it's a gentle reminder that you're not alone. Here are some symbols of support and calm.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
              <div className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-card transition-colors duration-300">
                <StickFiguresHoldingHands />
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Community Support</p>
              </div>
              <div className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-card transition-colors duration-300">
                <CalmingSwirls />
                <p className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">Peaceful Flow</p>
              </div>
               <div className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-card transition-colors duration-300">
                <Smile size={60} className="text-secondary group-hover:text-primary transition-colors duration-300" strokeWidth={1.5}/>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Positive Vibes</p>
              </div>
            </div>
             <p className="mt-12 text-sm text-muted-foreground/80">
              These small doodles represent our commitment to creating a space of warmth and understanding.
            </p>
          </div>
        </section>

      </main>

      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with care. Your emotional well-being is our priority.
          </p>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sereno AI</p>
        </div>
      </footer>
    </div>
  );
}
