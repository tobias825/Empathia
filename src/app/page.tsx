import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { MessageCircle, TrendingUp, HeartHandshake } from 'lucide-react';

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
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                <MessageCircle size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold">Empathetic Chat</h3>
                <p className="text-muted-foreground">
                  Engage in meaningful conversations with our AI, designed to listen and respond with understanding and care.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                <TrendingUp size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold">Sentiment Insights</h3>
                <p className="text-muted-foreground">
                  Gain insights into your emotional patterns. Our AI analyzes chat history to help you understand your feelings better.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
                <HeartHandshake size={48} className="mb-4 text-accent" />
                <h3 className="mb-2 text-xl font-semibold">Resource Hub</h3>
                <p className="text-muted-foreground">
                  Access a curated list of mental health resources, hotlines, and information for additional support when you need it.
                </p>
              </div>
            </div>
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
