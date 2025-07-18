import React, { useState, useEffect } from "react";
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
  onClose: () => void;
}

const ClientSelector: React.FC<ClientSelectorProps> = ({
  selectedClients,
  availableClients,
  onClientsChange,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  const filteredClients = availableClients.filter(
    (client) =>
      client.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedClients.includes(client)
  );

  const addClientAndClose = (client: string) => {
    if (!selectedClients.includes(client)) {
      onClientsChange([...selectedClients, client]);
      setAddedMessage(`${client} has been added.`);
      setAddedMessage(null);
      onClose();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search input with integrated command palette */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder="Type to filter clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 text-sm bg-background border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-ring"
          />
        </div>
        <Command
          className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg"
          loop={true}
        >
          <CommandList className="max-h-60 border-input ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm w-full pt-1 pb-3 text-sm bg-background border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-ring">
            <CommandEmpty>No clients found.</CommandEmpty>
            {filteredClients.length > 0 ? (
              <CommandGroup>
                {filteredClients.map((client) => (
                  <CommandItem
                    key={client}
                    onSelect={() => addClientAndClose(client)}
                    className="flex items-center justify-between cursor-pointer px-2 py-1 hover:bg-gray-100"
                  >
                    <span>{client}</span>
                    {!selectedClients.includes(client) && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Plus className="h-3 w-3" />
                        Add
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup>
                {availableClients
                  .filter((client) => !selectedClients.includes(client))
                  .map((client) => (
                    <CommandItem
                      key={client}
                      onSelect={() => addClientAndClose(client)}
                      className="flex items-center justify-between cursor-pointer px-2 py-1 hover:bg-gray-100"
                    >
                      <span>{client}</span>
                      {!selectedClients.includes(client) && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Plus className="h-3 w-3" />
                          Add
                        </div>
                      )}
                    </CommandItem>
                  ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </div>
      {addedMessage && (
        <div className="text-sm text-green-600 mt-2">{addedMessage}</div>
      )}
    </div>
  );
};

export default ClientSelector;
