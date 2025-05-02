
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AppItem } from "@/types/app";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (app: AppItem) => void;
  categories: string[];
}

const ImportModal = ({ isOpen, onClose, onImport, categories }: ImportModalProps) => {
  const { toast } = useToast();
  const [newApp, setNewApp] = useState<Partial<AppItem>>({
    name: "",
    url: "",
    description: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newApp.name || !newApp.url || !newApp.category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Create app with unique ID
    const app: AppItem = {
      id: Date.now().toString(),
      name: newApp.name || "",
      url: newApp.url || "",
      description: newApp.description || "",
      category: newApp.category || "Other",
      addedAt: new Date().toISOString(),
    };

    onImport(app);
    
    // Reset form
    setNewApp({
      name: "",
      url: "",
      description: "",
      category: "",
    });
    
    toast({
      title: "App added!",
      description: `${app.name} has been added to your collection`,
    });
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewApp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewApp((prev) => ({ ...prev, category: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import New App</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">App Name *</Label>
            <Input
              id="name"
              name="name"
              value={newApp.name}
              onChange={handleChange}
              placeholder="MyApp"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url">URL *</Label>
            <Input
              id="url"
              name="url"
              value={newApp.url}
              onChange={handleChange}
              placeholder="https://example.com"
              type="url"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newApp.description}
              onChange={handleChange}
              placeholder="What does this app do?"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={newApp.category} 
              onValueChange={handleSelectChange}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={onClose} className="mt-2 sm:mt-0">
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-600 hover:bg-brand-700 mt-2 sm:mt-0">
              Save App
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportModal;
