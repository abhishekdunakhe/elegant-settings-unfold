
import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, FileText, BarChart3, Settings, ChevronDown, Check } from "lucide-react";

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
    type: 'toggle' | 'select';
    options?: string[];
    selectedValue?: string;
  }[];
}

const Index = () => {
  const [sections, setSections] = useState<SettingsSection[]>([
    {
      id: 'plans',
      title: 'Plans',
      description: 'Manage subscription plans and billing preferences',
      icon: CreditCard,
      enabled: false,
      subSettings: [
        {
          id: 'enable-simplify-users',
          title: 'Enable for simplify users',
          description: 'Allow simplified user access to this feature',
          enabled: false,
          type: 'toggle'
        },
        {
          id: 'select-simplify-clients',
          title: 'Select simplify clients',
          description: 'Choose which clients have simplified access',
          type: 'select',
          options: ['All Clients', 'Premium Clients', 'Basic Clients', 'Custom Selection'],
          selectedValue: 'All Clients'
        }
      ]
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Control document processing and storage settings',
      icon: FileText,
      enabled: false,
      subSettings: [
        {
          id: 'enable-simplify-users',
          title: 'Enable for simplify users',
          description: 'Allow simplified user access to this feature',
          enabled: false,
          type: 'toggle'
        },
        {
          id: 'select-simplify-clients',
          title: 'Select simplify clients',
          description: 'Choose which clients have simplified access',
          type: 'select',
          options: ['All Clients', 'Premium Clients', 'Basic Clients', 'Custom Selection'],
          selectedValue: 'All Clients'
        }
      ]
    },
    {
      id: 'insights',
      title: 'Insights',
      description: 'Configure analytics and reporting features',
      icon: BarChart3,
      enabled: false,
      subSettings: [
        {
          id: 'enable-simplify-users',
          title: 'Enable for simplify users',
          description: 'Allow simplified user access to this feature',
          enabled: false,
          type: 'toggle'
        },
        {
          id: 'select-simplify-clients',
          title: 'Select simplify clients',
          description: 'Choose which clients have simplified access',
          type: 'select',
          options: ['All Clients', 'Premium Clients', 'Basic Clients', 'Custom Selection'],
          selectedValue: 'All Clients'
        }
      ]
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, enabled: !section.enabled }
        : section
    ));
  };

  const toggleSubSetting = (sectionId: string, subSettingId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subSettings: section.subSettings.map(sub =>
              sub.id === subSettingId && sub.type === 'toggle'
                ? { ...sub, enabled: !sub.enabled }
                : sub
            )
          }
        : section
    ));
  };

  const updateSelectValue = (sectionId: string, subSettingId: string, value: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            subSettings: section.subSettings.map(sub =>
              sub.id === subSettingId && sub.type === 'select'
                ? { ...sub, selectedValue: value }
                : sub
            )
          }
        : section
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Configure your application preferences and manage feature settings to customize your experience.
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
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
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        section.enabled 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                      }`}>
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
                        {section.enabled ? 'Enabled' : 'Disabled'}
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
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    section.enabled 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <Separator className="mx-6" />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {section.subSettings.map((subSetting, index) => (
                        <div 
                          key={subSetting.id}
                          className={`flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 ${
                            section.enabled ? 'animate-fade-in' : ''
                          }`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              subSetting.type === 'toggle' && subSetting.enabled
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                                : subSetting.type === 'select'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                : 'bg-gray-300'
                            }`} />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {subSetting.title}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {subSetting.description}
                              </p>
                            </div>
                          </div>
                          
                          {subSetting.type === 'toggle' ? (
                            <Switch
                              checked={subSetting.enabled || false}
                              onCheckedChange={() => toggleSubSetting(section.id, subSetting.id)}
                              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
                            />
                          ) : (
                            <Select
                              value={subSetting.selectedValue}
                              onValueChange={(value) => updateSelectValue(section.id, subSetting.id, value)}
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {subSetting.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Changes are automatically saved • Last updated just now
          </p>
        </div>
      </div>

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
