
import { ResourceCard } from '@/components/resources/ResourceCard';
import type { ResourceItem } from '@/types';
import { LifeBuoy, BookOpenText, Users, PhoneCall, MessageSquareHeart, HeartHandshake } from 'lucide-react';

const resources: ResourceItem[] = [
  {
    id: 'crisis-hotline-1',
    title: 'National Suicide Prevention Lifeline', // External resource, kept in English
    description: 'Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.', // External resource, kept in English
    phone: '988',
    link: 'https://988lifeline.org/',
    icon: PhoneCall,
  },
  {
    id: 'crisis-text-line',
    title: 'Crisis Text Line', // External resource, kept in English
    description: 'Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis. A live, trained Crisis Counselor receives the text and responds.', // External resource, kept in English
    link: 'https://www.crisistextline.org/',
    icon: MessageSquareHeart,
  },
  {
    id: 'mental-health-gov',
    title: 'MentalHealth.gov', // External resource, kept in English
    description: 'Provides one-stop access to U.S. government mental health and mental health problems information.', // External resource, kept in English
    link: 'https://www.mentalhealth.gov/',
    icon: BookOpenText,
  },
  {
    id: 'nami',
    title: 'National Alliance on Mental Illness (NAMI)', // External resource, kept in English
    description: 'The nation’s largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.', // External resource, kept in English
    link: 'https://www.nami.org/',
    icon: Users,
  },
  {
    id: 'samhsa',
    title: 'SAMHSA National Helpline', // External resource, kept in English
    description: 'Confidential free help, from public health agencies, to find substance use treatment and information. 1-800-662-HELP (4357)', // External resource, kept in English
    phone: '1-800-662-4357',
    link: 'https.www.samhsa.gov/find-help/national-helpline',
    icon: LifeBuoy,
  },
  {
    id: 'the-trevor-project',
    title: 'The Trevor Project', // External resource, kept in English
    description: 'The leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.', // External resource, kept in English
    phone: '1-866-488-7386',
    link: 'https://www.thetrevorproject.org/',
    icon: HeartHandshake,
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        Recursos de Salud Mental
      </h1>
      <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
        Si estás en peligro inmediato, por favor llama al 911. A continuación, algunos recursos que pueden proporcionar apoyo, información y alguien que escuche. No estás solo/a.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-12">
        Esta no es una lista exhaustiva. Muchos recursos locales también pueden estar disponibles en tu área.
      </p>
    </div>
  );
}
