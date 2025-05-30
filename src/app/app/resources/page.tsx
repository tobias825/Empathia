
"use client";
import { ResourceCard } from '@/components/resources/ResourceCard';
import type { ResourceItem } from '@/types';
import { LifeBuoy, BookOpenText, Users, PhoneCall, MessageSquareHeart, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const resources: ResourceItem[] = [
  {
    id: 'crisis-hotline-1',
    title: { 
      en: 'National Suicide Prevention Lifeline', 
      es: 'Línea Nacional de Prevención del Suicidio' 
    },
    description: { 
      en: 'Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.', 
      es: 'Proporciona apoyo gratuito y confidencial las 24 horas del día, los 7 días de la semana, para personas en momentos de angustia, así como recursos de prevención y crisis para ti o tus seres queridos.' 
    },
    phone: '988',
    link: 'https://988lifeline.org/',
    icon: PhoneCall,
  },
  {
    id: 'crisis-text-line',
    title: { 
      en: 'Crisis Text Line', 
      es: 'Línea de Texto para Crisis' 
    },
    description: { 
      en: 'Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis. A live, trained Crisis Counselor receives the text and responds.', 
      es: 'Envía un mensaje de texto con la palabra HOME al 741741 desde cualquier lugar de EE. UU., en cualquier momento y sobre cualquier tipo de crisis. Un consejero de crisis capacitado y en vivo recibe el mensaje y responde.' 
    },
    link: 'https://www.crisistextline.org/',
    icon: MessageSquareHeart,
  },
  {
    id: 'mental-health-gov',
    title: { 
      en: 'MentalHealth.gov', 
      es: 'MentalHealth.gov (Gobierno de EE. UU.)' 
    },
    description: { 
      en: 'Provides one-stop access to U.S. government mental health and mental health problems information.', 
      es: 'Proporciona acceso centralizado a información sobre salud mental y problemas de salud mental del gobierno de EE. UU.' 
    },
    link: 'https://www.mentalhealth.gov/',
    icon: BookOpenText,
  },
  {
    id: 'nami',
    title: { 
      en: 'National Alliance on Mental Illness (NAMI)', 
      es: 'Alianza Nacional sobre Enfermedades Mentales (NAMI)' 
    },
    description: { 
      en: 'The nation’s largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.', 
      es: 'La organización de base de salud mental más grande del país, dedicada a construir mejores vidas para los millones de estadounidenses afectados por enfermedades mentales.' 
    },
    link: 'https://www.nami.org/',
    icon: Users,
  },
  {
    id: 'samhsa',
    title: { 
      en: 'SAMHSA National Helpline', 
      es: 'Línea de Ayuda Nacional de SAMHSA' 
    },
    description: { 
      en: 'Confidential free help, from public health agencies, to find substance use treatment and information. 1-800-662-HELP (4357)', 
      es: 'Ayuda confidencial y gratuita de agencias de salud pública para encontrar tratamiento e información sobre el uso de sustancias. 1-800-662-HELP (4357)' 
    },
    phone: '1-800-662-4357',
    link: 'https.www.samhsa.gov/find-help/national-helpline',
    icon: LifeBuoy,
  },
  {
    id: 'the-trevor-project',
    title: { 
      en: 'The Trevor Project', 
      es: 'The Trevor Project' 
    },
    description: { 
      en: 'The leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.', 
      es: 'La principal organización nacional que brinda servicios de intervención en crisis y prevención del suicidio a jóvenes lesbianas, gays, bisexuales, transgénero, queer e indecisos (LGBTQ) menores de 25 años.' 
    },
    phone: '1-866-488-7386',
    link: 'https://www.thetrevorproject.org/',
    icon: HeartHandshake,
  }
];

export default function ResourcesPage() {
  const { t } = useLanguage();

  const pageText = {
    title: {
      es: "Recursos de Salud Mental",
      en: "Mental Health Resources"
    },
    description: {
      es: "Si estás en peligro inmediato, por favor llama al 911. A continuación, algunos recursos que pueden proporcionar apoyo, información y alguien que escuche. No estás solo/a.",
      en: "If you are in immediate danger, please call 911. Below are some resources that can provide support, information, and a listening ear. You are not alone."
    },
    notExhaustive: {
      es: "Esta no es una lista exhaustiva. Muchos recursos locales también pueden estar disponibles en tu área.",
      en: "This is not an exhaustive list. Many local resources may also be available in your area."
    }
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        {t(pageText.title)}
      </h1>
      <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
        {t(pageText.description)}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-12">
        {t(pageText.notExhaustive)}
      </p>
    </div>
  );
}
