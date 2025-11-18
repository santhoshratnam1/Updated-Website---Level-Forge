import React, { useRef } from 'react';
import { GlassCard } from './GlassCard';
import { Icon } from './Icon';
import { GenreSelector } from './GenreSelector';
import { StatsDisplay } from './AnimatedStats';
import { Button } from './Button';
import { FeaturesGrid } from './FeatureCard';

type AppMode = 'single' | 'compare';
type AnalysisMode = 'document' | 'video';

interface UploadFormProps {
  onFilesChange: (files: File[]) => void;
  onProcess: () => void;
  files: File[];
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  genre: string;
  setGenre: (genre: string) => void;
  analysisMode: AnalysisMode;
  setAnalysisMode: (mode: AnalysisMode) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ 
    onFilesChange, 
    onProcess, 
    files, 
    mode, 
    setMode, 
    genre, 
    setGenre,
    analysisMode,
    setAnalysisMode
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (fileList: FileList | null) => {
     if (fileList && fileList.length > 0) {
       onFilesChange(Array.from(fileList));
     }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    onFileChange(e.dataTransfer.files);
  };
  
  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  const isDocumentMode = analysisMode === 'document';
  const minFiles = isDocumentMode && mode === 'compare' ? 2 : 1;
  const maxFiles = isDocumentMode && mode === 'compare' ? 3 : 1;
  const canProcess = isDocumentMode 
    ? (files.length >= minFiles && files.length <= maxFiles)
    : (files.length === 1);

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-12">
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <GlassCard className="relative overflow-hidden w-full">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 blur-xl"></div>
          
          <div className="relative p-8 text-center backdrop-blur-xl bg-black/40" onDragOver={handleDragOver} onDrop={handleDrop}>
            {/* Analysis Mode Toggle with smooth animation */}
            <div className="mb-8 mx-auto p-1 bg-black/50 backdrop-blur-md rounded-2xl flex w-fit border border-white/20 shadow-lg">
              <button 
                onClick={() => setAnalysisMode('document')} 
                className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  isDocumentMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="upload" className="w-4 h-4" />
                  Image Analysis
                </div>
              </button>
              <button 
                onClick={() => setAnalysisMode('video')} 
                className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  !isDocumentMode 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name="video" className="w-4 h-4" />
                  Video Timeline
                </div>
              </button>
            </div>

            {/* Sub-mode Toggle for Documents */}
            {isDocumentMode && (
              <div className="mb-8 mx-auto p-1 bg-black/50 backdrop-blur-md rounded-2xl flex w-fit border border-white/20 shadow-lg transform scale-90">
                  <button onClick={() => setMode('single')} className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${mode === 'single' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white'}`}>
                      Single Analysis
                  </button>
                  <button onClick={() => setMode('compare')} className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${mode === 'compare' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 'text-gray-400 hover:text-white'}`}>
                      Compare Levels
                  </button>
              </div>
            )}

            {/* Animated icon with glow */}
            <div className="flex justify-center items-center mb-8 group">
              <div className="relative cursor-pointer" onClick={handleFileSelect}>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative p-6 bg-gray-900/80 backdrop-blur-md rounded-full border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:border-cyan-400 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300 group-hover:scale-110">
                  <Icon 
                    name={isDocumentMode ? (mode === 'compare' ? 'compare' : 'upload') : 'video'} 
                    className="w-12 h-12 text-cyan-300 group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
              </div>
            </div>

            {/* Title with gradient text */}
            <h2 className="text-4xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
              {isDocumentMode 
                ? (mode === 'compare' ? 'Compare Multiple Levels' : 'Analyze Your Level Design') 
                : 'Video Timeline Analysis'
              }
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg max-w-md mx-auto">
              AI-powered insights in seconds. Upload your work and let our engine transform it into professional portfolio material.
            </p>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => onFileChange(e.target.files)}
              className="hidden"
              accept={isDocumentMode ? "image/*,video/mp4,video/quicktime,application/pdf" : "video/mp4,video/quicktime"}
              multiple={isDocumentMode && mode === 'compare'}
            />
            
            {/* File List & Actions */}
            <div className="space-y-6">
              {/* Drag & Drop Area Placeholder or File List */}
              {files.length > 0 ? (
                  <div className="space-y-2 w-full max-w-md mx-auto">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-white font-medium text-sm bg-white/10 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm animate-fade-in">
                        <p className="truncate w-10/12 text-left flex items-center gap-2">
                          <Icon name="upload" className="w-4 h-4 text-cyan-400" />
                          {file.name}
                        </p>
                        <button onClick={() => removeFile(index)} className="text-red-400 hover:text-red-300 p-1 hover:bg-white/10 rounded transition-colors">&times;</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div 
                      onClick={handleFileSelect}
                      className="border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all cursor-pointer group max-w-md mx-auto"
                  >
                      <p className="text-gray-400 group-hover:text-cyan-300 transition-colors text-sm">
                          Drag & drop files here, or click to browse
                      </p>
                  </div>
                )}

              {isDocumentMode && mode === 'single' && files.length > 0 && (
                  <div className="max-w-xs mx-auto">
                      <GenreSelector selectedGenre={genre} onSelectGenre={setGenre} />
                  </div>
              )}
              
              <div className="w-full max-w-md mx-auto">
                <Button 
                  onClick={onProcess}
                  disabled={!canProcess}
                  variant="primary"
                  fullWidth
                  size="lg"
                  className="hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                >
                  {isDocumentMode 
                    ? (mode === 'compare' ? `Forge Comparison (${files.length}/${maxFiles})` : 'Forge Portfolio')
                    : `Analyze Timeline (${files.length}/1)`
                  }
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>
        
        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -50px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(50px, 50px) scale(1.05); }
          }
          
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          
          @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
          }
        `}</style>
      </div>

      {/* Animated Stats Section */}
      <div className="w-full max-w-5xl px-4">
         <StatsDisplay />
      </div>
      
      {/* Feature Grid */}
      <div className="w-full">
         <FeaturesGrid />
      </div>
    </div>
  );
};