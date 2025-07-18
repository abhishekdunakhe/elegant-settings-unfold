
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

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

  return (
    <div className="space-y-3">
      {/* Selected clients display */}
      {selectedClients.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
          {selectedClients.map((client) => (
            <div
              key={client}
              className="flex items-center gap-1 px-2 py-1 bg-white border rounded-md text-sm"
            >
              <span>{client}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-red-100"
                onClick={() => removeClient(client)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <Input
        type="text"
        placeholder="Search clients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      {/* Filtered client list */}
      {searchTerm && (
        <div className="max-h-48 overflow-y-auto border rounded-lg bg-white">
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <div
                key={client}
                className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0"
              >
                <span className="text-sm">{client}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addClient(client)}
                  className="h-7 px-2 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add Client
                </Button>
              </div>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-500 text-center">
              No clients found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientSelector;
