
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const PrescriptionAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (selectedFile) {
      // Create preview URL for the image
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      setResults(null);
    } else {
      setPreviewUrl(null);
    }
  };

  const analyzePrescription = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a prescription image to analyze",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    try {
      // In a real implementation, this would send the file to a backend server
      // For demonstration, we'll simulate a response after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Example response - this would come from your Python backend in a real implementation
      const mockResponse = {
        medicines: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "3 times daily",
            description: "An antibiotic that fights bacteria in your body",
            instructions: "Take with food to reduce stomach upset"
          },
          {
            name: "Ibuprofen",
            dosage: "400mg",
            frequency: "Every 6-8 hours as needed",
            description: "A pain reliever and anti-inflammatory medication",
            instructions: "Do not take on an empty stomach"
          }
        ]
      };
      
      // Format the results for display
      const formattedResults = mockResponse.medicines.map(med => 
        `Medicine: ${med.name} (${med.dosage})\n` +
        `Take: ${med.frequency}\n` +
        `What it does: ${med.description}\n` +
        `Special instructions: ${med.instructions}`
      ).join('\n\n');
      
      setResults(formattedResults);
      
      toast({
        title: "Analysis complete",
        description: "Your prescription has been successfully analyzed",
      });
    } catch (error) {
      console.error("Error analyzing prescription:", error);
      toast({
        title: "Analysis failed",
        description: "There was a problem analyzing your prescription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-med-neutral-900 mb-2">Prescription Analyzer</h2>
        <p className="text-med-neutral-600 max-w-2xl mx-auto">
          Upload a photo of your prescription and we'll translate it into plain, 
          easy-to-understand language so you know exactly what medications you need to take.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="border-2 border-dashed border-med-neutral-300 rounded-lg p-6 text-center bg-med-neutral-50 hover:bg-med-neutral-100 transition-colors">
            <input
              type="file"
              id="prescription-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label 
              htmlFor="prescription-upload" 
              className="cursor-pointer block"
            >
              {previewUrl ? (
                <div className="space-y-4">
                  <div className="aspect-video rounded-md overflow-hidden mx-auto max-w-xs">
                    <img 
                      src={previewUrl} 
                      alt="Prescription preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-med-neutral-600 flex items-center justify-center gap-2">
                    <Upload size={16} />
                    Click to change image
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-med-blue-100 flex items-center justify-center text-med-blue-600">
                    <Upload size={24} />
                  </div>
                  <p className="text-med-neutral-700 font-medium">
                    Click to upload your prescription
                  </p>
                  <p className="text-med-neutral-500 text-sm">
                    Supported formats: JPG, PNG, JPEG
                  </p>
                </div>
              )}
            </label>
          </div>
          
          <div className="mt-4">
            <Button 
              onClick={analyzePrescription}
              disabled={!file || analyzing}
              className="w-full btn-gradient"
            >
              {analyzing ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Prescription
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full">
              {results ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-med-neutral-900 border-b pb-2">Your Medication Details:</h3>
                  <div className="whitespace-pre-line text-med-neutral-700">
                    {results}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-med-neutral-500 space-y-4">
                  <AlertCircle size={32} className="text-med-blue-300" />
                  <p>Upload a prescription image and click "Analyze Prescription" to see your results here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-med-neutral-50 p-4 rounded-lg border border-med-neutral-200 mt-6">
        <p className="text-sm text-med-neutral-600 flex items-start gap-2">
          <AlertCircle size={16} className="text-med-blue-500 mt-0.5 flex-shrink-0" />
          <span>
            This is a demonstration. In a production environment, your prescription would be processed
            by the Python OCR model on a secure server. The model would extract medication names, 
            dosages, and instructions, then return them in plain language.
          </span>
        </p>
      </div>
    </div>
  );
};
