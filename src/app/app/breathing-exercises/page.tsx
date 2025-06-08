
"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wind, Square, Repeat, Dot, Waves, Lung } from 'lucide-react'; // Added Waves and Lung

interface BreathingExercise {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  steps: { es: string[]; en: string[] };
  icon: React.ElementType;
  iconColor?: string; // Optional: for specific icon styling if needed
}

const exercises: BreathingExercise[] = [
  {
    id: 'box-breathing',
    title: { es: 'Respiración Cuadrada (Box Breathing)', en: 'Box Breathing' },
    description: {
      es: 'Una técnica simple para calmar el sistema nervioso y reducir el estrés. Visualiza un cuadrado mientras respiras.',
      en: 'A simple technique to calm the nervous system and reduce stress. Visualize a square as you breathe.',
    },
    steps: {
      es: [
        'Inhala lentamente por la nariz contando hasta 4.',
        'Mantén la respiración contando hasta 4.',
        'Exhala lentamente por la boca contando hasta 4.',
        'Mantén los pulmones vacíos contando hasta 4.',
        'Repite el ciclo durante varios minutos.',
      ],
      en: [
        'Inhale slowly through your nose for a count of 4.',
        'Hold your breath for a count of 4.',
        'Exhale slowly through your mouth for a count of 4.',
        'Hold your lungs empty for a count of 4.',
        'Repeat the cycle for several minutes.',
      ],
    },
    icon: Square,
    iconColor: 'text-blue-500',
  },
  {
    id: '478-breathing',
    title: { es: 'Respiración 4-7-8', en: '4-7-8 Breathing' },
    description: {
      es: 'Conocida como "respiración relajante", esta técnica puede ayudar a reducir la ansiedad y promover el sueño.',
      en: 'Known as "relaxing breath," this technique can help reduce anxiety and promote sleep.',
    },
    steps: {
      es: [
        'Exhala completamente por la boca, haciendo un sonido de "whoosh".',
        'Cierra la boca e inhala silenciosamente por la nariz contando mentalmente hasta 4.',
        'Aguanta la respiración contando hasta 7.',
        'Exhala completamente por la boca, haciendo un sonido de "whoosh", contando hasta 8.',
        'Esto completa una respiración. Repite el ciclo tres veces más, para un total de cuatro respiraciones.',
      ],
      en: [
        'Exhale completely through your mouth, making a whoosh sound.',
        'Close your mouth and inhale quietly through your nose to a mental count of 4.',
        'Hold your breath for a count of 7.',
        'Exhale completely through your mouth, making a whoosh sound to a count of 8.',
        'This is one breath. Repeat the cycle three more times for a total of four breaths.',
      ],
    },
    icon: Repeat,
    iconColor: 'text-green-500',
  },
  {
    id: 'diaphragmatic-breathing',
    title: { es: 'Respiración Diafragmática (Abdominal)', en: 'Diaphragmatic Breathing (Belly Breathing)' },
    description: {
      es: 'Fomenta la respiración profunda y completa, ayudando a oxigenar mejor el cuerpo y a relajar el sistema nervioso.',
      en: 'Encourages full, deep breaths, helping to better oxygenate the body and relax the nervous system.',
    },
    steps: {
      es: [
        'Siéntate cómodamente o acuéstate boca arriba.',
        'Coloca una mano sobre tu pecho y la otra sobre tu abdomen, justo debajo de las costillas.',
        'Inhala lentamente por la nariz, sintiendo cómo tu abdomen se expande mientras tu pecho permanece relativamente quieto.',
        'Exhala lentamente a través de los labios fruncidos (como si soplaras una vela), sintiendo cómo tu abdomen desciende.',
        'Concéntrate en este movimiento abdominal durante varias respiraciones.',
        'Practica durante 5-10 minutos.',
      ],
      en: [
        'Sit comfortably or lie on your back.',
        'Place one hand on your chest and the other on your belly, just below your ribs.',
        'Inhale slowly through your nose, feeling your belly expand while your chest remains relatively still.',
        'Exhale slowly through pursed lips (as if blowing out a candle), feeling your belly fall.',
        'Focus on this abdominal movement for several breaths.',
        'Practice for 5-10 minutes.',
      ],
    },
    icon: Lung, 
    iconColor: 'text-teal-500',
  },
];

export default function BreathingExercisesPage() {
  const { t, language } = useLanguage();

  const pageText = {
    mainTitle: { es: 'Ejercicios de Respiración Guiados', en: 'Guided Breathing Exercises' },
    mainDescription: {
      es: 'Encuentra calma y reduce la ansiedad con estas sencillas técnicas de respiración. Practícalas regularmente para mejores resultados.',
      en: 'Find calm and reduce anxiety with these simple breathing techniques. Practice them regularly for best results.',
    },
    stepLabel: { es: 'Paso', en: 'Step' },
  };

  return (
    <div className="container mx-auto py-4">
      <header className="mb-10 text-center">
        <Wind className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold text-foreground tracking-tight sm:text-4xl">
          {t(pageText.mainTitle)}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t(pageText.mainDescription)}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {exercises.map((exercise) => {
          const ExerciseIcon = exercise.icon;
          return (
            <Card key={exercise.id} className="flex flex-col shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <ExerciseIcon className={`h-8 w-8 ${exercise.iconColor || 'text-accent'}`} />
                  <CardTitle className="text-2xl">{t(exercise.title)}</CardTitle>
                </div>
                <CardDescription>{t(exercise.description)}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {(language === 'es' ? exercise.steps.es : exercise.steps.en).map((step, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Dot className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                      <span className="text-sm text-foreground/90">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
       <footer className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {language === 'es' 
            ? 'Recuerda: Estos ejercicios son una herramienta de apoyo y no reemplazan la consulta profesional. Si sientes que necesitas ayuda, busca un especialista.' 
            : 'Remember: These exercises are a support tool and do not replace professional consultation. If you feel you need help, please seek a specialist.'}
        </p>
      </footer>
    </div>
  );
}
