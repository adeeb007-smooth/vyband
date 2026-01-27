'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

// Configure your Formspree ID here
const FORMSPREE_ID = "YOUR_FORM_ID_HERE"; 

type ContactState = 'IDLE' | 'NAME' | 'EMAIL' | 'MESSAGE' | 'SENDING';

// Initial history is empty for a clean look
const INITIAL_HISTORY: string[] = [];

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [contactMode, setContactMode] = useState<ContactState>('IDLE');
  const [history, setHistory] = useState<string[]>(INITIAL_HISTORY);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // If opening normally (not contact), show the OS intro if history is empty
      if (contactMode === 'IDLE' && history.length === 0) {
         setHistory([
            "VYBAND OS [Version 1.0.4]",
            "Type 'help' for commands.",
            ""
         ]);
      }
    };
    
    const handleContact = () => {
      setIsOpen(true);
      startContactProtocol();
    };

    window.addEventListener('open-terminal', handleOpen);
    window.addEventListener('start-contact', handleContact);
    
    if (typeof window !== 'undefined' && window.location.hash === '#terminal') {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('open-terminal', handleOpen);
      window.removeEventListener('start-contact', handleContact);
    };
  }, [contactMode, history.length]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 100);
    }
  }, [history, isOpen]);

  const addToHistory = (text: string) => {
    setHistory(prev => [...prev, text]);
  };

  const startContactProtocol = () => {
    setHistory([]); // Wipe screen
    setContactMode('NAME');
    
    // Instant start
    setTimeout(() => setHistory([
      "ENTER DESIGNATION (NAME):"
    ]), 50);
  };

  const sendToHQ = async (finalData: { name: string; email: string; message: string }) => {
    addToHistory("ENCRYPTING...");
    
    if (FORMSPREE_ID === "YOUR_FORM_ID_HERE") {
        setTimeout(() => {
            addToHistory(" [DEMO] SENT.");
            finishContact();
        }, 1000);
        return;
    }

    try {
        const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        });

        if (response.ok) {
            addToHistory("SENT.");
        } else {
            addToHistory("ERROR: FAILED.");
        }
    } catch (error) {
        addToHistory("ERROR: NETWORK DOWN.");
    }

    finishContact();
  };

  const finishContact = () => {
    setTimeout(() => {
        setContactMode('IDLE');
        setHistory(["VYBAND OS [Version 1.0.4]", "Type 'help' for commands."]);
        setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const processContactStep = (val: string) => {
    addToHistory(`> ${val}`);

    if (contactMode === 'NAME') {
      if (val.length < 2) {
        addToHistory("ERROR: NAME TOO SHORT.");
        return;
      }
      setFormData(prev => ({ ...prev, name: val }));
      setContactMode('EMAIL');
      addToHistory("ENTER FREQUENCY (EMAIL):");
    } 
    else if (contactMode === 'EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        addToHistory("ERROR: INVALID EMAIL.");
        return; 
      }
      
      setFormData(prev => ({ ...prev, email: val }));
      setContactMode('MESSAGE');
      addToHistory("ENTER MESSAGE:");
    } 
    else if (contactMode === 'MESSAGE') {
      if (val.length < 5) {
        addToHistory("ERROR: TOO SHORT.");
        return;
      }
      const finalData = { ...formData, message: val };
      setContactMode('SENDING');
      sendToHQ(finalData);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (contactMode !== 'IDLE') {
      processContactStep(input);
      setInput('');
      return;
    }

    const cmd = input.trim().toLowerCase();
    addToHistory(`visitor@vyband:~$ ${input}`);

    switch (cmd) {
      case 'help':
        addToHistory("Available commands:");
        addToHistory("  contact  - Send msg");
        addToHistory("  about    - System info");
        addToHistory("  team     - List operatives");
        addToHistory("  clear    - Clear screen");
        addToHistory("  exit     - Close session");
        break;
      
      case 'about':
        addToHistory("VYBAND: Elite development collective specializing in WebGL, 3D Interfaces, and High-Performance Web Apps.");
        break;
        
      case 'team':
        addToHistory("OPERATIVES: Alex V., Sarah J., Davide R., Elena K.");
        break;

      case 'contact':
        startContactProtocol();
        break;
        
      case 'clear':
        setHistory([]);
        break;
        
      case 'exit':
        closeTerminal();
        break;
        
      default:
        addToHistory(`Error: Command '${cmd}' not found. Type 'help'.`);
    }

    setInput('');
  };

  const closeTerminal = () => {
    setIsOpen(false);
    setTimeout(() => {
        setContactMode('IDLE');
        setHistory([]);
    }, 300); 
    router.replace(pathname, { scroll: false });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-lg shadow-2xl overflow-hidden font-mono text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={closeTerminal} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-500 text-xs">
                {contactMode === 'IDLE' ? 'visitor@vyband:~' : 'secure:uplink'}
              </div>
              <div className="w-4" /> 
            </div>

            {/* Body */}
            <div 
              className="p-6 h-[400px] overflow-y-auto text-gray-300 font-mono" 
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className={`mb-1 whitespace-pre-wrap ${line.includes('ERROR') ? 'text-red-500' : line.includes('ENTER') ? 'text-cyan-400' : ''}`}>
                  {line}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center mt-2">
                <span className={`mr-2 ${contactMode === 'IDLE' ? 'text-cyan-400' : 'text-green-400'}`}>
                  {contactMode === 'IDLE' ? 'visitor@vyband:~$' : '>'}
                </span>
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white caret-cyan-400"
                  autoFocus
                  autoComplete="off"
                  placeholder={contactMode === 'IDLE' ? "type command..." : ""}
                />
              </form>
              <div ref={bottomRef} />
            </div>
          </motion.div>
          <div className="absolute inset-0 -z-10" onClick={closeTerminal} />
        </div>
      )}
    </AnimatePresence>
  );
}