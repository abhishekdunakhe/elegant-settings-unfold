
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Search } from "lucide-react";

interface ClientSelectorProps {
  selectedClients: string[];
  availableClients: string[];
  onClientsChange: (clients: string[]) => void;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  selectedClients,
  availableClients,
  onClientsChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filteredClients = availableClients.filter(client =>
    client.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedClients.includes(client)
  );

  const addClient = (client: string) => {
    if (!selectedClients.includes(client)) {
      onClientsChange([...selectedClients, client]);
    }
  };

  const removeClient = (client: string) => {
    onClientsChange(selectedClients.filter(c => c !== client));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    // Delay blur to allow clicking on dropdown items
    setTimeout(() => setIsInputFocused(false), 150);
  };

  return (
    <div className="space-y-4 relative">
      {/* Selected clients display */}
      {selectedClients.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          {selectedClients.map((client) => (
            <div
              key={client}
              className="group flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-sm font-medium text-blue-800 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <span>{client}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-200 group-hover:scale-110"
                onClick={() => removeClient(client)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Search input with overlay effect */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
          <Input
            type="text"
            placeholder="Search and add clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={`w-full pl-10 pr-4 py-3 text-sm bg-white/90 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 ${
              isInputFocused 
                ? 'border-blue-400 shadow-lg shadow-blue-100/50 bg-white z-20 relative' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          />
        </div>

        {/* Backdrop blur overlay */}
        {isInputFocused && (
          <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-10" />
        )}

        {/* Dropdown overlay */}
        {isInputFocused && searchTerm && (
          <div className="absolute top-full left-0 right-0 mt-2 z-30">
            <div className="max-h-64 overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-2xl shadow-blue-100/20">
              {filteredClients.length > 0 ? (
                <div className="p-2">
                  {filteredClients.map((client, index) => (
                    <div
                      key={client}
                      className="flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-lg transition-all duration-200 group cursor-pointer"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-800 transition-colors">
                        {client}
                      </span>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => addClient(client)}
                        className="h-8 px-3 text-xs bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-1.5"
                      >
                        <Plus className="h-3 w-3" />
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">No clients found</p>
                    <p className="text-xs text-gray-400">Try adjusting your search terms</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientSelector;
