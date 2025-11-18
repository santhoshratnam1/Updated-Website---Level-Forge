import React from 'react';
import { GlassCard } from './GlassCard';
import { Icon } from './Icon';
import type { DesignChallenge, ChallengeStatus } from '../types/portfolio';

interface DesignChallengesProps {
  challenges: DesignChallenge[];
  onStatusChange: (id: string, status: ChallengeStatus) => void;
}

const statusConfig = {
    suggested: { border: 'border-gray-700', bg: 'bg-white/5', iconColor: 'text-gray-400', icon: 'plus' as const },
    accepted: { border: 'border-amber-500', bg: 'bg-amber-500/10', iconColor: 'text-amber-400', icon: 'ruler' as const },
    completed: { border: 'border-green-500', bg: 'bg-green-500/10', iconColor: 'text-green-400', icon: 'logo' as const },
};

export const DesignChallenges: React.FC<DesignChallengesProps> = ({ challenges, onStatusChange }) => {
    if (!challenges || challenges.length === 0) {
        return (
            <GlassCard className="p-12 text-center border-dashed border-white/10">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="logo" className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">All Clear!</h3>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">The AI didn't detect any critical weaknesses that require immediate challenges. Your level foundation is solid.</p>
            </GlassCard>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {challenges.map(challenge => {
                const style = statusConfig[challenge.status];
                return (
                    <GlassCard key={challenge.id} className={`p-5 border-l-4 ${style.border} ${style.bg} transition-all duration-300`}>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            
                            {/* Icon & Content */}
                            <div className="flex-grow flex items-start gap-4">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center ${style.iconColor}`}>
                                    <Icon name={style.icon} className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{challenge.category}</span>
                                        {challenge.status === 'completed' && <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">DONE</span>}
                                    </div>
                                    <h4 className="font-bold text-white text-lg">{challenge.title}</h4>
                                    <p className="text-sm text-gray-400 mt-1 leading-relaxed">{challenge.description}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex-shrink-0 flex flex-row md:flex-col gap-2 mt-2 md:mt-0">
                                {challenge.status === 'suggested' && (
                                    <button 
                                        onClick={() => onStatusChange(challenge.id, 'accepted')} 
                                        className="px-4 py-2 text-xs font-bold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                                    >
                                        Accept Challenge
                                    </button>
                                )}
                                {challenge.status === 'accepted' && (
                                    <button 
                                        onClick={() => onStatusChange(challenge.id, 'completed')} 
                                        className="px-4 py-2 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-600/20"
                                    >
                                        Mark Complete
                                    </button>
                                )}
                                {challenge.status !== 'completed' && (
                                     <button className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-300 transition-colors">
                                        Dismiss
                                     </button>
                                )}
                            </div>
                        </div>
                    </GlassCard>
                );
            })}
        </div>
    );
};