export const APP_NAME = "Nkumba University E-Voting System";

export const ELECTION_STATUSES = {
  UPCOMING: "upcoming",
  ONGOING: "ongoing",
  COMPLETED: "completed",
} as const;

export const VOTING_METHODS = {
  SINGLE: "single",
  MULTIPLE: "multiple",
  RANKED: "ranked",
} as const;

export const FACULTIES = [
  "Business Administration",
  "Social Sciences",
  "Education",
  "Law",
  "Science and Technology",
  "Environmental Sciences",
] as const;

export const STUDY_YEARS = [1, 2, 3, 4, 5] as const;

export type ElectionStatus =
  (typeof ELECTION_STATUSES)[keyof typeof ELECTION_STATUSES];
export type VotingMethod = (typeof VOTING_METHODS)[keyof typeof VOTING_METHODS];
export type Faculty = (typeof FACULTIES)[number];
export type StudyYear = (typeof STUDY_YEARS)[number];
