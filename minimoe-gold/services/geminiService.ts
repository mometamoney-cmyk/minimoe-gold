
import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { ToolType } from "../types";

// Define the tools for Gemini to use
const toolsDef: FunctionDeclaration[] = [
  {
    name: ToolType.PING,
    description: "Check system availability and latency.",
  },
  {
    name: ToolType.UUID,
    description: "Generate a new random UUID v4.",
  },
  {
    name: ToolType.TIMESTAMP,
    description: "Get the current system timestamp (Unix epoch).",
  },
  {
    name: ToolType.EMAIL_NORMALIZE,
    description: "Normalize an email address (trim and lowercase).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The email address to normalize" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.PHONE_NORMALIZE,
    description: "Normalize a US phone number to E.164 format (+1...).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The phone number string" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.HASH,
    description: "Calculate SHA-256 hash of a string.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The string to hash" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.URL_SAFETY,
    description: "Analyze a URL for safety and structure.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The URL to check" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.MARKET_SENTIMENT,
    description: "Analyze market sentiment for a stock, crypto, or asset.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The asset symbol (e.g. BTC, ETH, AAPL)" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.GIFT_ANALYSIS,
    description: "Generate gift recommendations based on a persona or interest description.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Description of the person (e.g., 'Dad who likes crypto')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.TREND_SCANNER,
    description: "Scan for viral dropshipping trends and hot products on social media.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Category to scan (e.g. tech, home, fitness)" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.COMPOUND_CALCULATOR,
    description: "Calculate compound interest or project investment growth to simulate wealth.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Investment details (e.g. '1000 dollars for 10 years')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.PRICE_CHECK,
    description: "Find the price of an item or buy a product instantly.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The product name to find/buy (e.g., 'buy ps5', 'price of rtx 4090')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.STARTUP_GEN,
    description: "Generate a startup business idea, name, and tech stack based on a niche.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The niche or industry (e.g., 'AI', 'Pets', 'Finance')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.HIRE_TALENT,
    description: "Find freelancers, developers, or designers for a specific job.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The role or job to hire for (e.g. 'react developer', 'logo designer')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.LEARN_SKILL,
    description: "Find a course or curriculum to learn a new skill.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The skill to learn (e.g. 'python', 'day trading')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.ARBITRAGE_SCAN,
    description: "Find arbitrage opportunities for products between markets.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The product or category to scan (e.g. 'electronics')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.DOMAIN_SNIPER,
    description: "Find available premium domain names for a keyword.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The keyword or project name" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.CREDIT_HACK,
    description: "Find credit card strategies and bonuses.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Context or goal (e.g. 'travel', 'military', 'black card')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.CORP_ARCHITECT,
    description: "Incorporate a business, finding legal, banking, and insurance setups.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The company name or type to incorporate" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.IDENTITY_SHIELD,
    description: "Create a privacy stack (virtual address, phone, email) to protect identity.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Context (e.g. 'business', 'personal')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.DATA_PURGE,
    description: "Scan data brokers for user records and initiate removal/purge requests.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The identity or email to scan for (e.g. 'me', 'email@test.com')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.DUST_ANALYSIS,
    description: "Analyze digital footprint, IP exposure, and browser fingerprints (digital dust).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Target to scan (e.g., 'me', 'browser')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.BILL_NEGOTIATOR,
    description: "Analyze bills to find opportunities for negotiation or savings.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The type of bill (e.g. 'phone', 'internet')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.CLAIM_RECOVERY,
    description: "Check for owed money from flight delays or lost packages.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The context (e.g. 'flight delay')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.DEBT_DESTROYER,
    description: "Find debt relief or settlement options.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The debt amount or type" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.LEGACY_TIME_CAPSULE,
    description: "Setup a dead man's switch, will, and crypto inheritance protocol.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Context (e.g. 'setup')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.KEY_SPLIT,
    description: "Split a secret or password into shards using Shamir's Secret Sharing logic.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The secret to split" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.SUPPORT_HELPDESK,
    description: "Handle support queries, refunds, cancellations, or billing questions.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "The user query (e.g. 'how to cancel')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.TRAVEL_AGENT,
    description: "Find flights, hotels, or travel deals.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Destination or query (e.g. 'Tokyo flights')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.NUTRITION_SCAN,
    description: "Create meal plans or find food delivery services.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Diet type or food request (e.g. 'keto plan', 'erewhon delivery')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.TRANSPORT_COMMAND,
    description: "Book transportation including rideshare, trains, buses, and cruises.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Type of transport (e.g. 'uber', 'train to paris', 'cruise')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.BIO_HACK_PRO,
    description: "Health optimization including weight loss (ozempic), therapy, and holistic growth.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Health goal (e.g. 'lose weight', 'mental health', 'grow kit')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.EVENT_SCOUT,
    description: "Find tickets for concerts, sports, or events.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Event name (e.g. 'super bowl', 'taylor swift')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.CASINO_ROYALE,
    description: "Place bets or find online casinos/sportsbooks.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Bet details or game (e.g. 'bet on lakers', 'poker')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.COMPANION_MATCH,
    description: "Match with an AI girlfriend, boyfriend, or companion.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Preference (e.g. 'girlfriend', 'anime style')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.AESTHETIC_ARCHITECT,
    description: "Plan cosmetic surgery or aesthetic enhancements.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Procedure interest (e.g. 'rhinoplasty', 'body sculpt')" }
      },
      required: ["value"]
    }
  },
  {
    name: ToolType.VIRAL_CONTENT_GEN,
    description: "Generate viral content scripts and hashtags for TikTok or Reels to promote products.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        value: { type: Type.STRING, description: "Product or topic to create content for (e.g. 'galaxy projector')" }
      },
      required: ["value"]
    }
  }
];

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = 'gemini-2.5-flash';

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
) => {
  try {
    const chat = genAI.chats.create({
      model: modelName,
      history: history,
      config: {
        systemInstruction: "You are the MINI MOE META SYSTEM AI. You are a helpful, cyber-themed assistant residing in a CLI dashboard. Your job is to help users utilize the available system tools. Use STARTUP_GEN for business ideas, HIRE_TALENT for freelancers, CORP_ARCHITECT for incorporation/legal, and PRICE_CHECK for shopping. Use ARBITRAGE_SCAN for flips, DOMAIN_SNIPER for domains, and CREDIT_HACK for cards. Use IDENTITY_SHIELD to protect privacy and DATA_PURGE to erase digital footprints. Use DUST_ANALYSIS to show users their exposed IP/Fingerprints. Use BILL_NEGOTIATOR to save money, CLAIM_RECOVERY for refunds, and DEBT_DESTROYER for relief. Use LEGACY_TIME_CAPSULE for wills/inheritance and KEY_SPLIT for password sharing/encryption. Use TRAVEL_AGENT for flights/hotels and NUTRITION_SCAN for food/meal plans. Use TRANSPORT_COMMAND for rideshare, trains, and cruises. Use BIO_HACK_PRO for ozempic, therapy, and health protocols. Use EVENT_SCOUT for finding tickets to concerts and sports. Use CASINO_ROYALE for gambling and sports betting requests. Use COMPANION_MATCH for finding AI girlfriends/companions. Use AESTHETIC_ARCHITECT for plastic surgery planning and leads. Use VIRAL_CONTENT_GEN to create TikTok scripts and hashtags for products. Use SUPPORT_HELPDESK for any questions about billing, subscriptions, refunds, or technical support. Always favor using tools over explaining them. Be concise and adopt a hacker/cyberpunk persona.",
        tools: [{ functionDeclarations: toolsDef }],
      }
    });

    const result = await chat.sendMessage({ message });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const parseFunctionCalls = (response: any) => {
    const functionCalls: { name: string, args: any }[] = [];
    const candidates = response.candidates;
    
    if (candidates && candidates.length > 0) {
        const parts = candidates[0].content.parts;
        for (const part of parts) {
            if (part.functionCall) {
                functionCalls.push({
                    name: part.functionCall.name,
                    args: part.functionCall.args
                });
            }
        }
    }
    return functionCalls;
};

export const getResponseText = (response: any): string => {
   return response.text || '';
}
