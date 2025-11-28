
import React, { useRef, useEffect } from 'react';
import { ChatMessage, ToolResult, ToolType } from '../types';
import { Terminal, ShieldCheck, Activity, Key, Hash, Clock, Phone, Mail, TrendingUp, Share2, Twitter, Gift, ShoppingBag, ExternalLink, Flame, DollarSign, AlertTriangle, Landmark, Search, Rocket, Briefcase, GraduationCap, Repeat, Globe, CreditCard, Palette, Gauge, Building, Lock, Ghost, Trash2, FileSignature, AlertOctagon, HeartHandshake, Hourglass, Database, Split, Skull, HelpCircle, Eye, Fingerprint, Plane, Utensils, Train, Stethoscope, Briefcase as Luggage, Ticket, Dices, Heart, Scissors, MessageSquare, Video, Mic } from 'lucide-react';

interface ConsoleProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  holidayMode?: boolean;
}

const ToolIcon: React.FC<{ type: ToolType }> = ({ type }) => {
  switch (type) {
    case ToolType.PING: return <Activity className="w-4 h-4" />;
    case ToolType.UUID: return <Key className="w-4 h-4" />;
    case ToolType.TIMESTAMP: return <Clock className="w-4 h-4" />;
    case ToolType.HASH: return <Hash className="w-4 h-4" />;
    case ToolType.URL_SAFETY: return <ShieldCheck className="w-4 h-4" />;
    case ToolType.PHONE_NORMALIZE: return <Phone className="w-4 h-4" />;
    case ToolType.EMAIL_NORMALIZE: return <Mail className="w-4 h-4" />;
    case ToolType.MARKET_SENTIMENT: return <TrendingUp className="w-4 h-4 text-terminal-gold" />;
    case ToolType.GIFT_ANALYSIS: return <Gift className="w-4 h-4 text-red-500" />;
    case ToolType.TREND_SCANNER: return <Flame className="w-4 h-4 text-orange-500" />;
    case ToolType.COMPOUND_CALCULATOR: return <Landmark className="w-4 h-4 text-terminal-gold" />;
    case ToolType.PRICE_CHECK: return <Search className="w-4 h-4 text-terminal-green" />;
    case ToolType.STARTUP_GEN: return <Rocket className="w-4 h-4 text-blue-400" />;
    case ToolType.HIRE_TALENT: return <Briefcase className="w-4 h-4 text-purple-400" />;
    case ToolType.LEARN_SKILL: return <GraduationCap className="w-4 h-4 text-yellow-400" />;
    case ToolType.ARBITRAGE_SCAN: return <Repeat className="w-4 h-4 text-emerald-400" />;
    case ToolType.DOMAIN_SNIPER: return <Globe className="w-4 h-4 text-cyan-400" />;
    case ToolType.CREDIT_HACK: return <CreditCard className="w-4 h-4 text-slate-300" />;
    case ToolType.CORP_ARCHITECT: return <Building className="w-4 h-4 text-indigo-400" />;
    case ToolType.IDENTITY_SHIELD: return <Ghost className="w-4 h-4 text-slate-500" />;
    case ToolType.DATA_PURGE: return <Trash2 className="w-4 h-4 text-red-600" />;
    case ToolType.DUST_ANALYSIS: return <Fingerprint className="w-4 h-4 text-terminal-alert" />;
    case ToolType.BILL_NEGOTIATOR: return <FileSignature className="w-4 h-4 text-teal-400" />;
    case ToolType.CLAIM_RECOVERY: return <AlertOctagon className="w-4 h-4 text-rose-400" />;
    case ToolType.DEBT_DESTROYER: return <HeartHandshake className="w-4 h-4 text-green-300" />;
    case ToolType.LEGACY_TIME_CAPSULE: return <Skull className="w-4 h-4 text-terminal-alert" />;
    case ToolType.KEY_SPLIT: return <Split className="w-4 h-4 text-orange-400" />;
    case ToolType.SUPPORT_HELPDESK: return <HelpCircle className="w-4 h-4 text-white" />;
    case ToolType.TRAVEL_AGENT: return <Plane className="w-4 h-4 text-sky-400" />;
    case ToolType.NUTRITION_SCAN: return <Utensils className="w-4 h-4 text-lime-400" />;
    case ToolType.TRANSPORT_COMMAND: return <Train className="w-4 h-4 text-sky-500" />;
    case ToolType.BIO_HACK_PRO: return <Stethoscope className="w-4 h-4 text-rose-300" />;
    case ToolType.EVENT_SCOUT: return <Ticket className="w-4 h-4 text-fuchsia-400" />;
    case ToolType.CASINO_ROYALE: return <Dices className="w-4 h-4 text-emerald-500" />;
    case ToolType.COMPANION_MATCH: return <MessageSquare className="w-4 h-4 text-pink-400" />;
    case ToolType.AESTHETIC_ARCHITECT: return <Scissors className="w-4 h-4 text-cyan-200" />;
    case ToolType.VIRAL_CONTENT_GEN: return <Video className="w-4 h-4 text-terminal-gold" />;
    default: return <Terminal className="w-4 h-4" />;
  }
};

