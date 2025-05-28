
import { ResourceCard } from '@/components/resources/ResourceCard';
import type { ResourceItem } from '@/types';
import { LifeBuoy, BookOpenText, Users, PhoneCall, MessageSquareHeart, HeartHandshake } from 'lucide-react';

const resources: ResourceItem[] = [
  {
    id: 'crisis-hotline-1',
    title: 'National Suicide Prevention Lifeline',
    description: 'Provides 24/7, free and confidential support for people in distress, prevention and crisis resources for you or your loved ones.',
    phone: '988', // Updated to 988
    link: 'https://988lifeline.org/',
    icon: PhoneCall,
  },
  {
    id: 'crisis-text-line',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis. A live, trained Crisis Counselor receives the text and responds.',
    link: 'https://www.crisistextline.org/',
    icon: MessageSquareHeart,
  },
  {
    id: 'mental-health-gov',
    title: 'MentalHealth.gov',
    description: 'Provides one-stop access to U.S. government mental health and mental health problems information.',
    link: 'https://www.mentalhealth.gov/',
    icon: BookOpenText,
  },
  {
    id: 'nami',
    title: 'National Alliance on Mental Illness (NAMI)',
    description: 'The nation’s largest grassroots mental health organization dedicated to building better lives for the millions of Americans affected by mental illness.',
    link: 'https://www.nami.org/',
    icon: Users,
  },
  {
    id: 'samhsa',
    title: 'SAMHSA National Helpline',
    description: 'Confidential free help, from public health agencies, to find substance use treatment and information. 1-800-662-HELP (4357)',
    phone: '1-800-662-4357',
    link: 'https.www.samhsa.gov/find-help/national-helpline',
    icon: LifeBuoy,
  },
  {
    id: 'the-trevor-project',
    title: 'The Trevor Project',
    description: 'The leading national organization providing crisis intervention and suicide prevention services to lesbian, gay, bisexual, transgender, queer & questioning (LGBTQ) young people under 25.',
    phone: '1-866-488-7386',
    link: 'https://www.thetrevorproject.org/',
    icon: HeartHandshake,
  }
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        Mental Health Resources
      </h1>
      <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
        If you are in immediate danger, please call 911. Below are some resources that can provide support, information, and a listening ear. You are not alone.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-12">
        This is not an exhaustive list. Many local resources may also be available in your area.
      </p>
    </div>
  );
}
