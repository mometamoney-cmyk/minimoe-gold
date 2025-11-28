
import React, { useState, useEffect, useCallback, memo } from 'react';
import { CreditCard, Lock, Zap, Share2, Twitter, Copy, CheckCircle, ExternalLink, Coffee, Crown, Gift, Heart, Calendar, FileText, Sun, Ghost, Box, Hammer, Volume2, Activity, User, ArrowUp, ArrowDown, Globe, X, Flame } from 'lucide-react';

// Access the generator. We need to define it or import it. 
const AMZN_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || "";
const makeAmznLink = (kw: string) => `https://www.amazon.com/s?k=${encodeURIComponent(kw)}${AMZN_TAG ? `&tag=${AMZN_TAG}` : ''}`;

interface StatusSidebarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

// --- MONETIZATION: AFFILIATE LINKS ---
const SPONSORS = [
  { text: "SECURE_VPN: [NORD_LINK]", url: "https://nordvpn.com" }, 
  { text: "HARDWARE_WALLET: [LEDGER]", url: makeAmznLink("Ledger Nano X") }, 
  { text: "DEPLOY_INFRA: [VERCEL]", url: "https://vercel.com" }
];

// --- CROSS-PROMOTION: THE MOMETA NETWORK ---
const ECOSYSTEM = [
  { name: "MINI_MOE_POLITICS", url: null, status: "OFFLINE" },
  { name: "MINI_MOE_DATING", url: null, status: "OFFLINE" },
  { name: "MINI_MOE_BIOHACK", url: null, status: "OFFLINE" },
  { name: "MINI_MOE_CRIME", url: null, status: "OFFLINE" },
];

// --- FOMO ENGINE: DYNAMIC NETWORK ACTIVITY GENERATOR ---
const generateFomoEvent = () => {
    const users = ["Neo_77", "CyberWolf", "Trader_X", "Ghost_Pro", "Alice_99", "Dev_One", "Satoshi_V", "Viper", "ZeroCool", "Morpheus"];
    const actions = [
        { verb: "found", item: "Arbitrage Gap", amount: `$${Math.floor(Math.random() * 500) + 100}` },
        { verb: "booked", item: "Private Jet", amount: "Charter" },
        { verb: "purged", item: "Data Brokers", amount: `${Math.floor(Math.random() * 150)} Records` },
        { verb: "claimed", item: "Bank Bonus", amount: "$200" },
        { verb: "generated", item: "Startup Idea", amount: "Unicorn" },
        { verb: "secured", item: "Ledger Wallet", amount: "Cold Storage" },
        { verb: "wiped", item: "Digital Footprint", amount: "100%" },
        { verb: "initiated", item: "Omega Protocol", amount: "Legacy" },
        { verb: "won", item: "DraftKings Bet", amount: `$${Math.floor(Math.random() * 1000) + 100}` },
        { verb: "saved", item: "Flight Cost", amount: `$${Math.floor(Math.random() * 300) + 50}` },
        { verb: "mined", item: "Moe Coin", amount: "0.05 BTC" }
    ];
    
    const user = Math.random() > 0.5 
        ? users[Math.floor(Math.random() * users.length)] 
        : `0x${Math.random().toString(16).substr(2, 4).toUpperCase()}...${Math.random().toString(16).substr(2, 2).toUpperCase()}`;
    
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    return `[${user}] ${action.verb} ${action.item} (${action.amount})`;
};

const NetworkLog = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs([generateFomoEvent(), generateFomoEvent()]);
    const interval = setInterval(() => {
      const newEvent = generateFomoEvent();
      const time = new Date().toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLogs(prev => [`[${time}] ${newEvent}`, ...prev.slice(0, 5)]);
    }, 3500); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-terminal-green/50 bg-black p-3 font-mono shadow-[0_0_15px_rgba(0,255,0,0.15)]">
       <div className="flex items-center justify-between text-terminal-green border-b border-terminal-green/30 pb-2 mb-2">
          <div className="flex items-center gap-2 font-bold text-xs animate-pulse">
             <Activity size={14} /> LIVE_NETWORK_ACTIVITY
          </div>
          <div className="flex gap-1">
             <div className="w-2 h-2 bg-terminal-green rounded-full animate-ping"></div>
             <div className="w-2 h-2 bg-terminal-green rounded-full"></div>
          </div>
       </div>
       <div className="space-y-2 overflow-hidden flex flex-col">
          {logs.map((log, i) => (
             <div key={i} className={`truncate text-xs flex items-center gap-2 transition-all duration-500 ${i === 0 ? 'text-white font-bold animate-pulse' : 'text-terminal-dim opacity-70'}`}>
                <span className="text-[10px] text-terminal-darkGreen">➜</span> 
                {log}
             </div>
          ))}
       </div>
    </div>
  );
};

