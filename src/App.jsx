import React, { useState, useEffect } from 'react';
import { Search, Gamepad2, X, Maximize2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState([]);
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    setGames(gamesData);
  }, []);

  useEffect(() => {
    if (selectedGame) {
      setGameStarted(false);
      setIsGameLoading(false);
    }
  }, [selectedGame]);

  const handleStartGame = () => {
    setGameStarted(true);
    setIsGameLoading(true);
  };

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Gamepad2 className="text-black w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-emerald-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search games or categories..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
            <button className="hover:text-emerald-500 transition-colors">Arcade</button>
            <button className="hover:text-emerald-500 transition-colors">Puzzle</button>
            <button className="hover:text-emerald-500 transition-colors">Action</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        {!selectedGame && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-emerald-500/10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Play Anywhere.</h2>
            <p className="text-white/60 max-w-xl text-lg">
              The ultimate collection of unblocked games for school or work. No downloads, no installs, just pure fun in your browser.
            </p>
          </motion.div>
        )}

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <motion.div
              layoutId={`game-${game.id}`}
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="group cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-3">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-black">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] uppercase font-bold tracking-wider text-emerald-400 border border-white/10">
                  {game.category}
                </div>
                {game.trending && !game.fixing && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-amber-400 rounded-lg text-[10px] uppercase font-black tracking-widest text-black shadow-lg shadow-amber-500/40 border border-amber-300">
                    Trending
                  </div>
                )}
                {game.fixing && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 rounded-lg text-[10px] uppercase font-black tracking-widest text-white shadow-lg shadow-red-500/40 border border-red-400 animate-pulse">
                    Fixing
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-white/90 group-hover:text-emerald-400 transition-colors truncate">
                {game.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setSelectedGame(null)}
            />
            
            <motion.div
              layoutId={`game-${selectedGame.id}`}
              className="relative w-full max-w-6xl aspect-video bg-[#111] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={selectedGame.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex overflow-hidden">
                {/* Game Frame */}
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
                  {!gameStarted ? (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <button 
                          onClick={handleStartGame}
                          className="relative px-12 py-4 bg-emerald-500 rounded-full text-black font-black text-xl tracking-widest uppercase flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
                        >
                          <Gamepad2 className="w-6 h-6" />
                          Play Now
                        </button>
                      </div>
                      <p className="mt-6 text-white/40 text-sm font-medium tracking-wide animate-pulse">
                        Click to initialize game engine
                      </p>
                    </div>
                  ) : (
                    <>
                      {isGameLoading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0a0a0a]">
                          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                          <p className="text-emerald-500 font-medium animate-pulse">Loading Game Assets...</p>
                        </div>
                      )}
                      <iframe
                        src={selectedGame.url}
                        className="w-full h-full border-none"
                        title={selectedGame.title}
                        allowFullScreen
                        allow="autoplay; fullscreen; pointer-lock"
                        onLoad={() => setIsGameLoading(false)}
                      />
                    </>
                  )}
                </div>

                {/* Trending Sidebar */}
                <div className="w-64 bg-white/5 border-l border-white/5 flex flex-col hidden lg:flex">
                  <div className="p-4 border-b border-white/5 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">Trending Now</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {games.filter(g => g.id !== selectedGame.id).map(game => (
                      <div 
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className="group cursor-pointer flex gap-3 items-center"
                      >
                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 relative">
                          <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                          {game.fixing && (
                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                              <span className="text-[6px] font-bold uppercase bg-red-600 px-1 rounded text-white">Fixing</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white/80 group-hover:text-emerald-400 truncate transition-colors">{game.title}</h4>
                          <p className="text-[10px] text-white/40 uppercase tracking-tighter">{game.category}</p>
                        </div>
                      </div>
                    ))}
                    {games.length <= 1 && (
                      <div className="text-center py-10">
                        <p className="text-[10px] text-white/20 uppercase">More games coming soon</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-white/5 flex items-center justify-between text-xs text-white/40">
                <div className="flex gap-4">
                  <span>Category: <span className="text-emerald-500">{selectedGame.category}</span></span>
                  <span>Status: <span className="text-emerald-500">Online</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Press F11 for Fullscreen</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-white/40 w-5 h-5" />
            </div>
            <span className="font-bold text-white/40">UNBLOCKED GAMES HUB</span>
          </div>
          <p className="text-white/20 text-sm">
            &copy; {new Date().getFullYear()} Unblocked Games Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-emerald-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
