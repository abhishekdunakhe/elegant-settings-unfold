
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = availableClients.filter(client =>
    client.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedClients.includes(client)
  );

  const addClient = (client: string) => {
    if (!selectedClients.includes(client)) {
      onClientsChange([...selectedClients, client]);
      setSearchTerm('');
    }
  };

  const removeClient = (client: string) => {
    onClientsChange(selectedClients.filter(c => c !== client));
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="space-y-4">
      {/* Selected clients display */}
      {selectedClients.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg border">
          {selectedClients.map((client) => (
            <div
              key={client}
              className="group flex items-center gap-2 px-3 py-1.5 bg-background border rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              <span>{client}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                onClick={() => removeClient(client)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Search input trigger */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder="Type a command or search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleInputClick}
            className="w-full pl-10 pr-4 py-3 text-sm bg-background border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Full screen overlay with command palette */}
        {isOpen && (
          <>
            {/* Dark blur overlay */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={handleClose}
            />
            
            {/* Command palette */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50">
              <Command className="rounded-lg border shadow-2xl bg-popover">
                <CommandInput 
                  placeholder="Type a command or search..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                  className="border-0"
                />
                <CommandList className="max-h-80">
                  <CommandEmpty>No clients found.</CommandEmpty>
                  {filteredClients.length > 0 && (
                    <CommandGroup heading="Available Clients">
                      {filteredClients.map((client) => (
                        <CommandItem
                          key={client}
                          onSelect={() => {
                            addClient(client);
                            handleClose();
                          }}
                          className="flex items-center justify-between cursor-pointer"
                        >
                          <span>{client}</span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Plus className="h-3 w-3" />
                            Add
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientSelector;
