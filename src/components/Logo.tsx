import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconSize?: number;
  textSize?: string;
}

const Logo: React.FC<LogoProps> = ({ className, iconSize = 24, textSize = "text-2xl" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Sparkles className="text-primary" size={iconSize} />
      <h1 className={`font-bold ${textSize} text-foreground`}>
        Sereno AI
      </h1>
    </div>
  );
};

export default Logo;
