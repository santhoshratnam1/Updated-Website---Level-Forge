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
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-20">
      
      {/* Hero Section */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center pt-16 pb-8">
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-[1.1] max-w-4xl">
          <span className="text-white">Transform game levels into</span>
          <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">professional portfolios</span>
        </h1>
        
        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-normal">
          AI-powered analysis that turns level design screenshots into portfolio-ready breakdowns, flow diagrams, and actionable insights.
        </p>

        <GlassCard className="relative overflow-hidden w-full max-w-3xl">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent opacity-30 pointer-events-none"></div>
          
          <div className="relative p-10 flex flex-col items-center" onDragOver={handleDragOver} onDrop={handleDrop}>
            
            {/* Analysis Mode Toggle */}
            <div className="mb-10 p-1 glass rounded-2xl flex w-fit">
              <button 
                onClick={() => setAnalysisMode('document')} 
                className={`px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isDocumentMode 
                    ? 'bg-white/15 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon name="upload" className="w-4 h-4" />
                Image Analysis
              </button>
              <button 
                onClick={() => setAnalysisMode('video')} 
                className={`px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  !isDocumentMode 
                    ? 'bg-white/15 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon name="video" className="w-4 h-4" />
                Video Timeline
              </button>
            </div>

            {/* Sub-mode Toggle for Documents */}
            {isDocumentMode && (
              <div className="mb-8 flex space-x-6 text-sm">
                  <label className="flex items-center cursor-pointer group">
                      <input type="radio" checked={mode === 'single'} onChange={() => setMode('single')} className="hidden" />
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${mode === 'single' ? 'border-blue-500' : 'border-gray-600 group-hover:border-gray-500'}`}>
                          {mode === 'single' && <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>}
                      </span>
                      <span className={`font-medium ${mode === 'single' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>Single Analysis</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                      <input type="radio" checked={mode === 'compare'} onChange={() => setMode('compare')} className="hidden" />
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${mode === 'compare' ? 'border-blue-500' : 'border-gray-600 group-hover:border-gray-500'}`}>
                          {mode === 'compare' && <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>}
                      </span>
                      <span className={`font-medium ${mode === 'compare' ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>Compare Levels</span>
                  </label>
              </div>
            )}

            {/* Main Action Area */}
            {files.length > 0 ? (
                  <div className="space-y-3 w-full max-w-lg mx-auto mb-8">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-white font-medium text-sm glass px-5 py-4 rounded-2xl animate-fade-in hover:bg-white/10 transition-all">
                        <div className="truncate w-10/12 text-left flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-xl flex-shrink-0">
                             <Icon name={file.type.includes('video') ? 'video' : 'upload'} className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="truncate text-gray-200">{file.name}</span>
                        </div>
                        <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-red-400 p-2 hover:bg-white/10 rounded-xl transition-all text-xl leading-none">&times;</button>
                      </div>
                    ))}
                    
                    <div className="flex justify-center">
                        <button onClick={handleFileSelect} className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                            <Icon name="plus" className="w-4 h-4" /> Add another file
                        </button>
                    </div>
                  </div>
                ) : (
                  <div 
                      onClick={handleFileSelect}
                      className="w-full border-2 border-dashed border-white/20 rounded-3xl p-16 hover:border-blue-500/40 hover:bg-blue-500/5 transition-all cursor-pointer group max-w-lg mx-auto mb-8 flex flex-col items-center"
                  >
                      <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                          <Icon name="upload" className="w-10 h-10 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-gray-200 font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                          Click to upload or drag & drop
                      </p>
                      <p className="text-gray-400 text-sm">
                          {isDocumentMode ? "Images, PDF, or Video (MP4)" : "Video (MP4, MOV)"}
                      </p>
                  </div>
            )}

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => onFileChange(e.target.files)}
              className="hidden"
              accept={isDocumentMode ? "image/*,video/mp4,video/quicktime,application/pdf" : "video/mp4,video/quicktime"}
              multiple={isDocumentMode && mode === 'compare'}
            />
            
            {/* Controls & Submit */}
            <div className="w-full max-w-lg mx-auto space-y-5">
              {isDocumentMode && mode === 'single' && files.length > 0 && (
                  <div className="w-full">
                      <GenreSelector selectedGenre={genre} onSelectGenre={setGenre} />
                  </div>
              )}
              
              <Button 
                onClick={onProcess}
                disabled={!canProcess}
                variant="primary"
                fullWidth
                size="lg"
              >
                {isDocumentMode 
                  ? (mode === 'compare' ? `Compare Levels` : 'Analyze Level')
                  : `Analyze Timeline`
                }
              </Button>
            </div>

          </div>
        </GlassCard>
      </div>

      {/* Stats & Features */}
      <div className="w-full max-w-6xl px-4 space-y-24">
         <div className="border-t border-white/5 pt-16">
             <StatsDisplay />
         </div>
         
         <div>
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Powerful AI insights.</h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">Turn complex level design data into portfolio-ready analysis with intelligent automation.</p>
            </div>
            <FeaturesGrid />
         </div>
      </div>
    </div>
  );
};