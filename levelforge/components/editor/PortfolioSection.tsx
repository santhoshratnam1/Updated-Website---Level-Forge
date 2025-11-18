import React, { useState } from 'react';
import { RichTextEditor } from './RichTextEditor';
import type { Block } from '../../types/portfolio';
import { Icon } from '../Icon';
import { HelpTooltip } from '../HelpTooltip';
import { glossary } from '../../data/glossary';

interface PortfolioSectionProps {
  block: Block;
  onUpdate: (content: any) => void;
  onDelete: () => void;
  onAddBelow: (type: string) => void;
}

const termMap: Record<string, keyof typeof glossary> = {
    'Design Restrictions': 'design_restrictions',
    'Design Goals': 'design_goals',
    '⭐ Golden Path': 'golden_path',
    '📍 Context': 'golden_path',
    'Landmarks & Orientation': 'landmarks',
    'Signposting & Guidance': 'signposting',
    'Visual Language': 'visual_language',
    'Flow Structure': 'flow_structure',
    'Gates & Valves': 'gates_valves',
    'Loops & Shortcuts': 'loops_shortcuts',
    '📊 Intensity Curve': 'intensity_curve',
    'Encounter Design': 'encounter_design',
    'Cover & Layout': 'cover_layout',
    'Tactical Elements': 'tactical_elements',
    'Environmental Storytelling': 'environmental_storytelling',
    'Cognitive Load': 'cognitive_load',
    'Risk vs. Reward': 'risk_reward',
};

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  block,
  onUpdate,
  onDelete,
  onAddBelow
}) => {
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const renderBlock = () => {
    switch (block.type) {
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        const sizeClass = block.type === 'heading_1' ? 'text-4xl' : block.type === 'heading_2' ? 'text-3xl' : 'text-2xl';
        const marginClass = block.type === 'heading_1' ? 'mb-8 mt-12' : block.type === 'heading_2' ? 'mb-6 mt-10' : 'mb-4 mt-6';
        const headingText = block.content.text || '';
        const headingKey = termMap[headingText];
        
        const input = (
             <input
                type="text"
                value={headingText}
                onChange={(e) => onUpdate({ ...block.content, text: e.target.value })}
                className={`${sizeClass} ${marginClass} font-bold bg-transparent w-full focus:outline-none text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 focus:ring-2 focus:ring-amber-500/30 rounded-lg px-2 py-1`}
                placeholder="Heading"
              />
        );

        if (headingKey) {
            return (
              <div className={marginClass}>
                <HelpTooltip glossaryKey={headingKey}>{input}</HelpTooltip>
              </div>
            );
        }
        return <div className={marginClass}>{input}</div>;

      case 'paragraph':
        return (
          <div className="mb-6">
            <RichTextEditor
              value={block.content.text || ''}
              onChange={(text) => onUpdate({ ...block.content, text })}
            />
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3 mb-8">
            {block.content.url ? (
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={block.content.url} alt={block.content.caption || ''} className="w-full"/>
              </div>
            ) : (
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center bg-white/[0.02] hover:border-amber-500/30 transition-colors">
                <Icon name="upload" className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Paste an image URL below to display it here</p>
              </div>
            )}
            <input 
              type="text" 
              value={block.content.url || ''} 
              onChange={(e) => onUpdate({ ...block.content, url: e.target.value })} 
              placeholder="Image URL..." 
              className="w-full p-3 bg-black/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 focus:outline-none text-gray-300 placeholder:text-gray-600 transition-all"
            />
            <input 
              type="text" 
              value={block.content.caption || ''} 
              onChange={(e) => onUpdate({ ...block.content, caption: e.target.value })} 
              placeholder="Image caption (optional)" 
              className="w-full bg-transparent text-sm text-center text-gray-500 focus:outline-none focus:text-gray-300 transition-colors px-3 py-2"
            />
          </div>
        );

      case 'callout':
          const calloutTitle = block.content.title || '';
          const calloutKey = termMap[calloutTitle];
          return (
              <div className="border-l-4 border-amber-500 bg-amber-500/10 rounded-r-2xl p-6 mb-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-3">
                     <input 
                       type="text" 
                       value={calloutTitle} 
                       onChange={(e) => onUpdate({ ...block.content, title: e.target.value })} 
                       placeholder="Callout title" 
                       className="flex-1 bg-transparent font-semibold text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500/30 rounded px-2 py-1"
                     />
                     {calloutKey && <HelpTooltip glossaryKey={calloutKey} />}
                  </div>
                  <textarea 
                    value={block.content.text || ''} 
                    onChange={(e) => onUpdate({ ...block.content, text: e.target.value })} 
                    placeholder="Callout text..." 
                    className="w-full bg-transparent text-gray-300 focus:outline-none resize-none min-h-[80px] placeholder:text-gray-600"
                  />
              </div>
          );

      case 'columns':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <RichTextEditor 
                value={block.content.left || ''} 
                onChange={(text) => onUpdate({ ...block.content, left: text })} 
                placeholder="Left column..."
              />
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
              <RichTextEditor 
                value={block.content.right || ''} 
                onChange={(text) => onUpdate({ ...block.content, right: text })} 
                placeholder="Right column..."
              />
            </div>
          </div>
        );

      case 'divider':
        return <hr className="border-white/10 my-8" />;

      default:
        return <div className="text-red-500 p-4 bg-red-500/10 rounded-xl">Unsupported block type: {block.type}</div>;
    }
  };

  return (
    <div className="group relative">
      <div className="relative">
        {renderBlock()}
        <div className="absolute top-2 -right-14 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
            <button 
              onClick={onDelete} 
              className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 transition-all"
              title="Delete"
            >
              <Icon name="trash" className="w-4 h-4 text-red-400" />
            </button>
            <button 
              onClick={() => setShowBlockMenu(!showBlockMenu)} 
              className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg hover:bg-amber-500/20 hover:border-amber-500/30 transition-all"
              title="Add block below"
            >
              <Icon name="plus" className="w-4 h-4 text-amber-400" />
            </button>
        </div>
      </div>

      {showBlockMenu && (
        <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 w-56 z-10 animate-fade-in-down">
          <BlockMenuItem label="Heading" onClick={() => { onAddBelow('heading_2'); setShowBlockMenu(false); }} />
          <BlockMenuItem label="Text" onClick={() => { onAddBelow('paragraph'); setShowBlockMenu(false); }} />
          <BlockMenuItem label="Image" onClick={() => { onAddBelow('image'); setShowBlockMenu(false); }} />
          <BlockMenuItem label="Callout" onClick={() => { onAddBelow('callout'); setShowBlockMenu(false); }} />
          <BlockMenuItem label="Columns" onClick={() => { onAddBelow('columns'); setShowBlockMenu(false); }} />
          <BlockMenuItem label="Divider" onClick={() => { onAddBelow('divider'); setShowBlockMenu(false); }} />
        </div>
      )}
    </div>
  );
};

const BlockMenuItem: React.FC<{label: string; onClick: () => void;}> = ({ label, onClick }) => (
  <button 
    onClick={onClick} 
    className="w-full text-left p-3 hover:bg-white/10 rounded-lg text-gray-300 text-sm font-medium transition-colors flex items-center gap-2 group"
  >
    <div className="w-1 h-1 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    {label}
  </button>
);