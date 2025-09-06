
"use client";

import type { StudyTechnique } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, BookCopy } from 'lucide-react';
import Image from 'next/image';

interface StudyTechniqueCardProps {
  technique: StudyTechnique;
}

export function StudyTechniqueCard({ technique }: StudyTechniqueCardProps) {
  const { t } = useLanguage();

  const cardText = {
    exampleLabel: { es: "Ejemplo Práctico", en: "Practical Example" },
  };

  return (
    <Card className="flex flex-col h-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 dark:bg-card/50">
      {technique.animation_url && (
         <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
           <Image 
              src={technique.animation_url} 
              alt={t(technique.name)} 
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={technique.image_hint}
            />
         </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          {t(technique.name)}
        </CardTitle>
        <CardDescription className="pt-1">{t(technique.description)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-foreground/90">
                <BookCopy className="h-4 w-4 text-accent"/>
                {t(cardText.exampleLabel)}
            </h4>
            <p className="text-sm text-muted-foreground italic border-l-2 border-accent pl-3 py-1">
                {t(technique.example)}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
