import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { GlassCard } from './GlassCard';
import { PortfolioBuilder } from './editor/PortfolioBuilder';
import { AnnotationCanvas, type AnnotationCanvasHandle } from './editor/AnnotationCanvas';
import type { Block, GeneratedAsset, Annotation, ChecklistState, DesignChallenge } from '../types/portfolio';
import { useAnnotations } from '../hooks/useAnnotations';
import { Icon, type IconName } from './Icon';
import { ChatAssistant } from './ChatAssistant';
import { DesignChecklist } from './DesignChecklist';
import { useChecklist } from '../hooks/useChecklist';
import { DesignChallenges } from './DesignChallenges';
import { useChallenges } from '../hooks/useChallenges';
import { LoadingSpinner } from './LoadingSpinner';

interface EditorWorkspaceProps {
  initialBlocks: Block[];
  generatedImages: GeneratedAsset[];
  initialChallenges: DesignChallenge[] | null;
  onGenerateAsset: (assetType: 'Top-down whitebox map' | 'Player flow diagram' | 'Combat analysis overlay' | 'Flow & Loops Overlay') => void;
  isGeneratingAsset: boolean;
}

export interface EditorWorkspaceHandle {
    getAnnotatedImages: () => Promise<GeneratedAsset[]>;
    getChecklistState: () => ChecklistState;
}

type TabId = 'portfolio' | 'checklist' | 'challenges';

