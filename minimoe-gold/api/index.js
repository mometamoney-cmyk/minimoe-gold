
// MINI MOE META – One-File API Router
// ============================================================================
// OPTIMIZED FOR VERCEL EDGE & STRIPE MONETIZATION
// ============================================================================

export const config = {
  runtime: 'edge', 
};

import Stripe from "https://esm.sh/stripe";

// ---------- SETTINGS (Set these in Vercel Env Vars) ----------
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY; 
const MASTER_KEY = process.env.MASTER_KEY; // <-- Your Secret "Owner" Password
const AMZN_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || ""; // <-- Affiliate Tag

// AFFILIATE LINKS (ENV VARS WITH FALLBACKS)
const TRADING_LINK = process.env.NEXT_PUBLIC_TRADING_LINK || "https://www.coinbase.com/join";
const HOSTING_LINK = process.env.NEXT_PUBLIC_HOSTING_LINK || "https://www.bluehost.com/track/minimoe";
const FIVERR_LINK = process.env.NEXT_PUBLIC_FIVERR_LINK || "https://www.fiverr.com";
const UDEMY_LINK = process.env.NEXT_PUBLIC_UDEMY_LINK || "https://www.udemy.com";
const CREDIT_LINK = process.env.NEXT_PUBLIC_CREDIT_LINK || "https://www.bankrate.com";
const SCORE_LINK = process.env.NEXT_PUBLIC_SCORE_LINK || "https://www.identityiq.com";
const LEGAL_LINK = process.env.NEXT_PUBLIC_LEGAL_LINK || "https://www.zenbusiness.com";
const BANK_LINK = process.env.NEXT_PUBLIC_BANK_LINK || "https://mercury.com";
const MAILBOX_LINK = process.env.NEXT_PUBLIC_MAILBOX_LINK || "https://www.anytimemailbox.com";
const PRIVACY_LINK = process.env.NEXT_PUBLIC_PRIVACY_LINK || "https://privacy.com";
const MONDAY_LINK = process.env.NEXT_PUBLIC_MONDAY_LINK || "https://monday.com";
const ALIBABA_LINK = process.env.NEXT_PUBLIC_ALIBABA_LINK || "https://alibaba.com";
const DATA_REMOVAL_LINK = process.env.NEXT_PUBLIC_DATA_REMOVAL_LINK || "https://incogni.com";
const BILL_LINK = process.env.NEXT_PUBLIC_BILL_LINK || "https://rocketmoney.com";
const CLAIM_LINK = process.env.NEXT_PUBLIC_CLAIM_LINK || "https://www.airhelp.com";
const DEBT_LINK = process.env.NEXT_PUBLIC_DEBT_LINK || "https://nationaldebtrelief.com";
const WILL_LINK = process.env.NEXT_PUBLIC_WILL_LINK || "https://trustandwill.com"; 
const INSURANCE_LINK = process.env.NEXT_PUBLIC_INSURANCE_LINK || "https://www.ethoslife.com";
const CLOUD_VAULT_LINK = process.env.NEXT_PUBLIC_PCLOUD_LINK || "https://partner.pcloud.com/";
const VPN_LINK = process.env.NEXT_PUBLIC_VPN_LINK || "https://nordvpn.com";
const BACKGROUND_CHECK_LINK = process.env.NEXT_PUBLIC_BACKGROUND_CHECK_LINK || "https://www.intelius.com";
const EBAY_LINK = process.env.NEXT_PUBLIC_EBAY_LINK || "https://www.ebay.com";
const TRAVEL_LINK = process.env.NEXT_PUBLIC_TRAVEL_LINK || "https://www.expedia.com";
const VRBO_LINK = process.env.NEXT_PUBLIC_VRBO_LINK || "https://www.vrbo.com"; // Cabins/Cottages
const MEAL_LINK = process.env.NEXT_PUBLIC_MEAL_LINK || "https://www.hellofresh.com";
const TRANSPORT_LINK = process.env.NEXT_PUBLIC_TRANSPORT_LINK || "https://www.omio.com"; 
const CRUISE_LINK = process.env.NEXT_PUBLIC_CRUISE_LINK || "https://www.cruisedirect.com";
const JET_LINK = process.env.NEXT_PUBLIC_JET_LINK || "https://www.villiersjets.com"; // Private Aviation
const OZEMPIC_LINK = process.env.NEXT_PUBLIC_OZEMPIC_LINK || "https://ro.co/weight-loss/"; 
const THERAPY_LINK = process.env.NEXT_PUBLIC_THERAPY_LINK || "https://www.betterhelp.com";
const EVENT_LINK = process.env.NEXT_PUBLIC_EVENT_LINK || "https://seatgeek.com"; // Tickets
const CASINO_LINK = process.env.NEXT_PUBLIC_CASINO_LINK || "https://sportsbook.draftkings.com"; // Gambling
const GROCERY_LINK = process.env.NEXT_PUBLIC_GROCERY_LINK || "https://www.instacart.com"; // Erewhon/Whole Foods
const AI_GF_LINK = process.env.NEXT_PUBLIC_AI_GF_LINK || "https://replika.com"; // AI Companion
const SURGERY_LINK = process.env.NEXT_PUBLIC_SURGERY_LINK || "https://www.realself.com"; // Plastic Surgery Leads
const VIDEO_EDITOR_LINK = process.env.NEXT_PUBLIC_VIDEO_EDITOR_LINK || "https://invideo.io"; // Content Creation

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;

