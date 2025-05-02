
import React, { useState } from "react";
import Header from "@/components/Header";
import AppCard from "@/components/AppCard";
import ImportModal from "@/components/ImportModal";
import CategoryFilter from "@/components/CategoryFilter";
import { useAppCollection } from "@/hooks/useAppCollection";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { apps, categories, isLoading, addApp } = useAppCollection();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter apps based on search query and selected category
  const filteredApps = apps.filter((app) => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || app.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle opening import modal
  const openImportModal = () => {
    setImportModalOpen(true);
  };

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, i) => (
      <div key={`skeleton-${i}`} className="h-48">
        <Skeleton className="h-full w-full" />
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openImportModal={openImportModal}
      />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {renderSkeletons()}
          </div>
        ) : (
          <>
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredApps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">
                  No apps found
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try changing your search or filter criteria, or import a new app.
                </p>
              </div>
            )}
          </>
        )}
      </main>
      
      <ImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImport={addApp}
        categories={categories}
      />
    </div>
  );
};

export default Index;
