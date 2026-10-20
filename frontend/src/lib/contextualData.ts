import { ActivityType } from '../backend';

export interface ContextualDataSimulated {
  location: string;
  timeOfDay: string;
  activity: ActivityType;
  screenUsage: string;
}

// Enhanced location types with more variety
const locationTypes = {
  home: ['Home', 'My place', 'Apartment'],
  work: ['Office', 'Workplace', 'Coworking space'],
  social: ['Café', 'Coffee shop', 'Restaurant', 'Bar'],
  education: ['College', 'Library', 'Study hall'],
  fitness: ['Gym', 'Fitness center', 'Yoga studio'],
  outdoor: ['Park', 'Trail', 'Beach', 'Garden'],
  transit: ['Commute', 'Train', 'Bus', 'Car'],
  shopping: ['Mall', 'Store', 'Market'],
};

// Simulate location based on sophisticated time patterns
function simulateLocation(): string {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  const minute = new Date().getMinutes();
  
  // Add some randomness for variety
  const random = (minute % 3) / 3; // 0, 0.33, or 0.66
  
  // Weekend patterns
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    if (hour >= 6 && hour < 9) {
      return random < 0.5 ? locationTypes.home[0] : locationTypes.home[1];
    }
    if (hour >= 9 && hour < 12) {
      const options = [locationTypes.social[0], locationTypes.outdoor[0], locationTypes.fitness[0]];
      return options[Math.floor(random * options.length)];
    }
    if (hour >= 12 && hour < 15) {
      const options = [locationTypes.social[1], locationTypes.social[2], locationTypes.outdoor[1]];
      return options[Math.floor(random * options.length)];
    }
    if (hour >= 15 && hour < 18) {
      const options = [locationTypes.outdoor[0], locationTypes.shopping[0], locationTypes.social[0]];
      return options[Math.floor(random * options.length)];
    }
    if (hour >= 18 && hour < 21) {
      const options = [locationTypes.social[2], locationTypes.social[3], locationTypes.home[0]];
      return options[Math.floor(random * options.length)];
    }
    return locationTypes.home[0];
  }
  
  // Weekday patterns
  if (hour >= 5 && hour < 8) {
    return random < 0.7 ? locationTypes.home[0] : locationTypes.fitness[0];
  }
  if (hour >= 8 && hour < 9) {
    return random < 0.5 ? locationTypes.transit[0] : locationTypes.social[0];
  }
  if (hour >= 9 && hour < 12) {
    const options = [locationTypes.work[0], locationTypes.education[0], locationTypes.work[1]];
    return options[Math.floor(random * options.length)];
  }
  if (hour >= 12 && hour < 14) {
    const options = [locationTypes.social[0], locationTypes.social[1], locationTypes.work[0]];
    return options[Math.floor(random * options.length)];
  }
  if (hour >= 14 && hour < 17) {
    const options = [locationTypes.work[0], locationTypes.education[1], locationTypes.social[0]];
    return options[Math.floor(random * options.length)];
  }
  if (hour >= 17 && hour < 19) {
    return random < 0.6 ? locationTypes.transit[0] : locationTypes.fitness[0];
  }
  if (hour >= 19 && hour < 22) {
    const options = [locationTypes.home[0], locationTypes.social[2], locationTypes.social[0]];
    return options[Math.floor(random * options.length)];
  }
  
  return locationTypes.home[0];
}

