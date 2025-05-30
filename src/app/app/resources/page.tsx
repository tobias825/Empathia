
"use client";
import { ResourceCard } from '@/components/resources/ResourceCard';
import type { ResourceItem } from '@/types';
import { LifeBuoy, BookOpenText, Users, PhoneCall, MessageSquareHeart, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const resources: ResourceItem[] = [
  {
    id: 'cas-argentina',
    title: {
      es: 'Centro de Asistencia al Suicida (CAS)',
      en: 'Suicide Assistance Center (CAS)'
    },
    description: {
      es: 'Ofrece asistencia telefónica gratuita y confidencial a personas en crisis o con riesgo de suicidio. Disponible en varias partes del país.',
      en: 'Offers free and confidential telephone assistance to people in crisis or at risk of suicide. Available in various parts of the country.'
    },
    phone: '135 (CABA y GBA) / (011) 5275-1135 (Todo el país)',
    link: 'https://www.asistenciaalsuicida.org.ar/',
    icon: PhoneCall,
  },
  {
    id: 'salud-mental-gob-ar',
    title: {
      es: 'Salud Mental - Argentina.gob.ar',
      en: 'Mental Health - Argentina.gob.ar'
    },
    description: {
      es: 'Portal oficial del gobierno argentino con información, recursos y programas sobre salud mental a nivel nacional.',
      en: 'Official Argentine government portal with information, resources, and programs on mental health at the national level.'
    },
    link: 'https://www.argentina.gob.ar/salud/mental',
    icon: BookOpenText,
  },
  {
    id: 'hablemos-de-todo',
    title: {
      es: 'Hablemos de Todo',
      en: 'Let\'s Talk About Everything'
    },
    description: {
      es: 'Plataforma nacional para jóvenes que ofrece un espacio de chat para hablar sobre diversas temáticas, incluyendo salud mental, sexualidad, consumos problemáticos, y más.',
      en: 'National platform for young people offering a chat space to talk about various topics, including mental health, sexuality, problematic substance use, and more.'
    },
    link: 'https://www.hablemosdetodo.gob.ar/',
    icon: MessageSquareHeart,
  },
  {
    id: 'inadi',
    title: {
      es: 'INADI - Asistencia a Víctimas de Discriminación',
      en: 'INADI - Assistance to Victims of Discrimination'
    },
    description: {
      es: 'El Instituto Nacional contra la Discriminación, la Xenofobia y el Racismo ofrece orientación y asistencia. La discriminación puede afectar gravemente la salud mental.',
      en: 'The National Institute against Discrimination, Xenophobia, and Racism offers guidance and assistance. Discrimination can severely affect mental health.'
    },
    phone: '168',
    link: 'https://www.argentina.gob.ar/inadi',
    icon: HeartHandshake,
  },
  {
    id: 'salud-responde-caba',
    title: {
      es: 'Salud Mental Responde (CABA)',
      en: 'Mental Health Responds (Buenos Aires City)'
    },
    description: {
      es: 'Línea telefónica de orientación y apoyo en salud mental para residentes de la Ciudad Autónoma de Buenos Aires.',
      en: 'Telephone helpline for mental health guidance and support for residents of the Autonomous City of Buenos Aires.'
    },
    phone: '0800-333-1665',
    link: 'https://www.buenosaires.gob.ar/salud/saludmental',
    icon: LifeBuoy,
  }
];

export default function ResourcesPage() {
  const { t } = useLanguage();

  const pageText = {
    title: {
      es: "Recursos de Salud Mental (Argentina)",
      en: "Mental Health Resources (Argentina)"
    },
    description: {
      es: "Si estás en peligro inmediato, por favor llama al 911 o al 107 (SAME en CABA). A continuación, algunos recursos que pueden proporcionar apoyo, información y alguien que escuche. No estás solo/a.",
      en: "If you are in immediate danger, please call 911 or 107 (SAME in CABA). Below are some resources that can provide support, information, and a listening ear. You are not alone."
    },
    notExhaustive: {
      es: "Esta no es una lista exhaustiva. Muchos recursos locales y provinciales también pueden estar disponibles en tu área.",
      en: "This is not an exhaustive list. Many local and provincial resources may also be available in your area."
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
