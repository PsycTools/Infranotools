import React, { useState, useEffect } from 'react';
import { Tool, ToolState } from '../types';
import { generateText } from '../services/geminiService';
import { Copy, Check, Download, RefreshCw, Sparkles, Zap, Upload, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolLogicProps {
  tool: Tool;
}

export const ToolLogic: React.FC<ToolLogicProps> = ({ tool }) => {
  const [state, setState] = useState<ToolState>({
    input: '',
    inputs: {},
    output: '',
    isLoading: false,
    error: null
  });
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // System Tool Auto-Run
  useEffect(() => {
    if (tool.category === 'System Tools') {
      runSystemTool();
    }
    // Reset state when tool changes
    setState({ input: '', inputs: {}, output: '', isLoading: false, error: null });
    setFile(null);
  }, [tool.id]);

  const runSystemTool = async () => {
    setState(s => ({ ...s, isLoading: true }));
    try {
      if (tool.id === 'ip-lookup') {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setState(s => ({ ...s, isLoading: false, output: `Public IP Address: ${data.ip}` }));
      } else if (tool.id === 'ua-analyze') {
        setState(s => ({ ...s, isLoading: false, output: `User Agent:\n${navigator.userAgent}\n\nPlatform: ${navigator.platform}\nBrowser Language: ${navigator.language}` }));
      } else if (tool.id === 'dev-info') {
        const info = `Screen Resolution: ${window.screen.width}x${window.screen.height}
Pixel Ratio: ${window.devicePixelRatio}
Color Depth: ${window.screen.colorDepth}-bit
Cores: ${navigator.hardwareConcurrency || 'Unknown'}
Memory: ${ (navigator as any).deviceMemory ? (navigator as any).deviceMemory + ' GB' : 'Unknown' }`;
        setState(s => ({ ...s, isLoading: false, output: info }));
      }
    } catch (e) {
      setState(s => ({ ...s, isLoading: false, output: 'Could not fetch system info.' }));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(state.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setState(s => ({ ...s, inputs: { ...s.inputs, [field]: value }, error: null }));
  };

  const executeTool = async () => {
    setState(s => ({ ...s, isLoading: true, error: null, output: '', extraData: undefined }));

    try {
      // --- AI TOOLS EXECUTION (Gemini) ---
      if (tool.isAi) {
        let prompt = state.input;
        let system = "You are a helpful AI assistant.";

        switch (tool.id) {
          case 'ai-blog': system = "Write a comprehensive, SEO-friendly blog post with headings based on the user's topic."; break;
          case 'ai-script': system = "Write a YouTube video script with Scene, Visual, and Audio columns."; break;
          case 'ai-grammar': system = "Correct grammar, punctuation, and style. Provide the corrected text directly."; break;
          case 'ai-rewriter': system = "Rewrite this content to be unique and engaging while maintaining meaning."; break;
          case 'ai-seo': system = "Extract high-volume keywords and suggest a keyword strategy."; break;
          case 'ai-caption': system = "Generate 5 engaging social media captions with hashtags."; break;
          case 'ai-hashtag': system = "Generate 30 viral hashtags for this topic."; break;
          case 'ai-video-idea': system = "List 5 viral video ideas with titles and hooks."; break;
          case 'ai-thumb-idea': system = "Describe 3 compelling YouTube thumbnails for this video topic. Include visual details."; break;
          case 'ai-summary': system = "Summarize this text into key bullet points."; break;
          case 'ai-paraphrase': system = "Paraphrase this text to make it sound more professional."; break;
          case 'ai-notes': system = "Convert this unstructured text into organized, structured notes."; break;
          case 'ai-code': system = "You are an expert coder. Write, debug, or explain code as requested."; break;
          case 'ai-resume': system = "Improve these resume bullet points to use strong action verbs and metrics."; break;
          case 'ai-email': system = "Draft a professional email based on the user's description."; break;
          case 'ai-prod-desc': system = "Write a persuasive product description for e-commerce."; break;
          case 'ai-meta-desc': system = "Generate SEO meta titles and descriptions."; break;
          case 'ai-bio': system = "Create 3 standout social media bios (Short, Medium, Professional)."; break;
          case 'ai-story': system = "Write a creative short story based on the prompt."; break;
          case 'ai-chatbot': system = "You are 'Infrano AI', a helpful and intelligent assistant. Chat naturally."; break;
          case 'ai-sentiment': system = "Analyze the sentiment of this text (Positive/Negative/Neutral) and explain why."; break;
          case 'ai-meme': system = "Generate 3 funny meme concepts (Top Text / Bottom Text) for this topic."; break;
          case 'ai-image': system = "Generate a highly detailed image generation prompt for an AI art tool based on this idea."; break;
          case 'ai-object': system = "Describe the objects you would expect to see in an image described by the user (simulated vision)."; break;
          case 'ai-reels': system = "Create a 60-second Reels/TikTok script layout with quick cuts and audio cues."; break;
          default: system = "Provide a helpful, concise response.";
        }

        const result = await generateText(prompt, system);
        setState(s => ({ ...s, isLoading: false, output: result }));
      
      // --- CALCULATORS (Client-Side JS) ---
      } else if (tool.category === 'Calculators') {
        const values = Object.values(state.inputs).map(Number);
        
        if (tool.id === 'bmi-calc') {
          const [weight, height] = values;
          if (!weight || !height) throw new Error("Enter Weight/Height.");
          const bmi = (weight / ((height/100) * (height/100))).toFixed(2);
          let status = bmi < '18.5' ? 'Underweight' : bmi < '25' ? 'Normal' : 'Overweight';
          setState(s => ({ ...s, isLoading: false, output: `BMI: ${bmi}\nStatus: ${status}` }));
        
        } else if (tool.id === 'emi-calc') {
          const [p, r, n] = values; // Principal, Rate, Months
          if (!p || !r || !n) throw new Error("Enter all fields.");
          const rate = r / 12 / 100;
          const emi = (p * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
          setState(s => ({ ...s, isLoading: false, output: `Monthly EMI: ${emi.toFixed(2)}\nTotal Interest: ${(emi * n - p).toFixed(2)}\nTotal Payment: ${(emi * n).toFixed(2)}` }));
        
        } else if (tool.id === 'age-calc') {
          const [year, month, day] = values;
          if (!year) throw new Error("Enter birth year.");
          const today = new Date();
          const birthDate = new Date(year, (month || 1) - 1, day || 1);
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
          setState(s => ({ ...s, isLoading: false, output: `Age: ${age} Years` }));

        } else if (tool.id === 'gst-calc') {
          const [amt, rate] = values;
          if (!amt || !rate) throw new Error("Enter values.");
          const gst = (amt * rate) / 100;
          setState(s => ({ ...s, isLoading: false, output: `Net Amount: ${amt}\nGST (${rate}%): ${gst.toFixed(2)}\nTotal Amount: ${(amt + gst).toFixed(2)}` }));

        } else if (tool.id === 'curr-conv') {
           const [usd] = values;
           if (!usd) throw new Error("Enter USD amount.");
           // Static rates for demo
           setState(s => ({ ...s, isLoading: false, output: `${usd} USD is approx:\n\n🇪🇺 ${(usd * 0.92).toFixed(2)} EUR\n🇮🇳 ${(usd * 83.5).toFixed(2)} INR\n🇬🇧 ${(usd * 0.79).toFixed(2)} GBP` }));

        } else if (tool.id === 'unit-conv') {
           const [m] = values;
           if (!m) throw new Error("Enter meters.");
           setState(s => ({ ...s, isLoading: false, output: `${m} Meters = ${(m * 3.28084).toFixed(4)} Feet\n${m} Meters = ${(m * 39.37).toFixed(2)} Inches` }));

        } else if (tool.id === 'perc-calc') {
           const [total, perc] = values;
           if (!total || !perc) throw new Error("Enter values.");
           setState(s => ({ ...s, isLoading: false, output: `${perc}% of ${total} is ${(total * perc / 100).toFixed(2)}` }));
        }

      // --- DEV TOOLS ---
      } else if (tool.id === 'json-fmt') {
        try {
          const obj = JSON.parse(state.input);
          setState(s => ({ ...s, isLoading: false, output: JSON.stringify(obj, null, 2) }));
        } catch { throw new Error("Invalid JSON"); }

      } else if (tool.id === 'html-fmt') {
         const formatted = state.input.replace(/>/g, '>\n').replace(/</g, '\n<').trim();
         setState(s => ({ ...s, isLoading: false, output: formatted }));

      } else if (tool.id === 'css-min' || tool.id === 'js-min') {
         const minified = state.input.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '');
         setState(s => ({ ...s, isLoading: false, output: minified }));

      } else if (tool.id === 'pass-gen') {
         const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
         let pass = "";
         for (let i = 0; i < 16; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
         setState(s => ({ ...s, isLoading: false, output: pass }));
      
      // --- TEXT TOOLS ---
      } else if (tool.id === 'text-encrypt') {
        if(!state.input) throw new Error("Input required");
        setState(s => ({ ...s, isLoading: false, output: btoa(state.input) }));

      } else if (tool.id === 'text-decrypt') {
         try {
           setState(s => ({ ...s, isLoading: false, output: atob(state.input) }));
         } catch { throw new Error("Invalid encrypted string"); }

      } else if (tool.id === 'qr-gen') {
         if(!state.input) throw new Error("Input required");
         setState(s => ({ ...s, isLoading: false, output: `QR Code generated for: ${state.input}`, extraData: { type: 'image', url: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(state.input)}` } }));

      } else if (tool.id === 'barcode-gen') {
         if(!state.input) throw new Error("Input required");
         setState(s => ({ ...s, isLoading: false, output: `Barcode generated for: ${state.input}`, extraData: { type: 'barcode', value: state.input } }));

      } else if (tool.id === 'url-short') {
        if(!state.input) throw new Error("Input required");
        const hash = Math.random().toString(36).substring(7);
        setState(s => ({ ...s, isLoading: false, output: `https://infrano.tools/${hash}\n\n(Target: ${state.input})` }));

      // --- FILE MOCKS ---
      } else if (tool.inputType === 'file') {
        if (!file) throw new Error("Please upload a file.");
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const size = (file.size / 1024).toFixed(2);
        let msg = `[SUCCESS] Processed: ${file.name}\nOriginal Size: ${size} KB\n`;

        if (tool.id.includes('pdf')) msg += "PDF operation completed successfully.";
        else if (tool.id.includes('img') || tool.id.includes('bg')) msg += "Image optimized and processed.";
        else if (tool.id === 'ocr-text') msg += "Extracted Text:\n\nLorem ipsum dolor sit amet. (Simulated Output)";
        
        setState(s => ({ 
          ...s, 
          isLoading: false, 
          output: msg + "\n\n(Note: This is a client-side demo. In a production environment, the file would download automatically.)"
        }));

      } else {
        await new Promise(r => setTimeout(r, 1000));
        setState(s => ({ ...s, isLoading: false, output: `Processed: ${state.input}` }));
      }

    } catch (err: any) {
      setState(s => ({ ...s, isLoading: false, error: err.message || 'An error occurred processing your request.' }));
    }
  };

  return (
    <div className="w-full pb-20 md:pb-0"> {/* Added pb-20 for mobile sticky button clearance */}
      
      {/* --- INPUT SECTION --- */}
      <div className="grid grid-cols-1 gap-8 mb-12">
        
        {/* TEXT INPUT TYPE */}
        {(!tool.inputType || tool.inputType === 'text') && tool.category !== 'System Tools' && tool.id !== 'pass-gen' && (
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blood-500 to-orange-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
            <textarea
              value={state.input}
              onChange={(e) => setState(s => ({ ...s, input: e.target.value, error: null }))}
              className="relative w-full bg-surface-300 border border-white/10 rounded-2xl p-8 text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blood-500/50 focus:border-blood-500/50 transition-all min-h-[200px] font-mono text-sm leading-relaxed resize-y shadow-inner text-base"
              placeholder={tool.id === 'qr-gen' || tool.id === 'barcode-gen' ? "Enter text/URL..." : (tool.isAi ? "Describe what you want to create..." : "Paste your content here...")}
            />
          </div>
        )}

        {/* NUMBER INPUTS TYPE (Calculators) */}
        {tool.inputType === 'number-inputs' && tool.inputs && (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {tool.inputs.map((label, idx) => (
               <div key={idx} className="bg-surface-300 p-6 rounded-2xl border border-white/10 focus-within:border-blood-500/50 transition-colors shadow-lg">
                 <label className="block text-gray-400 text-xs font-bold mb-3 uppercase tracking-wider">{label}</label>
                 <input 
                    type="number"
                    className="w-full bg-transparent border-b border-gray-700 text-white text-2xl focus:outline-none focus:border-blood-500 transition-colors py-2 placeholder-gray-700 font-display font-medium"
                    placeholder="0"
                    onChange={(e) => handleInputChange(String(idx), e.target.value)}
                 />
               </div>
             ))}
           </div>
        )}

        {/* FILE INPUT TYPE */}
        {tool.inputType === 'file' && (
          <div className="border-2 border-dashed border-white/10 rounded-3xl p-16 text-center hover:border-blood-500/50 transition-colors bg-surface-300/30 group cursor-pointer relative overflow-hidden">
             <input 
               type="file" 
               id="file-upload" 
               className="hidden" 
               onChange={(e) => {
                 if(e.target.files?.[0]) {
                   setFile(e.target.files[0]);
                   setState(s => ({ ...s, error: null }));
                 }
               }}
             />
             <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-6 w-full h-full relative z-10">
                <div className="w-24 h-24 bg-surface-200 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/5">
                  {file ? <FileText className="text-blood-500 w-10 h-10" /> : <Upload className="text-gray-400 w-10 h-10 group-hover:text-blood-500" />}
                </div>
                <div>
                  <p className="text-white font-medium text-xl">{file ? file.name : "Click to Upload File"}</p>
                  <p className="text-gray-500 text-sm mt-2 font-medium">{file ? `${(file.size/1024).toFixed(2)} KB` : "PDF, JPG, PNG supported"}</p>
                </div>
             </label>
          </div>
        )}

        {/* DESKTOP ACTION BUTTON */}
        {tool.category !== 'System Tools' && (
          <div className="flex justify-end hidden md:flex">
               <button
                onClick={executeTool}
                disabled={state.isLoading}
                className="flex items-center gap-3 bg-gradient-to-r from-blood-600 to-blood-500 hover:from-blood-500 hover:to-blood-400 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blood-900/20 hover:shadow-blood-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 text-lg"
              >
                {state.isLoading ? (
                  <div className="flex items-center gap-3"><RefreshCw className="animate-spin w-5 h-5" /> Processing...</div>
                ) : (
                  <>
                    <Zap size={22} fill="currentColor" /> {tool.category === 'Calculators' ? 'Calculate' : 'Generate Result'}
                  </>
                )}
              </button>
          </div>
        )}

        {state.error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-red-900/20 border border-red-900/50 rounded-xl text-red-200 text-sm flex items-center gap-3"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50" /> {state.error}
          </motion.div>
        )}
      </div>

      {/* --- MOBILE STICKY BUTTON --- */}
      {tool.category !== 'System Tools' && (
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
           <div className="absolute inset-0 bg-surface-300/80 blur-xl -z-10 rounded-3xl" />
           <button
            onClick={executeTool}
            disabled={state.isLoading}
            className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-blood-600 to-blood-500 text-white px-6 py-5 rounded-2xl font-bold shadow-2xl shadow-blood-900/50 disabled:opacity-90 text-lg border border-white/10"
          >
            {state.isLoading ? (
              <><RefreshCw className="animate-spin w-6 h-6" /> Processing...</>
            ) : (
              <>
                <Zap size={22} fill="currentColor" /> {tool.category === 'Calculators' ? 'Calculate' : 'Generate'}
              </>
            )}
          </button>
        </div>
      )}

      {/* --- OUTPUT SECTION --- */}
      <AnimatePresence>
      {(state.output || state.extraData || state.isLoading) && (
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-4 px-1">
             <label className="text-gray-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={16} className="text-blood-500" /> Result Preview
            </label>
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className={`text-xs font-bold flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${copied ? 'bg-green-900/20 border-green-800 text-green-400' : 'bg-surface-300 border-white/10 text-gray-400 hover:text-white hover:bg-surface-200'}`}
              >
                {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={3} />}
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>
          
          <div className="bg-[#080809] rounded-2xl border border-white/5 p-8 md:p-10 relative overflow-hidden shadow-2xl min-h-[160px]">
            {state.isLoading ? (
               <div className="flex flex-col items-center justify-center h-40 gap-5 text-gray-500">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blood-500 blur-xl opacity-20 animate-pulse"></div>
                    <RefreshCw className="animate-spin w-10 h-10 text-blood-500 relative z-10" /> 
                  </div>
                  <span className="text-sm font-semibold tracking-wide animate-pulse uppercase">Forging Result...</span>
               </div>
            ) : (
              <>
                {/* QR Code / Barcode Display */}
                {state.extraData?.type === 'image' && (
                  <div className="flex flex-col items-center justify-center gap-8 mb-10 p-8 bg-surface-200/50 rounded-2xl border border-white/5">
                    <div className="bg-white p-4 rounded-xl shadow-2xl">
                      <img src={state.extraData.url} alt="Generated Code" className="w-56 h-56" />
                    </div>
                  </div>
                )}
                {state.extraData?.type === 'barcode' && (
                  <div className="flex flex-col items-center justify-center gap-8 mb-10 p-8 bg-surface-200/50 rounded-2xl border border-white/5">
                    <div className="bg-white p-8 rounded-xl shadow-2xl">
                      <div className="font-mono text-black text-3xl tracking-[0.5em] font-bold border-x-8 border-black px-6">{state.extraData.value}</div>
                    </div>
                  </div>
                )}

                <pre className="whitespace-pre-wrap font-mono text-sm md:text-base text-gray-300 leading-relaxed max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {state.output}
                </pre>
              </>
            )}
          </div>
          
          {tool.inputType === 'file' && !state.isLoading && (
            <div className="mt-10 flex justify-center pb-20 md:pb-0">
              <button className="flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-full font-bold transition-all shadow-xl hover:shadow-white/20 transform hover:-translate-y-1">
                <Download size={20} />
                Download Result
              </button>
            </div>
          )}
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};