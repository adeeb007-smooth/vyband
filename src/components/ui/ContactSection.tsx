'use client';

import { motion } from 'framer-motion';

// ==========================================
// ICON COMPONENTS
// ==========================================
const Icons = {
  Github: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  ),
  X: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M20 4l-6.768 6.768"/></svg>
  ),
  Linkedin: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Whatsapp: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
  )
};

export default function ContactSection() {
  const openContact = () => {
    window.dispatchEvent(new Event('start-contact'));
  };

  return (
    <section id="contact" className="relative w-full bg-black border-t border-white/10 overflow-hidden">
      
      {/* =======================================
          DESKTOP INTERFACE
          (Updated with Icons)
         ======================================= */}
      <div className="hidden md:flex flex-col items-center justify-center py-32 px-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <h2 className="relative z-10 text-7xl font-bold text-white tracking-tighter mb-8 text-center">
          READY TO <span className="text-cyan">INITIATE?</span>
        </h2>
        
        <p className="relative z-10 text-gray-400 font-mono text-sm max-w-xl text-center mb-12 leading-relaxed">
          Our channels are open. Secure uplink available for new project inquiries.
          Response time: {"<"} 2 hours.
        </p>

        <button 
          onClick={openContact}
          className="relative z-10 group px-8 py-4 bg-cyan text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
        >
          contact
          <div className="absolute inset-0 border border-white/50 scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        </button>

        {/* Desktop Icons Row */}
        <div className="relative z-10 mt-24 flex flex-col items-center gap-8">
           
           {/* Social Icons */}
           <div className="flex gap-10">
              <a href="#" className="group relative">
                <div className="absolute -inset-3 bg-cyan/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icons.Github className="w-6 h-6 text-gray-500 group-hover:text-cyan transition-colors duration-300 relative z-10" />
              </a>

              <a href="#" className="group relative">
                <div className="absolute -inset-3 bg-cyan/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icons.X className="w-6 h-6 text-gray-500 group-hover:text-cyan transition-colors duration-300 relative z-10" />
              </a>

              <a href="#" className="group relative">
                <div className="absolute -inset-3 bg-cyan/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icons.Linkedin className="w-6 h-6 text-gray-500 group-hover:text-cyan transition-colors duration-300 relative z-10" />
              </a>

              {/* WhatsApp (Desktop) */}
              <a href="#" className="group relative">
                <div className="absolute -inset-3 bg-green-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Icons.Whatsapp className="w-6 h-6 text-gray-500 group-hover:text-green-400 transition-colors duration-300 relative z-10" />
              </a>
           </div>

           {/* Copyright */}
           <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">
             © 2024 NOVA SYNTHESIS
           </span>
        </div>
      </div>


      {/* =======================================
          MOBILE INTERFACE 
          (Tactical Card + Icons)
         ======================================= */}
      <div className="md:hidden relative py-20 px-6">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:14px_14px]" />

        {/* THE COMMS PANEL CARD */}
        <div className="relative z-10 w-full bg-[#0a0a0a] border border-cyan/20 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.05)]">
          
          {/* Header Bar */}
          <div className="bg-cyan/10 px-4 py-2 flex justify-between items-center border-b border-cyan/20">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-cyan uppercase tracking-widest">UPLINK_READY</span>
             </div>
             <span className="text-[10px] font-mono text-cyan/50">V.1.0.4</span>
          </div>

          {/* Main Body */}
          <div className="p-8 flex flex-col items-center text-center">
             <h3 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">
               LET'S <br/> BUILD
             </h3>
             <p className="text-xs font-mono text-gray-500 mb-8 max-w-[200px]">
               Initialize contact protocol to discuss your digital reality.
             </p>

             <button 
               onClick={openContact}
               className="w-full py-4 bg-cyan text-black font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-white transition-colors shadow-[0_0_15px_rgba(0,240,255,0.4)] relative overflow-hidden group"
             >
               <span className="relative z-10">CONTACT</span>
               <motion.div 
                 animate={{ left: ['-100%', '200%'] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 w-1/2 h-full bg-white/40 skew-x-12 blur-sm"
               />
             </button>
          </div>

          {/* Data Footer 1 */}
          <div className="bg-black/40 px-4 py-3 border-t border-white/5 grid grid-cols-2 gap-4">
             <div>
               <p className="text-[9px] text-gray-600 font-mono uppercase">EMAIL</p>
               <p className="text-[10px] text-gray-300 font-mono">hello@nova.os</p>
             </div>
             <div className="text-right">
               <p className="text-[9px] text-gray-600 font-mono uppercase">LOCATION</p>
               <p className="text-[10px] text-gray-300 font-mono">Grid 74.0</p>
             </div>
          </div>

          {/* Data Footer 2: SOCIAL ICONS (Mobile) */}
          <div className="bg-black/60 px-4 py-5 border-t border-cyan/10 flex flex-col gap-3 relative overflow-hidden">
             
             <span className="text-[9px] text-gray-500 font-mono uppercase text-center w-full">SECURE CHANNELS</span>
             
             <div className="flex justify-center gap-8 relative z-10 items-center mt-1">
                
                <a href="#" className="group relative p-2">
                  <div className="absolute inset-0 bg-cyan/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"/>
                  <Icons.Github className="w-6 h-6 text-gray-400 group-hover:text-cyan transition-colors relative z-10" />
                </a>

                <a href="#" className="group relative p-2">
                  <div className="absolute inset-0 bg-cyan/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"/>
                  <Icons.X className="w-6 h-6 text-gray-400 group-hover:text-cyan transition-colors relative z-10" />
                </a>

                <a href="#" className="group relative p-2">
                  <div className="absolute inset-0 bg-cyan/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"/>
                  <Icons.Linkedin className="w-6 h-6 text-gray-400 group-hover:text-cyan transition-colors relative z-10" />
                </a>

                {/* WhatsApp (Mobile) */}
                <a href="#" className="group relative p-2">
                  <div className="absolute inset-0 bg-green-500/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity"/>
                  <Icons.Whatsapp className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors relative z-10" />
                </a>

             </div>
          </div>

        </div>

        {/* Bottom Copyright (Mobile) */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest">
            NOVA SYNTHESIS © 2024
          </p>
        </div>

      </div>

    </section>
  );
}