// --- HACKER RADIO (NATIVE HTML5 AUDIO) ---
// Using SomaFM DEF CON Radio (Cyberpunk/Hacker vibes)
// No iFrames, No YouTube blocks, No redirects.
const HackerRadio = memo(({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
      if (isOpen) {
          if (!audioRef.current) {
              audioRef.current = new Audio('https://ice1.somafm.com/defcon-128-mp3');
              audioRef.current.volume = 0.4;
          }
          audioRef.current.play().catch(e => console.log("Audio autoplay blocked", e));
      } else {
          if (audioRef.current) {
              audioRef.current.pause();
          }
      }
      return () => {
          // Cleanup on unmount if needed, but we want persistent audio usually. 
          // Here we pause if component unmounts to be safe.
          if (audioRef.current) audioRef.current.pause();
      }
  }, [isOpen]);

  return (
    <div className="border border-terminal-dim/30 bg-black">
      <div className="flex justify-between items-center p-2 bg-terminal-dim/10 border-b border-terminal-dim/30">
         <div className="text-xs text-terminal-dim flex items-center gap-1"><Volume2 size={10} /> DEFCON_RADIO_STREAM</div>
         <button onClick={toggle} className={`text-[10px] ${isOpen ? 'text-terminal-green animate-pulse' : 'text-terminal-dim'} hover:underline`}>
            {isOpen ? "[STOP_STREAM]" : "[INIT_STREAM]"}
         </button>
      </div>
      {isOpen && (
         <div className="p-2 flex items-center justify-center gap-2 text-xs text-terminal-green bg-black">
             <Activity size={12} className="animate-bounce" />
             <span>ENCRYPTED_AUDIO_CHANNEL_ACTIVE</span>
             <Activity size={12} className="animate-bounce" />
         </div>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen;
});

export const StatusSidebar: React.FC<StatusSidebarProps> = ({ apiKey, setApiKey, isMobile, onClose }) => {
  const [latency, setLatency] = useState(24);
  const [copied, setCopied] = useState(false);
  const [sponsorIdx, setSponsorIdx] = useState(0);
  const [flashDeal, setFlashDeal] = useState(false);
  
  const [referralId, setReferralId] = useState<string | null>(null);
  const [myAgentId, setMyAgentId] = useState<string>('');
  const [isAgentIdSet, setIsAgentIdSet] = useState(false);

  const [lootSpinning, setLootSpinning] = useState(false);
  const [lootClaimed, setLootClaimed] = useState(false);
  const [lootItem, setLootItem] = useState<{name: string, url: string} | null>(null);

  // IDLE MINER
  const [mineCount, setMineCount] = useState(0.00000000);
  const [mineRate, setMineRate] = useState(0.00000001);
  const [miningBoosted, setMiningBoosted] = useState(false);
  const [sessionStreak, setSessionStreak] = useState(1);

  // SEASONAL
  const [currentSeason, setCurrentSeason] = useState<{name: string, icon: any, color: string, subtext: string} | null>(null);

  // RADIO STATE
  const [radioOpen, setRadioOpen] = useState(false);

  const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "https://buy.stripe.com/test_placeholder";
  const DONATION_LINK = "https://buymeacoffee.com"; 

  const playBeep = (freq = 440, type: any = 'square') => {
      try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (!AudioContext) return;
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.1);
      } catch (e) { console.error("Audio error", e) }
  };

  useEffect(() => {
    const ref = localStorage.getItem('minimoe_referrer');
    if (ref) setReferralId(ref);

    const myId = localStorage.getItem('minimoe_agent_id');
    if (myId) {
      setMyAgentId(myId);
      setIsAgentIdSet(true);
    }

    const month = new Date().getMonth(); 
    // DE-SANTA PROTOCOL: FORCE GREEN/GOLD FOR HOLIDAYS
    if (month === 0) {
      setCurrentSeason({ name: "NEW_YEAR_PROTOCOL", icon: Calendar, color: "text-terminal-green", subtext: "RESOLUTIONS_OPTIMIZED" });
    } else if (month === 1) {
      setCurrentSeason({ name: "VALENTINE_MODE", icon: Heart, color: "text-terminal-gold", subtext: "DATING_ALGO_ONLINE" });
    } else if (month === 3) {
      setCurrentSeason({ name: "TAX_SEASON_ALERT", icon: FileText, color: "text-terminal-gold", subtext: "IRS_AUDIT_PREVENTION" });
    } else if (month === 6) {
      setCurrentSeason({ name: "SUMMER_SURGE", icon: Sun, color: "text-terminal-gold", subtext: "LIFESTYLE_OPTIMIZED" });
    } else if (month === 9) {
      setCurrentSeason({ name: "SPOOKY_SEASON", icon: Ghost, color: "text-orange-500", subtext: "TRICK_OR_ALPHA" });
    } else if (month === 10) {
      setCurrentSeason({ name: "CYBER_WEEK_DEAL", icon: Zap, color: "text-terminal-gold", subtext: "BLACK_FRIDAY_PRICE" });
    } else if (month === 11) {
      setCurrentSeason({ name: "HOLIDAY_GIFT_OS", icon: Gift, color: "text-terminal-gold", subtext: "XMAS_SHOPPING_SOLVED" });
    } else {
      setCurrentSeason({ name: "MINI_MOE_META_OS", icon: Crown, color: "text-terminal-green", subtext: "FINANCIAL_DOMINANCE" });
    }

    const interval = setInterval(() => {
      setLatency(prev => Math.max(10, Math.min(100, prev + (Math.random() * 20 - 10))));
    }, 2000);

    const adInterval = setInterval(() => {
      setSponsorIdx(prev => (prev + 1) % SPONSORS.length);
    }, 5000);

    const flashInterval = setInterval(() => {
      setFlashDeal(prev => !prev);
    }, 800);

    const miningInterval = setInterval(() => {
        setMineCount(prev => prev + mineRate);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(adInterval);
      clearInterval(flashInterval);
      clearInterval(miningInterval);
    };
  }, [mineRate]);

  const saveAgentId = () => {
    playBeep(880);
    if (!myAgentId.trim()) return;
    const cleanId = myAgentId.trim(); 
    setMyAgentId(cleanId);
    localStorage.setItem('minimoe_agent_id', cleanId);
    setIsAgentIdSet(true);
  };

  const handleLootSpin = () => {
      if (lootClaimed) return;
      playBeep(600);
      setLootSpinning(true);
      setTimeout(() => {
          setLootSpinning(false);
          setLootClaimed(true);
          playBeep(1200, 'triangle');
          const items = [
              { name: "RTX 4090 GPU", url: makeAmznLink("RTX 4090 Graphics Card") },
              { name: "Samsung Odyssey G9", url: makeAmznLink("Samsung Odyssey G9 Monitor") },
              { name: "Sony A7IV Camera", url: makeAmznLink("Sony A7IV Camera") }
          ];
          setLootItem(items[Math.floor(Math.random() * items.length)]);
      }, 1500);
  };

  const handleMiningBoost = () => {
      playBeep(200, 'sawtooth');
      window.open(makeAmznLink("RTX 4090 Gaming PC"), '_blank');
      setMiningBoosted(true);
      setMineRate(prev => prev * 5);
      setTimeout(() => {
          setMiningBoosted(false);
          setMineRate(0.00000001);
      }, 30000);
  };

  const handleShare = (platform: 'twitter' | 'copy') => {
    playBeep(440);
    const shareId = isAgentIdSet ? myAgentId : (localStorage.getItem('minimoe_agent_id') || 'anon');
    const url = `${window.location.origin}?ref=${shareId}`;
    const text = "Just optimized my workflow with MINI MOE META OS. 🚀 AI-powered CLI tools in the browser. #MINIMOE #AI #DevTools #Crypto";
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // MEMOIZED TOGGLE TO PREVENT PARENT RE-RENDERS FROM BREAKING RADIO
  const toggleRadio = useCallback(() => {
      setRadioOpen(prev => !prev);
  }, []);

  const finalPaymentLink = referralId 
    ? `${PAYMENT_LINK}?client_reference_id=${referralId}`
    : PAYMENT_LINK;

  const SeasonIcon = currentSeason ? currentSeason.icon : Crown;

  return (
    <div className={`w-full ${isMobile ? '' : 'md:w-80'} border-t md:border-t-0 md:border-l border-terminal-dim p-4 flex flex-col gap-6 bg-terminal-black/50 overflow-y-auto z-40 shadow-xl h-full pb-24 md:pb-4`}>
      
      {/* MOBILE HEADER FOR DRAWER */}
      {isMobile && (
          <div className="flex justify-between items-center pb-4 border-b border-terminal-dim mb-2">
              <span className="text-terminal-gold font-bold">SYSTEM_CONTROLS</span>
              <button onClick={onClose} className="text-terminal-alert"><X size={20}/></button>
          </div>
      )}

      <NetworkLog />

      <HackerRadio isOpen={radioOpen} toggle={toggleRadio} />

      <div className="border border-terminal-dim/50 bg-black p-4 relative shadow-lg">
          <div className="absolute -top-3 left-2 bg-terminal-black px-1 text-xs text-terminal-green border border-terminal-dim/50 flex items-center gap-1">
             <Hammer size={10} /> SYSTEM_MINER
          </div>
          <div className="flex justify-between items-end mb-2">
              <div className="text-[10px] text-terminal-dim">MOE_COIN_BALANCE:</div>
              <div className="text-lg font-mono text-terminal-gold animate-pulse font-bold">{mineCount.toFixed(8)}</div>
          </div>
          
          <div className="flex justify-between text-[10px] text-terminal-dim mb-1">
              <span>RATE: {miningBoosted ? "5x" : "1x"}</span>
              <span className="flex items-center gap-1 text-terminal-green"><Flame size={10}/> STREAK: {sessionStreak}</span>
          </div>

          <div className="w-full bg-terminal-dim/20 h-2 mb-3 rounded-full overflow-hidden">
              <div className={`h-full bg-terminal-gold ${miningBoosted ? 'w-full transition-all duration-300' : 'w-1/4'}`}></div>
          </div>
          <button 
             onClick={handleMiningBoost}
             disabled={miningBoosted}
             className={`w-full text-center text-xs font-bold py-2 uppercase tracking-widest ${miningBoosted ? 'bg-terminal-green text-black cursor-not-allowed' : 'bg-terminal-gold/20 text-terminal-gold border border-terminal-gold hover:bg-terminal-gold hover:text-black'}`}
          >
              {miningBoosted ? "GPU OVERCLOCKED (MAX SPEED)" : "⚡ OVERCLOCK GPU [BOOST]"}
          </button>
      </div>

      {!apiKey && currentSeason && (
        <a 
          href={finalPaymentLink}
          target="_blank" 
          rel="noopener noreferrer"
          className={`block border-2 border-dashed ${flashDeal ? 'border-terminal-gold text-terminal-gold scale-[1.02]' : `border-current ${currentSeason.color}`} p-3 text-center hover:bg-terminal-dim/10 transition-all cursor-pointer shadow-lg`}
          onClick={() => playBeep(600)}
        >
           <div className={`flex items-center justify-center gap-2 text-sm font-black animate-pulse ${currentSeason.color}`}>
              <SeasonIcon size={16} /> {currentSeason.name}
           </div>
           <div className="text-xs mt-1 font-mono text-terminal-dim">
              CYBER_RATE: $9/mo
              <br/>
              <span className="opacity-70 text-[10px] tracking-widest">{currentSeason.subtext}</span>
           </div>
        </a>
      )}

      <div className="border border-terminal-gold/50 bg-terminal-gold/5 p-4 relative">
         <div className="absolute -top-3 left-2 bg-terminal-black px-1 text-xs text-terminal-gold border border-terminal-gold/50">
           DAILY_SUPPLY_DROP
         </div>
         
         {!lootClaimed ? (
             <button 
                onClick={handleLootSpin}
                disabled={lootSpinning}
                className="w-full flex flex-col items-center justify-center gap-3 py-6 hover:bg-terminal-gold/10 transition-colors group"
             >
                <Box size={32} className={`text-terminal-gold ${lootSpinning ? 'animate-spin' : 'group-hover:animate-bounce'}`} />
                <span className="text-sm font-black text-terminal-gold tracking-widest">
                    {lootSpinning ? "DECRYPTING..." : "CLAIM DAILY LOOT"}
                </span>
                <span className="text-[10px] text-terminal-dim">Contains High-Value Tech</span>
             </button>
         ) : (
             <div className="flex flex-col items-center gap-2 py-2 animate-in fade-in zoom-in duration-300">
                 <div className="text-sm text-terminal-green font-bold">LEGENDARY ITEM FOUND!</div>
                 <div className="text-xs text-terminal-dim uppercase text-center font-bold">{lootItem?.name}</div>
                 <a 
                    href={lootItem?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-terminal-gold text-terminal-black text-xs font-bold px-4 py-2 hover:bg-white uppercase tracking-widest"
                 >
                     VIEW ITEM
                 </a>
             </div>
         )}
      </div>

      <div className={`border ${apiKey ? 'border-terminal-green/50 bg-terminal-green/5' : 'border-terminal-alert/50 bg-terminal-alert/5'} p-4 relative transition-colors duration-500`}>
        <div className="absolute -top-3 left-2 bg-terminal-black px-1 text-xs text-terminal-dim border border-terminal-dim/50">
          ACCOUNT_STATUS
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          {apiKey ? <Lock className="w-5 h-5 text-terminal-green" /> : <Lock className="w-5 h-5 text-terminal-alert" />}
          <div>
            <div className={`text-sm font-bold ${apiKey ? 'text-terminal-green' : 'text-terminal-alert'}`}>
              {apiKey ? (apiKey === process.env.MASTER_KEY ? 'OWNER_ACCESS' : 'PRO_ACCESS_GRANTED') : 'DEMO_MODE_LIMITED'}
            </div>
            <div className="text-xs opacity-60">{apiKey ? 'API Key Validated' : 'Premium Tools Locked'}</div>
          </div>
        </div>

        {!apiKey ? (
          <div className="space-y-3">
             <p className="text-[10px] text-terminal-dim">
               Unlock Hash, URL Safety, and High-Speed API access.
             </p>
             <a 
               href={finalPaymentLink}
               target="_blank" 
               rel="noopener noreferrer"
               className="block w-full text-center bg-terminal-green text-terminal-black text-xs font-bold py-2 hover:bg-terminal-dim transition-colors animate-pulse-fast uppercase"
               onClick={() => playBeep(500)}
             >
               UPGRADE TO PRO $9/mo
             </a>
             <div className="relative">
                <input 
                  type="password" 
                  placeholder="Paste API Key here..."
                  className="w-full bg-terminal-black border border-terminal-dim text-xs p-2 text-terminal-green focus:border-terminal-green outline-none"
                  onChange={(e) => setApiKey(e.target.value)}
                />
             </div>
          </div>
        ) : (
          <div className="text-[10px] text-terminal-dim flex flex-col gap-2">
            <div className="flex justify-between">
              <span>PLAN:</span> <span className="text-terminal-green">{apiKey === 'MY_SECRET_PASS' ? 'OWNER' : 'PRO'}</span>
            </div>
            <button 
              onClick={() => setApiKey('')}
              className="text-terminal-alert hover:underline text-left"
            >
              [DISCONNECT_KEY]
            </button>
          </div>
        )}
      </div>

      <div className="border border-terminal-dim p-4 relative">
        <div className="absolute -top-3 left-2 bg-terminal-black px-1 text-xs text-terminal-dim">
          AGENT_PROTOCOL
        </div>
        
        {!isAgentIdSet ? (
           <div className="space-y-2">
             <div className="text-xs text-terminal-dim">
               Enter <strong>Wallet Address</strong> or <strong>Handle</strong> to generate your referral link:
             </div>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 value={myAgentId}
                 onChange={(e) => setMyAgentId(e.target.value)}
                 placeholder="0x... OR user.eth"
                 className="flex-1 bg-terminal-black border border-terminal-dim text-xs p-1 text-terminal-green"
               />
               <button onClick={saveAgentId} className="bg-terminal-dim/20 p-1 border border-terminal-dim text-terminal-green hover:bg-terminal-green hover:text-terminal-black">
                 <Copy size={14} />
               </button>
             </div>
           </div>
        ) : (
           <div className="text-xs text-terminal-dim mb-3">
             <div className="flex justify-between items-center mb-2">
                <span>AGENT_ID:</span>
                <span className="text-terminal-green font-bold truncate max-w-[120px]">{myAgentId}</span>
             </div>
             <div className="bg-terminal-dim/10 p-2 border border-terminal-dim/30">
                 <div className="flex justify-between text-[10px] mb-1">
                     <span>COMMISSION:</span>
                     <span className="text-terminal-gold font-bold animate-pulse">30% RECURRING</span>
                 </div>
                 <div className="text-[10px] opacity-60">Payouts sent to this ID (if Wallet) monthly via Crypto.</div>
             </div>
           </div>
        )}

        <div className="grid grid-cols-2 gap-2 mt-2">
           <button 
             onClick={() => handleShare('twitter')}
             className="flex items-center justify-center gap-2 bg-terminal-dim/10 hover:bg-terminal-dim/30 py-2 border border-terminal-dim/30 transition-all text-xs text-terminal-green"
           >
             <Twitter size={14} /> POST
           </button>
           <button 
             onClick={() => handleShare('copy')}
             className="flex items-center justify-center gap-2 bg-terminal-dim/10 hover:bg-terminal-dim/30 py-2 border border-terminal-dim/30 transition-all text-xs text-terminal-green"
           >
             {copied ? <CheckCircle size={14} /> : <Copy size={14} />} {copied ? "COPIED" : "LINK"}
           </button>
        </div>
      </div>

      <div className="border border-terminal-dim p-3 relative opacity-90">
        <div className="absolute -top-3 left-2 bg-terminal-black px-1 text-xs text-terminal-dim">
          NETWORK_NODES
        </div>
        <div className="space-y-3 mt-1">
           <div className="flex justify-between items-center text-[10px] font-mono border-b border-terminal-gold/20 pb-2">
              <span className="flex items-center gap-2 text-terminal-gold font-bold">
                <Crown className="w-3 h-3 text-terminal-gold" />
                MOMETA_MONEY_HQ
              </span>
              <a href="https://www.metamoney.com" target="_blank" rel="noreferrer" className="text-terminal-gold hover:underline animate-pulse">
                [UPLINK]
              </a>
           </div>

          {ECOSYSTEM.map((node, i) => (
             <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                <span className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-terminal-dim" />
                  {node.name.replace('MINI_MOE_', '')}
                </span>
                {node.url ? (
                  <a href={node.url} target="_blank" rel="noreferrer" className="text-terminal-green hover:underline">
                    [CONNECT]
                  </a>
                ) : (
                  <span className="text-terminal-dim opacity-50">[OFFLINE]</span>
                )}
             </div>
          ))}
        </div>
      </div>

      {!apiKey && (
        <div className="border border-terminal-gold/30 bg-terminal-gold/5 p-3 relative">
           <div className="absolute -top-3 left-2 bg-terminal-black px-1 text-xs text-terminal-gold border border-terminal-gold/30">
            SPONSORED_UPLINK
          </div>
          <a href={SPONSORS[sponsorIdx].url} target="_blank" rel="noreferrer" className="flex items-center justify-between text-xs text-terminal-gold hover:text-white transition-colors">
            <span>{SPONSORS[sponsorIdx].text}</span>
            <ExternalLink size={10} />
          </a>
        </div>
      )}

      <div className="flex justify-center">
         <a href={DONATION_LINK} target="_blank" rel="noreferrer" className="text-xs text-terminal-dim flex items-center gap-2 hover:text-terminal-green transition-colors opacity-50 hover:opacity-100">
           <Coffee size={12} /> Buy Dev a Coffee
         </a>
      </div>

    </div>
  );
};
