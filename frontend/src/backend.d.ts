import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface InsightsData {
    productiveDays: Array<[bigint, bigint]>;
    totalEntries: bigint;
    negativeEntries: bigint;
    positiveEntries: bigint;
    timeOfDayStats: Array<[string, bigint]>;
    neutralEntries: bigint;
    emotionalPatterns: Array<[bigint, Mood]>;
    moodDistribution: {
        negative: number;
        positive: number;
        neutral: number;
    };
    activityFrequency: Array<[string, bigint]>;
    bestDay?: {
        date: bigint;
        mood: Mood;
        activities: Array<ActivityType>;
    };
    moodTrends: Array<[bigint, Mood]>;
}
export interface DailySummary {
    date: bigint;
    mood: Mood;
    quote?: string;
    activitySummary: string;
    summary: string;
}
export interface JournalEntry {
    id: string;
    content: string;
    date: bigint;
    mood: Mood;
    contextualData?: ContextualData;
}
export interface CalendarPreferences {
    lastSelectedDate: bigint;
    preferredView: Variant_monthly_weekly;
}
export interface ContextualData {
    screenUsage: string;
    manuallyEdited: boolean;
    timeOfDay: string;
    location: string;
    activity: ActivityType;
}
export interface UserProfile {
    name: string;
}
export enum ActivityType {
    reading = "reading",
    socializing = "socializing",
    workingProfessional = "workingProfessional",
    exercising = "exercising",
    studying = "studying",
    teaching = "teaching",
    resting = "resting",
    traveling = "traveling",
    crafting = "crafting",
    gardening = "gardening",
    eating = "eating",
    walking = "walking",
    householdWork = "householdWork",
    working = "working",
    cooking = "cooking",
    shopping = "shopping",
    creatingArt = "creatingArt"
}
export enum Mood {
    negative = "negative",
    positive = "positive",
    neutral = "neutral"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_monthly_weekly {
    monthly = "monthly",
    weekly = "weekly"
}
export interface backendInterface {
    addDailySummary(summary: DailySummary): Promise<void>;
    addEntry(entry: JournalEntry): Promise<void>;
    addPhoto(photo: ExternalBlob): Promise<void>;
    addWeeklyRecap(recap: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearOldSummaries(): Promise<void>;
    filterEntriesByDateRange(viewer: Principal | null, startDate: bigint, endDate: bigint): Promise<Array<JournalEntry>>;
    filterEntriesByMood(viewer: Principal | null, mood: Mood): Promise<Array<JournalEntry>>;
    getCalendarPreferences(viewer: Principal | null): Promise<CalendarPreferences | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDailySummaries(viewer: Principal | null): Promise<Array<DailySummary>>;
    getEntries(viewer: Principal | null): Promise<Array<JournalEntry>>;
    getEntriesForMonth(viewer: Principal | null, month: bigint, year: bigint): Promise<Array<JournalEntry>>;
    getEntryStatistics(viewer: Principal | null): Promise<{
        totalEntries: bigint;
        negativeEntries: bigint;
        positiveEntries: bigint;
        neutralEntries: bigint;
    }>;
    getInsights(viewer: Principal | null): Promise<InsightsData>;
    getPhotos(viewer: Principal | null): Promise<Array<ExternalBlob>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWeeklyRecaps(viewer: Principal | null): Promise<Array<string>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchEntriesByKeyword(viewer: Principal | null, keyword: string): Promise<Array<JournalEntry>>;
    setCalendarPreferences(preferences: CalendarPreferences): Promise<void>;
}
