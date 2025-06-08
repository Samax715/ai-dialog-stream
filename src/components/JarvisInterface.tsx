
import React, { useEffect, useState } from 'react';
import { Zap, Wifi, Mic, MicOff } from 'lucide-react';
import { useConversation } from '@11labs/react';

const JarvisInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setConversationStarted(true);
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      setConversationStarted(false);
      setIsListening(false);
    },
    onMessage: (message) => {
      console.log('Message:', message);
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
    }
  });

  // Update listening state based on conversation status
  useEffect(() => {
    setIsListening(conversation.isSpeaking || false);
  }, [conversation.isSpeaking]);

  const handleStartConversation = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Start the conversation with your agent ID
      await conversation.startSession({
        agentId: 'agent_01jx74wnspejgadgg260xqchk2'
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  };

  const handleEndConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex flex-col overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 z-10">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="text-blue-400" size={32} />
            JARVIS
          </h1>
        </div>
        <div className="flex items-center gap-2 text-blue-300">
          <div className={`w-2 h-2 rounded-full animate-pulse ${conversationStarted ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
          <span className="text-sm">{conversationStarted ? 'Voice Ready' : 'Offline'}</span>
          {conversation.status === 'connected' && <span className="text-xs ml-2">(Connected)</span>}
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex items-center justify-center relative p-8">
        {/* Central Circular Interface */}
        <div className="relative">
          {/* Outer Rings */}
          <div className={`absolute inset-0 w-96 h-96 rounded-full border-2 border-blue-500/30 ${isListening ? 'animate-ping' : ''}`}></div>
          <div className={`absolute inset-4 w-88 h-88 rounded-full border border-blue-400/20 ${isListening ? 'animate-pulse' : ''}`}></div>
          <div className="absolute inset-8 w-80 h-80 rounded-full border border-blue-300/10"></div>
          
          {/* Wave Rings - Animated when talking */}
          {isListening && (
            <>
              <div className="absolute inset-12 w-72 h-72 rounded-full border-2 border-cyan-400/40 animate-ping"></div>
              <div className="absolute inset-16 w-64 h-64 rounded-full border border-cyan-300/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute inset-20 w-56 h-56 rounded-full border border-cyan-200/20 animate-ping" style={{ animationDelay: '1s' }}></div>
            </>
          )}

          {/* Central Core */}
          <div className="relative w-96 h-96 flex items-center justify-center">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 shadow-2xl ${isListening ? 'animate-pulse-glow' : ''} flex items-center justify-center cursor-pointer`}
                 onClick={conversationStarted ? handleEndConversation : handleStartConversation}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 flex items-center justify-center">
                {conversationStarted ? (
                  isListening ? <Wifi className="text-white" size={32} /> : <Mic className="text-white" size={32} />
                ) : (
                  <MicOff className="text-white" size={32} />
                )}
              </div>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="absolute top-8 right-8 text-blue-300 text-sm">
            SYS STATUS: {conversationStarted ? 'OPTIMAL' : 'STANDBY'}
          </div>
          
          <div className="absolute bottom-8 left-8 text-blue-300 text-sm">
            {conversationStarted ? 'VOICE ACTIVE' : 'VOICE OFFLINE'}
          </div>
        </div>

        {/* ElevenLabs Widget */}
        <div className="fixed bottom-8 right-8 z-50">
          <elevenlabs-convai agent-id="agent_01jx74wnspejgadgg260xqchk2"></elevenlabs-convai>
        </div>
      </div>

      {/* Bottom Interface Elements */}
      <div className="p-6 flex justify-center items-center z-10">
        <div className="bg-black/40 backdrop-blur-xl rounded-full px-6 py-3 border border-blue-500/30 flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full animate-pulse ${conversationStarted ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
          <span className="text-blue-300 text-sm">
            {conversationStarted ? 'Voice assistant active - Click center to end' : 'Click center to start voice assistant'}
          </span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>

      {/* Script for ElevenLabs Widget */}
      <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
    </div>
  );
};

export default JarvisInterface;
