export type Mood = 'positive' | 'neutral' | 'negative';

const positiveKeywords = [
  'happy',
  'joy',
  'excited',
  'grateful',
  'thankful',
  'blessed',
  'amazing',
  'wonderful',
  'great',
  'excellent',
  'fantastic',
  'love',
  'loved',
  'loving',
  'beautiful',
  'perfect',
  'awesome',
  'brilliant',
  'delighted',
  'pleased',
  'cheerful',
  'optimistic',
  'hopeful',
  'proud',
  'accomplished',
  'successful',
  'thrilled',
  'ecstatic',
  'blissful',
  'content',
  'satisfied',
  'peaceful',
  'calm',
  'relaxed',
  'energized',
  'inspired',
  'motivated',
  'confident',
  'good',
  'better',
  'best',
  'fun',
  'enjoy',
  'enjoyed',
  'enjoying',
  'celebration',
  'celebrate',
  'victory',
  'win',
  'won',
  'success',
];

const negativeKeywords = [
  'sad',
  'unhappy',
  'depressed',
  'anxious',
  'worried',
  'stress',
  'stressed',
  'angry',
  'frustrated',
  'upset',
  'disappointed',
  'hurt',
  'pain',
  'painful',
  'terrible',
  'awful',
  'horrible',
  'bad',
  'worse',
  'worst',
  'hate',
  'hated',
  'hating',
  'fear',
  'scared',
  'afraid',
  'nervous',
  'overwhelmed',
  'exhausted',
  'tired',
  'lonely',
  'alone',
  'isolated',
  'hopeless',
  'helpless',
  'worthless',
  'guilty',
  'ashamed',
  'regret',
  'sorry',
  'difficult',
  'hard',
  'struggle',
  'struggling',
  'problem',
  'issue',
  'trouble',
  'crisis',
  'disaster',
  'failure',
  'failed',
  'lost',
  'lose',
];

export function analyzeMood(text: string): Mood {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  let positiveScore = 0;
  let negativeScore = 0;

  words.forEach((word) => {
    // Remove punctuation for matching
    const cleanWord = word.replace(/[^\w]/g, '');

    if (positiveKeywords.includes(cleanWord)) {
      positiveScore++;
    }
    if (negativeKeywords.includes(cleanWord)) {
      negativeScore++;
    }
  });

  // Check for negations that might flip sentiment
  const negationPattern = /(not|no|never|don't|doesn't|didn't|won't|wouldn't|can't|cannot)\s+\w+/gi;
  const negations = lowerText.match(negationPattern);
  if (negations) {
    // Reduce the dominant score slightly when negations are present
    const negationPenalty = negations.length * 0.5;
    if (positiveScore > negativeScore) {
      positiveScore -= negationPenalty;
    } else if (negativeScore > positiveScore) {
      negativeScore -= negationPenalty;
    }
  }

  // Determine mood based on scores
  const threshold = 2; // Minimum difference to classify as positive/negative

  if (positiveScore > negativeScore && positiveScore - negativeScore >= threshold) {
    return 'positive';
  } else if (negativeScore > positiveScore && negativeScore - positiveScore >= threshold) {
    return 'negative';
  } else {
    return 'neutral';
  }
}
