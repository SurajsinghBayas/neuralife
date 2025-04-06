
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Wind, Droplet, Flame, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Dosha = 'vata' | 'pitta' | 'kapha' | null;

export const AyurvedicDiagnosis: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [bodyType, setBodyType] = useState<Dosha>(null);
  const [digest, setDigest] = useState<Dosha>(null);
  const [stress, setStress] = useState<Dosha>(null);
  const [temperature, setTemperature] = useState<Dosha>(null);
  const [diagnosing, setDiagnosing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const { toast } = useToast();

  const handleDiagnose = async () => {
    if (!bodyType || !digest || !stress || !temperature) {
      toast({
        title: "Incomplete information",
        description: "Please answer all questions for an accurate assessment",
        variant: "destructive",
      });
      return;
    }

    setDiagnosing(true);
    
    // Count dosha frequencies
    const doshaFrequency = {
      vata: [bodyType, digest, stress, temperature].filter(d => d === 'vata').length,
      pitta: [bodyType, digest, stress, temperature].filter(d => d === 'pitta').length,
      kapha: [bodyType, digest, stress, temperature].filter(d => d === 'kapha').length
    };
    
    // Determine dominant dosha
    let dominantDosha: Dosha = 'vata';
    let maxCount = doshaFrequency.vata;
    
    if (doshaFrequency.pitta > maxCount) {
      dominantDosha = 'pitta';
      maxCount = doshaFrequency.pitta;
    }
    
    if (doshaFrequency.kapha > maxCount) {
      dominantDosha = 'kapha';
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate diagnosis based on dominant dosha
    const doshaInfo = {
      vata: {
        description: "Vata dosha represents air and space elements. You're likely creative, quick-thinking, and energetic when balanced.",
        imbalanceSigns: "Anxiety, dry skin, constipation, trouble sleeping, irregular appetite",
        recommendations: [
          "Favor warm, cooked, moist foods with healthy oils",
          "Establish regular daily routines, especially for meals and sleep",
          "Practice grounding yoga poses and meditation",
          "Stay hydrated and avoid excess caffeine or stimulants",
          "Use warming herbs like ginger, cinnamon, and cumin"
        ],
        herbs: "Ashwagandha, Brahmi, Jatamansi, Calamus",
        lifestyle: "Maintain warm, stable environments and minimize travel and multitasking when possible"
      },
      pitta: {
        description: "Pitta dosha represents fire and water elements. You're likely intelligent, focused, and goal-oriented when balanced.",
        imbalanceSigns: "Irritability, inflammation, acid reflux, skin rashes, excessive body heat",
        recommendations: [
          "Choose cooling foods like sweet fruits, vegetables, and grains",
          "Avoid excessive spicy, oily, or fermented foods",
          "Practice cooling yoga poses and meditation",
          "Exercise during cooler parts of the day",
          "Use cooling herbs like coriander, fennel, and mint"
        ],
        herbs: "Amalaki, Brahmi, Guduchi, Neem",
        lifestyle: "Spend time in nature, especially near water, and avoid excessive competition or intensity"
      },
      kapha: {
        description: "Kapha dosha represents earth and water elements. You're likely calm, grounded, and compassionate when balanced.",
        imbalanceSigns: "Lethargy, weight gain, congestion, water retention, oversleeping",
        recommendations: [
          "Choose light, warm, and spicy foods to stimulate digestion",
          "Limit heavy, cold, or sweet foods",
          "Engage in vigorous exercise regularly",
          "Practice energizing yoga and breathing exercises",
          "Use warming and stimulating herbs like ginger, black pepper, and turmeric"
        ],
        herbs: "Bibhitaki, Punarnava, Guggulu, Chitrak",
        lifestyle: "Embrace change, variety, and stimulation to avoid stagnation"
      }
    };
    
    setDiagnosis({
      dominantDosha,
      ...doshaInfo[dominantDosha],
      doshaBreakdown: {
        vata: Math.round((doshaFrequency.vata / 4) * 100),
        pitta: Math.round((doshaFrequency.pitta / 4) * 100),
        kapha: Math.round((doshaFrequency.kapha / 4) * 100)
      }
    });
    
    setDiagnosing(false);
    
    toast({
      title: "Assessment complete",
      description: `Your Ayurvedic assessment shows a ${dominantDosha} dominance`,
    });
  };

  const DoshaIcon = ({ dosha }: { dosha: Dosha }) => {
    switch (dosha) {
      case 'vata':
        return <Wind className="h-5 w-5 text-purple-500" />;
      case 'pitta':
        return <Flame className="h-5 w-5 text-red-500" />;
      case 'kapha':
        return <Droplet className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-med-neutral-900 mb-2">Ayurvedic Assessment</h2>
        <p className="text-med-neutral-600 max-w-2xl mx-auto">
          Discover your dominant dosha (body constitution) according to Ayurvedic principles
          and receive personalized wellness recommendations.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-med-neutral-900 mb-4">Dosha Assessment</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="symptoms" className="block mb-2">Describe your current health concerns (optional)</Label>
                <Textarea 
                  id="symptoms" 
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="E.g., digestive issues, skin problems, stress, sleep difficulties..."
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <Label className="block mb-2">Which best describes your body frame?</Label>
                <RadioGroup value={bodyType || ''} onValueChange={(value) => setBodyType(value as Dosha)}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="vata" id="body-vata" />
                    <Label htmlFor="body-vata" className="cursor-pointer">Thin, light, tall or short, with prominent joints and veins</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="pitta" id="body-pitta" />
                    <Label htmlFor="body-pitta" className="cursor-pointer">Medium build, moderate weight, good muscle tone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kapha" id="body-kapha" />
                    <Label htmlFor="body-kapha" className="cursor-pointer">Solid, heavy build with well-developed physique</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="block mb-2">How would you describe your digestion?</Label>
                <RadioGroup value={digest || ''} onValueChange={(value) => setDigest(value as Dosha)}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="vata" id="digest-vata" />
                    <Label htmlFor="digest-vata" className="cursor-pointer">Irregular, bloating, gas, constipation</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="pitta" id="digest-pitta" />
                    <Label htmlFor="digest-pitta" className="cursor-pointer">Strong, quick digestion, acid reflux, burning sensations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kapha" id="digest-kapha" />
                    <Label htmlFor="digest-kapha" className="cursor-pointer">Slow digestion, feeling heavy after meals</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="block mb-2">How do you typically respond to stress?</Label>
                <RadioGroup value={stress || ''} onValueChange={(value) => setStress(value as Dosha)}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="vata" id="stress-vata" />
                    <Label htmlFor="stress-vata" className="cursor-pointer">Anxiety, worry, insomnia</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="pitta" id="stress-pitta" />
                    <Label htmlFor="stress-pitta" className="cursor-pointer">Irritability, anger, frustration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kapha" id="stress-kapha" />
                    <Label htmlFor="stress-kapha" className="cursor-pointer">Withdrawal, emotional eating, lethargy</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="block mb-2">How do you typically feel in terms of body temperature?</Label>
                <RadioGroup value={temperature || ''} onValueChange={(value) => setTemperature(value as Dosha)}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="vata" id="temp-vata" />
                    <Label htmlFor="temp-vata" className="cursor-pointer">Often cold, cold hands and feet</Label>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="pitta" id="temp-pitta" />
                    <Label htmlFor="temp-pitta" className="cursor-pointer">Often warm, cannot tolerate heat</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kapha" id="temp-kapha" />
                    <Label htmlFor="temp-kapha" className="cursor-pointer">Moderate temperature, adapts well</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                onClick={handleDiagnose}
                className="w-full btn-gradient mt-4"
                disabled={diagnosing}
              >
                {diagnosing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Get Ayurvedic Assessment
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full">
              {diagnosis ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <DoshaIcon dosha={diagnosis.dominantDosha} />
                    <h3 className="text-xl font-medium text-med-neutral-900 capitalize">
                      {diagnosis.dominantDosha} Dominant
                    </h3>
                  </div>
                  
                  <div className="bg-med-neutral-50 p-4 rounded-lg mb-4">
                    <p className="text-med-neutral-700">{diagnosis.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-med-neutral-900 mb-2">Dosha Composition</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="flex items-center gap-1">
                            <Wind className="h-3 w-3 text-purple-500" /> Vata
                          </span>
                          <span>{diagnosis.doshaBreakdown.vata}%</span>
                        </div>
                        <div className="w-full bg-med-neutral-200 rounded-full h-1.5">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full" 
                            style={{ width: `${diagnosis.doshaBreakdown.vata}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-red-500" /> Pitta
                          </span>
                          <span>{diagnosis.doshaBreakdown.pitta}%</span>
                        </div>
                        <div className="w-full bg-med-neutral-200 rounded-full h-1.5">
                          <div 
                            className="bg-red-500 h-1.5 rounded-full" 
                            style={{ width: `${diagnosis.doshaBreakdown.pitta}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="flex items-center gap-1">
                            <Droplet className="h-3 w-3 text-blue-500" /> Kapha
                          </span>
                          <span>{diagnosis.doshaBreakdown.kapha}%</span>
                        </div>
                        <div className="w-full bg-med-neutral-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full" 
                            style={{ width: `${diagnosis.doshaBreakdown.kapha}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-med-neutral-900 mb-2">Signs of Imbalance</h4>
                    <p className="text-med-neutral-700">{diagnosis.imbalanceSigns}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-med-neutral-900 mb-2">Recommended Balancing Practices</h4>
                    <ul className="space-y-1.5 text-med-neutral-700">
                      {diagnosis.recommendations.map((rec: string, i: number) => (
                        <li key={i} className="flex items-baseline gap-2">
                          <Sparkles className="h-3 w-3 text-med-green-500 flex-shrink-0 mt-1" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-med-green-50 p-3 rounded-lg border border-med-green-100">
                      <h4 className="font-medium text-med-neutral-900 mb-1 text-sm">Helpful Herbs</h4>
                      <p className="text-med-neutral-700 text-sm">{diagnosis.herbs}</p>
                    </div>
                    <div className="bg-med-blue-50 p-3 rounded-lg border border-med-blue-100">
                      <h4 className="font-medium text-med-neutral-900 mb-1 text-sm">Lifestyle Tips</h4>
                      <p className="text-med-neutral-700 text-sm">{diagnosis.lifestyle}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-med-neutral-500 space-y-4">
                  <div className="flex gap-1">
                    <Wind className="h-6 w-6 text-purple-300" />
                    <Flame className="h-6 w-6 text-red-300" />
                    <Droplet className="h-6 w-6 text-blue-300" />
                  </div>
                  <p className="max-w-xs">Complete the assessment to receive your personalized Ayurvedic recommendations.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-med-neutral-50 p-4 rounded-lg border border-med-neutral-200 mt-6">
        <p className="text-sm text-med-neutral-600 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-med-blue-500 mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <span>
            In a production environment, this assessment would be enhanced with AI analysis of uploaded
            medical reports and image recognition of physical symptoms. The app would automatically
            adjust recommendations based on seasonal changes and your personal health history.
          </span>
        </p>
      </div>
    </div>
  );
};
