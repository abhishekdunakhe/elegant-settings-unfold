import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  FileText,
  BarChart3,
  Settings,
  Plus,
  X,
} from "lucide-react";
import ClientSelector from "@/components/ClientSelector";
import { Button } from "@/components/ui/button";

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  subSettings: {
    id: string;
    title: string;
    description: string;
    enabled?: boolean;
    type: "toggle" | "clientSelector";
    selectedClients?: string[];
  }[];
}

const Index = () => {
  const availableClients = [
    "Simplify Client 1",
    "Simplify Client 2",
    "Simplify Client 3",
    "Simplify Client 4",
    "Simplify Client 5",
    "Simplify Client 6",
    "Simplify Client 7",
    "Simplify Client 8",
    "Simplify Client 9",
  ];

  const [sections, setSections] = useState<SettingsSection[]>([
    {
      id: "plans",
      title: "Annual Readiness",
      description: "Manage subscription plans and billing preferences",
      icon: CreditCard,
      enabled: false,
      subSettings: [
        {
          id: "enable-simplify-users",
          title: "Enable for simplify Super users",
          description: "Allow simplified Super user access to this feature",
          enabled: false,
          type: "toggle",
        },
        {
          id: "select-simplify-clients",
          title: "Select simplify clients",
          description: "Choose which clients have simplified access",
          type: "clientSelector",
          selectedClients: [],
        },
      ],
    },
    {
      id: "insights",
      title: "Insights",
      description: "Configure analytics and reporting features",
      icon: BarChart3,
      enabled: false,
      subSettings: [
        {
          id: "enable-simplify-users",
          title: "Enable for simplify Super users",
          description: "Allow simplified Super user access to this feature",
          enabled: false,
          type: "toggle",
        },
        {
          id: "select-simplify-clients",
          title: "Select simplify clients",
          description: "Choose which clients have simplified access",
          type: "clientSelector",
          selectedClients: [],
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );
  const [selectedSubSettingId, setSelectedSubSettingId] = useState<
    string | null
  >(null);

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section
      )
    );
  };

  const toggleSubSetting = (sectionId: string, subSettingId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subSettings: section.subSettings.map((sub) =>
                sub.id === subSettingId && sub.type === "toggle"
                  ? { ...sub, enabled: !sub.enabled }
                  : sub
              ),
            }
          : section
      )
    );
  };

  const updateSelectedClients = (
    sectionId: string,
    subSettingId: string,
    clients: string[]
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              subSettings: section.subSettings.map((sub) =>
                sub.id === subSettingId && sub.type === "clientSelector"
                  ? { ...sub, selectedClients: clients }
                  : sub
              ),
            }
          : section
      )
    );
  };

  const openModal = (sectionId: string, subSettingId: string) => {
    console.log(
      "Opening modal for section:",
      sectionId,
      "subSetting:",
      subSettingId
    );
    setSelectedSectionId(sectionId);
    setSelectedSubSettingId(subSettingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSectionId(null);
    setSelectedSubSettingId(null);
  };

  const removeClientFromSection = (
    sectionId: string,
    subSettingId: string,
    client: string
  ) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            subSettings: section.subSettings.map((sub) =>
              sub.id === subSettingId && sub.type === "clientSelector"
                ? {
                    ...sub,
                    selectedClients:
                      sub.selectedClients?.filter((c) => c !== client) || [],
                  }
                : sub
            ),
          }
        : section
    );
    setSections(updatedSections);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container flex-grow mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-btn rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Configure your application preferences and manage feature settings
            to customize your experience.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Features
            </h3>
            <p className="text-gray-600 max-w-xl">
              Configure your application preferences and manage feature settings
              to customize your experience
            </p>
          </div>
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl transition-all duration-300 bg-btn text-white`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-900">
                          {section.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Label
                        htmlFor={section.id}
                        className="text-sm font-medium text-gray-700"
                      >
                        {section.enabled ? "Enabled" : "Disabled"}
                      </Label>
                      <Switch
                        id={section.id}
                        checked={section.enabled}
                        onCheckedChange={() => toggleSection(section.id)}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
                      />
                    </div>
                  </div>
                </CardHeader>

                {/* Expandable Sub-settings */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    section.enabled
                      ? "max-h-96 opacity-100 overflow-y-auto overflow-x-hidden"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <Separator className="mx-6" />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {section.subSettings.map((subSetting, index) => (
                        <div
                          key={subSetting.id}
                          className={`p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 ${
                            section.enabled ? "animate-fade-in" : ""
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    subSetting.type === "toggle" &&
                                    subSetting.enabled
                                      ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                      : subSetting.type === "clientSelector"
                                      ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                      : "bg-gray-300"
                                  }`}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {subSetting.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {subSetting.description}
                                </p>
                              </div>
                            </div>
                            <div>
                              {subSetting.type === "clientSelector" && (
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      openModal(section.id, subSetting.id)
                                    }
                                    className="hover:text-white p-3 rounded-xl transition-all duration-300 bg-btn text-white shadow-lg"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </div>

                            {subSetting.type === "toggle" && (
                              <Switch
                                checked={subSetting.enabled || false}
                                onCheckedChange={() =>
                                  toggleSubSetting(section.id, subSetting.id)
                                }
                                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
                              />
                            )}
                          </div>
                          {/* Show selected clients here */}
                          {subSetting.type === "clientSelector" &&
                            subSetting.selectedClients?.length > 0 && (
                              <div className="flex flex-wrap gap-2 p-2 bg-muted/50 rounded-lg">
                                {subSetting.selectedClients.map((client) => (
                                  <div
                                    key={client}
                                    className="group w-full flex items-start justify-between gap-2 px-3 py-3 bg-background border rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
                                  >
                                    <div className="">
                                      <p className="text-lg font-semibold">
                                        {client}
                                      </p>
                                      <span className="text-sm font-normal">
                                        This client is selected
                                      </span>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-4 w-4 p-1 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                                      onClick={() =>
                                        removeClientFromSection(
                                          section.id,
                                          subSetting.id,
                                          client
                                        )
                                      }
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <div className="py-4 text-center">
        <p className="text-sm text-gray-500">
          Changes are automatically saved • Last updated just now
        </p>
      </div>
      {/* Modal */}
      {isModalOpen && selectedSectionId && selectedSubSettingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md h-[400px] animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Select Clients
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 absolute top-2 right-2"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <ClientSelector
              selectedClients={
                sections
                  .find((s) => s.id === selectedSectionId)
                  ?.subSettings.find((ss) => ss.id === selectedSubSettingId)
                  ?.selectedClients || []
              }
              availableClients={availableClients}
              onClientsChange={(clients) =>
                updateSelectedClients(
                  selectedSectionId!,
                  selectedSubSettingId!,
                  clients
                )
              }
              onClose={closeModal}
            />
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Index;
