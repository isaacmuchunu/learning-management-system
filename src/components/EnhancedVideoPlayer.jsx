import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  SkipForward, SkipBack, Settings, X, Bookmark, BookmarkCheck,
  List, MessageSquare, Download, PictureInPicture2, Subtitles, ChevronRight
} from "lucide-react";

function EnhancedVideoPlayer({ 
  videoUrl, 
  posterUrl, 
  title,
  chapters = [],
  transcript = [],
  onProgress,
  onComplete,
  autoPlay = false 
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isPiP, setIsPiP] = useState(false);
  const [buffered, setBuffered] = useState(0);

  const hideControlsTimeout = useRef(null);

  const defaultChapters = chapters.length > 0 ? chapters : [
    { time: 0, title: "Introduction" },
    { time: 120, title: "Setting Up the Environment" },
    { time: 360, title: "Basic Concepts" },
    { time: 600, title: "Hands-on Demo" },
    { time: 900, title: "Advanced Techniques" },
    { time: 1200, title: "Summary & Next Steps" }
  ];

  const defaultTranscript = transcript.length > 0 ? transcript : [
    { time: 0, text: "Welcome to this cybersecurity tutorial. Today we will be covering important security concepts." },
    { time: 15, text: "Let us start by understanding the fundamentals of network security and why it matters." },
    { time: 30, text: "The first principle we need to understand is defense in depth." },
    { time: 45, text: "This means implementing multiple layers of security controls throughout your infrastructure." }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (onProgress) {
        onProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) onComplete();
    };
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(0) / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("progress", handleProgress);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("progress", handleProgress);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
    }
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const addBookmark = () => {
    const newBookmark = { time: currentTime, label: `Bookmark at ${formatTime(currentTime)}` };
    setBookmarks([...bookmarks, newBookmark]);
  };

  const seekToChapter = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    setShowChapters(false);
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        setIsPiP(false);
      } else {
        await videoRef.current.requestPictureInPicture();
        setIsPiP(true);
      }
    } catch (err) {
      console.error("PiP error:", err);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const getCurrentChapter = () => {
    for (let i = defaultChapters.length - 1; i >= 0; i--) {
      if (currentTime >= defaultChapters[i].time) {
        return defaultChapters[i];
      }
    }
    return defaultChapters[0];
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div 
      id="enhanced-video-player"
      ref={containerRef}
      className="relative bg-black rounded-xl overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="w-full aspect-video"
        onClick={togglePlay}
      />

      {showSubtitles && (
        <div className="absolute bottom-20 left-0 right-0 text-center px-4">
          <div className="inline-block bg-black/80 px-4 py-2 rounded text-white text-sm">
            {defaultTranscript.find(t => currentTime >= t.time && currentTime < t.time + 15)?.text || ""}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
          >
            {title && (
              <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">{title}</h3>
                  <p className="text-dark-400 text-sm">{getCurrentChapter()?.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowChapters(!showChapters)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70">
                    <List className="h-4 w-4" />
                  </button>
                  <button onClick={() => setShowTranscript(!showTranscript)} className="p-2 bg-black/50 rounded-lg text-white hover:bg-black/70">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-cyber-500/90 flex items-center justify-center text-dark-950 hover:bg-cyber-400 transition-colors"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <div className="relative">
                <div 
                  className="h-1.5 bg-dark-700 rounded-full cursor-pointer group/progress"
                  onClick={handleSeek}
                >
                  <div className="absolute h-full bg-dark-500/50 rounded-full" style={{ width: `${buffered}%` }} />
                  <div className="absolute h-full bg-cyber-500 rounded-full transition-all" style={{ width: `${(currentTime / duration) * 100}%` }} />
                  {defaultChapters.map((chapter, idx) => (
                    <div
                      key={idx}
                      className="absolute top-1/2 -translate-y-1/2 w-1 h-3 bg-white/50 rounded"
                      style={{ left: `${(chapter.time / duration) * 100}%` }}
                      title={chapter.title}
                    />
                  ))}
                  {bookmarks.map((bookmark, idx) => (
                    <div
                      key={idx}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-500 rounded-full"
                      style={{ left: `${(bookmark.time / duration) * 100}%` }}
                      title={bookmark.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => skip(-10)} className="text-white/80 hover:text-white"><SkipBack className="h-5 w-5" /></button>
                  <button onClick={togglePlay} className="text-white hover:text-cyber-400">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <button onClick={() => skip(10)} className="text-white/80 hover:text-white"><SkipForward className="h-5 w-5" /></button>
                  <div className="flex items-center gap-2 ml-2">
                    <button onClick={toggleMute} className="text-white/80 hover:text-white">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const newVolume = parseFloat(e.target.value);
                        setVolume(newVolume);
                        if (videoRef.current) videoRef.current.volume = newVolume;
                        setIsMuted(newVolume === 0);
                      }}
                      className="w-20 h-1 bg-dark-600 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                  <span className="text-white/80 text-sm font-mono ml-2">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={addBookmark} className="p-1.5 text-white/80 hover:text-yellow-400" title="Add Bookmark">
                    {bookmarks.some(b => Math.abs(b.time - currentTime) < 5) ? 
                      <BookmarkCheck className="h-5 w-5 text-yellow-400" /> : 
                      <Bookmark className="h-5 w-5" />}
                  </button>
                  <button onClick={() => setShowSubtitles(!showSubtitles)} className={`p-1.5 ${showSubtitles ? "text-cyber-400" : "text-white/80"} hover:text-white`}>
                    <Subtitles className="h-5 w-5" />
                  </button>
                  <button onClick={togglePiP} className={`p-1.5 ${isPiP ? "text-cyber-400" : "text-white/80"} hover:text-white`}>
                    <PictureInPicture2 className="h-5 w-5" />
                  </button>
                  <div className="relative">
                    <button onClick={() => setShowSpeedMenu(!showSpeedMenu)} className="px-2 py-1 text-white/80 hover:text-white text-sm flex items-center gap-1">
                      <Settings className="h-4 w-4" />
                      {playbackSpeed}x
                    </button>
                    <AnimatePresence>
                      {showSpeedMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full mb-2 right-0 bg-dark-800 rounded-lg border border-dark-600 overflow-hidden"
                        >
                          {speedOptions.map((speed) => (
                            <button
                              key={speed}
                              onClick={() => changeSpeed(speed)}
                              className={`block w-full px-4 py-2 text-sm text-left hover:bg-dark-700 transition-colors ${
                                playbackSpeed === speed ? "text-cyber-400 bg-dark-700" : "text-white"
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <button onClick={toggleFullscreen} className="text-white/80 hover:text-white">
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChapters && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-12 right-4 w-64 bg-dark-900/95 rounded-xl border border-dark-700 overflow-hidden z-10"
          >
            <div className="p-3 border-b border-dark-700 flex items-center justify-between">
              <span className="text-white font-medium text-sm">Chapters</span>
              <button onClick={() => setShowChapters(false)} className="text-dark-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {defaultChapters.map((chapter, idx) => (
                <button
                  key={idx}
                  onClick={() => seekToChapter(chapter.time)}
                  className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-dark-800 transition-colors ${
                    getCurrentChapter()?.time === chapter.time ? "bg-cyber-500/10 border-l-2 border-cyber-500" : ""
                  }`}
                >
                  <span className="text-dark-400 text-xs font-mono w-12">{formatTime(chapter.time)}</span>
                  <span className="text-white text-sm text-left flex-1">{chapter.title}</span>
                  <ChevronRight className="h-4 w-4 text-dark-500" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-12 right-4 w-80 bg-dark-900/95 rounded-xl border border-dark-700 overflow-hidden z-10"
          >
            <div className="p-3 border-b border-dark-700 flex items-center justify-between">
              <span className="text-white font-medium text-sm">Transcript</span>
              <button onClick={() => setShowTranscript(false)} className="text-dark-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto p-3 space-y-3">
              {defaultTranscript.map((line, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = line.time;
                  }}
                  className={`w-full text-left p-2 rounded hover:bg-dark-800 transition-colors ${
                    currentTime >= line.time && currentTime < (defaultTranscript[idx + 1]?.time || duration) 
                      ? "bg-cyber-500/10 border-l-2 border-cyber-500" : ""
                  }`}
                >
                  <span className="text-cyber-400 text-xs font-mono">{formatTime(line.time)}</span>
                  <p className="text-dark-300 text-sm mt-1">{line.text}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EnhancedVideoPlayer;
