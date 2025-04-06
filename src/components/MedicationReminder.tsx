
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, Bell, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Reminder {
  id: string;
  medication: string;
  time: string;
  location?: string;
  days: string[];
}

export const MedicationReminder: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [medication, setMedication] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const { toast } = useToast();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddReminder = () => {
    if (!medication || !time || days.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in medication name, time, and select at least one day",
        variant: "destructive",
      });
      return;
    }

    const newReminder: Reminder = {
      id: Date.now().toString(),
      medication,
      time,
      location,
      days,
    };

    setReminders([...reminders, newReminder]);
    
    // Reset form
    setMedication('');
    setTime('');
    setLocation('');
    setDays([]);
    
    toast({
      title: "Reminder added",
      description: `Reminder for ${medication} has been set successfully`,
    });
  };

  const handleRemoveReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    toast({
      title: "Reminder removed",
      description: "Your medication reminder has been deleted",
    });
  };

  const toggleDay = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter(d => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleEnableNotifications = () => {
    // In a real app, this would request notification permissions
    toast({
      title: "Notifications enabled",
      description: "You'll receive reminders for your medications",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-med-neutral-900 mb-2">Medication Reminders</h2>
        <p className="text-med-neutral-600 max-w-2xl mx-auto">
          Create personalized reminders for your medications based on your schedule and location.
          Never miss a dose again with our smart reminder system.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-medium text-med-neutral-900 mb-4">Add New Reminder</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medication">Medication Name</Label>
                <Input 
                  id="medication" 
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  placeholder="e.g., Amoxicillin"
                />
              </div>
              
              <div>
                <Label htmlFor="time">Reminder Time</Label>
                <div className="relative">
                  <Input 
                    id="time" 
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-med-neutral-500 h-4 w-4" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location (Optional)</Label>
                <Select onValueChange={setLocation} value={location}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="anywhere">Anywhere</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Days of Week</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={days.includes(day) ? "default" : "outline"}
                      onClick={() => toggleDay(day)}
                      className="text-xs py-1 h-auto"
                    >
                      {day.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleAddReminder}
                className="w-full btn-gradient mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-med-neutral-900">Your Reminders</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEnableNotifications}
                  className="text-xs"
                >
                  <Bell className="mr-1 h-3 w-3" />
                  Enable Notifications
                </Button>
              </div>
              
              {reminders.length > 0 ? (
                <div className="space-y-4">
                  {reminders.map((reminder) => (
                    <div 
                      key={reminder.id}
                      className="bg-med-neutral-50 p-4 rounded-lg border border-med-neutral-200 flex justify-between items-start"
                    >
                      <div>
                        <h4 className="font-medium text-med-neutral-900">{reminder.medication}</h4>
                        <div className="text-sm text-med-neutral-600 space-y-1 mt-1">
                          <div className="flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            <span>{reminder.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            <span>{reminder.days.map(d => d.substring(0, 3)).join(', ')}</span>
                          </div>
                          {reminder.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{reminder.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveReminder(reminder.id)}
                        className="text-med-neutral-500 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-med-neutral-500 space-y-2">
                  <Bell className="h-8 w-8 text-med-neutral-300" />
                  <p>No reminders yet. Add your first medication reminder to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="bg-med-blue-50 p-4 rounded-lg border border-med-blue-200 mt-6">
        <p className="text-sm text-med-neutral-700 flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-med-blue-500 mt-0.5 flex-shrink-0">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <span>
            Our reminder system learns from your habits to provide personalized timing suggestions. 
            Location-based reminders use your device's geolocation to alert you at the right time and place.
          </span>
        </p>
      </div>
    </div>
  );
};
