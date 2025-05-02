
import { useState, useEffect } from "react";
import { AppItem } from "@/types/app";
import { mockApps, defaultCategories } from "@/data/mockApps";

export const useAppCollection = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);

  // Load apps from localStorage on mount
  useEffect(() => {
    const loadApps = () => {
      try {
        const savedApps = localStorage.getItem("appCollection");
        if (savedApps) {
          setApps(JSON.parse(savedApps));
        } else {
          // First time use - initialize with mock data
          setApps(mockApps);
          localStorage.setItem("appCollection", JSON.stringify(mockApps));
        }

        const savedCategories = localStorage.getItem("appCategories");
        if (savedCategories) {
          setCategories(JSON.parse(savedCategories));
        } else {
          // First time use - initialize with default categories
          setCategories(defaultCategories);
          localStorage.setItem("appCategories", JSON.stringify(defaultCategories));
        }

      } catch (error) {
        console.error("Error loading apps:", error);
        // Fallback to mock data
        setApps(mockApps);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate load delay
    setTimeout(loadApps, 300);
  }, []);

  // Add a new app
  const addApp = (newApp: AppItem) => {
    const updatedApps = [...apps, newApp];
    setApps(updatedApps);
    localStorage.setItem("appCollection", JSON.stringify(updatedApps));
    
    // Add category if it's new
    if (newApp.category && !categories.includes(newApp.category)) {
      const updatedCategories = [...categories, newApp.category];
      setCategories(updatedCategories);
      localStorage.setItem("appCategories", JSON.stringify(updatedCategories));
    }
  };

  // Remove an app
  const removeApp = (id: string) => {
    const updatedApps = apps.filter(app => app.id !== id);
    setApps(updatedApps);
    localStorage.setItem("appCollection", JSON.stringify(updatedApps));
  };

  // Update an app
  const updateApp = (updatedApp: AppItem) => {
    const updatedApps = apps.map(app => 
      app.id === updatedApp.id ? updatedApp : app
    );
    setApps(updatedApps);
    localStorage.setItem("appCollection", JSON.stringify(updatedApps));
  };

  return {
    apps,
    categories,
    isLoading,
    addApp,
    removeApp,
    updateApp
  };
};
