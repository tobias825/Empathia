
"use client";

import type { StudyTechnique } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lightbulb, BookCopy, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

interface StudyTechniqueCardProps {
  technique: StudyTechnique;
}

export function StudyTechniqueCard({ technique }: StudyTechniqueCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

  const cardText = {
    exampleLabel: { es: "Ejemplo Práctico", en: "Practical Example" },
    tryTechnique: { es: "Probar Técnica", en: "Try Technique" },
    comingSoonTitle: { es: "Próximamente", en: "Coming Soon" },
    comingSoonDesc: { es: "La vista detallada para esta técnica aún no está disponible.", en: "The detailed view for this technique is not yet available." }
  };

  const handleTryTechnique = () => {
    // For now, this will show a toast. In the future, it could navigate to a detailed view.
    toast({
      title: t(cardText.comingSoonTitle),
      description: t(cardText.comingSoonDesc),
    });
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
      <CardFooter>
        <Button onClick={handleTryTechnique} className="w-full">
            {t(cardText.tryTechnique)}
            <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
