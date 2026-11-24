/**
 * Response Formatter Utility
 * Parses AI responses and transforms raw bullets, markdown stars, and emoji clutter
 * into natural language sentences and concise, well-structured paragraphs.
 */

export function formatAIResponse(rawText: string): string {
  if (!rawText) return '';

  let text = rawText.trim();

  // 1. Remove markdown bold/italic asterisks (e.g., ***text***, **text**, *text*)
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '$1');
  text = text.replace(/\*\*([^*]+)\*\*/g, '$1');
  text = text.replace(/\*([^*]+)\*/g, '$1');
  text = text.replace(/__([^_]+)__/g, '$1');
  text = text.replace(/_([^_]+)_/g, '$1');

  // 2. Remove markdown header hashes and dividers
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/^[-*_]{3,}\s*$/gm, '');

  // 3. Remove excessive emoji clutter (strip sequences of multiple emojis or repetitive noisy emojis)
  // Preserve essential single emojis if at start of paragraph, otherwise clean them up
  text = text.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF]|\u2600-\u27BF|\uFE0F|\u200D){2,}/g, '');
  
  // Remove standalone decorative emojis scattered before list items (e.g. 🌾, 💼, 🧠, ⚡, 💻, 🎓, 🚀, 📬, 🐙, 📱, 📧)
  text = text.replace(/^[ \t]*[🌾💼🧠⚡💻🎓🚀📬🐙📱📧🔍🐾✨💡🛠️📌✅🔗]+\s*/gm, '');

  // 4. Transform bulleted lists (lines starting with •, -, *, or 1., 2., a., etc.) into cohesive natural language sentences
  const lines = text.split('\n');
  const processedParagraphs: string[] = [];
  let currentBulletItems: string[] = [];

  const flushBulletItems = () => {
    if (currentBulletItems.length === 0) return;

    // Join bullet items into smooth, natural sentence structure
    const cleanedItems = currentBulletItems.map(item => {
      let cleaned = item.trim();
      // Remove trailing colon or period if mid-sentence
      cleaned = cleaned.replace(/^[•\-\*\d\.\)]+\s*/, '').trim();
      return cleaned;
    }).filter(Boolean);

    if (cleanedItems.length === 1) {
      processedParagraphs.push(ensureSentencePunctuation(cleanedItems[0]));
    } else if (cleanedItems.length > 1) {
      // Create cohesive narrative prose from items
      const narrative = combineItemsIntoProse(cleanedItems);
      processedParagraphs.push(narrative);
    }

    currentBulletItems = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushBulletItems();
      continue;
    }

    // Check if line is a bullet item or numbered item
    const isBullet = /^[•\-\*]\s+/.test(line) || /^\d+[\.\)]\s+/.test(line);

    if (isBullet) {
      const cleanContent = line.replace(/^[•\-\*]\s+/, '').replace(/^\d+[\.\)]\s+/, '').trim();
      if (cleanContent) {
        currentBulletItems.push(cleanContent);
      }
    } else {
      flushBulletItems();
      processedParagraphs.push(line);
    }
  }

  flushBulletItems();

  // 5. Structure into concise, clean paragraphs
  const finalContent = processedParagraphs
    .map(p => p.trim())
    .filter(Boolean)
    .join('\n\n');

  // Final cleanup of any duplicate spaces or stray symbols
  return finalContent
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Ensures a text segment ends with proper punctuation.
 */
function ensureSentencePunctuation(str: string): string {
  const trimmed = str.trim();
  if (!trimmed) return '';
  if (/[.!?]$/.test(trimmed)) return trimmed;
  return trimmed + '.';
}

/**
 * Combines an array of bullet points into clean, flowing natural language sentences.
 */
function combineItemsIntoProse(items: string[]): string {
  // If items contain key-value pairs like "Languages: Python, Java"
  const formattedSentences: string[] = [];

  items.forEach((item) => {
    let text = item.trim();
    if (text.includes(':')) {
      const [label, val] = text.split(':');
      const cleanLabel = label.trim();
      const cleanVal = val.trim();
      if (cleanVal) {
        text = `${cleanLabel} comprises ${cleanVal}.`;
      }
    }
    formattedSentences.push(ensureSentencePunctuation(text));
  });

  return formattedSentences.join(' ');
}

/**
 * Language detection helper with enhanced Tanglish, Tamil, Hindi, and English recognition.
 */
export type DetectedLang = 'en' | 'tanglish' | 'ta' | 'hi' | 'other';

export interface LanguageDetectionResult {
  code: DetectedLang;
  label: string;
  isRegional: boolean;
}

export function detectMessageLanguage(text: string): LanguageDetectionResult {
  if (!text || !text.trim()) {
    return { code: 'en', label: 'English', isRegional: false };
  }

  // 1. Tamil Script
  if (/[\u0B80-\u0BFF]/.test(text)) {
    return { code: 'ta', label: 'Tamil (தமிழ்)', isRegional: true };
  }

  // 2. Hindi / Devanagari Script
  if (/[\u0900-\u097F]/.test(text)) {
    return { code: 'hi', label: 'Hindi (हिंदी)', isRegional: true };
  }

  const lower = text.toLowerCase();

  // 3. Explicit language keywords in prompt
  if (lower.includes('in tamil') || lower.includes('tamizhil') || lower.includes('tamil-la') || lower.includes('thamizh')) {
    return { code: 'ta', label: 'Tamil', isRegional: true };
  }
  if (lower.includes('in hindi') || lower.includes('hindi me') || lower.includes('hindi-la')) {
    return { code: 'hi', label: 'Hindi', isRegional: true };
  }
  if (lower.includes('in tanglish') || lower.includes('tanglish-la')) {
    return { code: 'tanglish', label: 'Tanglish', isRegional: true };
  }

  // 4. Tanglish Vocabulary Detection
  const tanglishPatterns = [
    /\b(pathi|paththi|sollu|solu|enna|epdi|eppadi|eppidi)\b/i,
    /\b(panniruka|pannirukanga|pannina|panreenga|panradhu)\b/i,
    /\b(irukku|iruka|irukaanga|illa|illai|theva|kooda)\b/i,
    /\b(padikira|padikiraanga|padipu|padikkira|college-la|mamcet-la)\b/i,
    /\b(theriyum|theriyuma|enga|yaaru|evlo|pesu|pesalaam)\b/i,
    /\b(nalla|kudunga|thanga|paaru|anupu|katunga|enakku)\b/i,
    /\b(unoda|avanga|ungalukku|kelu|puriyudha|romba|edhavadhu)\b/i,
    /\b(vanakkam|velai|thittam|thodarbu|mudichurukaanga)\b/i
  ];

  const matchesTanglish = tanglishPatterns.some(pattern => pattern.test(lower));
  if (matchesTanglish) {
    return { code: 'tanglish', label: 'Tanglish (தமிழ்)', isRegional: true };
  }

  // 5. Romanized Hindi
  const hindiPatterns = [
    /\b(kya|hai|hain|kaise|batao|baare|kare|kaun|kaha|namaste|shukriya|karo|mujhe|unke|karen|padhai)\b/i
  ];
  if (hindiPatterns.some(pattern => pattern.test(lower))) {
    return { code: 'hi', label: 'Hindi (Hinglish)', isRegional: true };
  }

  return { code: 'en', label: 'English', isRegional: false };
}
