
import type { StudyTechnique } from '@/types';

// This data simulates what you would fetch from a Firestore collection named "study_techniques".
// Each object represents a document in that collection.
export const studyTechniquesData: StudyTechnique[] = [
  {
    id: 'pomodoro',
    name: { es: 'Técnica Pomodoro', en: 'Pomodoro Technique' },
    description: {
      es: 'Trabaja en intervalos de tiempo enfocados, tradicionalmente de 25 minutos, separados por breves descansos.',
      en: 'Work in focused time intervals, traditionally 25 minutes in length, separated by short breaks.',
    },
    example: {
      es: 'Estudias intensamente por 25 minutos, tomas un descanso de 5 minutos, y repites. Después de cuatro ciclos, tomas un descanso más largo de 15-30 minutos.',
      en: 'You study intensely for 25 minutes, take a 5-minute break, and repeat. After four cycles, you take a longer 15-30 minute break.',
    },
    animation_url: 'https://www.tierradelsurpinamar.com.ar/wp-content/uploads/2021/04/NPCMI7NVIRGLBJXCI3VYOEWGPE.jpg',
    image_hint: 'glowing book',
  },
  {
    id: 'feynman',
    name: { es: 'Técnica Feynman', en: 'Feynman Technique' },
    description: {
      es: 'Aprende un concepto explicándolo en términos simples, como si se lo enseñaras a un niño.',
      en: 'Learn a concept by explaining it in simple terms, as if you were teaching it to a child.',
    },
    example: {
      es: 'Después de leer sobre la fotosíntesis, intentas escribir o decir una explicación simple del proceso sin usar jerga técnica. Si te atascas, vuelves a estudiar esa parte.',
      en: 'After reading about photosynthesis, you try to write or say a simple explanation of the process without using technical jargon. If you get stuck, you go back to study that part.',
    },
    animation_url: 'https://picsum.photos/seed/feynman/600/400',
    image_hint: 'blackboard equation',
  },
  {
    id: 'spaced-repetition',
    name: { es: 'Repetición Espaciada', en: 'Spaced Repetition' },
    description: {
      es: 'Revisa la información a intervalos crecientes para moverla de la memoria a corto plazo a la memoria a largo plazo.',
      en: 'Review information at increasing intervals to move it from short-term to long-term memory.',
    },
    example: {
      es: 'Usas tarjetas de memoria (flashcards). Después de aprender una palabra nueva, la revisas al día siguiente, luego en 3 días, luego en una semana, y así sucesivamente.',
      en: 'You use flashcards. After learning a new word, you review it the next day, then in 3 days, then in a week, and so on.',
    },
    animation_url: 'https://picsum.photos/seed/repetition/600/400',
    image_hint: 'flashcards calendar',
  },
  {
    id: 'active-reading',
    name: { es: 'Lectura Activa (SQ3R)', en: 'Active Reading (SQ3R)' },
    description: {
      es: 'Un método de lectura que involucra inspeccionar, preguntar, leer, recitar y revisar el material.',
      en: 'A reading method that involves Survey, Question, Read, Recite, and Review.',
    },
    example: {
      es: 'Antes de leer un capítulo, hojeas los títulos (Inspeccionar). Conviertes los títulos en preguntas (Preguntar). Lees buscando respuestas (Leer). Resumes en tus propias palabras (Recitar). Repasas tus notas (Revisar).',
      en: 'Before reading a chapter, you skim the headings (Survey). You turn headings into questions (Question). You read looking for answers (Read). You summarize in your own words (Recite). You go over your notes (Review).',
    },
    animation_url: 'https://picsum.photos/seed/reading/600/400',
    image_hint: 'open book',
  },
  {
    id: 'mind-mapping',
    name: { es: 'Mapas Mentales', en: 'Mind Mapping' },
    description: {
      es: 'Organiza visualmente la información. Un mapa mental es una jerarquía que se construye alrededor de un solo concepto.',
      en: 'Visually organize information. A mind map is a hierarchy that is built around a single concept.',
    },
    example: {
      es: 'Pones el tema principal, como "Sistema Solar", en el centro. Luego, dibujas ramas para cada planeta, y de cada planeta salen más ramas con datos clave (lunas, tamaño, etc.).',
      en: 'You put the main topic, like "Solar System," in the center. Then, you draw branches for each planet, and from each planet, more branches with key facts (moons, size, etc.) emerge.',
    },
    animation_url: 'https://picsum.photos/seed/mindmap/600/400',
    image_hint: 'mind map',
  },
];
