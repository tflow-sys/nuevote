import { StatsCard } from "@/components/dashboard/stats-card";
import { ElectionStatusCard } from "@/components/dashboard/election-status-card";
import { CandidateCard } from "@/components/dashboard/candidate-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { FacultyChart } from "@/components/dashboard/faculty-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Users 
} from "lucide-react";
import { 
  mockCandidates, 
  mockDashboardStats, 
  mockElections, 
  mockSecurityLogs 
} from "@/lib/mock-data";
import { FACULTIES } from "@/lib/constants";
import { PageHeader } from "@/components/page-header";

const chartData = [
  {
    name: "Student Council",
    total: 5000,
    turnout: 64,
  },
  {
    name: "Faculty Reps",
    total: 4800,
    turnout: 58,
  },
  {
    name: "Sports Committee",
    total: 4500,
    turnout: 72,
  },
  {
    name: "Academic Board",
    total: 4700,
    turnout: 51,
  },
];

const facultyData = [
  {
    name: "Business",
    value: 800,
    color: "hsl(var(--chart-1))",
  },
  {
    name: "Social Sciences",
    value: 600,
    color: "hsl(var(--chart-2))",
  },
  {
    name: "Education",
    value: 500,
    color: "hsl(var(--chart-3))",
  },
  {
    name: "Law",
    value: 400,
    color: "hsl(var(--chart-4))",
  },
  {
    name: "Science & Tech",
    value: 600,
    color: "hsl(var(--chart-5))",
  },
  {
    name: "Environmental",
    value: 300,
    color: "hsl(var(--primary))",
  },
];

export function Dashboard() {
  const pendingCandidates = mockCandidates.filter(c => !c.approved);
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader 
        title="Dashboard" 
        description="Overview of the e-voting system"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Upcoming Elections"
          value={mockDashboardStats.upcomingElections}
          icon={<Calendar className="h-5 w-5" />}
          description="Elections scheduled for the future"
        />
        <StatsCard
          title="Ongoing Elections"
          value={mockDashboardStats.ongoingElections}
          icon={<Clock className="h-5 w-5" />}
          description="Elections currently in progress"
        />
        <StatsCard
          title="Average Turnout"
          value={`${mockDashboardStats.averageTurnout}%`}
          icon={<BarChart3 className="h-5 w-5" />}
          description="Average voter participation rate"
        />
        <StatsCard
          title="Total Registered Voters"
          value={mockDashboardStats.totalVoters.toLocaleString()}
          icon={<Users className="h-5 w-5" />}
          description="Students eligible to vote"
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockElections.map((election) => (
          <ElectionStatusCard key={election.id} election={election} />
        ))}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart data={chartData} className="lg:col-span-4" />
        <FacultyChart data={facultyData} className="lg:col-span-3" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Pending Approvals</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pendingCandidates.length > 0 ? (
              pendingCandidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))
            ) : (
              <div className="sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/10">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No pending candidate approvals</p>
              </div>
            )}
          </div>
        </div>
        <RecentActivity logs={mockSecurityLogs.slice(0, 5)} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Candidates"
          value={mockDashboardStats.pendingCandidates}
          icon={<Users className="h-5 w-5" />}
          description="Candidates awaiting approval"
        />
        <StatsCard
          title="Completed Elections"
          value={mockDashboardStats.completedElections}
          icon={<CheckCircle2 className="h-5 w-5" />}
          description="Elections that have concluded"
        />
        <StatsCard
          title="Security Alerts"
          value={mockDashboardStats.securityAlerts}
          icon={<ShieldAlert className="h-5 w-5" />}
          description="Potential security issues detected"
        />
        <StatsCard
          title="Total Faculties"
          value={FACULTIES.length}
          icon={<BarChart3 className="h-5 w-5" />}
          description="Academic departments in the system"
        />
      </div>
    </main>
  );
}