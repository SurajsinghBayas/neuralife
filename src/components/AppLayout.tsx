
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrescriptionAnalyzer } from './PrescriptionAnalyzer';
import { MedicationReminder } from './MedicationReminder';
import { AyurvedicDiagnosis } from './AyurvedicDiagnosis';
import { Logo } from './Logo';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-med-blue-50">
      <header className="container py-6">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex gap-4">
            <a href="#" className="text-med-neutral-700 hover:text-med-blue-600 transition-colors">About</a>
            <a href="#" className="text-med-neutral-700 hover:text-med-blue-600 transition-colors">Help</a>
          </nav>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold text-center mb-3 text-med-neutral-900">Med-Scribe AI Assistant</h1>
          <p className="text-center text-med-neutral-600 mb-10 max-w-2xl mx-auto">
            Your personalized medical assistant that helps you understand prescriptions, 
            remember medications, and discover Ayurvedic wellness solutions.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10 animate-fade-in">
            <Tabs defaultValue="prescription" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="prescription">Prescription Analyzer</TabsTrigger>
                <TabsTrigger value="reminders">Medication Reminders</TabsTrigger>
                <TabsTrigger value="ayurvedic">Ayurvedic Diagnosis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="prescription" className="animate-slide-in">
                <PrescriptionAnalyzer />
              </TabsContent>
              
              <TabsContent value="reminders" className="animate-slide-in">
                <MedicationReminder />
              </TabsContent>
              
              <TabsContent value="ayurvedic" className="animate-slide-in">
                <AyurvedicDiagnosis />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="bg-med-neutral-100 py-8 border-t border-med-neutral-200">
        <div className="container">
          <div className="text-center text-med-neutral-600 text-sm">
            <p>&copy; 2025 Med-Scribe AI Assistant. All rights reserved.</p>
            <p className="mt-2">This application is for informational purposes only and not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
