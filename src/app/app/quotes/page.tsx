
"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { QuoteCategory, MotivationalQuote } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Lightbulb, ShieldCheck, Heart, Sparkles, Sunrise } from 'lucide-react';

const quoteCategories: QuoteCategory[] = [
  {
    id: 'strength',
    title: { es: 'Para la Fortaleza', en: 'For Strength' },
    description: { es: 'Cuando necesites un impulso para seguir adelante.', en: 'When you need a boost to keep going.' },
    icon: ShieldCheck,
    quotes: [
      { id: 's1', text: { es: 'La vida te pondrá obstáculos, pero los límites los pones tú.', en: 'Life will put obstacles in your way, but you set the limits.' } },
      { id: 's2', text: { es: 'No importa lo lento que vayas, siempre y cuando no te detengas.', en: 'It does not matter how slowly you go as long as you do not stop.' }, author: { es: 'Confucio', en: 'Confucius' } },
      { id: 's3', text: { es: 'Eres más valiente de lo que crees, más fuerte de lo que pareces y más inteligente de lo que piensas.', en: 'You are braver than you believe, stronger than you seem, and smarter than you think.' }, author: { es: 'A.A. Milne', en: 'A.A. Milne' } },
    ],
  },
  {
    id: 'hope',
    title: { es: 'Para la Esperanza', en: 'For Hope' },
    description: { es: 'En momentos de oscuridad, recuerda que siempre hay luz.', en: 'In moments of darkness, remember there is always light.' },
    icon: Sunrise,
    quotes: [
      { id: 'h1', text: { es: 'La esperanza es el sueño del hombre despierto.', en: 'Hope is the dream of a waking man.' }, author: { es: 'Aristóteles', en: 'Aristotle' } },
      { id: 'h2', text: { es: 'Incluso la noche más oscura terminará y el sol saldrá.', en: 'Even the darkest night will end and the sun will rise.' }, author: { es: 'Victor Hugo', en: 'Victor Hugo' } },
      { id: 'h3', text: { es: 'Mantén tu rostro siempre hacia la luz del sol, y las sombras caerán detrás de ti.', en: 'Keep your face always toward the sunshine, and shadows will fall behind you.' }, author: { es: 'Walt Whitman', en: 'Walt Whitman' } },
    ],
  },
  {
    id: 'self-love',
    title: { es: 'Para el Amor Propio', en: 'For Self-Love' },
    description: { es: 'Recuerda cuidarte y valorarte.', en: 'Remember to take care of and value yourself.' },
    icon: Heart,
    quotes: [
      { id: 'sl1', text: { es: 'Amarse a uno mismo es el comienzo de un romance para toda la vida.', en: 'To love oneself is the beginning of a lifelong romance.' }, author: { es: 'Oscar Wilde', en: 'Oscar Wilde' } },
      { id: 'sl2', text: { es: 'Eres suficiente tal como eres.', en: 'You are enough just as you are.' } },
      { id: 'sl3', text: { es: 'Habla contigo mismo como lo harías con alguien a quien amas.', en: 'Talk to yourself like you would to someone you love.' }, author: { es: 'Brené Brown', en: 'Brené Brown' } },
    ],
  },
  {
    id: 'motivation',
    title: { es: 'Motivación General', en: 'General Motivation' },
    description: { es: 'Un poco de inspiración para tu día a día.', en: 'A little inspiration for your day-to-day.' },
    icon: Sparkles,
    quotes: [
      { id: 'm1', text: { es: 'El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.', en: 'The best time to plant a tree was 20 years ago. The second best time is now.' }, author: { es: 'Proverbio Chino', en: 'Chinese Proverb' } },
      { id: 'm2', text: { es: 'Cree que puedes y ya estás a medio camino.', en: 'Believe you can and you’re halfway there.' }, author: { es: 'Theodore Roosevelt', en: 'Theodore Roosevelt' } },
      { id: 'm3', text: { es: 'El único modo de hacer un gran trabajo es amar lo que haces.', en: 'The only way to do great work is to love what you do.' }, author: { es: 'Steve Jobs', en: 'Steve Jobs' } },
    ],
  },
];

export default function MotivationalQuotesPage() {
  const { t, language } = useLanguage();

  const pageText = {
    mainTitle: { es: 'Citas Inspiradoras', en: 'Inspirational Quotes' },
    mainDescription: {
      es: 'Encuentra aquí palabras de aliento y motivación para iluminar tu día y fortalecer tu espíritu.',
      en: 'Find words of encouragement and motivation here to brighten your day and strengthen your spirit.',
    },
    authorLabel: { es: 'Autor:', en: 'Author:' },
    unknownAuthor: { es: 'Desconocido', en: 'Unknown' },
  };

  return (
    <div className="container mx-auto py-4">
      <header className="mb-10 text-center">
        <Lightbulb className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
          {t(pageText.mainTitle)}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t(pageText.mainDescription)}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {quoteCategories.map((category) => {
          const CategoryIcon = category.icon || Sparkles;
          return (
            <Card key={category.id} className="flex flex-col shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <CategoryIcon className="h-8 w-8 text-accent" />
                    <CardTitle className="text-2xl">{t(category.title)}</CardTitle>
                </div>
                {category.description && (
                  <CardDescription>{t(category.description)}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                <Accordion type="multiple" className="w-full">
                  {category.quotes.map((quote, index) => (
                    <AccordionItem value={`quote-${category.id}-${index}`} key={quote.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <span className="italic text-sm text-foreground/90">"{t(quote.text)}"</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-right">
                        <p className="text-xs text-muted-foreground">
                          &mdash; {quote.author ? t(quote.author) : t(pageText.unknownAuthor)}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
