
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'jarvis';
  content: string;
  timestamp: Date;
}

const JarvisInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'jarvis',
      content: "Hello, I'm Jarvis. How may I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = handleRecordingStop;
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      console.log('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      console.log('Recording stopped');
    }
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    console.log('Audio blob created:', audioBlob.size, 'bytes');
    
    // Simulate transcription (replace with actual speech-to-text)
    setIsProcessing(true);
    
    // Mock transcription result
    setTimeout(() => {
      const mockTranscription = "Hello Jarvis, how are you today?";
      addMessage('user', mockTranscription);
      sendToWebhook(mockTranscription);
      setIsProcessing(false);
    }, 1500);
  };

  const addMessage = (type: 'user' | 'jarvis', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendToWebhook = async (transcription: string) => {
    try {
      console.log('Sending to webhook:', transcription);
      
      // Mock webhook response (replace with actual webhook call)
      setTimeout(() => {
        const mockResponse = "I'm doing well, thank you for asking! How can I help you today?";
        addMessage('jarvis', mockResponse);
      }, 1000);
      
      // Uncomment for actual webhook integration:
      /*
      const response = await fetch('YOUR_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: transcription }),
      });
      
      const data = await response.json();
      addMessage('jarvis', data.response);
      */
    } catch (error) {
      console.error('Webhook error:', error);
      addMessage('jarvis', "I'm having trouble processing your request. Please try again.");
    }
  };

  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-600/80 text-white ml-4'
                    : 'bg-gray-800/80 text-blue-100 mr-4 border border-blue-500/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.type === 'jarvis' && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                  )}
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {message.type === 'jarvis' ? 'JARVIS' : 'You'}
                    </p>
                    <p className="leading-relaxed">{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gray-800/80 text-blue-100 mr-4 border border-blue-500/30 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div>
                    <p className="text-sm font-medium mb-1">JARVIS</p>
                    <p className="text-blue-300">Processing your request...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Controls */}
        <div className="p-6 border-t border-blue-500/30 bg-gradient-to-r from-blue-900/10 to-purple-900/10">
          <div className="flex items-center justify-center gap-4">
            {isRecording && (
              <div className="text-blue-300 text-sm animate-pulse">
                Recording: {formatTime(recordingTime)}
              </div>
            )}
            
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`relative w-16 h-16 rounded-full transition-all duration-300 ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/50 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50 hover:scale-105'
              }`}
            >
              {isRecording ? (
                <MicOff size={24} className="text-white" />
              ) : (
                <Mic size={24} className="text-white" />
              )}
              
              {isRecording && (
                <div className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping"></div>
              )}
            </Button>
            
            {!isRecording && !isProcessing && (
              <div className="text-blue-300 text-sm">
                Press to speak with Jarvis
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JarvisInterface;