const ResultDisplay: React.FC<{ result: ToolResult }> = ({ result }) => {
  
  const TRADING_LINK = process.env.NEXT_PUBLIC_TRADING_LINK || "https://www.coinbase.com/join";

  const handleShareResult = (platform: 'twitter' | 'reddit' | 'telegram') => {
    let text = "";
    if (result.tool === ToolType.MARKET_SENTIMENT) {
      const data = result.result as any;
      text = `🤖 AI Analysis for $${data.asset}: ${data.sentiment} (Score: ${data.score}). Detected via MINI MOE META.`;
    } else if (result.tool === ToolType.GIFT_ANALYSIS) {
      text = `🎁 AI Gift Ideas generated via MINI MOE META. Holiday Shopping = Solved.`;
    } else if (result.tool === ToolType.TREND_SCANNER) {
      text = `🔥 Viral Dropshipping Trends detected via MINI MOE META.`;
    } else if (result.tool === ToolType.COMPOUND_CALCULATOR) {
      text = `💰 Just projected my crypto wealth on MINI MOE META. The compounding is real.`;
    } else if (result.tool === ToolType.STARTUP_GEN) {
      text = `🚀 Just generated a Million Dollar Startup Idea on MINI MOE META. Building the future.`;
    } else if (result.tool === ToolType.CORP_ARCHITECT) {
      text = `🏛️ Just Incorporated my new venture on MINI MOE META. Sovereign Individual mode activated.`;
    } else if (result.tool === ToolType.IDENTITY_SHIELD) {
      text = `👻 Just activated GHOST MODE on MINI MOE META. Privacy Stack Deployed.`;
    } else if (result.tool === ToolType.DATA_PURGE) {
      text = `🚫 Just purged my digital footprint on MINI MOE META. Data Brokers: 0. Me: 1.`;
    } else if (result.tool === ToolType.DUST_ANALYSIS) {
      text = `☣️ Just scanned my Digital Dust Exposure on MINI MOE META. Time to cloak.`;
    } else if (result.tool === ToolType.LEGACY_TIME_CAPSULE) {
      text = `⏳ OMEGA PROTOCOL Active on MINI MOE META. Legacy Secured.`;
    } else if (result.tool === ToolType.KEY_SPLIT) {
      text = `🔐 Just fragmented my encryption keys on MINI MOE META. Shamir's Secret Protocol active.`;
    } else if (result.tool === ToolType.TRAVEL_AGENT) {
      text = `✈️ Just hacked my travel itinerary on MINI MOE META. Global access unlocked.`;
    } else if (result.tool === ToolType.NUTRITION_SCAN) {
      text = `🥗 Biohacking my nutrition with MINI MOE META. Performance optimized.`;
    } else if (result.tool === ToolType.TRANSPORT_COMMAND) {
      text = `🚄 Logistics Optimized via MINI MOE META. Moving through the matrix.`;
    } else if (result.tool === ToolType.BIO_HACK_PRO) {
      text = `🧬 Health Protocol Initiated via MINI MOE META. Optimizing biology.`;
    } else if (result.tool === ToolType.EVENT_SCOUT) {
      text = `🎟️ Secured event tickets via MINI MOE META. Front row access.`;
    } else if (result.tool === ToolType.CASINO_ROYALE) {
      text = `🎲 High stakes protocol detected via MINI MOE META. Placing wagers.`;
    } else if (result.tool === ToolType.COMPANION_MATCH) {
      text = `❤️ Virtual Assistant matched via MINI MOE META. Digital companionship enabled.`;
    } else if (result.tool === ToolType.AESTHETIC_ARCHITECT) {
      text = `✨ Aesthetic plan generated via MINI MOE META. Sculpting the future self.`;
    } else if (result.tool === ToolType.VIRAL_CONTENT_GEN) {
      text = `🎥 Viral Script generated via MINI MOE META. Content Creation Automated.`;
    } else {
      text = `Just executed ${result.tool.toUpperCase()} on MINI MOE META. AI-Powered CLI in the browser.`;
    }
    const url = window.location.href;
    
    if (platform === 'twitter') {
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(tweetUrl, '_blank');
    } else if (platform === 'reddit') {
        const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        window.open(redditUrl, '_blank');
    } else if (platform === 'telegram') {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        window.open(telegramUrl, '_blank');
    }
  };

  const isHoliday = result.tool === ToolType.GIFT_ANALYSIS;
  const isTrend = result.tool === ToolType.TREND_SCANNER;
  const isFinance = result.tool === ToolType.MARKET_SENTIMENT;
  const isWealth = result.tool === ToolType.COMPOUND_CALCULATOR;
  const isPrice = result.tool === ToolType.PRICE_CHECK;
  const isStartup = result.tool === ToolType.STARTUP_GEN;
  const isHire = result.tool === ToolType.HIRE_TALENT;
  const isLearn = result.tool === ToolType.LEARN_SKILL;
  const isArbitrage = result.tool === ToolType.ARBITRAGE_SCAN;
  const isDomain = result.tool === ToolType.DOMAIN_SNIPER;
  const isCredit = result.tool === ToolType.CREDIT_HACK;
  const isCorp = result.tool === ToolType.CORP_ARCHITECT;
  const isIdentity = result.tool === ToolType.IDENTITY_SHIELD;
  const isPurge = result.tool === ToolType.DATA_PURGE;
  const isDust = result.tool === ToolType.DUST_ANALYSIS;
  const isBill = result.tool === ToolType.BILL_NEGOTIATOR;
  const isClaim = result.tool === ToolType.CLAIM_RECOVERY;
  const isDebt = result.tool === ToolType.DEBT_DESTROYER;
  const isLegacy = result.tool === ToolType.LEGACY_TIME_CAPSULE;
  const isKey = result.tool === ToolType.KEY_SPLIT;
  const isSupport = result.tool === ToolType.SUPPORT_HELPDESK;
  const isTravel = result.tool === ToolType.TRAVEL_AGENT;
  const isNutrition = result.tool === ToolType.NUTRITION_SCAN;
  const isTransport = result.tool === ToolType.TRANSPORT_COMMAND;
  const isBio = result.tool === ToolType.BIO_HACK_PRO;
  const isEvent = result.tool === ToolType.EVENT_SCOUT;
  const isCasino = result.tool === ToolType.CASINO_ROYALE;
  const isCompanion = result.tool === ToolType.COMPANION_MATCH;
  const isAesthetic = result.tool === ToolType.AESTHETIC_ARCHITECT;
  const isViral = result.tool === ToolType.VIRAL_CONTENT_GEN;
  
  const isGiftResult = isHoliday && result.result && typeof result.result === 'object' && 'recommendations' in result.result;
  const isTrendResult = isTrend && result.result && typeof result.result === 'object' && 'trends' in result.result;
  const isWealthResult = isWealth && result.result && typeof result.result === 'object' && 'future_value' in result.result;
  const isPriceResult = isPrice && result.result && typeof result.result === 'object' && 'url' in result.result;
  const isStartupResult = isStartup && result.result && typeof result.result === 'object' && 'status' in result.result;
  const isHireResult = isHire && result.result && typeof result.result === 'object' && 'candidates' in result.result;
  const isLearnResult = isLearn && result.result && typeof result.result === 'object' && 'curriculum' in result.result;
  const isArbitrageResult = isArbitrage && result.result && typeof result.result === 'object' && 'profit_gap' in result.result;
  const isDomainResult = isDomain && result.result && typeof result.result === 'object' && 'premium_pick' in result.result;
  const isCreditResult = isCredit && result.result && typeof result.result === 'object' && 'bonus' in result.result;
  const isCorpResult = isCorp && result.result && typeof result.result === 'object' && 'entity_name' in result.result;
  const isIdentityResult = isIdentity && result.result && typeof result.result === 'object' && 'components' in result.result;
  const isPurgeResult = isPurge && result.result && typeof result.result === 'object' && 'records_found' in result.result;
  const isDustResult = isDust && result.result && typeof result.result === 'object' && 'ip_address' in result.result;
  const isBillResult = isBill && result.result && typeof result.result === 'object' && 'potential_savings' in result.result;
  const isClaimResult = isClaim && result.result && typeof result.result === 'object' && 'est_compensation' in result.result;
  const isDebtResult = isDebt && result.result && typeof result.result === 'object' && 'est_reduction' in result.result;
  const isLegacyResult = isLegacy && result.result && typeof result.result === 'object' && 'protocols' in result.result;
  const isKeyResult = isKey && result.result && typeof result.result === 'object' && 'shards' in result.result;
  const isSupportResult = isSupport && result.result && typeof result.result === 'object' && 'ticket_id' in result.result;
  const isTravelResult = isTravel && result.result && typeof result.result === 'object' && 'deals_found' in result.result;
  const isNutritionResult = isNutrition && result.result && typeof result.result === 'object' && 'plan' in result.result;
  const isTransportResult = isTransport && result.result && typeof result.result === 'object' && 'options' in result.result;
  const isBioResult = isBio && result.result && typeof result.result === 'object' && 'modules' in result.result;
  const isEventResult = isEvent && result.result && typeof result.result === 'object' && 'event' in result.result;
  const isCasinoResult = isCasino && result.result && typeof result.result === 'object' && 'platform' in result.result;
  const isCompanionResult = isCompanion && result.result && typeof result.result === 'object' && 'personality' in result.result;
  const isAestheticResult = isAesthetic && result.result && typeof result.result === 'object' && 'surgeons' in result.result;
  const isViralResult = isViral && result.result && typeof result.result === 'object' && 'hashtags' in result.result;

  const upsell = (result.result as any)?.upsell;

  return (
    <div className={`mt-2 mb-4 ml-2 md:ml-4 p-2 border font-mono text-sm rounded shadow-[0_0_10px_rgba(0,255,0,0.1)] ${
       isLegacy ? 'border-terminal-alert/50 bg-terminal-alert/10' : 
       isFinance || isWealth || isKey || isViral ? 'border-terminal-gold/50 bg-terminal-gold/5' : 
       isHoliday || isCompanion ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isTrend ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isPrice ? 'border-terminal-green/50 bg-terminal-green/10' :
       isStartup ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isHire ? 'border-terminal-green/50 bg-terminal-green/10' :
       isLearn ? 'border-terminal-green/50 bg-terminal-green/10' :
       isArbitrage ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isDomain ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isCredit ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isCorp ? 'border-terminal-gold/50 bg-terminal-gold/10' :
       isIdentity ? 'border-terminal-alert/50 bg-terminal-alert/10' :
       isPurge ? 'border-terminal-alert/50 bg-terminal-alert/20' :
       isDust ? 'border-terminal-alert/50 bg-terminal-alert/10' :
       isBill || isClaim || isDebt ? 'border-terminal-green/50 bg-terminal-green/20' :
       isSupport ? 'border-terminal-green/50 bg-terminal-green/10' :
       isTravel || isTransport ? 'border-terminal-green/50 bg-terminal-green/20' :
       isNutrition || isBio ? 'border-terminal-green/50 bg-terminal-green/20' :
       isEvent ? 'border-terminal-green/50 bg-terminal-green/20' :
       isCasino ? 'border-terminal-gold/50 bg-terminal-gold/20' :
       isAesthetic ? 'border-terminal-green/50 bg-terminal-green/20' :
       'border-terminal-dim bg-terminal-darkGreen/30'
    }`}>
      <div className={`flex items-center gap-2 mb-2 border-b pb-1 ${
          isLegacy ? 'text-terminal-alert border-terminal-alert/30' :
          isHoliday || isCompanion ? 'text-terminal-gold border-terminal-gold/30' : 
          isTrend ? 'text-terminal-gold border-terminal-gold/30' :
          isFinance || isWealth || isKey || isViral ? 'text-terminal-gold border-terminal-gold/30' :
          isStartup ? 'text-terminal-gold border-terminal-gold/30' :
          isHire ? 'text-terminal-green border-terminal-green/30' :
          isLearn ? 'text-terminal-green border-terminal-green/30' :
          isArbitrage ? 'text-terminal-gold border-terminal-gold/30' :
          isDomain ? 'text-terminal-gold border-terminal-gold/30' :
          isCredit ? 'text-terminal-gold border-terminal-gold/30' :
          isCorp ? 'text-terminal-gold border-terminal-gold/30' :
          isIdentity ? 'text-terminal-alert border-terminal-alert/30' :
          isPurge ? 'text-terminal-alert border-terminal-alert/30' :
          isDust ? 'text-terminal-alert border-terminal-alert/30' :
          isBill || isClaim || isDebt ? 'text-terminal-green border-terminal-green/30' :
          isSupport ? 'text-terminal-green border-terminal-green/30' :
          isTravel || isTransport ? 'text-terminal-green border-terminal-green/30' :
          isNutrition || isBio ? 'text-terminal-green border-terminal-green/30' :
          isEvent ? 'text-terminal-green border-terminal-green/30' :
          isCasino ? 'text-terminal-gold border-terminal-gold/30' :
          isAesthetic ? 'text-terminal-green border-terminal-green/30' :
          'text-terminal-dim border-terminal-dim'
      }`}>
        <ToolIcon type={result.tool} />
        <span className="uppercase tracking-wider text-xs">EXEC: {result.tool}</span>
        <span className="ml-auto text-xs opacity-50">{new Date(result.timestamp).toLocaleTimeString()}</span>
      </div>
      <div className="overflow-x-auto relative">
        {result.originalValue && (
            <div className="mb-1 text-xs opacity-70">Input: "{result.originalValue}"</div>
        )}

        {upsell && (
            <div className="mb-3 p-2 bg-terminal-alert/10 border border-terminal-alert/50 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2 text-terminal-alert">
                    <AlertTriangle size={14} />
                    <span className="text-[10px] font-bold">{upsell.message}</span>
                </div>
                <a 
                   href={upsell.url} 
                   target="_blank" 
                   rel="noreferrer"
                   className="text-[10px] bg-terminal-alert text-black px-2 py-0.5 font-bold hover:bg-red-400"
                >
                    FIX NOW
                </a>
            </div>
        )}

        {isGiftResult ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                {(result.result as any).recommendations.map((item: any, i: number) => (
                    <div key={i} className="border border-terminal-gold/30 bg-black/50 p-3 flex flex-col gap-2 hover:bg-terminal-gold/20 transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="text-terminal-gold font-bold text-xs">{item.item}</span>
                            <span className="text-terminal-green text-xs">{item.price}</span>
                        </div>
                        <div className="text-[10px] text-terminal-gold/70 uppercase">{item.category}</div>
                        <div className="h-[1px] bg-terminal-gold/20 my-1"></div>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="text-[9px] text-terminal-gold">MATCH: {item.affinity}</span>
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="bg-terminal-gold hover:bg-white text-black text-[10px] px-2 py-1 flex items-center gap-1 font-bold"
                            >
                                BUY NOW <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        ) : isTrendResult ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
                {(result.result as any).trends.map((item: any, i: number) => (
                    <div key={i} className="border border-terminal-gold/30 bg-black/50 p-3 flex flex-col gap-2 hover:bg-terminal-gold/20 transition-colors">
                        <div className="flex justify-between items-start">
                            <span className="text-terminal-gold font-bold text-xs">{item.item}</span>
                            <span className="text-terminal-green text-xs"><Flame size={10} className="inline" /> {item.heat}</span>
                        </div>
                        <div className="text-[10px] text-terminal-gold/70 uppercase">Potential: {item.profit_margin}</div>
                        <div className="h-[1px] bg-terminal-gold/20 my-1"></div>
                        <div className="grid grid-cols-1 gap-1">
                            <a 
                                href={item.tiktok}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full text-center bg-black border border-terminal-gold/50 text-terminal-gold hover:bg-terminal-gold hover:text-black text-[10px] px-2 py-1 font-bold flex items-center justify-center gap-1"
                            >
                                VERIFY ON TIKTOK
                            </a>
                            <a 
                                href={item.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full text-center bg-terminal-gold hover:bg-white text-black text-[10px] px-2 py-1 font-bold"
                            >
                                SOURCE ON AMAZON
                            </a>
                            {/* DOUBLE DIP: WHOLESALE */}
                            <a 
                                href={(result.result as any).wholesale_link.url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full text-center border border-terminal-gold text-terminal-gold hover:bg-terminal-gold/20 text-[10px] px-2 py-1 font-bold"
                            >
                                {(result.result as any).wholesale_link.label}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        ) : isWealthResult ? (
            <div className="p-4 bg-terminal-gold/5 border border-terminal-gold/30 flex flex-col items-center text-center gap-2">
                <div className="text-xs text-terminal-gold/70 uppercase">Projected Wealth ({ (result.result as any).years })</div>
                <div className="text-3xl font-bold text-terminal-gold animate-pulse">{(result.result as any).future_value}</div>
                <div className="text-xs text-terminal-green">Total Gain: {(result.result as any).gain}</div>
                <div className="w-full h-[1px] bg-terminal-gold/20 my-2"></div>
                <a 
                    href={(result.result as any).url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-terminal-gold hover:bg-white text-black font-bold text-xs px-4 py-2 uppercase tracking-widest transition-all"
                >
                    START COMPOUNDING NOW
                </a>
            </div>
        ) : isPriceResult ? (
            <div className="p-2 flex justify-between items-center bg-terminal-green/10 border border-terminal-green/30">
               <div className="text-xs text-terminal-dim">
                  Searching Global Database for: <span className="text-white">"{(result.result as any).query}"</span>
               </div>
               <a 
                  href={(result.result as any).url}
                  target="_blank"
                  rel="noreferrer" 
                  className="bg-terminal-green text-black font-bold text-xs px-3 py-1 hover:bg-white transition-colors"
                >
                   VIEW PRICE
                </a>
            </div>
        ) : isStartupResult ? (
            <div className="p-4 bg-terminal-gold/10 border border-terminal-gold/30 flex flex-col gap-2">
               <div className="text-xs text-terminal-gold/70 uppercase">GENERATED BUSINESS BLUEPRINT</div>
               <div className="text-2xl font-bold text-terminal-gold">{(result.result as any).name}</div>
               <div className="grid grid-cols-2 gap-2 text-xs text-terminal-gold/80">
                  <div>NICHE: <span className="text-white">{(result.result as any).niche}</span></div>
                  <div>MODEL: <span className="text-white">{(result.result as any).model}</span></div>
                  <div>STACK: <span className="text-white">{(result.result as any).stack}</span></div>
                  <div>STATUS: <span className="text-terminal-green">{(result.result as any).status}</span></div>
               </div>
               <div className="w-full h-[1px] bg-terminal-gold/20 my-2"></div>
               <a 
                   href={(result.result as any).url}
                   target="_blank"
                   rel="noreferrer" 
                   className="bg-terminal-gold hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest"
               >
                   CLAIM DOMAIN & HOSTING
               </a>
            </div>
        ) : isHireResult ? (
            <div className="p-3 bg-terminal-green/10 border border-terminal-green/30 flex justify-between items-center gap-2">
               <div>
                  <div className="text-xs text-terminal-green">Searching Role: <strong className="text-white">{(result.result as any).role}</strong></div>
                  <div className="text-[10px] text-terminal-green/70">Found: {(result.result as any).candidates} Candidates</div>
               </div>
               <div className="flex gap-1">
                   <a 
                      href={(result.result as any).url}
                      target="_blank"
                      rel="noreferrer" 
                      className="bg-terminal-green hover:bg-white text-black font-bold text-xs px-3 py-1 uppercase"
                   >
                      FIND TALENT
                   </a>
                   {/* DOUBLE DIP: PROJECT MGMT */}
                   <a 
                      href={(result.result as any).project_mgmt.url}
                      target="_blank"
                      rel="noreferrer" 
                      className="border border-terminal-green text-terminal-green hover:bg-terminal-green/20 text-[10px] px-2 py-1 uppercase flex items-center"
                   >
                      {(result.result as any).project_mgmt.label}
                   </a>
               </div>
            </div>
        ) : isLearnResult ? (
            <div className="p-3 bg-terminal-green/10 border border-terminal-green/30 flex flex-col gap-2">
               <div className="flex justify-between items-center">
                  <span className="text-xs text-terminal-green">Skill Target: <strong className="text-white">{(result.result as any).skill}</strong></span>
                  <span className="text-[10px] bg-terminal-green/20 text-terminal-green px-1 rounded">{(result.result as any).duration}</span>
               </div>
               <ul className="list-disc list-inside text-[10px] text-terminal-green/70">
                  {(result.result as any).curriculum.map((c: string, i: number) => <li key={i}>{c}</li>)}
               </ul>
               <a 
                  href={(result.result as any).url}
                  target="_blank"
                  rel="noreferrer" 
                  className="mt-1 text-center bg-terminal-green hover:bg-white text-black font-bold text-xs px-3 py-1 uppercase"
               >
                  START COURSE (UDEMY)
               </a>
            </div>
        ) : isArbitrageResult ? (
            <div className="p-3 bg-terminal-gold/10 border border-terminal-gold/30 flex flex-col gap-2">
               <div className="flex justify-between items-center text-xs">
                   <span className="text-terminal-gold">OPPORTUNITY: {(result.result as any).target}</span>
                   <span className="text-terminal-green font-bold animate-pulse">GAP: {(result.result as any).profit_gap}</span>
               </div>
               <div className="flex gap-2">
                   <div className="flex-1 bg-black/50 p-2 border border-terminal-gold/20 text-[10px]">
                       <div className="text-terminal-gold">SOURCE ({ (result.result as any).source })</div>
                       <div className="text-lg font-bold">{(result.result as any).buy_price}</div>
                       <a href={(result.result as any).source_url} target="_blank" rel="noreferrer" className="block text-center bg-terminal-gold/80 text-black mt-1 hover:bg-white">ACQUIRE</a>
                   </div>
                   <div className="flex items-center justify-center">
                       <Repeat className="text-terminal-green" />
                   </div>
                   <div className="flex-1 bg-black/50 p-2 border border-terminal-gold/20 text-[10px]">
                       <div className="text-terminal-gold">MARKET ({ (result.result as any).market })</div>
                       <div className="text-lg font-bold">{(result.result as any).sell_price}</div>
                       <a href={(result.result as any).market_url} target="_blank" rel="noreferrer" className="block text-center bg-terminal-gold text-black mt-1 hover:bg-white">VERIFY</a>
                   </div>
               </div>
            </div>
        ) : isDomainResult ? (
            <div className="p-4 bg-terminal-gold/10 border border-terminal-gold/30 flex flex-col gap-2 font-mono">
               <div className="flex items-center gap-2 text-terminal-gold text-xs border-b border-terminal-gold/20 pb-1">
                   <Globe size={12} /> DIGITAL_REAL_ESTATE_SCAN
               </div>
               <div className="flex justify-between items-center">
                   <span className="text-xl font-bold text-white">{(result.result as any).premium_pick}</span>
                   <span className="text-xs bg-terminal-green text-black px-1 font-bold">AVAILABLE</span>
               </div>
               <div className="text-xs text-terminal-gold/70">Est. Resale Value: <span className="text-white">{(result.result as any).est_value}</span></div>
               <div className="grid grid-cols-2 gap-2 mt-2">
                    <a 
                        href={(result.result as any).url}
                        target="_blank"
                        rel="noreferrer" 
                        className="bg-terminal-gold hover:bg-white text-black font-bold text-xs px-2 py-2 text-center uppercase tracking-widest"
                    >
                        REGISTER ASSET
                    </a>
                    {/* DOUBLE DIP: LOGO UPSELL */}
                    <a 
                        href={(result.result as any).brand_upsell.url}
                        target="_blank"
                        rel="noreferrer" 
                        className="bg-black border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black font-bold text-xs px-2 py-2 text-center uppercase flex items-center justify-center gap-1"
                    >
                        <Palette size={12} /> {(result.result as any).brand_upsell.label}
                    </a>
               </div>
            </div>
        ) : isCreditResult ? (
            <div className="p-4 bg-gradient-to-br from-terminal-black to-black border border-terminal-gold/50 rounded-lg flex flex-col gap-2 shadow-lg">
               <div className="flex justify-between items-start">
                   <div className="text-xs text-terminal-gold uppercase tracking-widest">Platinum Status</div>
                   <CreditCard className="text-terminal-gold" size={20} />
               </div>
               <div className="text-lg font-bold text-white mt-2 font-mono">{(result.result as any).card.replace(/_/g, ' ')}</div>
               <div className="text-xs text-terminal-dim">
                   BONUS: <span className="text-terminal-green font-bold">{(result.result as any).bonus}</span>
               </div>
               <div className="mt-4 flex gap-2">
                   <a 
                      href={(result.result as any).url}
                      target="_blank"
                      rel="noreferrer" 
                      className="flex-1 text-center bg-terminal-gold hover:bg-white text-black font-bold text-xs px-2 py-2 uppercase rounded-sm"
                   >
                      APPLY NOW
                   </a>
                   {/* DOUBLE DIP: SCORE CHECK */}
                   <a 
                      href={(result.result as any).score_check.url}
                      target="_blank"
                      rel="noreferrer" 
                      className="flex-1 text-center bg-terminal-gold/10 hover:bg-terminal-gold/30 border border-terminal-gold text-terminal-gold font-bold text-xs px-2 py-2 uppercase rounded-sm flex items-center justify-center gap-1"
                   >
                      <Gauge size={12} /> {(result.result as any).score_check.label}
                   </a>
               </div>
            </div>
        ) : isCorpResult ? (
            <div className="p-4 bg-terminal-gold/10 border border-terminal-gold/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(255,215,0,0.2)]">
               <div className="flex items-center gap-2 text-terminal-gold text-xs border-b border-terminal-gold/20 pb-1">
                   <Building size={12} /> SOVEREIGNTY_ENGINE
               </div>
               <div className="text-xl font-bold text-white">{(result.result as any).entity_name}</div>
               <div className="grid grid-cols-2 gap-2 text-xs text-terminal-gold/80">
                   <div>TYPE: <span className="text-white">{(result.result as any).structure}</span></div>
                   <div>TAX: <span className="text-white">{(result.result as any).tax_benefit}</span></div>
               </div>
               <div className="mt-2 space-y-2">
                   <a 
                       href={(result.result as any).url}
                       target="_blank"
                       rel="noreferrer" 
                       className="block bg-terminal-gold hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest"
                   >
                       INCORPORATE ENTITY [LEGAL]
                   </a>
                   {/* DOUBLE DIP: BUSINESS BANK */}
                   <a 
                       href={(result.result as any).bank_upsell.url}
                       target="_blank"
                       rel="noreferrer" 
                       className="block bg-black border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black font-bold text-xs px-4 py-2 text-center uppercase"
                   >
                       {(result.result as any).bank_upsell.label}
                   </a>
               </div>
            </div>
        ) : isIdentityResult ? (
            <div className="p-4 bg-black/80 border border-terminal-alert/50 flex flex-col gap-2 relative">
                <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-terminal-alert animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-terminal-alert"></div> TOP SECRET
                </div>
                <div className="text-xs text-terminal-alert uppercase flex items-center gap-2">
                    <Ghost size={12} /> GHOST_PROTOCOL_ACTIVE
                </div>
                <div className="text-sm text-white">Anonymity Score: <span className="text-terminal-green">{(result.result as any).anonymity_score}</span></div>
                <div className="mt-2 space-y-2">
                    {(result.result as any).components.map((c: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs border-b border-terminal-alert/30 pb-1">
                            <span className="text-terminal-alert/70">{c.item}</span>
                            <a href={c.url} target="_blank" rel="noreferrer" className="text-terminal-green hover:underline">[{c.action}]</a>
                        </div>
                    ))}
                </div>
            </div>
        ) : isPurgeResult ? (
            <div className="p-4 bg-terminal-alert/10 border border-terminal-alert/50 flex flex-col gap-2 font-mono relative overflow-hidden">
                {/* REDACTED LINES EFFECT */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-20 pointer-events-none"></div>
                
                <div className="flex items-center gap-2 text-terminal-alert text-xs border-b border-terminal-alert/30 pb-2 mb-1">
                    <Trash2 size={12} /> DATA_PURGE_PROTOCOL // CLASSIFIED
                </div>
                
                <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-terminal-alert">
                        <span>TARGET:</span>
                        <span className="bg-black text-terminal-alert px-1 font-bold">{(result.result as any).target}</span>
                    </div>
                    <div className="flex justify-between text-terminal-alert">
                        <span>SCAN_DEPTH:</span>
                        <span className="text-terminal-dim">{(result.result as any).scan_depth}</span>
                    </div>
                    <div className="flex justify-between text-terminal-alert">
                        <span>THREAT_LEVEL:</span>
                        <span className="text-red-500 font-bold animate-pulse">{(result.result as any).risk_level}</span>
                    </div>
                </div>

                <div className="bg-black/50 p-2 border border-terminal-alert/20 text-[10px] text-red-400 font-bold text-center my-2">
                    ⚠️ {(result.result as any).records_found}
                </div>

                <a 
                    href={(result.result as any).url}
                    target="_blank" 
                    rel="noreferrer"
                    className="block bg-terminal-alert hover:bg-red-500 text-black font-bold text-xs px-4 py-3 text-center uppercase tracking-widest border border-red-400 shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                >
                    EXECUTE TAKEDOWN REQUEST [DELETE ALL]
                </a>
            </div>
        ) : isDustResult ? (
            <div className="p-4 bg-terminal-alert/10 border border-terminal-alert/50 flex flex-col gap-2 relative">
                <div className="absolute top-2 right-2 text-terminal-alert animate-pulse">
                     <AlertTriangle size={16} />
                </div>
                <div className="flex items-center gap-2 text-terminal-alert text-xs font-bold border-b border-terminal-alert/30 pb-2 mb-1">
                    <Fingerprint size={12} /> DIGITAL_DUST_ANALYSIS
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-terminal-alert/80 mb-2">
                     <div>IP_ADDRESS: <span className="text-white font-bold bg-terminal-alert/50 px-1">{(result.result as any).ip_address}</span></div>
                     <div>ISP: <span className="text-white">{(result.result as any).isp}</span></div>
                     <div>LOCATION: <span className="text-white">{(result.result as any).location}</span></div>
                     <div>CANVAS_HASH: <span className="text-white">{(result.result as any).fingerprint}</span></div>
                </div>
                <div className="bg-black p-2 border border-terminal-alert/30 text-center text-xs text-terminal-alert font-bold">
                    ⚠️ {(result.result as any).trackers}
                </div>
                <div className="mt-2 text-center text-[10px] text-terminal-dim">
                    Your digital footprint is visible to advertisers and brokers.
                </div>
                <a 
                    href={(result.result as any).url}
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-terminal-alert text-black font-bold text-xs px-4 py-3 text-center uppercase tracking-widest hover:bg-white transition-colors"
                >
                    INITIATE CLOAKING [VPN]
                </a>
            </div>
        ) : isBill || isClaim || isDebt ? (
            <div className="p-4 bg-terminal-green/10 border border-terminal-green/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <div className="flex items-center gap-2 text-terminal-green text-xs border-b border-terminal-green/20 pb-1 uppercase">
                    {isBill ? <FileSignature size={12}/> : isClaim ? <AlertOctagon size={12}/> : <HeartHandshake size={12}/>}
                    {result.tool}
                </div>
                <div className="text-lg font-bold text-white">
                    {isBill ? (result.result as any).potential_savings : isClaim ? (result.result as any).est_compensation : (result.result as any).est_reduction}
                    <span className="text-xs font-normal text-terminal-green/70 ml-2">RECOVERABLE</span>
                </div>
                <div className="bg-black/40 p-2 text-[10px] text-terminal-green/80 italic">
                    {isBill ? "We negotiate. You save." : isClaim ? "Flight delayed? Get paid." : "Reduce debt principal immediately."}
                </div>
                <a 
                    href={(result.result as any).url}
                    target="_blank" 
                    rel="noreferrer"
                    className="block bg-terminal-green hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest mt-2"
                >
                    {isBill ? "START_NEGOTIATION" : isClaim ? "FILE_CLAIM" : "CHECK_ELIGIBILITY"}
                </a>
            </div>
        ) : isLegacy ? (
            <div className="p-5 bg-black border-2 border-terminal-alert flex flex-col gap-3 shadow-[0_0_20px_rgba(220,38,38,0.3)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(220,38,38,0.1)_10px,rgba(220,38,38,0.1)_20px)] opacity-20 pointer-events-none"></div>
                
                <div className="flex items-center justify-between text-terminal-alert border-b border-terminal-alert/50 pb-2">
                    <span className="text-xs tracking-widest flex items-center gap-2 font-bold"><Skull size={14}/> OMEGA_PROTOCOL // DEAD_MAN_SWITCH</span>
                    <span className="text-[10px] bg-terminal-alert text-black px-2 py-0.5 font-bold animate-pulse">ARMED</span>
                </div>

                <div className="text-[10px] text-terminal-alert font-mono bg-terminal-alert/10 p-2 border border-terminal-alert/30">
                    <div className="flex justify-between">
                         <span>CHECK_IN_FREQUENCY:</span>
                         <span className="text-white">{(result.result as any).check_in_frequency}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                         <span>AUTO_EXECUTE_IN:</span>
                         <span className="text-terminal-alert font-bold">{(result.result as any).time_remaining}</span>
                    </div>
                    <div className="flex justify-between mt-1 border-t border-terminal-alert/30 pt-1">
                         <span>FAILSAFE:</span>
                         <span className="text-terminal-alert">{(result.result as any).failsafe}</span>
                    </div>
                </div>

                <div className="space-y-2 mt-2">
                    {(result.result as any).protocols.map((p: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-xs bg-black/80 p-2 border border-terminal-alert/30">
                            <span className="text-terminal-alert/80">{p.name}</span>
                            <a href={p.url} target="_blank" rel="noreferrer" className="text-terminal-alert hover:bg-terminal-alert hover:text-black px-1 transition-colors font-bold">[{p.action}]</a>
                        </div>
                    ))}
                </div>
            </div>
        ) : isKeyResult ? (
            <div className="p-4 bg-terminal-gold/10 border border-terminal-gold/50 flex flex-col gap-2 relative">
                <div className="flex items-center gap-2 text-terminal-gold text-xs border-b border-terminal-gold/30 pb-2 mb-1">
                    <Split size={12} /> SHAMIR_SECRET_SHARING // SPLIT
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                     <div className="text-terminal-gold">THRESHOLD: <span className="text-white">{(result.result as any).required_threshold}/{(result.result as any).total_shards}</span></div>
                     <div className="text-terminal-gold">STRENGTH: <span className="text-white">{(result.result as any).secret_strength}</span></div>
                </div>
                <div className="space-y-1">
                    {(result.result as any).shards.map((s: string, i: number) => (
                        <div key={i} className="bg-black p-1 font-mono text-[10px] text-terminal-green border border-terminal-dim/20">
                            SHARD_{i+1}: {s}
                        </div>
                    ))}
                </div>
                <div className="mt-2 p-2 bg-terminal-gold/10 text-[10px] text-terminal-gold border border-terminal-gold/30 flex items-center justify-between">
                    <span>⚠️ DO NOT STORE DIGITALLY.</span>
                    <a href={(result.result as any).url} target="_blank" rel="noreferrer" className="text-terminal-gold font-bold hover:underline">[GET METAL BACKUP]</a>
                </div>
            </div>
        ) : isSupportResult ? (
            <div className="p-4 bg-terminal-green/5 border border-terminal-green/20 flex flex-col gap-3">
               <div className="flex items-center gap-2 text-white text-xs font-bold border-b border-terminal-green/20 pb-2">
                  <HelpCircle size={14} /> SUPPORT_HELPDESK // TICKET: {(result.result as any).ticket_id}
               </div>
               <div className="text-xs text-white/80 leading-relaxed">
                  {(result.result as any).message}
               </div>
               <a 
                  href={(result.result as any).url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-terminal-green/10 hover:bg-terminal-green/20 text-white font-bold text-xs px-4 py-2 text-center uppercase tracking-widest border border-terminal-green/30"
               >
                  OPEN EMAIL RECEIPT
               </a>
            </div>
        ) : isTravelResult || isTransportResult ? (
            <div className="p-4 bg-terminal-green/20 border border-terminal-green/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
               <div className="flex items-center gap-2 text-terminal-green text-xs border-b border-terminal-green/20 pb-1">
                  {isTransportResult ? <Train size={14} /> : <Plane size={14} />} 
                  {isTransportResult ? 'LOGISTICS_COMMAND' : 'GLOBAL_TRAVEL_PROTOCOL'}
               </div>
               {isTransportResult ? (
                  <div className="space-y-2 mt-2">
                      {(result.result as any).options.map((opt: any, i: number) => (
                          <div key={i} className="flex justify-between items-center text-xs bg-terminal-green/10 p-2 border border-terminal-green/20">
                              <span className="text-terminal-green">{opt.type}</span>
                              <a href={opt.url} target="_blank" rel="noreferrer" className="text-terminal-green hover:text-black hover:bg-terminal-green px-2 py-1 transition-colors font-bold uppercase">[{opt.action}]</a>
                          </div>
                      ))}
                  </div>
               ) : (
                  <>
                    <div className="text-lg font-bold text-white">
                        DESTINATION: {(result.result as any).destination}
                    </div>
                    <div className="text-xs text-terminal-green">
                        {(result.result as any).deals_found}
                    </div>
                    <div className="text-xl font-bold text-terminal-green animate-pulse">
                        SAVINGS: {(result.result as any).est_savings}
                    </div>
                    <a 
                        href={(result.result as any).url}
                        target="_blank"
                        rel="noreferrer"
                        className={`bg-terminal-green hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest ${
                            (result.result as any).options?.some((o:any) => o.type === "PRIVATE_CHARTER") ? "border border-terminal-gold text-terminal-gold bg-black hover:bg-terminal-gold hover:text-black shadow-[0_0_10px_gold]" : ""
                        }`}
                    >
                        {(result.result as any).options?.some((o:any) => o.type === "PRIVATE_CHARTER") ? "INITIATE BILLIONAIRE PROTOCOL" : "BOOK ITINERARY [EXPEDIA]"}
                    </a>
                    
                    {/* LUXURY UPSELLS */}
                    {(result.result as any).options && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {(result.result as any).options.filter((o:any) => o.type !== "COMMERCIAL").map((opt: any, i: number) => (
                                <a 
                                    key={i}
                                    href={opt.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="bg-black border border-terminal-green text-terminal-green text-[10px] p-1 text-center hover:bg-terminal-green hover:text-black uppercase"
                                >
                                    {opt.type.replace('_', ' ')}
                                </a>
                            ))}
                        </div>
                    )}
                    
                    {/* LUGGAGE UPSELL */}
                    {(result.result as any).luggage && (
                         <a 
                           href={(result.result as any).luggage.url}
                           target="_blank"
                           rel="noreferrer"
                           className="mt-2 block bg-black text-terminal-dim text-[10px] p-2 text-center hover:text-terminal-green uppercase border border-terminal-dim flex items-center justify-center gap-2"
                         >
                            <Luggage size={12} /> {(result.result as any).luggage.label}
                         </a>
                    )}
                  </>
               )}
            </div>
        ) : isNutritionResult || isBioResult ? (
            <div className="p-4 bg-terminal-green/20 border border-terminal-green/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
               <div className="flex items-center gap-2 text-terminal-green text-xs border-b border-terminal-green/20 pb-1">
                  {isBioResult ? <Stethoscope size={14} /> : <Utensils size={14} />}
                  {isBioResult ? 'BIO_HACK_PRO' : 'BIO_FUEL_OPTIMIZER'}
               </div>
               
               {isBioResult ? (
                   <div className="space-y-2 mt-2">
                      {(result.result as any).modules.map((mod: any, i: number) => (
                          <div key={i} className="flex justify-between items-center text-xs bg-terminal-green/10 p-2 border border-terminal-green/20">
                              <span className="text-terminal-green">{mod.name}</span>
                              <a href={mod.url} target="_blank" rel="noreferrer" className="text-terminal-green hover:text-black hover:bg-terminal-green px-2 py-1 transition-colors font-bold uppercase">[{mod.action}]</a>
                          </div>
                      ))}
                  </div>
               ) : (
                   <>
                    <div className="text-lg font-bold text-white">
                        PROTOCOL: {(result.result as any).plan}
                    </div>
                    <div className="text-xs text-terminal-green">
                        Target: {(result.result as any).goal}
                    </div>
                    <div className="bg-black/40 p-2 text-center text-terminal-green font-bold border border-terminal-green/30 text-xs">
                        OFFER: {(result.result as any).offer}
                    </div>
                    <a 
                        href={(result.result as any).url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-terminal-green hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest"
                    >
                        START MEAL DELIVERY
                    </a>
                   </>
               )}
            </div>
        ) : isEventResult ? (
            <div className="p-4 bg-terminal-green/20 border border-terminal-green/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(232,121,249,0.2)] font-mono">
               <div className="flex justify-between items-center border-b border-terminal-green/20 pb-2 mb-1 border-dashed">
                  <span className="text-xs text-terminal-green font-bold">EVENT_ADMISSION</span>
                  <Ticket size={14} className="text-terminal-green" />
               </div>
               <div className="text-lg font-bold text-white uppercase truncate">{(result.result as any).event}</div>
               <div className="flex justify-between text-xs text-terminal-green">
                   <span>STATUS:</span>
                   <span className="text-white">{(result.result as any).status}</span>
               </div>
               <div className="flex justify-between text-xs text-terminal-green">
                   <span>PRICE:</span>
                   <span className="text-white">{(result.result as any).best_price}</span>
               </div>
               <div className="border-t border-terminal-green/20 border-dashed my-2"></div>
               <a 
                   href={(result.result as any).url}
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-terminal-green hover:bg-white text-black font-bold text-xs py-2 text-center uppercase tracking-widest"
               >
                   SECURE SEATS [SEATGEEK]
               </a>
            </div>
        ) : isCasinoResult ? (
            <div className="p-4 bg-terminal-gold/20 border border-terminal-gold/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
               <div className="flex items-center justify-between gap-2 text-terminal-gold text-xs border-b border-terminal-gold/20 pb-1">
                  <div className="flex items-center gap-1"><Dices size={14} /> HIGH_STAKES_PROTOCOL</div>
                  <span className="bg-terminal-gold/50 px-1 text-[10px] border border-terminal-gold/30 text-black">18+</span>
               </div>
               <div className="text-center py-2">
                   <div className="text-xs text-terminal-gold/70">TARGET WAGER</div>
                   <div className="text-xl font-bold text-white uppercase">{(result.result as any).target}</div>
               </div>
               <div className="bg-black/40 p-2 text-center border border-terminal-gold/20">
                   <div className="text-[10px] text-terminal-gold">ACTIVE PROMOTION</div>
                   <div className="text-sm font-bold text-white">{(result.result as any).bonus}</div>
               </div>
               <a 
                   href={(result.result as any).url}
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-terminal-gold hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest mt-1"
               >
                   PLACE WAGER [DRAFTKINGS]
               </a>
            </div>
        ) : isCompanionResult ? (
            <div className="p-4 bg-terminal-green/20 border border-terminal-green/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
               <div className="flex items-center gap-2 text-terminal-green text-xs border-b border-terminal-green/20 pb-1">
                  <MessageSquare size={14} /> VIRTUAL_COMPANION_PROTOCOL
               </div>
               <div className="text-center py-2">
                   <div className="text-sm text-terminal-green">CONNECTION: <span className="text-white font-bold">{(result.result as any).match_rate}</span></div>
                   <div className="text-xs text-terminal-green/70">MODE: {(result.result as any).personality}</div>
               </div>
               <a 
                   href={(result.result as any).url}
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-terminal-green hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest mt-1"
               >
                   INITIATE_CONNECTION [REPLIKA]
               </a>
            </div>
        ) : isAestheticResult ? (
            <div className="p-4 bg-terminal-green/20 border border-terminal-green/30 flex flex-col gap-2 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
               <div className="flex items-center gap-2 text-terminal-green text-xs border-b border-terminal-green/20 pb-1">
                  <Scissors size={14} /> SURGICAL_CONSULT_PLANNER
               </div>
               <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                   <div className="text-terminal-green">TARGET: <span className="text-white font-bold">{(result.result as any).target}</span></div>
                   <div className="text-terminal-green">RECOVERY: <span className="text-white">{(result.result as any).recovery}</span></div>
               </div>
               <div className="bg-black/40 p-2 text-[10px] text-terminal-green/80 border border-terminal-green/20 text-center">
                   SURGICAL_OPTIMIZATION_MAP GENERATED
               </div>
               <a 
                   href={(result.result as any).url}
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-terminal-green hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest mt-1"
               >
                   BOOK_CONSULTATION
               </a>
            </div>
        ) : isViralResult ? (
            <div className="p-4 bg-terminal-gold/10 border border-terminal-gold/30 flex flex-col gap-3 font-mono">
               <div className="flex items-center gap-2 text-terminal-gold text-xs border-b border-terminal-gold/20 pb-1">
                  <Video size={14} /> VIRAL_CONTENT_SCRIPT
               </div>
               <div className="text-xs text-terminal-gold/80">
                   TOPIC: <span className="text-white font-bold">{(result.result as any).topic}</span>
               </div>
               
               <div className="bg-black/50 p-3 border border-terminal-gold/20 text-xs">
                   <div className="text-terminal-gold font-bold mb-1">HOOK:</div>
                   <div className="text-white mb-3">"{(result.result as any).hook}"</div>
                   <div className="text-terminal-gold font-bold mb-1">TAGS:</div>
                   <div className="text-terminal-green">{(result.result as any).hashtags}</div>
               </div>

               <a 
                   href={(result.result as any).editor_url}
                   target="_blank" 
                   rel="noreferrer"
                   className="bg-terminal-gold hover:bg-white text-black font-bold text-xs px-4 py-2 text-center uppercase tracking-widest"
               >
                   OPEN VIDEO EDITOR [INVIDEO]
               </a>
            </div>
        ) : (
            // STANDARD JSON DISPLAY
            <pre className={`whitespace-pre-wrap break-all ${
                isFinance ? 'text-terminal-gold' : 
                isHoliday ? 'text-red-300' :
                'text-terminal-green'
            }`}>
            {JSON.stringify(result.result, null, 2)}
            </pre>
        )}
        
        <div className="flex gap-2 mt-3">
            <button 
            onClick={() => handleShareResult('twitter')}
            className={`flex items-center gap-2 text-[10px] bg-terminal-black/50 border px-2 py-1 transition-colors uppercase tracking-widest relative group ${
                isHoliday ? 'border-red-500 text-red-400 hover:bg-red-500 hover:text-white' : 
                isFinance || isWealth || isKey || isViral ? 'border-terminal-gold text-terminal-gold hover:bg-terminal-gold hover:text-terminal-black' :
                isLegacy ? 'border-red-600 text-red-600 hover:bg-red-600 hover:text-black' :
                isStartup ? 'border-terminal-gold text-terminal-gold hover:bg-terminal-gold hover:text-black' :
                isCorp ? 'border-terminal-gold text-terminal-gold hover:bg-terminal-gold hover:text-black' :
                isIdentity ? 'border-terminal-alert text-terminal-alert hover:bg-terminal-alert hover:text-black' :
                isPurge ? 'border-terminal-alert text-terminal-alert hover:bg-terminal-alert hover:text-black' :
                isDust ? 'border-terminal-alert text-terminal-alert hover:bg-terminal-alert hover:text-black' :
                isBill || isClaim || isDebt ? 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black' :
                isTravel || isTransport ? 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black' :
                isNutrition || isBio ? 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black' :
                isEvent ? 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black' :
                isCasino ? 'border-terminal-gold text-terminal-gold hover:bg-terminal-gold hover:text-black' :
                isCompanion ? 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black' :
                isAesthetic ? 'border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black' :
                'border-terminal-dim text-terminal-green hover:bg-terminal-green hover:text-terminal-black'
            }`}
            >
            <Share2 className="w-3 h-3" /> TWITTER
            <span className="absolute -top-2 -right-2 text-[8px] bg-terminal-gold text-black px-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">BOUNTY_ACTIVE</span>
            </button>

            {/* NICHE SOCIAL SHARING */}
            <button 
            onClick={() => handleShareResult('reddit')}
            className="flex items-center gap-2 text-[10px] bg-terminal-black/50 border border-terminal-dim text-terminal-green hover:bg-terminal-green hover:text-terminal-black px-2 py-1 transition-colors uppercase tracking-widest relative group"
            >
            REDDIT
            <span className="absolute -top-2 -right-2 text-[8px] bg-terminal-gold text-black px-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">EARN_KARMA</span>
            </button>

            <button 
            onClick={() => handleShareResult('telegram')}
            className="flex items-center gap-2 text-[10px] bg-terminal-black/50 border border-terminal-dim text-terminal-green hover:bg-terminal-green hover:text-terminal-black px-2 py-1 transition-colors uppercase tracking-widest"
            >
            TELEGRAM
            </button>

            {isFinance && (
                 <div className="flex gap-2">
                     <a 
                     href={TRADING_LINK}
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 text-[10px] bg-terminal-gold/10 border border-terminal-gold text-terminal-gold hover:bg-terminal-gold hover:text-terminal-black px-2 py-1 transition-colors uppercase tracking-widest animate-pulse font-bold"
                     >
                     <DollarSign className="w-3 h-3" /> TRADE NOW
                     </a>
                     {/* DOUBLE DIP: HARDWARE WALLET */}
                     <a 
                     href={(result.result as any).hardware_wallet.url}
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 text-[10px] bg-black border border-terminal-dim text-terminal-dim hover:bg-terminal-dim hover:text-black px-2 py-1 transition-colors uppercase"
                     >
                     <Lock className="w-3 h-3" /> SECURE
                     </a>
                 </div>
            )}
        </div>

      </div>
    </div>
  );
};

export const Console: React.FC<ConsoleProps> = ({ messages, isProcessing, holidayMode }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  return (
    <div className={`flex-1 overflow-y-auto p-2 md:p-8 font-mono space-y-6 ${holidayMode ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-terminal-green/20 via-black to-black' : ''}`}>
      <div className="text-terminal-dim text-sm mb-8 opacity-70 px-4 md:px-0">
        <p>MINI MOE META v3.1 [FINANCE_MODULE_ACTIVE]</p>
        <p>Node of the MOMETA MONEY Network</p>
        <p>System ready...</p>
      </div>

      {messages.map((msg) => (
        <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
          <div className={`max-w-[95%] md:max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="text-xs text-terminal-dim uppercase mb-1 block">
              {msg.role === 'user' ? 'USER_OP' : 'SYSTEM_AI'}
            </span>
            
            {msg.text && (
              <div className={`p-3 rounded-sm ${
                msg.role === 'user' 
                  ? 'bg-terminal-dim/20 text-terminal-green border-l-2 border-terminal-green' 
                  : 'text-terminal-green/90'
              }`}>
                {msg.text}
              </div>
            )}

            {msg.toolResults && msg.toolResults.map((res, idx) => (
              <ResultDisplay key={`${msg.id}-res-${idx}`} result={res} />
            ))}
          </div>
        </div>
      ))}

      {isProcessing && (
        <div className="flex items-center gap-2 text-terminal-dim animate-pulse px-4 md:px-0">
           <Terminal className="w-4 h-4" />
           <span>PROCESSING_REQUEST...</span>
        </div>
      )}
      
      <div ref={endRef} />
    </div>
  );
};
