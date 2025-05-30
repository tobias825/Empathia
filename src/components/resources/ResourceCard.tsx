
"use client";
import type { ResourceItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResourceCardProps {
  resource: ResourceItem;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const IconComponent = resource.icon;
  const { t } = useLanguage();

  const cardText = {
    visitWebsite: { es: "Visitar Sitio Web", en: "Visit Website" },
    callNow: { es: "Llamar Ahora", en: "Call Now" }
  };

  return (
    <Card className="flex flex-col h-full rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <div className="p-3 rounded-full bg-primary/20 text-primary">
          <IconComponent size={28} />
        </div>
        <div>
          <CardTitle className="text-xl">{t(resource.title)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{t(resource.description)}</CardDescription>
      </CardContent>
      {(resource.link || resource.phone) && (
        <CardFooter className="gap-2 flex-wrap">
          {resource.link && (
            <Button variant="outline" asChild size="sm" className="flex-grow sm:flex-grow-0">
              <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> {t(cardText.visitWebsite)}
              </Link>
            </Button>
          )}
          {resource.phone && (
            <Button variant="outline" asChild size="sm" className="flex-grow sm:flex-grow-0">
              <a href={`tel:${resource.phone}`}>
                <Phone className="mr-2 h-4 w-4" /> {t(cardText.callNow)}
              </a>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
