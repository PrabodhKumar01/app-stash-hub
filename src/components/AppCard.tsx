
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppItem } from "@/types/app";

interface AppCardProps {
  app: AppItem;
}

const AppCard = ({ app }: AppCardProps) => {
  const handleClick = () => {
    window.open(app.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer h-full flex flex-col animate-fade-in"
      onClick={handleClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg truncate">{app.name}</h3>
          <Badge variant="outline" className="bg-brand-50 text-brand-800 border-brand-200">
            {app.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {app.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t text-xs text-muted-foreground truncate">
        {app.url}
      </CardFooter>
    </Card>
  );
};

export default AppCard;
