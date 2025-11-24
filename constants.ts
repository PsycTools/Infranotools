import { 
  FileText, Image, Scissors, Layers, FileDigit, Crop, ScanFace, 
  Type, Lock, Unlock, QrCode, Barcode, Link, Calculator, 
  Activity, Calendar, Percent, Code, Terminal, Globe, Monitor, 
  PenTool, Video, Wand2, Hash, Search, FileJson, Mail, 
  User, MessageSquare, Camera, Sparkles, Smile, Layout,
  Smartphone, Eye, RefreshCw, Shield, Globe2, Cpu
} from 'lucide-react';
import { Tool } from './types';

export const APP_NAME = "Infrano Tools";
export const APP_DESC = "Forged in Fire. Built to Break Limits. 50+ Tools, Infinite Possibilities.";

export const CATEGORIES = [
  'All', 
  'PDF Tools', 
  'Image Tools', 
  'Text & File', 
  'Calculators', 
  'Dev Tools',
  'System Tools',
  'AI Content', 
  'AI Media', 
  'AI Chat & Analysis', 
  'AI Image & Video'
];

export const TOOLS: Tool[] = [
  // --- 1. PDF TOOLS (No API) ---
  { id: 'pdf-word', name: 'PDF to Word', description: 'Convert PDF documents to editable Word files.', category: 'PDF Tools', icon: FileText, inputType: 'file' },
  { id: 'word-pdf', name: 'Word to PDF', description: 'Convert Word docs to PDF format.', category: 'PDF Tools', icon: FileText, inputType: 'file' },
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDFs into a single file.', category: 'PDF Tools', icon: Layers, inputType: 'file' },
  { id: 'compress-pdf', name: 'Compress PDF', description: 'Reduce PDF file size efficiently.', category: 'PDF Tools', icon: FileDigit, inputType: 'file' },
  { id: 'split-pdf', name: 'Split PDF', description: 'Extract pages from your PDF.', category: 'PDF Tools', icon: Scissors, inputType: 'file' },
  { id: 'extract-pdf', name: 'Extract Text PDF', description: 'Pull raw text from PDF files.', category: 'PDF Tools', icon: Type, inputType: 'file' },

  // --- 2. IMAGE TOOLS (No API) ---
  { id: 'bg-remove', name: 'BG Remover', description: 'Isolate subjects from backgrounds.', category: 'Image Tools', icon: ScanFace, inputType: 'file' },
  { id: 'img-compress', name: 'Image Compressor', description: 'Optimize images for web use.', category: 'Image Tools', icon: FileDigit, inputType: 'file' },
  { id: 'img-crop', name: 'Image Crop', description: 'Crop and trim your images.', category: 'Image Tools', icon: Crop, inputType: 'file' },
  { id: 'img-png', name: 'Convert to PNG', description: 'Convert any image format to PNG.', category: 'Image Tools', icon: Image, inputType: 'file' },
  { id: 'img-jpg', name: 'Convert to JPG', description: 'Convert images to standard JPG.', category: 'Image Tools', icon: Image, inputType: 'file' },
  { id: 'img-webp', name: 'Convert to WebP', description: 'Next-gen format conversion.', category: 'Image Tools', icon: Image, inputType: 'file' },
  { id: 'img-color', name: 'Color Enhance', description: 'Auto-adjust image vibrancy.', category: 'Image Tools', icon: Sparkles, inputType: 'file' },
  { id: 'face-blur', name: 'Face Blur', description: 'Anonymize faces in photos.', category: 'Image Tools', icon: ScanFace, inputType: 'file' },
  { id: 'img-blur', name: 'Image Blur', description: 'Apply gaussian blur effects.', category: 'Image Tools', icon: Activity, inputType: 'file' },

  // --- 3. TEXT & FILE TOOLS (No API) ---
  { id: 'ocr-text', name: 'OCR (Offline)', description: 'Extract text from scanned images.', category: 'Text & File', icon: ScanFace, inputType: 'file' },
  { id: 'text-encrypt', name: 'Text Encrypt', description: 'Secure text with AES encryption.', category: 'Text & File', icon: Lock },
  { id: 'text-decrypt', name: 'Text Decrypt', description: 'Decrypt your secured messages.', category: 'Text & File', icon: Unlock },
  { id: 'qr-gen', name: 'QR Generator', description: 'Create custom QR codes instantly.', category: 'Text & File', icon: QrCode },
  { id: 'barcode-gen', name: 'Barcode Generator', description: 'Generate standard barcodes.', category: 'Text & File', icon: Barcode },
  { id: 'url-short', name: 'URL Shortener', description: 'Create short, shareable links.', category: 'Text & File', icon: Link },

  // --- 4. CALCULATORS (No API) ---
  { id: 'emi-calc', name: 'EMI Calculator', description: 'Calculate monthly loan payments.', category: 'Calculators', icon: Calculator, inputType: 'number-inputs', inputs: ['Loan Amount', 'Interest Rate (%)', 'Tenure (Months)'] },
  { id: 'bmi-calc', name: 'BMI Calculator', description: 'Check Body Mass Index health.', category: 'Calculators', icon: Activity, inputType: 'number-inputs', inputs: ['Weight (kg)', 'Height (cm)'] },
  { id: 'age-calc', name: 'Age Calculator', description: 'Calculate exact age from DOB.', category: 'Calculators', icon: Calendar, inputType: 'number-inputs', inputs: ['Birth Year', 'Birth Month', 'Birth Day'] },
  { id: 'gst-calc', name: 'GST Calculator', description: 'Calculate Goods & Service Tax.', category: 'Calculators', icon: Percent, inputType: 'number-inputs', inputs: ['Amount', 'GST Rate (%)'] },
  { id: 'curr-conv', name: 'Currency Converter', description: 'Convert USD/EUR/INR (Static).', category: 'Calculators', icon: RefreshCw, inputType: 'number-inputs', inputs: ['Amount (USD)'] },
  { id: 'unit-conv', name: 'Unit Converter', description: 'Convert Length (m to ft).', category: 'Calculators', icon: RefreshCw, inputType: 'number-inputs', inputs: ['Meters'] },
  { id: 'perc-calc', name: 'Percent Calculator', description: 'Find percentage of a number.', category: 'Calculators', icon: Percent, inputType: 'number-inputs', inputs: ['Total Value', 'Percentage'] },

  // --- 5. DEVELOPER TOOLS (No API) ---
  { id: 'json-fmt', name: 'JSON Formatter', description: 'Prettify and validate JSON.', category: 'Dev Tools', icon: FileJson },
  { id: 'html-fmt', name: 'HTML Formatter', description: 'Beautify HTML code.', category: 'Dev Tools', icon: Code },
  { id: 'css-min', name: 'CSS Minifier', description: 'Compress CSS code.', category: 'Dev Tools', icon: Code },
  { id: 'js-min', name: 'JS Minifier', description: 'Minify JavaScript code.', category: 'Dev Tools', icon: Code },
  { id: 'pass-gen', name: 'Password Gen', description: 'Generate strong secure passwords.', category: 'Dev Tools', icon: Shield },

  // --- 6. SYSTEM TOOLS (No API) ---
  { id: 'ip-lookup', name: 'IP Lookup', description: 'Check your public IP.', category: 'System Tools', icon: Globe2 },
  { id: 'ua-analyze', name: 'User Agent Info', description: 'Analyze browser UA string.', category: 'System Tools', icon: Monitor },
  { id: 'dev-info', name: 'Device Info', description: 'Check screen and system specs.', category: 'System Tools', icon: Cpu },

  // --- 7. GEMINI API TOOLS (25 Tools) ---
  { id: 'ai-blog', name: 'AI Blog Writer', description: 'Generate SEO-optimized blog posts.', category: 'AI Content', icon: PenTool, isAi: true },
  { id: 'ai-script', name: 'AI Script Writer', description: 'Write scripts for YouTube/Video.', category: 'AI Content', icon: Video, isAi: true },
  { id: 'ai-grammar', name: 'AI Grammar Fixer', description: 'Correct errors and polish tone.', category: 'AI Content', icon: Wand2, isAi: true },
  { id: 'ai-rewriter', name: 'AI Rewriter', description: 'Rephrase text to be unique.', category: 'AI Content', icon: Type, isAi: true },
  { id: 'ai-seo', name: 'AI SEO Keywords', description: 'Extract high-ranking keywords.', category: 'AI Media', icon: Search, isAi: true },
  { id: 'ai-caption', name: 'AI Caption Tool', description: 'Catchy captions for social media.', category: 'AI Media', icon: Hash, isAi: true },
  { id: 'ai-hashtag', name: 'AI Hashtag Gen', description: 'Generate viral hashtags.', category: 'AI Media', icon: Hash, isAi: true },
  { id: 'ai-video-idea', name: 'AI Video Ideas', description: 'Brainstorm viral video concepts.', category: 'AI Media', icon: Sparkles, isAi: true },
  { id: 'ai-thumb-idea', name: 'AI Thumbnail Ideas', description: 'Visual descriptions for thumbnails.', category: 'AI Media', icon: Image, isAi: true },
  { id: 'ai-summary', name: 'AI Article Summarizer', description: 'Condense long articles quickly.', category: 'AI Content', icon: FileText, isAi: true },
  { id: 'ai-paraphrase', name: 'AI Paraphraser', description: 'Restructure sentences effortlessly.', category: 'AI Content', icon: Type, isAi: true },
  { id: 'ai-notes', name: 'AI Notes Creator', description: 'Turn messy text into structured notes.', category: 'AI Content', icon: FileText, isAi: true },
  { id: 'ai-code', name: 'AI Coding Helper', description: 'Debug or write snippets of code.', category: 'AI Chat & Analysis', icon: Code, isAi: true },
  { id: 'ai-resume', name: 'AI Resume Builder', description: 'Enhance your CV bullet points.', category: 'AI Chat & Analysis', icon: User, isAi: true },
  { id: 'ai-email', name: 'AI Email Writer', description: 'Draft professional emails instantly.', category: 'AI Content', icon: Mail, isAi: true },
  { id: 'ai-prod-desc', name: 'AI Product Desc', description: 'Compelling copy for e-commerce.', category: 'AI Content', icon: Layout, isAi: true },
  { id: 'ai-meta-desc', name: 'AI Meta Desc', description: 'SEO meta tags for websites.', category: 'AI Content', icon: Search, isAi: true },
  { id: 'ai-bio', name: 'AI Social Bio', description: 'Standout bios for your profiles.', category: 'AI Content', icon: User, isAi: true },
  { id: 'ai-story', name: 'AI Story Generator', description: 'Weave creative fiction tales.', category: 'AI Content', icon: PenTool, isAi: true },
  { id: 'ai-chatbot', name: 'AI Chatbot', description: 'Chat with an intelligent assistant.', category: 'AI Chat & Analysis', icon: MessageSquare, isAi: true },
  { id: 'ai-sentiment', name: 'AI Sentiment Analyzer', description: 'Analyze tone (Positive/Negative).', category: 'AI Chat & Analysis', icon: Activity, isAi: true },
  { id: 'ai-meme', name: 'AI Meme Generator', description: 'Generate funny meme text/ideas.', category: 'AI Image & Video', icon: Smile, isAi: true },
  { id: 'ai-image', name: 'AI Image Generator', description: 'Generate prompt for image AI.', category: 'AI Image & Video', icon: Camera, isAi: true },
  { id: 'ai-object', name: 'AI Object Detector', description: 'Identify objects in descriptions.', category: 'AI Image & Video', icon: Eye, isAi: true },
  { id: 'ai-reels', name: 'AI Script-to-Reels', description: 'Short-form content strategies.', category: 'AI Image & Video', icon: Smartphone, isAi: true },
];