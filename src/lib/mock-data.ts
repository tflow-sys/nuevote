import { ELECTION_STATUSES, FACULTIES, VOTING_METHODS } from "./constants";
import {
  Candidate,
  DashboardStats,
  Election,
  ElectionStats,
  SecurityLog,
  User,
  VoterStats,
} from "./types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@nkumba.edu",
    role: "admin",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Super Admin",
    email: "superadmin@nkumba.edu",
    role: "super_admin",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    name: "Auditor User",
    email: "auditor@nkumba.edu",
    role: "auditor",
    createdAt: new Date("2023-01-01"),
  },
];

// Mock Elections
export const mockElections: Election[] = [
  {
    id: "1",
    name: "Student Council Elections 2025",
    description: "Annual elections for the student council representatives",
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    status: ELECTION_STATUSES.UPCOMING,
    votingMethod: VOTING_METHODS.SINGLE,
    showLiveResults: false,
    createdBy: "1",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Faculty Representatives Election",
    description: "Election for faculty representatives across all departments",
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    status: ELECTION_STATUSES.ONGOING,
    votingMethod: VOTING_METHODS.MULTIPLE,
    showLiveResults: true,
    createdBy: "2",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Sports Committee Election",
    description: "Election for the university sports committee members",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000), // 23 days ago
    status: ELECTION_STATUSES.COMPLETED,
    votingMethod: VOTING_METHODS.RANKED,
    showLiveResults: true,
    createdBy: "1",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
  },
];

// Mock Candidates
export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Doe",
    electionId: "1",
    position: "President",
    faculty: FACULTIES[0],
    studyYear: 3,
    manifesto: "I promise to improve student welfare and academic resources.",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: true,
    votes: 0,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Jane Smith",
    electionId: "1",
    position: "President",
    faculty: FACULTIES[1],
    studyYear: 4,
    manifesto:
      "My focus is on creating more opportunities for student engagement and leadership.",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: true,
    votes: 0,
    createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Michael Johnson",
    electionId: "2",
    position: "Faculty Representative",
    faculty: FACULTIES[2],
    studyYear: 2,
    manifesto:
      "I will be the voice of the Education faculty and ensure our needs are met.",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: true,
    votes: 45,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "Sarah Williams",
    electionId: "2",
    position: "Faculty Representative",
    faculty: FACULTIES[3],
    studyYear: 3,
    manifesto:
      "As a law student, I understand the importance of fair representation.",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: true,
    votes: 62,
    createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    name: "David Brown",
    electionId: "3",
    position: "Sports Secretary",
    faculty: FACULTIES[4],
    studyYear: 2,
    manifesto:
      "I will organize more sporting events and improve our facilities.",
    photoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: true,
    votes: 120,
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    name: "Emily Davis",
    electionId: "3",
    position: "Sports Secretary",
    faculty: FACULTIES[5],
    studyYear: 3,
    manifesto:
      "My goal is to make sports more inclusive and accessible to all students.",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: true,
    votes: 98,
    createdAt: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000),
  },
  {
    id: "7",
    name: "Robert Wilson",
    electionId: "1",
    position: "Vice President",
    faculty: FACULTIES[0],
    studyYear: 3,
    manifesto:
      "I will work closely with the president to ensure student voices are heard.",
    photoUrl:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop&crop=faces&q=80",
    approved: false,
    votes: 0,
    createdAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
  },
];

// Mock Voter Stats
export const mockVoterStats: VoterStats = {
  total: 5000,
  voted: 3200,
  byFaculty: {
    "Business Administration": { total: 1200, voted: 800 },
    "Social Sciences": { total: 900, voted: 600 },
    Education: { total: 800, voted: 500 },
    Law: { total: 600, voted: 400 },
    "Science and Technology": { total: 900, voted: 600 },
    "Environmental Sciences": { total: 600, voted: 300 },
  },
  byYear: {
    1: { total: 1500, voted: 800 },
    2: { total: 1200, voted: 750 },
    3: { total: 1000, voted: 700 },
    4: { total: 800, voted: 600 },
    5: { total: 500, voted: 350 },
  },
};

// Mock Election Stats
export const mockElectionStats: ElectionStats[] = [
  {
    id: "1",
    electionId: "3",
    totalVoters: 5000,
    totalVotes: 3200,
    turnoutPercentage: 64,
    votesByFaculty: {
      "Business Administration": 800,
      "Social Sciences": 600,
      Education: 500,
      Law: 400,
      "Science and Technology": 600,
      "Environmental Sciences": 300,
    },
    votesByYear: {
      1: 800,
      2: 750,
      3: 700,
      4: 600,
      5: 350,
    },
    updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
  },
];

// Mock Security Logs
export const mockSecurityLogs: SecurityLog[] = [
  {
    id: "1",
    userId: "1",
    action: "Created new election",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    userId: "2",
    action: "Approved candidate",
    ipAddress: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    userId: "1",
    action: "Published election results",
    ipAddress: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    userId: "3",
    action: "Exported election report",
    ipAddress: "192.168.1.3",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    userId: "2",
    action: "Created new election",
    ipAddress: "192.168.1.2",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  upcomingElections: 1,
  ongoingElections: 1,
  completedElections: 1,
  totalVoters: 5000,
  averageTurnout: 64,
  pendingCandidates: 1,
  securityAlerts: 0,
};
