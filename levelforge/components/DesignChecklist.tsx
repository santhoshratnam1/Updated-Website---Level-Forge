import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Icon } from './Icon';
import { checklistData } from '../data/checklistItems';
import type { ChecklistState } from '../types/portfolio';

interface DesignChecklistProps {
  checklistState: ChecklistState;
  toggleItem: (id: string) => void;
  completionPercentage: number;
}

const ChecklistProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => (
    <div className="w-full">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Completion Status</span>
            <span className="text-sm font-bold text-amber-500">{percentage}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2">
            <div 
                className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.4)]" 
                style={{ width: `${percentage}%`, transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
            ></div>
        </div>
    </div>
);

export const DesignChecklist: React.FC<DesignChecklistProps> = ({ checklistState, toggleItem, completionPercentage }) => {
    // We'll just render all open by default in the dashboard view
    
    return (
        <div className="space-y-8">
            <GlassCard className="p-6 border-amber-500/20 bg-amber-500/5">
                <ChecklistProgressBar percentage={completionPercentage} />
            </GlassCard>
            
            <div className="grid gap-6">
                {checklistData.map(category => (
                    <GlassCard key={category.title} className="p-6 group hover:border-white/10 transition-all">
                        <h4 className="font-bold text-lg text-white mb-4 flex items-center">
                            <span className="w-1 h-6 bg-amber-500 rounded-full mr-3"></span>
                            {category.title}
                        </h4>
                        <ul className="space-y-3 pl-4">
                            {category.items.map(item => (
                                <li key={item.id}>
                                    <label className="flex items-start space-x-3 cursor-pointer group/item">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input 
                                                type="checkbox"
                                                checked={checklistState[item.id] || false}
                                                onChange={() => toggleItem(item.id)}
                                                className="peer appearance-none h-5 w-5 rounded border-2 border-white/20 bg-transparent checked:bg-amber-500 checked:border-amber-500 transition-all cursor-pointer"
                                            />
                                            <Icon name="plus" className="w-3 h-3 text-black absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity transform rotate-45 peer-checked:rotate-0" />
                                        </div>
                                        <span className={`text-sm leading-relaxed transition-colors ${checklistState[item.id] ? 'text-gray-500 line-through' : 'text-gray-300 group-hover/item:text-white'}`}>
                                            {item.label}
                                        </span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};