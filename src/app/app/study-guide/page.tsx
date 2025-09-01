
"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen } from 'lucide-react';
import { StudyTechniqueCard } from '@/components/study/StudyTechniqueCard';
import { studyTechniquesData } from '@/lib/study-data'; // Simulated Firestore data
import type { StudyTechnique } from '@/types';

export default function StudyGuidePage() {
  const { t, language } = useLanguage();

  const pageText = {
    mainTitle: { es: 'Guía de Estudio', en: 'Study Guide' },
    mainDescription: {
      es: 'Explora técnicas de estudio probadas para potenciar tu aprendizaje, mejorar tu retención y estudiar de manera más inteligente.',
      en: 'Explore proven study techniques to boost your learning, improve retention, and study smarter.',
    },
  };

  const techniques: StudyTechnique[] = studyTechniquesData;

  return (
    <div className="container mx-auto py-4">
      <header className="mb-10 text-center">
        <BookOpen className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
          {t(pageText.mainTitle)}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t(pageText.mainDescription)}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {techniques.map((technique) => (
          <StudyTechniqueCard key={technique.id} technique={technique} />
        ))}
      </div>
       <footer className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {language === 'es' 
            ? 'Elige una técnica y pruébala. ¡La consistencia es la clave del éxito!' 
            : 'Choose a technique and give it a try. Consistency is the key to success!'}
        </p>
      </footer>
    </div>
  );
}
