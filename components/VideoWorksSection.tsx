'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { siteData } from '@/config/site-data';
import { Button } from './ui/button';

interface VideoPlayerProps {
  video: any;
  isActive: boolean;
  onPlayPause: () => void;
}

function VideoPlayer({ video, isActive, onPlayPause }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlayPause();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-black group cursor-pointer"
      onClick={handlePlayPause}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        loop
        playsInline
      >
        <source src={video.videoUrl} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      
      {/* Play/Pause Button */}
      <AnimatePresence>
        {(!isPlaying || showControls) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
              {isPlaying ? (
                <Pause className="w-10 h-10 text-white ml-0" />
              ) : (
                <Play className="w-10 h-10 text-white ml-1" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="space-y-4">
          <div>
            <h3 className="text-white font-bold text-xl mb-2">{video.title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full font-semibold">
                {video.category === 'office_cleaning' && 'Офисы'}
                {video.category === 'house_cleaning' && 'Дома'}
                {video.category === 'window_cleaning' && 'Окна'}
                {video.category === 'carpet_cleaning' && 'Ковры'}
                {video.category === 'paving_cleaning' && 'Брусчатка'}
                {video.category === 'facade_cleaning' && 'Фасады'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mute Button */}
      <div className="absolute right-4 bottom-20 pointer-events-auto">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-white/30 transition-all"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" />
          ) : (
            <Volume2 className="w-6 h-6" />
          )}
        </motion.button>
      </div>
    </div>
  );
}

export function VideoWorksSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videoWorks = siteData.videoWorks;

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videoWorks.length);
    setPlayingVideo(null);
  };

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videoWorks.length) % videoWorks.length);
    setPlayingVideo(null);
  };

  const handlePlayPause = (videoId: string) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(videoId);
    }
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setPlayingVideo(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 via-pink-500/20 to-purple-500/20 text-red-300 rounded-full text-sm font-semibold mb-6 shadow-lg border border-red-500/30 backdrop-blur-sm"
          >
            🎬 Видео наших работ
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Reels наших работ
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Посмотрите, как мы работаем и какие результаты достигаем
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Video Display */}
        <div className="relative max-w-md mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <VideoPlayer
              video={videoWorks[currentIndex]}
              isActive={true}
              onPlayPause={() => handlePlayPause(videoWorks[currentIndex].id)}
            />
          </motion.div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevVideo}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white rounded-full z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={nextVideo}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 text-white rounded-full z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {videoWorks.map((_, index) => (
            <button
              key={index}
              onClick={() => goToVideo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-400 w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}