// Simulate activity based on time and location with expanded activity types
function simulateActivity(location: string, hour: number): ActivityType {
  const locationLower = location.toLowerCase();
  
  // Location-based activities
  if (locationLower.includes('office') || locationLower.includes('workplace') || locationLower.includes('coworking')) {
    return ActivityType.workingProfessional;
  }
  if (locationLower.includes('commute') || locationLower.includes('train') || locationLower.includes('bus') || locationLower.includes('car')) {
    return ActivityType.traveling;
  }
  if (locationLower.includes('park') || locationLower.includes('trail') || locationLower.includes('beach')) {
    return ActivityType.walking;
  }
  if (locationLower.includes('garden')) {
    return ActivityType.gardening;
  }
  if (locationLower.includes('restaurant') || locationLower.includes('café') || locationLower.includes('coffee')) {
    return hour >= 11 && hour < 15 ? ActivityType.eating : ActivityType.socializing;
  }
  if (locationLower.includes('gym') || locationLower.includes('fitness') || locationLower.includes('yoga')) {
    return ActivityType.exercising;
  }
  if (locationLower.includes('bar') || locationLower.includes('mall') || locationLower.includes('store')) {
    return ActivityType.shopping;
  }
  if (locationLower.includes('college') || locationLower.includes('study')) {
    return ActivityType.studying;
  }
  if (locationLower.includes('library')) {
    return hour >= 9 && hour < 17 ? ActivityType.reading : ActivityType.studying;
  }
  
  // Home activities vary by time with expanded types
  if (locationLower.includes('home') || locationLower.includes('apartment') || locationLower.includes('place')) {
    if (hour >= 6 && hour < 9) return ActivityType.resting;
    if (hour >= 9 && hour < 12) return ActivityType.householdWork;
    if (hour >= 12 && hour < 14) return ActivityType.cooking;
    if (hour >= 14 && hour < 17) return ActivityType.reading;
    if (hour >= 17 && hour < 20) return ActivityType.cooking;
    if (hour >= 20 && hour < 23) return ActivityType.resting;
    if (hour >= 23 || hour < 6) return ActivityType.resting;
    return ActivityType.resting;
  }
  
  return ActivityType.resting;
}

// Simulate screen usage patterns with more detail
function simulateScreenUsage(): string {
  const hour = new Date().getHours();
  const dayOfWeek = new Date().getDay();
  
  // Work hours on weekdays
  if ((dayOfWeek >= 1 && dayOfWeek <= 5) && hour >= 9 && hour < 17) {
    if (hour >= 12 && hour < 14) {
      return 'Moderate (lunch break browsing)';
    }
    return 'High (work-related tasks)';
  }
  
  // Evening hours
  if (hour >= 19 && hour < 23) {
    return 'Moderate (social media, entertainment)';
  }
  
  // Late night
  if (hour >= 23 || hour < 1) {
    return 'Low (winding down)';
  }
  
  // Morning hours
  if (hour >= 6 && hour < 9) {
    return 'Low (checking messages)';
  }
  
  // Afternoon on weekends
  if ((dayOfWeek === 0 || dayOfWeek === 6) && hour >= 14 && hour < 18) {
    return 'Moderate (casual browsing)';
  }
  
  return 'Minimal';
}

// Get detailed time of day description
function getTimeOfDay(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 8) return 'Early morning';
  if (hour >= 8 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 14) return 'Midday';
  if (hour >= 14 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 19) return 'Late afternoon';
  if (hour >= 19 && hour < 21) return 'Evening';
  if (hour >= 21 && hour < 24) return 'Late evening';
  return 'Night';
}

export function collectContextualData(): ContextualDataSimulated {
  const hour = new Date().getHours();
  const location = simulateLocation();
  const activity = simulateActivity(location, hour);
  const screenUsage = simulateScreenUsage();
  const timeOfDay = getTimeOfDay();
  
  return {
    location,
    timeOfDay,
    activity,
    screenUsage,
  };
}

// Generate human-readable activity description with expanded activity types
export function getActivityDescription(activity: ActivityType): string {
  switch (activity) {
    case ActivityType.walking:
      return 'taking a walk';
    case ActivityType.resting:
      return 'relaxing';
    case ActivityType.traveling:
      return 'on the move';
    case ActivityType.working:
      return 'working';
    case ActivityType.socializing:
      return 'spending time with others';
    case ActivityType.exercising:
      return 'exercising';
    case ActivityType.eating:
      return 'having a meal';
    case ActivityType.studying:
      return 'studying';
    case ActivityType.teaching:
      return 'teaching';
    case ActivityType.creatingArt:
      return 'creating art';
    case ActivityType.crafting:
      return 'crafting';
    case ActivityType.householdWork:
      return 'doing household work';
    case ActivityType.workingProfessional:
      return 'working professionally';
    case ActivityType.reading:
      return 'reading';
    case ActivityType.cooking:
      return 'cooking';
    case ActivityType.shopping:
      return 'shopping';
    case ActivityType.gardening:
      return 'gardening';
    default:
      return 'going about the day';
  }
}

