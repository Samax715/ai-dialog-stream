
import React, { useEffect } from 'react';
import { Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const JarvisInterface = () => {
  useEffect(() => {
    // Load the ElevenLabs ConvAI widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-black/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/20">
        {/* Header */}
        <div className="p-6 border-b border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="text-blue-400" size={24} />
              JARVIS
            </h1>
            <div className="text-sm text-blue-300 ml-auto">
              Voice Assistant v2.0
            </div>
          </div>
        </div>

        {/* ElevenLabs ConvAI Widget Container */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <elevenlabs-convai agent-id="agent_01jx29xwshf36a4w8rkxj7cn8n"></elevenlabs-convai>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JarvisInterface;
