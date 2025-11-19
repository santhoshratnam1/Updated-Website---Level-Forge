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
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center pt-10">
        <div className="mb-6 flex items-center justify-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
           <Icon name="logo" className="w-4 h-4 text-amber-400" />
           <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">Advanced Level Analysis</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
          <span className="text-white">Revolutionize Your</span><br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 text-glow">Level Design Workflow</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your level screenshots or gameplay footage. Our AI transforms them into professional portfolio breakdowns, flow diagrams, and pacing analysis in seconds.
        </p>

        <GlassCard className="relative overflow-hidden w-full max-w-2xl border-amber-500/10 bg-black/40">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>
          
          <div className="relative p-8 flex flex-col items-center" onDragOver={handleDragOver} onDrop={handleDrop}>
            
            {/* Analysis Mode Toggle */}
            <div className="mb-8 p-1.5 bg-black/60 backdrop-blur-md rounded-full flex w-fit border border-white/10 shadow-inner">
              <button 
                onClick={() => setAnalysisMode('document')} 
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  isDocumentMode 
                    ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon name="upload" className="w-4 h-4" />
                Image Analysis
              </button>
              <button 
                onClick={() => setAnalysisMode('video')} 
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  !isDocumentMode 
                    ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/10' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon name="video" className="w-4 h-4" />
                Video Timeline
              </button>
            </div>

            {/* Sub-mode Toggle for Documents */}
            {isDocumentMode && (
              <div className="mb-6 flex space-x-4 text-sm">
                  <label className="flex items-center cursor-pointer group">
                      <input type="radio" checked={mode === 'single'} onChange={() => setMode('single')} className="hidden" />
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${mode === 'single' ? 'border-amber-500' : 'border-gray-600 group-hover:border-gray-500'}`}>
                          {mode === 'single' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      </span>
                      <span className={`${mode === 'single' ? 'text-white' : 'text-gray-500 group-hover:text-gray-400'}`}>Single Analysis</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                      <input type="radio" checked={mode === 'compare'} onChange={() => setMode('compare')} className="hidden" />
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors ${mode === 'compare' ? 'border-amber-500' : 'border-gray-600 group-hover:border-gray-500'}`}>
                          {mode === 'compare' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      </span>
                      <span className={`${mode === 'compare' ? 'text-white' : 'text-gray-500 group-hover:text-gray-400'}`}>Compare Levels</span>
                  </label>
              </div>
            )}

            {/* Main Action Area */}
            {files.length > 0 ? (
                  <div className="space-y-4 w-full max-w-md mx-auto mb-6">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-white font-medium text-sm bg-white/5 border border-white/10 px-4 py-3 rounded-xl backdrop-blur-sm animate-fade-in hover:bg-white/10 transition-colors">
                        <div className="truncate w-10/12 text-left flex items-center gap-3">
                          <div className="p-1.5 bg-amber-500/20 rounded-lg flex-shrink-0">
                             <Icon name={file.type.includes('video') ? 'video' : 'upload'} className="w-4 h-4 text-amber-400" />
                          </div>
                          <span className="truncate">{file.name}</span>
                        </div>
                        <button onClick={() => removeFile(index)} className="text-gray-500 hover:text-red-400 p-1 hover:bg-white/5 rounded transition-colors">&times;</button>
                      </div>
                    ))}
                    
                    <div className="flex justify-center">
                        <button onClick={handleFileSelect} className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                            <Icon name="plus" className="w-3 h-3" /> Add another file
                        </button>
                    </div>
                  </div>
                ) : (
                  <div 
                      onClick={handleFileSelect}
                      className="w-full border-2 border-dashed border-white/10 rounded-2xl p-10 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-pointer group max-w-md mx-auto mb-6 flex flex-col items-center"
                  >
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-amber-500/20">
                          <Icon name="upload" className="w-8 h-8 text-gray-500 group-hover:text-amber-400 transition-colors" />
                      </div>
                      <p className="text-gray-300 font-medium mb-1 group-hover:text-white transition-colors">
                          Click to upload or drag & drop
                      </p>
                      <p className="text-gray-500 text-sm">
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
            <div className="w-full max-w-md mx-auto space-y-4">
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
                className="shadow-amber-900/20"
              >
                {isDocumentMode 
                  ? (mode === 'compare' ? `Compare Levels` : 'Generate Portfolio')
                  : `Analyze Timeline`
                }
              </Button>
            </div>

          </div>
        </GlassCard>
      </div>

      {/* Stats & Features */}
      <div className="w-full max-w-6xl px-4 space-y-20">
         <div className="border-t border-white/5 pt-10">
             <StatsDisplay />
         </div>
         
         <div>
            <div className="text-center mb-10">
                <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">Features</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Key AI Insights Driving Your Success</h2>
                <p className="text-gray-500 mt-2">Actionable intelligence that turns complex level design data into strategic decisions.</p>
            </div>
            <FeaturesGrid />
         </div>
      </div>
    </div>
  );
};