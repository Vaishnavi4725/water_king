import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Array "mo:core/Array";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Mood = { #positive; #negative; #neutral };
  type ActivityType = {
    #walking;
    #resting;
    #traveling;
    #working;
    #socializing;
    #exercising;
    #eating;
    #studying;
    #teaching;
    #creatingArt;
    #crafting;
    #householdWork;
    #workingProfessional;
    #reading;
    #cooking;
    #shopping;
    #gardening;
  };

  public type ContextualData = {
    location : Text;
    timeOfDay : Text;
    activity : ActivityType;
    screenUsage : Text;
    manuallyEdited : Bool;
  };

  public type JournalEntry = {
    id : Text;
    date : Int;
    content : Text;
    mood : Mood;
    contextualData : ?ContextualData;
  };

  public type DailySummary = {
    date : Int;
    summary : Text;
    mood : Mood;
    activitySummary : Text;
    quote : ?Text;
  };

  public type UserProfile = { name : Text };

  public type CalendarPreferences = {
    preferredView : { #monthly; #weekly };
    lastSelectedDate : Int;
  };

  public type InsightsData = {
    totalEntries : Nat;
    positiveEntries : Nat;
    negativeEntries : Nat;
    neutralEntries : Nat;
    activityFrequency : [(Text, Nat)];
    moodTrends : [(Int, Mood)];
    bestDay : ?{
      date : Int;
      mood : Mood;
      activities : [ActivityType];
    };
    moodDistribution : {
      positive : Float;
      negative : Float;
      neutral : Float;
    };
    timeOfDayStats : [(Text, Nat)];
    productiveDays : [(Int, Nat)];
    emotionalPatterns : [(Int, Mood)];
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userEntries = Map.empty<Principal, List.List<JournalEntry>>();
  let userSummaries = Map.empty<Principal, List.List<DailySummary>>();
  let userPhotos = Map.empty<Principal, List.List<Storage.ExternalBlob>>();
  let userRecaps = Map.empty<Principal, List.List<Text>>();
  let userCalendarPreferences = Map.empty<Principal, CalendarPreferences>();
  let timeOfDayStats = Map.empty<Text, Nat>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func addEntry(entry : JournalEntry) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add entries");
    };

    let entries = switch (userEntries.get(caller)) {
      case (null) { List.empty<JournalEntry>() };
      case (?existing) { existing };
    };
    entries.add(entry);
    userEntries.add(caller, entries);

    switch (entry.contextualData) {
      case (null) {};
      case (?context) {
        let activityFreq = Map.empty<Text, Nat>();
        let activityCount = switch (activityFreq.get(context.timeOfDay)) {
          case (null) { 0 };
          case (?count) { count };
        };
        activityFreq.add(context.timeOfDay, activityCount + 1);

        let timeCount = switch (timeOfDayStats.get(context.timeOfDay)) {
          case (null) { 0 };
          case (?count) { count };
        };
        timeOfDayStats.add(context.timeOfDay, timeCount + 1);
      };
    };
  };

  public query ({ caller }) func getEntries(viewer : ?Principal) : async [JournalEntry] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own entries.");
        };
        p;
      };
    };

    switch (userEntries.get(target)) {
      case (null) { [] };
      case (?entries) { entries.toArray() };
    };
  };

  public shared ({ caller }) func addDailySummary(summary : DailySummary) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add daily summaries");
    };
    let summaries = switch (userSummaries.get(caller)) {
      case (null) { List.empty<DailySummary>() };
      case (?existing) { existing };
    };
    summaries.add(summary);
    userSummaries.add(caller, summaries);
  };

  public query ({ caller }) func getDailySummaries(viewer : ?Principal) : async [DailySummary] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own summaries.");
        };
        p;
      };
    };

    switch (userSummaries.get(target)) {
      case (null) { [] };
      case (?summaries) { summaries.toArray() };
    };
  };

  public shared ({ caller }) func addPhoto(photo : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add photos");
    };
    let photos = switch (userPhotos.get(caller)) {
      case (null) { List.empty<Storage.ExternalBlob>() };
      case (?existing) { existing };
    };
    photos.add(photo);
    userPhotos.add(caller, photos);
  };

  public query ({ caller }) func getPhotos(viewer : ?Principal) : async [Storage.ExternalBlob] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own photos.");
        };
        p;
      };
    };

    switch (userPhotos.get(target)) {
      case (null) { [] };
      case (?photos) { photos.toArray() };
    };
  };

  public shared ({ caller }) func addWeeklyRecap(recap : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add weekly recaps");
    };
    let recaps = switch (userRecaps.get(caller)) {
      case (null) { List.empty<Text>() };
      case (?existing) { existing };
    };
    recaps.add(recap);
    userRecaps.add(caller, recaps);
  };

  public query ({ caller }) func getWeeklyRecaps(viewer : ?Principal) : async [Text] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own recaps.");
        };
        p;
      };
    };

    switch (userRecaps.get(target)) {
      case (null) { [] };
      case (?recaps) { recaps.toArray() };
    };
  };

  public query ({ caller }) func filterEntriesByMood(viewer : ?Principal, mood : Mood) : async [JournalEntry] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only filter your own entries.");
        };
        p;
      };
    };

    switch (userEntries.get(target)) {
      case (null) { [] };
      case (?entries) {
        entries.toArray().filter(func(entry) { entry.mood == mood });
      };
    };
  };

  public query ({ caller }) func filterEntriesByDateRange(viewer : ?Principal, startDate : Int, endDate : Int) : async [JournalEntry] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only filter your own entries.");
        };
        p;
      };
    };

    switch (userEntries.get(target)) {
      case (null) { [] };
      case (?entries) {
        entries.toArray().filter(
          func(entry) {
            entry.date >= startDate and entry.date <= endDate
          }
        );
      };
    };
  };

  public shared ({ caller }) func clearOldSummaries() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admin can clear old summaries.");
    };

    let now = Time.now();
    let thirtyDaysInNanos : Int = 30 * 24 * 60 * 60 * 1_000_000_000;

    let newSummaries = userSummaries.map<Principal, List.List<DailySummary>, List.List<DailySummary>>(
      func(_principal, summaries) {
        let filtered = summaries.toArray().filter(
          func(summary) {
            (now - summary.date) <= thirtyDaysInNanos
          }
        );
        List.fromArray<DailySummary>(filtered);
      }
    );
    userSummaries.clear();
    newSummaries.forEach(
      func(principal, summaries) {
        userSummaries.add(principal, summaries);
      }
    );
  };

  public query ({ caller }) func getEntryStatistics(viewer : ?Principal) : async {
    totalEntries : Nat;
    positiveEntries : Nat;
    negativeEntries : Nat;
    neutralEntries : Nat;
  } {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own statistics.");
        };
        p;
      };
    };

    switch (userEntries.get(target)) {
      case (null) {
        {
          totalEntries = 0;
          positiveEntries = 0;
          negativeEntries = 0;
          neutralEntries = 0;
        };
      };
      case (?entries) {
        let entriesArr = entries.toArray();
        let total = entriesArr.size();
        let positive = entriesArr.filter(func(entry) { entry.mood == #positive }).size();
        let negative = entriesArr.filter(func(entry) { entry.mood == #negative }).size();
        let neutral = entriesArr.filter(func(entry) { entry.mood == #neutral }).size();
        {
          totalEntries = total;
          positiveEntries = positive;
          negativeEntries = negative;
          neutralEntries = neutral;
        };
      };
    };
  };

  public query ({ caller }) func searchEntriesByKeyword(viewer : ?Principal, keyword : Text) : async [JournalEntry] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only search your own entries.");
        };
        p;
      };
    };

    switch (userEntries.get(target)) {
      case (null) { [] };
      case (?entries) {
        entries.toArray().filter(
          func(entry) {
            entry.content.contains(#text keyword);
          }
        );
      };
    };
  };

  public shared ({ caller }) func setCalendarPreferences(preferences : CalendarPreferences) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set calendar preferences");
    };
    userCalendarPreferences.add(caller, preferences);
  };

  public query ({ caller }) func getCalendarPreferences(viewer : ?Principal) : async ?CalendarPreferences {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own preferences.");
        };
        p;
      };
    };
    userCalendarPreferences.get(target);
  };

  public query ({ caller }) func getEntriesForMonth(viewer : ?Principal, month : Nat, year : Nat) : async [JournalEntry] {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own entries.");
        };
        p;
      };
    };

    let month0Based = month - 1 : Nat;
    let startOfMonthNano = (year * 12 * 30 * 24 + month0Based * 30 * 24) * 60 * 60 * 1_000_000_000 : Int;
    let endOfMonthNano = startOfMonthNano + (30 * 24 * 60 * 60 * 1_000_000_000 : Int);

    switch (userEntries.get(target)) {
      case (null) { [] };
      case (?entries) {
        entries.toArray().filter(
          func(entry) {
            entry.date >= startOfMonthNano and entry.date <= endOfMonthNano
          }
        );
      };
    };
  };

  public query ({ caller }) func getInsights(viewer : ?Principal) : async InsightsData {
    let target = switch (viewer) {
      case (null) { caller };
      case (?p) {
        if (caller != p and not (AccessControl.isAdmin(accessControlState, caller))) {
          Runtime.trap("Unauthorized: Can only view your own insights.");
        };
        p;
      };
    };

    let entries = switch (userEntries.get(target)) {
      case (null) { List.empty<JournalEntry>() };
      case (?entries) { entries };
    };

    let entriesArr = entries.toArray();
    let total = entriesArr.size();

    let positive = entriesArr.filter(func(entry) { entry.mood == #positive }).size();
    let negative = entriesArr.filter(func(entry) { entry.mood == #negative }).size();
    let neutral = entriesArr.filter(func(entry) { entry.mood == #neutral }).size();

    let activityFreq = Map.empty<Text, Nat>();

    let activityFreqArray = activityFreq.toArray();
    let moodTrends : [(Int, Mood)] = entriesArr.map(func(entry) { (entry.date, entry.mood) });
    let bestDay = if (total > 0) {
      ?{
        date = entriesArr[0].date;
        mood = entriesArr[0].mood;
        activities = switch (entriesArr[0].contextualData) {
          case (null) { [] };
          case (?context) { [context.activity] };
        };
      };
    } else { null };

    let moodDist = if (total > 0) {
      {
        positive = positive.toFloat() / total.toFloat();
        negative = negative.toFloat() / total.toFloat();
        neutral = neutral.toFloat() / total.toFloat();
      };
    } else {
      { positive = 0.0; negative = 0.0; neutral = 0.0 };
    };

    let adjustedTimeOfDayStats = timeOfDayStats.toArray();
    let productiveDays = entriesArr.map(
      func(entry) { (entry.date, 1) }
    );

    {
      totalEntries = total;
      positiveEntries = positive;
      negativeEntries = negative;
      neutralEntries = neutral;
      activityFrequency = activityFreqArray;
      moodTrends;
      bestDay;
      moodDistribution = moodDist;
      timeOfDayStats = adjustedTimeOfDayStats;
      productiveDays = productiveDays;
      emotionalPatterns = moodTrends;
    };
  };
};

