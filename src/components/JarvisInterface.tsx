
import React, { useEffect } from 'react';
import { Zap, Cpu, Activity, Wifi } from 'lucide-react';

const JarvisInterface = () => {
  useEffect(() => {
    // Load the ElevenLabs script if not already loaded
    if (!document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex flex-col overflow-hidden relative">
      {/* Advanced Background Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
            linear-gradient(rgba(34, 211, 238, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px'
        }}></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-cyan-500/15 to-blue-600/15 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Circuit-like Lines */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-px h-20 bg-gradient-to-b from-transparent via-blue-300/35 to-transparent animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Horizontal Circuit Lines */}
        <div className="absolute top-1/4 left-0 w-24 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-0 w-32 h-px bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 z-20 relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse-glow"></div>
            <div className="absolute inset-0 w-6 h-6 bg-blue-400/30 rounded-full animate-ping"></div>
          </div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-4">
            <Zap className="text-blue-400 drop-shadow-lg" size={36} />
            JARVIS
            <span className="text-xs font-normal text-blue-300 ml-2">AI Assistant</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 text-blue-300">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Neural Core Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm">Systems Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Interface Area */}
      <div className="flex-1 flex items-center justify-center relative p-8 z-10">
        {/* Outer Decorative Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border border-blue-500/20 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute w-[550px] h-[550px] rounded-full border border-cyan-400/15 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}></div>
          <div className="absolute w-[500px] h-[500px] rounded-full border border-blue-300/10 animate-spin" style={{ animationDuration: '30s' }}></div>
        </div>

        {/* Central Interface Container */}
        <div className="relative z-20 bg-black/40 backdrop-blur-xl rounded-3xl border border-blue-500/30 p-8 shadow-2xl">
          <div className="bg-gradient-to-br from-blue-950/80 to-gray-900/80 rounded-2xl border border-cyan-400/20 p-6">
            {/* ElevenLabs Embed */}
            <div className="flex items-center justify-center">
              <elevenlabs-convai agent-id="agent_01jx74wnspejgadgg260xqchk2"></elevenlabs-convai>
            </div>
          </div>
        </div>

        {/* Corner Decorative Elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-400/40 rounded-tl-lg"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-400/40 rounded-tr-lg"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-blue-400/40 rounded-bl-lg"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg"></div>
      </div>

      {/* Bottom Status Bar */}
      <div className="p-6 flex justify-center items-center z-20">
        <div className="bg-black/50 backdrop-blur-xl rounded-full px-8 py-4 border border-blue-500/30 flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-blue-300 text-sm">Voice Assistant Ready</span>
          </div>
          <div className="w-px h-6 bg-blue-500/30"></div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
            <span className="text-cyan-300 text-sm">Real-time Processing</span>
          </div>
          <div className="w-px h-6 bg-blue-500/30"></div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <span className="text-blue-200 text-xs">Neural Network v2.5</span>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-1/6 left-1/5 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/5 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
      <div className="absolute top-2/3 left-1/6 w-1 h-1 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '5s' }}></div>
    </div>
  );
};

export default JarvisInterface;
