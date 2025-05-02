
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openImportModal: () => void;
}

const Header = ({ searchQuery, setSearchQuery, openImportModal }: HeaderProps) => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-700">
              AppStash<span className="text-brand-500">Hub</span>
            </h1>
          </div>
          
          <div className="flex items-center w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search apps..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              onClick={openImportModal} 
              variant="default" 
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Upload className="mr-2 h-4 w-4" /> Import
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