// Get contextual activity phrase for more natural language with expanded activities
export function getContextualActivityPhrase(activity: ActivityType, location: string): string {
  const locationLower = location.toLowerCase();
  
  switch (activity) {
    case ActivityType.walking:
      if (locationLower.includes('park')) return 'strolling through the park';
      if (locationLower.includes('trail')) return 'hiking the trail';
      if (locationLower.includes('beach')) return 'walking along the beach';
      return 'taking a walk';
      
    case ActivityType.working:
      if (locationLower.includes('office')) return 'working at the office';
      if (locationLower.includes('café') || locationLower.includes('coffee')) return 'working from the café';
      if (locationLower.includes('library')) return 'working at the library';
      if (locationLower.includes('college')) return 'working on assignments';
      return 'getting work done';
      
    case ActivityType.workingProfessional:
      if (locationLower.includes('office')) return 'working at the office';
      if (locationLower.includes('coworking')) return 'working at the coworking space';
      if (locationLower.includes('home')) return 'working from home';
      return 'working professionally';
      
    case ActivityType.studying:
      if (locationLower.includes('library')) return 'studying at the library';
      if (locationLower.includes('college')) return 'studying at college';
      if (locationLower.includes('café')) return 'studying at the café';
      if (locationLower.includes('home')) return 'studying at home';
      return 'studying';
      
    case ActivityType.teaching:
      if (locationLower.includes('college')) return 'teaching at college';
      if (locationLower.includes('office')) return 'teaching at the office';
      return 'teaching';
      
    case ActivityType.creatingArt:
      if (locationLower.includes('home')) return 'creating art at home';
      if (locationLower.includes('studio')) return 'creating art in the studio';
      return 'creating art';
      
    case ActivityType.crafting:
      if (locationLower.includes('home')) return 'crafting at home';
      return 'working on crafts';
      
    case ActivityType.householdWork:
      return 'doing household chores';
      
    case ActivityType.reading:
      if (locationLower.includes('library')) return 'reading at the library';
      if (locationLower.includes('café')) return 'reading at the café';
      if (locationLower.includes('home')) return 'reading at home';
      if (locationLower.includes('park')) return 'reading in the park';
      return 'reading';
      
    case ActivityType.cooking:
      if (locationLower.includes('home')) return 'cooking at home';
      return 'preparing a meal';
      
    case ActivityType.shopping:
      if (locationLower.includes('mall')) return 'shopping at the mall';
      if (locationLower.includes('store')) return 'shopping at the store';
      if (locationLower.includes('market')) return 'shopping at the market';
      return 'shopping';
      
    case ActivityType.gardening:
      if (locationLower.includes('garden')) return 'gardening';
      if (locationLower.includes('home')) return 'tending to the garden';
      return 'gardening';
      
    case ActivityType.socializing:
      if (locationLower.includes('café') || locationLower.includes('coffee')) return 'catching up over coffee';
      if (locationLower.includes('restaurant')) return 'dining out';
      if (locationLower.includes('bar')) return 'hanging out';
      return 'spending time with others';
      
    case ActivityType.exercising:
      if (locationLower.includes('gym')) return 'working out at the gym';
      if (locationLower.includes('yoga')) return 'practicing yoga';
      return 'exercising';
      
    case ActivityType.eating:
      if (locationLower.includes('restaurant')) return 'enjoying a meal out';
      if (locationLower.includes('café')) return 'grabbing a bite';
      return 'having a meal';
      
    case ActivityType.traveling:
      return 'commuting';
      
    case ActivityType.resting:
      if (locationLower.includes('home')) return 'relaxing at home';
      return 'taking it easy';
      
    default:
      return 'going about the day';
  }
}
