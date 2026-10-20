import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { JournalEntry, UserProfile, DailySummary, ExternalBlob, CalendarPreferences, InsightsData } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  // Return custom state that properly reflects actor dependency
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useAddEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: JournalEntry) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addEntry(entry);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
      queryClient.invalidateQueries({ queryKey: ['entryStatistics'] });
      queryClient.invalidateQueries({ queryKey: ['insights'] });
    },
  });
}

export function useGetEntries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<JournalEntry[]>({
    queryKey: ['entries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEntries(null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddDailySummary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (summary: DailySummary) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addDailySummary(summary);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dailySummaries'] });
    },
  });
}

export function useGetDailySummaries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<DailySummary[]>({
    queryKey: ['dailySummaries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getDailySummaries(null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (photo: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addPhoto(photo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    },
  });
}

export function useGetPhotos() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ExternalBlob[]>({
    queryKey: ['photos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPhotos(null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAddWeeklyRecap() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recap: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWeeklyRecap(recap);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weeklyRecaps'] });
    },
  });
}

export function useGetWeeklyRecaps() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string[]>({
    queryKey: ['weeklyRecaps'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getWeeklyRecaps(null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetEntryStatistics() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<{
    totalEntries: bigint;
    positiveEntries: bigint;
    negativeEntries: bigint;
    neutralEntries: bigint;
  }>({
    queryKey: ['entryStatistics'],
    queryFn: async () => {
      if (!actor) {
        return {
          totalEntries: 0n,
          positiveEntries: 0n,
          negativeEntries: 0n,
          neutralEntries: 0n,
        };
      }
      return actor.getEntryStatistics(null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSetCalendarPreferences() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: CalendarPreferences) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setCalendarPreferences(preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarPreferences'] });
    },
  });
}

export function useGetCalendarPreferences() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<CalendarPreferences | null>({
    queryKey: ['calendarPreferences'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCalendarPreferences(null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetInsights() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<InsightsData | null>({
    queryKey: ['insights'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getInsights(null);
    },
    enabled: !!actor && !actorFetching,
  });
}
