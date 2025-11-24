import { LucideIcon } from 'lucide-react';

export type Category = 
  'PDF Tools' | 
  'Image Tools' | 
  'Text & File' | 
  'Calculators' | 
  'Dev Tools' | 
  'System Tools' | 
  'AI Content' | 
  'AI Media' | 
  'AI Chat & Analysis' | 
  'AI Image & Video';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: LucideIcon;
  popular?: boolean;
  isAi?: boolean; // Uses Gemini
  inputType?: 'text' | 'file' | 'number-inputs';
  inputs?: string[]; // Labels for number inputs
}

export interface ToolState {
  input: string;
  inputs: Record<string, string>; // For multi-field tools like calculators
  output: string;
  isLoading: boolean;
  error: string | null;
  extraData?: any; // For images, QR codes, etc.
}