export const EditorWorkspace = forwardRef<EditorWorkspaceHandle, EditorWorkspaceProps>(({ initialBlocks, generatedImages, initialChallenges, onGenerateAsset, isGeneratingAsset }, ref) => {
  const [activeTab, setActiveTab] = useState<TabId>('portfolio');
  const [activeImageTab, setActiveImageTab] = useState(0);
  
  const { annotations, addAnnotation, undoAnnotation, clearAnnotations, activeTool, setActiveTool } = useAnnotations();
  const { checklistState, toggleItem, completionPercentage } = useChecklist();
  const { challenges, updateChallengeStatus } = useChallenges(initialChallenges || []);
  const canvasRefs = useRef<{[key: number]: AnnotationCanvasHandle | null}>({});

  useImperativeHandle(ref, () => ({
    async getAnnotatedImages() {
        const annotatedImages: GeneratedAsset[] = [];
        for(let i = 0; i < generatedImages.length; i++) {
            const handle = canvasRefs.current[i];
            if (handle) {
                const url = await handle.exportImage();
                annotatedImages.push({
                    title: generatedImages[i].title,
                    url,
                });
            } else {
                annotatedImages.push(generatedImages[i]);
            }
        }
        return annotatedImages;
    },
    getChecklistState() {
        return checklistState;
    }
  }));

  const handleSetAnnotations = (newAnnotations: Annotation[]) => {
      addAnnotation(activeImageTab, newAnnotations);
  };

  // Sidebar Navigation Item
  const NavItem: React.FC<{ id: TabId; label: string; icon: IconName }> = ({ id, label, icon }) => (
      <button
          onClick={() => setActiveTab(id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === id 
              ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/20' 
              : 'text-gray-500 hover:bg-white/5 hover:text-gray-200'
          }`}
      >
          <Icon name={icon} className={`w-5 h-5 ${activeTab === id ? 'text-amber-500' : 'text-gray-500 group-hover:text-gray-300'}`} />
          <span className="font-semibold text-sm">{label}</span>
          {id === 'checklist' && (
             <span className="ml-auto text-xs bg-white/5 px-2 py-0.5 rounded text-gray-500">{completionPercentage}%</span>
          )}
      </button>
  );

  return (
    <div className="flex h-[85vh] w-full max-w-[1600px] mx-auto overflow-hidden bg-[#0a0a0f] rounded-3xl border border-white/5 shadow-2xl">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-white/5 bg-black/20 flex flex-col">
         <div className="p-6">
             <h2 className="text-xl font-bold text-white flex items-center gap-2">
                 <Icon name="logo" className="w-6 h-6 text-amber-500" />
                 LevelForge
             </h2>
         </div>
         
         <nav className="flex-grow px-4 space-y-2">
             <NavItem id="portfolio" label="Portfolio" icon="list" />
             <NavItem id="checklist" label="Checklist" icon="rect" />
             <NavItem id="challenges" label="Challenges" icon="plus" />
         </nav>
         
         <div className="p-4 border-t border-white/5">
             <div className="bg-white/5 rounded-xl p-4">
                 <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">AI Assistant</p>
                 <ChatAssistant portfolioBlocks={initialBlocks} />
             </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex overflow-hidden relative">
          
          {/* Portfolio Mode: Split View */}
          {activeTab === 'portfolio' && (
              <div className="w-full h-full flex">
                  {/* Left: Editor */}
                  <div className="w-1/2 h-full overflow-y-auto custom-scrollbar p-8 border-r border-white/5 bg-[#0a0a0f]">
                      <PortfolioBuilder 
                        initialBlocks={initialBlocks} 
                        onSave={(blocks) => console.log('Saving blocks:', blocks)}
                      />
                  </div>
                  
                  {/* Right: Visuals */}
                  <div className="w-1/2 h-full flex flex-col bg-[#05050a]">
                       {/* Toolbar */}
                       <div className="p-4 border-b border-white/5 flex justify-between items-center">
                           <div className="flex gap-2">
                               {generatedImages.map((img, i) => (
                                   <button
                                       key={i}
                                       onClick={() => setActiveImageTab(i)}
                                       className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                           activeImageTab === i 
                                           ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20' 
                                           : 'text-gray-500 hover:bg-white/5'
                                       }`}
                                   >
                                       {img.title}
                                   </button>
                               ))}
                           </div>
                           <div className="flex gap-2">
                               <button 
                                   onClick={() => undoAnnotation(activeImageTab)}
                                   className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                   title="Undo Annotation"
                               >
                                   <Icon name="undo" className="w-4 h-4" />
                               </button>
                               <button 
                                   onClick={() => clearAnnotations(activeImageTab)}
                                   className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                                   title="Clear Annotations"
                               >
                                   <Icon name="trash" className="w-4 h-4" />
                               </button>
                           </div>
                       </div>

                       {/* Canvas Area */}
                       <div className="flex-grow relative overflow-hidden flex items-center justify-center bg-black/50">
                           {isGeneratingAsset && (
                               <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                                   <LoadingSpinner message="Generating Visual Asset..." />
                               </div>
                           )}
                           
                           {generatedImages[activeImageTab] && (
                               <AnnotationCanvas
                                    ref={el => { canvasRefs.current[activeImageTab] = el; }}
                                    imageUrl={generatedImages[activeImageTab].url}
                                    activeTool={activeTool}
                                    annotations={annotations[activeImageTab] || []}
                                    onAnnotationsChange={handleSetAnnotations}
                                />
                           )}
                       </div>
                       
                       {/* Bottom Tools */}
                       <div className="p-4 border-t border-white/5 bg-[#0a0a0f]">
                           <div className="flex items-center justify-between">
                               <div className="flex gap-2">
                                   {['arrow', 'text', 'brush', 'rect', 'circle'].map((tool) => (
                                       <button
                                           key={tool}
                                           onClick={() => setActiveTool(tool as any)}
                                           className={`p-2.5 rounded-lg transition-all ${
                                               activeTool === tool 
                                               ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                                               : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                           }`}
                                       >
                                           <Icon name={tool as any} className="w-4 h-4" />
                                       </button>
                                   ))}
                               </div>
                               <button
                                    onClick={() => onGenerateAsset('Combat analysis overlay')}
                                    disabled={isGeneratingAsset}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-all flex items-center gap-2"
                               >
                                   <Icon name="plus" className="w-3 h-3" />
                                   Generate Overlay
                               </button>
                           </div>
                       </div>
                  </div>
              </div>
          )}

          {/* Checklist Mode: Focused Center */}
          {activeTab === 'checklist' && (
              <div className="w-full h-full overflow-y-auto custom-scrollbar p-12 bg-[#0a0a0f] flex justify-center">
                  <div className="w-full max-w-3xl">
                      <h2 className="text-3xl font-bold text-white mb-2">Design Checklist</h2>
                      <p className="text-gray-400 mb-8">Track your progress across key level design pillars.</p>
                      <DesignChecklist 
                        checklistState={checklistState}
                        toggleItem={toggleItem}
                        completionPercentage={completionPercentage}
                    />
                  </div>
              </div>
          )}

          {/* Challenges Mode: Focused Center */}
          {activeTab === 'challenges' && (
              <div className="w-full h-full overflow-y-auto custom-scrollbar p-12 bg-[#0a0a0f] flex justify-center">
                  <div className="w-full max-w-3xl">
                      <h2 className="text-3xl font-bold text-white mb-2">Design Challenges</h2>
                      <p className="text-gray-400 mb-8">Actionable tasks generated by AI to improve your level.</p>
                      <DesignChallenges
                        challenges={challenges}
                        onStatusChange={updateChallengeStatus}
                    />
                  </div>
              </div>
          )}
      </div>
    </div>
  );
});