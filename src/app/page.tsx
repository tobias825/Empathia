"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { MessageCircle, TrendingUp, HeartHandshake, Smile } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image'; 

const StickFiguresHoldingHands = () => (
  <svg width="180" height="70" viewBox="0 0 180 70" xmlns="http://www.w3.org/2000/svg" className="text-primary/70 dark:text-primary/60 group-hover:text-primary transition-colors duration-300">
    <style>{`
      .person-group circle { transition: fill 0.3s ease; }
      .person-group line { transition: stroke 0.3s ease; }
      .person-group:hover circle { fill: hsl(var(--accent)); }
      .person-group:hover line { stroke: hsl(var(--accent)); }
    `}</style>
    <g className="person-group">
      <circle cx="30" cy="20" r="8" fill="currentColor" />
      <line x1="30" y1="28" x2="30" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="18" y1="38" x2="30" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="42" y1="38" x2="30" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="30" y1="50" x2="40" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>    
    <g className="person-group">
      <circle cx="90" cy="20" r="8" fill="currentColor" />
      <line x1="90" y1="28" x2="90" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="78" y1="38" x2="90" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="102" y1="38" x2="90" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="50" x2="80" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="90" y1="50" x2="100" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>
    <g className="person-group">
      <circle cx="150" cy="20" r="8" fill="currentColor" />
      <line x1="150" y1="28" x2="150" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="138" y1="38" x2="150" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="162" y1="38" x2="150" y2="35" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <line x1="150" y1="50" x2="160" y2="60" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </g>
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
  const { t } = useLanguage();

  const pageText = {
    headerLogin: { es: "Iniciar Sesión", en: "Login" },
    headerRegister: { es: "Registrarse", en: "Sign Up" },
    mainHeading1: { es: "Encuentra tu Calma con ", en: "Find Your Calm with " },
    mainHeading2: { es: "Empathia", en: "Empathia" },
    subheading: { 
      es: "Un compañero IA empático diseñado para proporcionar apoyo emocional, comprender tus sentimientos y guiarte hacia la paz.",
      en: "An empathetic AI companion designed to provide emotional support, understand your feelings, and guide you towards peace."
    },
    startButton: { es: "Comenzar", en: "Get Started" },
    haveAccountButton: { es: "Tengo una cuenta", en: "I have an account" },
    featuresHeading: { es: "Funcionalidades", en: "Features" },
    empatheticChatTitle: { es: "Chat Empático", en: "Empathetic Chat" },
    empatheticChatDesc: { 
      es: "Participa en conversaciones significativas con nuestra IA, diseñada para escuchar y responder con comprensión y cuidado.",
      en: "Engage in meaningful conversations with our AI, designed to listen and respond with understanding and care."
    },
    sentimentAnalysisTitle: { es: "Análisis de Sentimientos", en: "Sentiment Analysis" },
    sentimentAnalysisDesc: { 
      es: "Obtén información sobre tus patrones emocionales. Nuestra IA analiza el historial de chat para ayudarte a comprender mejor tus sentimientos.",
      en: "Gain insights into your emotional patterns. Our AI analyzes chat history to help you better understand your feelings."
    },
    resourceHubTitle: { es: "Centro de Recursos", en: "Resource Hub" },
    resourceHubDesc: { 
      es: "Accede a una lista seleccionada de recursos de salud mental, líneas directas e información para obtener apoyo adicional cuando lo necesites.",
      en: "Access a curated list of mental health resources, hotlines, and information for additional support when you need it."
    },
    comfortSectionHeading1: { es: "Un Espacio para el ", en: "A Space for " },
    comfortSectionHeading2: { es: "Confort y la Conexión", en: "Comfort and Connection" },
    comfortSectionDesc: {
      es: "Empathia es más que una aplicación; es un recordatorio amable de que no estás solo/a. Aquí hay algunos símbolos de apoyo y calma.",
      en: "Empathia is more than an app; it's a gentle reminder that you are not alone. Here are some symbols of support and calm."
    },
    communitySupport: { es: "Apoyo Comunitario", en: "Community Support" },
    peacefulFlow: { es: "Flujo Pacífico", en: "Peaceful Flow" },
    positiveVibes: { es: "Vibras Positivas", en: "Positive Vibes" },
    doodlesCommitment: {
      es: "Estos pequeños garabatos representan nuestro compromiso de crear un espacio de calidez y comprensión.",
      en: "These little doodles represent our commitment to creating a space of warmth and understanding."
    },
    footerBuiltWithCare: { 
      es: "Construido con cuidado. Tu bienestar emocional es nuestra prioridad.",
      en: "Built with care. Your emotional well-being is our priority."
    },
    footerCopyright: { es: "© {year} Empathia", en: "© {year} Empathia" }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between">
          <div>
            <Logo />
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">{t(pageText.headerLogin)}</Link>
            </Button>
            <Button asChild>
              <Link href="/register">{t(pageText.headerRegister)}</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
           <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                {t(pageText.mainHeading1)}<span className="text-primary">{t(pageText.mainHeading2)}</span>
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                {t(pageText.subheading)}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                    <Link href="/register">{t(pageText.startButton)}</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                    <Link href="/login">{t(pageText.haveAccountButton)}</Link>
                    </Button>
                </div>
            </div>
           </div>
        </section>

        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-foreground">{t(pageText.featuresHeading)}</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <MessageCircle size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t(pageText.empatheticChatTitle)}</h3>
                <p className="text-muted-foreground">
                  {t(pageText.empatheticChatDesc)}
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <TrendingUp size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t(pageText.sentimentAnalysisTitle)}</h3>
                <p className="text-muted-foreground">
                  {t(pageText.sentimentAnalysisDesc)}
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <HeartHandshake size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold text-foreground">{t(pageText.resourceHubTitle)}</h3>
                <p className="text-muted-foreground">
                  {t(pageText.resourceHubDesc)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="mb-6 text-3xl font-bold text-foreground">
              {t(pageText.comfortSectionHeading1)}<span className="text-primary">{t(pageText.comfortSectionHeading2)}</span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-10">
              {t(pageText.comfortSectionDesc)}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
              <div className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-card transition-colors duration-300">
                <StickFiguresHoldingHands />
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{t(pageText.communitySupport)}</p>
              </div>
              <div className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-card transition-colors duration-300">
                <CalmingSwirls />
                <p className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">{t(pageText.peacefulFlow)}</p>
              </div>
               <div className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-card transition-colors duration-300">
                <Smile size={60} className="text-secondary group-hover:text-primary transition-colors duration-300" strokeWidth={1.5}/>
                <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">{t(pageText.positiveVibes)}</p>
              </div>
            </div>
             <p className="mt-12 text-sm text-muted-foreground/80">
              {t(pageText.doodlesCommitment)}
            </p>
          </div>
        </section>

      </main>

      <footer className="py-6 md:px-8 md:py-0 bg-background border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            {t(pageText.footerBuiltWithCare)}
          </p>
          <p className="text-sm text-muted-foreground">
            {t(pageText.footerCopyright).replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </footer>
    </div>
  );
}
    