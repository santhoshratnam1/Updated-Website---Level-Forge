import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Icon, type IconName } from './Icon';
import type { VideoAnalysisResult, TimelineEvent, TimelineEventType, GeneratedAsset, PacingAnalysis } from '../types/portfolio';

const eventTypeConfig: Record<TimelineEventType, { icon: IconName; color: string }> = {
    Combat: { icon: 'fps', color: 'bg-red-500' },
    Exploration: { icon: 'open-world', color: 'bg-green-500' },
    Puzzle: { icon: 'puzzle', color: 'bg-yellow-500' },
    Narrative: { icon: 'quote', color: 'bg-blue-500' },
    Player_Stuck: { icon: 'help', color: 'bg-orange-500' },
    Key_Moment: { icon: 'logo', color: 'bg-purple-500' },
    Stealth: { icon: 'horror', color: 'bg-indigo-500' },
    Traversal: { icon: 'arrow', color: 'bg-blue-400' },
    Looting: { icon: 'download', color: 'bg-yellow-600' },
    Menu_UI: { icon: 'list', color: 'bg-gray-500' },
    Death: { icon: 'trash', color: 'bg-gray-800' },
};

const TimelineScrubber: React.FC<{
  events: TimelineEvent[],
  duration: number,
  currentTime: number,
  onSeek: (time: number) => void
}> = ({ events, duration, currentTime, onSeek }) => {
  const scrubberRef = useRef<HTMLDivElement>(null);

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    onSeek(pos * duration);
  };
  
  return (
    <div ref={scrubberRef} onClick={handleScrub} className="w-full h-10 bg-black/30 rounded-lg cursor-pointer relative group">
      {/* Background track */}
      <div className="h-2 bg-white/10 absolute top-1/2 -translate-y-1/2 left-2 right-2 rounded-full" />
      
      {/* Progress track */}
      <div className="h-2 bg-cyan-400 absolute top-1/2 -translate-y-1/2 left-2 rounded-full" style={{ width: `calc(${ (currentTime / duration) * 100 }% - 1rem)` }} />
      
      {/* Event markers */}
      {events.map((event, i) => {
        const config = eventTypeConfig[event.type] || eventTypeConfig.Key_Moment;
        return (
          <div
            key={i}
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${config.color} ring-2 ring-black/50 transition-transform group-hover:scale-125`}
            style={{ left: `${(event.timestamp / duration) * 100}%` }}
            title={`${event.title} (${new Date(event.timestamp * 1000).toISOString().substr(14, 5)})`}
          />
        );
      })}

      {/* Playhead */}
      <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full ring-2 ring-cyan-500 shadow-lg pointer-events-none" style={{ left: `calc(${(currentTime / duration) * 100}% - 8px)`}} />
    </div>
  );
};


export const TimelineView: React.FC<{ result: VideoAnalysisResult }> = ({ result }) => {
    const { summary, pacing, events, frames, generatedAssets, videoUrl } = result;
    const [activeTab, setActiveTab] = useState<'assets' | 'events' | 'pacing'>('assets');
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const duration = frames.length > 0 ? frames[frames.length - 1]?.timestamp : 1;

    const handleSeek = (time: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = time;
      }
    };
    
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const timeUpdate = () => setCurrentTime(video.currentTime);
        video.addEventListener('timeupdate', timeUpdate);
        return () => video.removeEventListener('timeupdate', timeUpdate);
    }, []);

    const jumpToEvent = (timestamp: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = timestamp;
            videoRef.current.play();
        }
    }

    const AssetViewer: React.FC<{ assets: GeneratedAsset[] }> = ({ assets }) => {
        const [activeAsset, setActiveAsset] = useState(0);
        if (!assets || assets.length === 0) {
            return <div className="text-center p-8 text-gray-400">No visual assets were generated for this video.</div>
        }
        return (
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0 flex space-x-2 p-2 border-b border-white/10 overflow-x-auto">
                    {assets.map((asset, index) => (
                        <button key={index} onClick={() => setActiveAsset(index)} className={`flex-shrink-0 px-3 py-1 text-sm rounded-lg ${activeAsset === index ? 'bg-cyan-500/30 text-cyan-200' : 'text-gray-400 hover:bg-white/10'}`}>
                            {asset.title}
                        </button>
                    ))}
                </div>
                <div className="flex-grow p-2 flex items-center justify-center min-h-0">
                    <img src={assets[activeAsset].url} alt={assets[activeAsset].title} className="max-w-full max-h-full object-contain" />
                </div>
            </div>
        );
    }
    
    const EventLog: React.FC = () => (
        <div className="relative h-full overflow-y-auto custom-scrollbar p-4">
             {events.sort((a,b) => a.timestamp - b.timestamp).map((event, index) => {
                const config = eventTypeConfig[event.type] || eventTypeConfig.Key_Moment;
                return (
                <div key={index} className="mb-6 flex items-start space-x-4 group cursor-pointer" onClick={() => jumpToEvent(event.timestamp)}>
                    <div className={`flex-shrink-0 mt-1 w-8 h-8 rounded-full ${config.color} flex items-center justify-center ring-4 ring-[#0a0a0f] z-10 relative`}>
                        <Icon name={config.icon} className="w-4 h-4 text-white"/>
                    </div>
                    <div className="flex-grow pt-1 border-l-2 border-white/10 pl-8 -ml-8 group-hover:bg-white/5 rounded-r-lg pb-1 transition-colors">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-cyan-400 font-mono">{new Date(event.timestamp * 1000).toISOString().substr(14, 5)}</p>
                            <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">Intensity</span>
                                <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500" style={{width: `${event.intensity * 10}%`}} />
                                </div>
                            </div>
                        </div>
                        <h4 className="font-bold text-white">{event.title}</h4>
                        <p className="text-sm text-gray-300">{event.description}</p>
                    </div>
                </div>
                );
            })}
        </div>
    );

    const PacingPanel: React.FC<{ pacing: PacingAnalysis }> = ({ pacing }) => {
        if (!pacing) return <div className="p-4 text-gray-400">No pacing analysis available.</div>;
        
        const getScoreColor = (score: number) => {
            if (score >= 8) return 'text-green-400 border-green-400';
            if (score >= 5) return 'text-yellow-400 border-yellow-400';
            return 'text-red-400 border-red-400';
        };

        return (
            <div className="relative h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
                <div className="flex items-center justify-center space-x-6">
                    <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center flex-shrink-0 ${getScoreColor(pacing.score)}`}>
                        <div className="text-center">
                            <span className="block text-3xl font-bold">{pacing.score}</span>
                            <span className="text-xs uppercase tracking-wider font-semibold">Score</span>
                        </div>
                    </div>
                    <div>
                         <h3 className="text-xl font-bold text-white mb-1">Pacing Overview</h3>
                         <p className="text-gray-400 text-sm">Based on event frequency, intensity variety, and flow.</p>
                    </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-cyan-400 font-semibold mb-2 flex items-center">
                        <Icon name="quote" className="w-4 h-4 mr-2" />
                        AI Critique
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{pacing.critique}</p>
                </div>

                <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                        <Icon name="plus" className="w-4 h-4 mr-2 text-green-400" />
                        Suggested Improvements
                    </h4>
                    <ul className="space-y-3">
                        {pacing.improvements.map((imp, idx) => (
                            <li key={idx} className="flex items-start space-x-3 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-xs font-bold">
                                    {idx + 1}
                                </span>
                                <span className="text-gray-300 text-sm">{imp}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col flex-grow p-4 h-full">
            <h2 className="text-2xl font-bold mb-4 flex-shrink-0">Video Breakdown Analysis</h2>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-grow min-h-0 h-full">
                {/* Left Panel: Video Player & Timeline */}
                <div className="lg:col-span-3 h-full flex flex-col space-y-4">
                    <GlassCard className="flex-grow flex items-center justify-center bg-black min-h-[300px]">
                        <video ref={videoRef} src={videoUrl} controls className="max-w-full max-h-full" />
                    </GlassCard>
                    <GlassCard className="p-4 flex-shrink-0">
                         <TimelineScrubber events={events} duration={duration} currentTime={currentTime} onSeek={handleSeek} />
                    </GlassCard>
                </div>
                
                {/* Right Panel: Analysis */}
                <div className="lg:col-span-2 h-full flex flex-col">
                    <GlassCard className="h-full flex flex-col">
                        <div className="p-2 border-b border-white/10 flex space-x-2 flex-shrink-0 overflow-x-auto">
                             <button onClick={() => setActiveTab('assets')} className={`px-4 py-2 text-sm font-semibold rounded-lg flex-shrink-0 ${activeTab === 'assets' ? 'bg-cyan-500/30 text-cyan-200' : 'text-gray-400 hover:bg-white/10'}`}>
                                Assets
                             </button>
                             <button onClick={() => setActiveTab('events')} className={`px-4 py-2 text-sm font-semibold rounded-lg flex-shrink-0 ${activeTab === 'events' ? 'bg-purple-500/30 text-purple-200' : 'text-gray-400 hover:bg-white/10'}`}>
                                Event Log
                             </button>
                             <button onClick={() => setActiveTab('pacing')} className={`px-4 py-2 text-sm font-semibold rounded-lg flex-shrink-0 ${activeTab === 'pacing' ? 'bg-green-500/30 text-green-200' : 'text-gray-400 hover:bg-white/10'}`}>
                                Pacing
                             </button>
                        </div>
                        <div className="flex-grow min-h-0 overflow-hidden">
                            {activeTab === 'assets' && <AssetViewer assets={generatedAssets} />}
                            {activeTab === 'events' && <EventLog />}
                            {activeTab === 'pacing' && <PacingPanel pacing={pacing} />}
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};