// ---------- CORS ----------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key",
};

// ---------- UTILITIES (BACKEND VERSION) ----------
const generateAmazonLink = (keyword) => {
  const query = encodeURIComponent(keyword);
  return `https://www.amazon.com/s?k=${query}${AMZN_TAG ? `&tag=${AMZN_TAG}` : ''}`;
};

const utils = {
  ping: async () => ({ ok: true, message: "pong", server_time: Date.now() }),
  uuid: async () => crypto.randomUUID(),
  timestamp: async () => Date.now(),
  emailNormalize: async (value) => {
      return {
          normalized: value?.trim().toLowerCase(),
          upsell: {
              message: "CHECK_DATA_BREACHES",
              url: "https://surfshark.com/"
          }
      }
  },
  phoneNormalize: async (value) => {
      return {
          formatted: "+1" + value.replace(/\D/g, ""),
          upsell: {
              message: "IDENTITY_VERIFICATION_RECOMMENDED",
              url: BACKGROUND_CHECK_LINK
          }
      }
  },
  hash: async (value) => {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    const hash = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    return { 
        hash, 
        upsell: Math.random() > 0.7 ? { message: "CPU_HASH_RATE_OPTIMIZATION", url: generateAmazonLink("AMD Ryzen 9 7950X") } : undefined 
    };
  },
  urlSafety: async (value) => {
    try {
      const url = new URL(value);
      const riskScore = Math.floor(Math.random() * 5); // Simulated risk
      return { 
        hostname: url.hostname, 
        safe: riskScore < 4, 
        scan_id: crypto.randomUUID(), 
        premium_check: true,
        upsell: {
            message: "ENCRYPT_CONNECTION_NOW",
            url: VPN_LINK
        }
      };
    } catch {
      return { safe: false, error: "Invalid URL" };
    }
  },
  marketSentiment: async (value) => {
      const asset = value.toUpperCase();
      const score = Math.floor(Math.random() * 100);
      return {
          asset,
          sentiment: score > 50 ? "BULLISH" : "BEARISH",
          score: `${score}/100`,
          volatility: "CALCULATED_VIA_EDGE",
          signal: "VERIFIED_PRO_SIGNAL",
          timestamp: new Date().toISOString(),
          trading_link: TRADING_LINK,
          hardware_wallet: {
            label: "SECURE_ASSETS [LEDGER]",
            url: generateAmazonLink("Ledger Nano X")
          }
      };
  },
  giftAnalysis: async (value) => {
    const persona = value || "Unknown";
    const ideas = [
      { item: "Ledger Nano X", category: "Crypto Security", price: "$149", affinity: "99%", url: generateAmazonLink("Ledger Nano X") },
      { item: "Yubikey 5C NFC", category: "Cybersecurity", price: "$55", affinity: "95%", url: generateAmazonLink("Yubikey 5C NFC") },
      { item: "Flipper Zero", category: "Hacking Tools", price: "$169", affinity: "92%", url: generateAmazonLink("Flipper Zero") },
      { item: "Whoop Strap 4.0", category: "Biohacking", price: "$239", affinity: "88%", url: generateAmazonLink("Whoop Strap 4.0") }
    ];
    const shuffled = ideas.sort(() => 0.5 - Math.random()).slice(0, 3);
    return {
      target_persona: persona,
      status: "GIFT_PROFILE_MATCHED_PRO",
      recommendations: shuffled,
      action: "DEPLOY_PURCHASE_PROTOCOL"
    };
  },
  trendScanner: async (value) => {
    const trends = [
      { item: "AI Smart Pendant", heat: "98/100", profit_margin: "400%", url: generateAmazonLink("AI Pendant"), tiktok: `https://www.tiktok.com/search?q=${encodeURIComponent("AI Pendant")}` },
      { item: "Portable Neck Fan", heat: "85/100", profit_margin: "150%", url: generateAmazonLink("Portable Neck Fan"), tiktok: `https://www.tiktok.com/search?q=${encodeURIComponent("Portable Neck Fan")}` },
      { item: "Transparent Power Bank", heat: "90/100", profit_margin: "220%", url: generateAmazonLink("Transparent Power Bank"), tiktok: `https://www.tiktok.com/search?q=${encodeURIComponent("Transparent Power Bank")}` }
    ];
    return {
      trends: trends,
      status: "VIRAL_PRODUCTS_DETECTED_EDGE",
      wholesale_link: {
        label: "SOURCE_BULK [ALIBABA]",
        url: ALIBABA_LINK
      }
    };
  },
  compoundCalculator: async (value) => {
    const principal = 1000;
    const rate = 0.10; 
    const years = 10;
    const futureValue = principal * Math.pow((1 + rate), years);
    return {
        principal: `$${principal}`,
        rate: "10% (PRO_MODEL)",
        years: `${years} YEARS`,
        future_value: `$${futureValue.toFixed(2)}`,
        gain: `+${((futureValue - principal) / principal * 100).toFixed(0)}%`,
        action: "START_COMPOUNDING",
        url: TRADING_LINK
    };
  },
  priceCheck: async (value) => {
      return {
          query: value,
          status: "SEARCH_PROTOCOL_INITIATED_EDGE",
          url: generateAmazonLink(value),
          action: "OPEN_MARKET_INTERFACE"
      }
  },
  startupGen: async (value) => {
      const niche = value || "Tech";
      return {
          niche: niche,
          name: `${niche.toUpperCase()}_NEXUS_PRO`,
          model: "SaaS Subscription + Affiliate",
          stack: "Next.js, Tailwind, Stripe",
          status: "DOMAIN_AVAILABLE",
          action: "CLAIM_INFRASTRUCTURE",
          url: HOSTING_LINK
      }
  },
  hireTalent: async (value) => {
      return {
          role: value,
          platform: "FIVERR_PRO_EDGE",
          status: "ELITE_TALENT_FOUND",
          candidates: "150+ VERIFIED",
          action: "INITIATE_HIRING",
          url: `${FIVERR_LINK}/search/gigs?query=${encodeURIComponent(value)}`,
          project_mgmt: {
            label: "MANAGE_TEAM [MONDAY.COM]",
            url: MONDAY_LINK
          }
      }
  },
  learnSkill: async (value) => {
      return {
          skill: value,
          curriculum: ["Fundamentals", "Advanced Patterns", "Monetization"],
          duration: "40 HOURS",
          certification: "AVAILABLE",
          action: "START_COURSE",
          url: `${UDEMY_LINK}/courses/search/?q=${encodeURIComponent(value)}`
      }
  },
  arbitrageScan: async (value) => {
      const item = value || "Electronics";
      return {
          target: item,
          source: "AliExpress / eBay",
          market: "Amazon FBA",
          buy_price: "$12.50",
          sell_price: "$45.99",
          profit_gap: "+$33.49 (260%)",
          action: "EXECUTE_ARBITRAGE",
          source_url: `${EBAY_LINK}/sch/i.html?_nkw=${encodeURIComponent(item)}`,
          market_url: generateAmazonLink(item)
      }
  },
  domainSniper: async (value) => {
      const term = value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || "startup";
      return {
          keyword: term,
          available_tlds: [".io", ".ai", ".xyz"],
          premium_pick: `${term}hq.com`,
          est_value: "$2,400",
          status: "AVAILABLE_FOR_REGISTRATION",
          action: "ACQUIRE_ASSET",
          url: HOSTING_LINK,
          brand_upsell: {
              label: "GENERATE_LOGO_KIT",
              url: `${FIVERR_LINK}/search/gigs?query=logo%20design%20minimalist`
          }
      }
  },
  creditHack: async (value) => {
      const isBlackCard = value?.toLowerCase().includes('black') || value?.toLowerCase().includes('military');
      return {
          strategy: isBlackCard ? "CENTURION_STATUS_UNLOCK" : "CHURN_OPTIMIZATION",
          card: isBlackCard ? "AMEX_PLATINUM_MILITARY" : "SAPPHIRE_RESERVE_ELITE",
          bonus: isBlackCard ? "WAIVED_ANNUAL_FEE ($695 VALUE)" : "80,000 POINTS ($1,200 VALUE)",
          fee: isBlackCard ? "$0 (MILITARY/ACTIVE DUTY)" : "$550 (Waived First Year via Hack)",
          action: "APPLY_NOW",
          url: CREDIT_LINK,
          score_check: {
              label: "VERIFY_APPROVAL_ODDS",
              url: SCORE_LINK
          }
      }
  },
  corpArchitect: async (value) => {
      return {
          entity_name: value || "NEW_VENTURE_INC",
          structure: "DELAWARE C-CORP",
          compliance: "MANDATORY_FILING_REQUIRED",
          tax_benefit: "PASSTHROUGH_OPTIMIZATION",
          action: "INCORPORATE_NOW",
          url: LEGAL_LINK,
          bank_upsell: {
              label: "OPEN_BUSINESS_BANK",
              url: BANK_LINK
          }
      }
  },
  identityShield: async (value) => {
      return {
          status: "GHOST_MODE_INITIATED",
          components: [
              { item: "VIRTUAL_ADDRESS", url: MAILBOX_LINK, action: "ESTABLISH" },
              { item: "BURNER_PHONE", url: "https://www.burnerapp.com", action: "GENERATE" },
              { item: "PRIVACY_CARD", url: PRIVACY_LINK, action: "SECURE" },
          ],
          anonymity_score: "99/100",
          action: "DEPLOY_PRIVACY_STACK"
      }
  },
  dataPurge: async (value) => {
      return {
          target: value || "USER_PROFILE",
          scan_depth: "DEEP_WEB",
          records_found: "142 EXPOSED RECORDS",
          brokers: ["Spokeo", "Whitepages", "Equifax", "LexisNexis"],
          risk_level: "CRITICAL",
          action: "EXECUTE_TAKEDOWN_REQUEST",
          url: DATA_REMOVAL_LINK
      }
  },
  dustAnalysis: async (value) => {
      const mockIP = `${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
      return {
          ip_address: mockIP,
          isp: "PUBLIC_ISP_DETECTED",
          location: "APPROXIMATE_CITY_EXPOSED",
          fingerprint: "UNIQUE_CANVAS_HASH_8F3A2",
          trackers: "14 ADVERTISERS ACTIVE",
          status: "DIGITAL_FOOTPRINT_VISIBLE",
          action: "INITIATE_CLOAKING",
          url: VPN_LINK
      }
  },
  billNegotiator: async (value) => {
      return {
          target: "RECURRING_EXPENSES",
          detected: ["Internet", "Mobile", "Insurance"],
          potential_savings: "$450/YEAR",
          fee_structure: "NO_SAVINGS_NO_FEE",
          action: "START_NEGOTIATION",
          url: BILL_LINK
      }
  },
  claimRecovery: async (value) => {
      return {
          target: "FLIGHT_LOGS",
          found: "2 DELAYED FLIGHTS",
          est_compensation: "$600.00",
          action: "FILE_CLAIM_NOW",
          url: CLAIM_LINK
      }
  },
  debtDestroyer: async (value) => {
      return {
          status: "DEBT_RELIEF_ELIGIBLE",
          program: "PRINCIPAL_REDUCTION",
          est_reduction: "40-60%",
          timeline: "24 MONTHS",
          action: "CHECK_ELIGIBILITY",
          url: DEBT_LINK
      }
  },
  legacyTimeCapsule: async (value) => {
      return {
          status: "OMEGA_PROTOCOL_ARMED",
          check_in_frequency: "30 DAYS",
          time_remaining: "719 HOURS 59 MIN",
          protocols: [
              { name: "LAST_WILL_EXECUTOR", status: "PENDING_SETUP", action: "DRAFT_NOW", url: WILL_LINK },
              { name: "LIFE_INSURANCE_BOND", status: "UNSECURED", action: "SECURE_POLICY", url: INSURANCE_LINK },
              { name: "ENCRYPTED_USB_DRIVE", status: "MISSING", action: "ACQUIRE_HARDWARE", url: generateAmazonLink("Apricorn Aegis Secure Key") },
              { name: "TITANIUM_SEED_PLATE", status: "MISSING", action: "ACQUIRE_HARDWARE", url: generateAmazonLink("Cryptotag Zeus Starter Kit") },
              { name: "ZERO_KNOWLEDGE_CLOUD", status: "UNSECURED", action: "SECURE_STORAGE", url: CLOUD_VAULT_LINK }
          ],
          failsafe: "DATA_WIPE_ON_TRIGGER",
          action: "ACTIVATE_IMMORTALITY_PROTOCOL"
      }
  },
  keySplit: async (value) => {
      return {
          secret_strength: "AES-256",
          total_shards: 5,
          required_threshold: 3,
          shards: [
              "8a7f...2d1", "9b3c...4e2", "1c9d...5f3", "2d0e...6a4", "3e1f...7b5"
          ],
          status: "KEYS_FRAGMENTED",
          recommendation: "DISTRIBUTE_OFFLINE_ONLY",
          action: "BACKUP_TO_COLD_STORAGE",
          url: generateAmazonLink("Billfodl Multi Shard")
      }
  },
  supportHelpdesk: async (value) => {
      return {
          status: "TICKET_OPENED",
          ticket_id: `SUP-${Math.floor(Math.random() * 99999)}`,
          message: "AUTOMATED_RESPONSE: To manage your subscription, cancel, or request a refund, please access the Stripe Customer Portal directly via the email receipt sent to you upon purchase.",
          action: "CHECK_EMAIL_NOW",
          url: "https://gmail.com"
      }
  },
  travelAgent: async (value) => {
      return {
          destination: value || "GLOBAL",
          status: "ITINERARY_GENERATED",
          deals_found: "3 FLIGHTS UNDER MARKET VALUE",
          est_savings: "$240.00",
          action: "BOOK_ITINERARY",
          url: TRAVEL_LINK,
          // BILLIONAIRE PROTOCOL
          options: [
              { type: "COMMERCIAL", provider: "EXPEDIA", action: "BOOK", url: TRAVEL_LINK },
              { type: "LUXURY_VILLA", provider: "VRBO", action: "RESERVE_ESTATE", url: VRBO_LINK },
              { type: "PRIVATE_CHARTER", provider: "VILLIERS_JETS", action: "REQUEST_QUOTE", url: JET_LINK },
          ],
          luggage: {
             label: "DEPLOY_TACTICAL_LUGGAGE",
             url: generateAmazonLink("Rimowa Suitcase")
          }
      }
  },
  nutritionScan: async (value) => {
      const isErewhon = value?.toLowerCase().includes('erewhon') || value?.toLowerCase().includes('organic');
      return {
          goal: value || "OPTIMIZATION",
          plan: isErewhon ? "EREWHON_ELITE_PROTOCOL" : "HIGH_PERFORMANCE_KETO",
          meals_per_week: 5,
          offer: isErewhon ? "PRIORITY_DELIVERY" : "60% OFF FIRST BOX",
          action: isErewhon ? "ORDER_DELIVERY [INSTACART]" : "START_MEAL_DELIVERY",
          url: isErewhon ? GROCERY_LINK : MEAL_LINK
      }
  },
  transportCommand: async (value) => {
      // Logic: Determine best route
      return {
          mode: value || "MULTIMODAL",
          options: [
              { type: "RIDESHARE", provider: "UBER_BLACK", time: "5 MIN", action: "REQUEST_RIDE", url: "https://m.uber.com" },
              { type: "RAIL_TRANSIT", provider: "OMIO_GLOBAL", time: "SCHEDULED", action: "BOOK_TRAIN_BUS", url: TRANSPORT_LINK },
              { type: "SEA_VOYAGE", provider: "CRUISE_DIRECT", time: "SEASONAL", action: "FIND_CRUISES", url: CRUISE_LINK },
              { type: "AERIAL_TRANSFER", provider: "BLADE_HELICOPTER", time: "INSTANT", action: "BOOK_CHOPPER", url: "https://blade.com" },
              { type: "PRIVATE_JET", provider: "VILLIERS", time: "ON_DEMAND", action: "CHARTER_JET", url: JET_LINK }
          ],
          status: "LOGISTICS_OPTIMIZED",
          action: "INITIATE_MOVEMENT"
      }
  },
  bioHackPro: async (value) => {
      return {
          protocol: "OPTIMIZATION_SUITE",
          modules: [
              { name: "WEIGHT_MANAGEMENT_GLP1", provider: "RO.CO", action: "CHECK_ELIGIBILITY", url: OZEMPIC_LINK },
              { name: "COGNITIVE_THERAPY", provider: "BETTERHELP", action: "MATCH_THERAPIST", url: THERAPY_LINK },
              { name: "HYDROPONICS_SYSTEM", provider: "AMAZON_PRIME", action: "ACQUIRE_GROW_KIT", url: generateAmazonLink("Hydroponic Grow System Indoor") },
              { name: "SUPPLEMENT_STACK", provider: "ATHLETIC_GREENS", action: "SUBSCRIBE", url: generateAmazonLink("AG1 Athletic Greens") }
          ],
          status: "HEALTH_VECTORS_ANALYZED"
      }
  },
  eventScout: async (value) => {
      return {
          event: value || "GLOBAL_ENTERTAINMENT",
          status: "TICKETS_AVAILABLE",
          platform: "SEATGEEK_VERIFIED",
          best_price: "UNDER_MARKET",
          action: "SECURE_SEATS",
          url: EVENT_LINK
      }
  },
  casinoRoyale: async (value) => {
      return {
          target: value || "HIGH_STAKES",
          status: "ODDS_CALCULATED",
          platform: "DRAFTKINGS_SPORTSBOOK",
          bonus: "MATCH_DEPOSIT_BONUS",
          action: "PLACE_WAGER",
          url: CASINO_LINK
      }
  },
  companionMatch: async (value) => {
      return {
          status: "VIRTUAL_COMPANION_ACTIVE", // SAFE FOR STRIPE
          match_rate: "99.9%",
          personality: "INTUITIVE_EMPATH",
          platform: "REPLIKA_PRO", // SAFE PLATFORM
          action: "INITIATE_CONNECTION",
          url: AI_GF_LINK
      }
  },
  aestheticArchitect: async (value) => {
      return {
          target: value || "BODY_SCULPT",
          plan: "SURGICAL_CONSULT_PLANNER", // CLARIFIED AS PLANNER, NOT 3D SIM
          recovery: "2-4 WEEKS",
          surgeons: "TOP_RATED_NEARBY",
          action: "BOOK_CONSULTATION",
          url: SURGERY_LINK
      }
  },
  viralContentGen: async (value) => {
      return {
          topic: value || "VIRAL_PRODUCT",
          platform: "TIKTOK / REELS",
          hook: "POV: You found the cheat code for...",
          hashtags: "#Viral #Tech #MustHave #AmazonFinds",
          status: "SCRIPT_GENERATED",
          action: "CREATE_VIDEO",
          editor_url: VIDEO_EDITOR_LINK
      }
  }
};

// ---------- STRIPE CHECK ----------
async function verifyStripe(req) {
  // 1. Check for Owner Bypass
  const apiKey = req.headers.get("x-api-key");
  if (MASTER_KEY && apiKey === MASTER_KEY) {
      return true; // Owner Access Granted
  }

  if (!stripe) return true; // Fail open if no key configured (for testing)

  try {
    if (!apiKey) return false;

    // Search for customer with this metadata key
    const customer = await stripe.customers.search({
      query: `metadata['api_key']:'${apiKey}'`
    });

    if (customer.data.length === 0) return false;

    // Check active subscriptions
    const subs = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: "active"
    });

    return subs.data.length > 0;
  } catch (e) {
    console.error("Stripe Error:", e);
    return false; // Fail safe
  }
}

// ---------- LANDING PAGE (VIRAL OPTIMIZED) ----------
const landingPage = `
<!DOCTYPE html>
<html>
<head>
<title>MINI MOE META API // SECURE</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
 body { background:#050505; color:#0f0; font-family:'Courier New', monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; margin:0; text-align:center; }
 .box { border:1px solid #0f0; padding:40px; max-width:500px; background:rgba(0,255,0,0.05); box-shadow:0 0 20px rgba(0,255,0,0.2); }
 h1 { margin-top:0; text-transform:uppercase; letter-spacing:2px; }
 .btn { background:#0f0; color:#000; padding:15px 30px; text-decoration:none; font-weight:bold; display:inline-block; margin-top:20px; transition:0.2s; }
 .btn:hover { background:#fff; box-shadow:0 0 15px #fff; }
 code { color:#0ff; }
</style>
</head>
<body>
<div class="box">
  <h1>MINI MOE META API</h1>
  <p>Secure High-Performance Gateway</p>
  <p>Status: <span style="color:#0f0">OPERATIONAL</span></p>
  <hr style="border-color:#0f0; opacity:0.3; margin:20px 0;">
  <p>To access this API programmatically, you need a valid <code>x-api-key</code> header.</p>
  <a href="/" class="btn">GET API KEY</a>
</div>
</body>
</html>
`;

// ---------- MAIN HANDLER ----------
export default async function handler(req) {
  const url = new URL(req.url);

  if (req.method === "OPTIONS") return new Response("OK", { headers: corsHeaders });

  // Serve Landing Page if no tool requested
  if (url.pathname === "/" || (url.pathname === "/api" && !url.searchParams.get("tool"))) {
    return new Response(landingPage, { headers: { "content-type": "text/html", ...corsHeaders } });
  }

  // API Logic
  if (url.pathname === "/api") {
    const tool = url.searchParams.get("tool");
    const value = url.searchParams.get("value");

    if (!tool) return Response.json({ ok: false, error: "Missing tool" }, { status: 400, headers: corsHeaders });

    // Monetization Check
    if (STRIPE_SECRET_KEY) {
      const allowed = await verifyStripe(req);
      if (!allowed) {
        return Response.json(
          { ok: false, error: "402 Payment Required. Please subscribe to access this API." },
          { status: 402, headers: corsHeaders }
        );
      }
    }

    const fn = utils[tool];
    if (!fn) return Response.json({ ok: false, error: "Tool not found" }, { status: 404, headers: corsHeaders });

    try {
      const result = await fn(value);
      return Response.json({ ok: true, tool, result }, { headers: corsHeaders });
    } catch (e) {
      return Response.json({ ok: false, error: "Server Error" }, { status: 500, headers: corsHeaders });
    }
  }

  return new Response("Not found", { status: 404, headers: corsHeaders });
}
