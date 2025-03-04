import { ElectionStatus, Faculty, StudyYear, VotingMethod } from "./constants";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin" | "auditor";
  createdAt: Date;
}

export interface Election {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ElectionStatus;
  votingMethod: VotingMethod;
  showLiveResults: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Candidate {
  id: string;
  name: string;
  electionId: string;
  position: string;
  faculty: Faculty;
  studyYear: StudyYear;
  manifesto: string;
  photoUrl: string;
  approved: boolean;
  votes: number;
  createdAt: Date;
}

export interface VoterStats {
  total: number;
  voted: number;
  byFaculty: Record<Faculty, { total: number; voted: number }>;
  byYear: Record<StudyYear, { total: number; voted: number }>;
}

export interface ElectionStats {
  id: string;
  electionId: string;
  totalVoters: number;
  totalVotes: number;
  turnoutPercentage: number;
  votesByFaculty: Record<Faculty, number>;
  votesByYear: Record<StudyYear, number>;
  updatedAt: Date;
}

export interface SecurityLog {
  id: string;
  userId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

export interface DashboardStats {
  upcomingElections: number;
  ongoingElections: number;
  completedElections: number;
  totalVoters: number;
  averageTurnout: number;
  pendingCandidates: number;
  securityAlerts: number;
}
