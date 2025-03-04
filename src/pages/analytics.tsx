import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Calendar, Download, FileSpreadsheet } from "lucide-react";
import { mockVoterStats } from "@/lib/mock-data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Analytics() {
  const [selectedElection, setSelectedElection] = useState("2");
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Analytics report has been exported to CSV",
    });
  };

  // Prepare data for charts
  const facultyData = Object.entries(mockVoterStats.byFaculty).map(
    ([faculty, stats]) => ({
      name: faculty.split(" ")[0], // Use first word of faculty name to keep labels short
      votes: stats.voted,
      total: stats.total,
      percentage: Math.round((stats.voted / stats.total) * 100),
    })
  );

  const yearData = Object.entries(mockVoterStats.byYear).map(
    ([year, stats]) => ({
      name: `Year ${year}`,
      votes: stats.voted,
      total: stats.total,
      percentage: Math.round((stats.voted / stats.total) * 100),
    })
  );

  const pieData = facultyData.map((item) => ({
    name: item.name,
    value: item.votes,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  // Mock time-series data for voter turnout
  const timeSeriesData = [
    { time: "8:00 AM", turnout: 5 },
    { time: "9:00 AM", turnout: 12 },
    { time: "10:00 AM", turnout: 25 },
    { time: "11:00 AM", turnout: 35 },
    { time: "12:00 PM", turnout: 42 },
    { time: "1:00 PM", turnout: 48 },
    { time: "2:00 PM", turnout: 55 },
    { time: "3:00 PM", turnout: 62 },
    { time: "4:00 PM", turnout: 68 },
    { time: "5:00 PM", turnout: 72 },
    { time: "6:00 PM", turnout: 78 },
    { time: "7:00 PM", turnout: 85 },
    { time: "8:00 PM", turnout: 92 },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Analytics"
          description="Detailed election statistics and insights"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="w-full sm:w-[250px]">
            <Select
              value={selectedElection}
              onValueChange={setSelectedElection}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select election" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  Student Council Elections 2025
                </SelectItem>
                <SelectItem value="2">
                  Faculty Representatives Election
                </SelectItem>
                <SelectItem value="3">Sports Committee Election</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Eligible Voters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockVoterStats.total.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Votes Cast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockVoterStats.voted.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Voter Turnout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((mockVoterStats.voted / mockVoterStats.total) * 100)}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Election Date</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
            <div className="text-md font-medium">June 15 - June 22, 2025</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="turnout">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="turnout">Voter Turnout</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="turnout" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voter Turnout by Faculty</CardTitle>
              <CardDescription>
                Percentage of eligible voters who cast their votes in each
                faculty
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={facultyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                      className="text-xs"
                    />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "percentage" ? `${value}%` : value,
                        name === "percentage" ? "Turnout" : name,
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="percentage"
                      name="Turnout %"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voter Turnout by Year of Study</CardTitle>
              <CardDescription>
                Comparison of voter participation across different years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "percentage" ? `${value}%` : value,
                        name === "percentage" ? "Turnout" : name,
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="percentage"
                      name="Turnout %"
                      fill="hsl(var(--chart-2))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleExportReport}
              >
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Detailed Turnout Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Votes by Faculty</CardTitle>
                <CardDescription>
                  Distribution of votes across different faculties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} votes`, "Votes Cast"]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voter Demographics</CardTitle>
                <CardDescription>
                  Breakdown of voter participation by demographic factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Gender Distribution
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Male</span>
                          <span>45%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Female</span>
                          <span>55%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-pink-500"
                            style={{ width: "55%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>18-20</span>
                          <span>35%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>21-23</span>
                          <span>42%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{ width: "42%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>24-26</span>
                          <span>18%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-orange-500"
                            style={{ width: "18%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>27+</span>
                          <span>5%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-red-500"
                            style={{ width: "5%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comparative Analysis</CardTitle>
              <CardDescription>
                Comparison with previous elections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "2023", turnout: 58, candidates: 24 },
                      { name: "2024", turnout: 62, candidates: 28 },
                      { name: "2025", turnout: 64, candidates: 32 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="turnout"
                      name="Voter Turnout %"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="candidates"
                      name="Number of Candidates"
                      fill="hsl(var(--chart-3))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Voter Turnout Timeline</CardTitle>
              <CardDescription>
                Hourly voter participation during election day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timeSeriesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis
                      className="text-xs"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, "Turnout"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="turnout"
                      name="Voter Turnout"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="text-sm text-muted-foreground">
                Peak voting hours were between 12:00 PM and 2:00 PM, with
                another surge from 6:00 PM to 8:00 PM.
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Events Timeline</CardTitle>
              <CardDescription>
                Important milestones during the election period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-muted-foreground/20 pl-6 ml-3">
                <div className="mb-8 relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="text-sm font-medium">Election Announced</div>
                  <div className="text-xs text-muted-foreground">
                    May 15, 2025 - 9:00 AM
                  </div>
                  <p className="mt-1 text-sm">
                    Official announcement of the upcoming election and call for
                    candidates.
                  </p>
                </div>

                <div className="mb-8 relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="text-sm font-medium">
                    Candidate Registration Closed
                  </div>
                  <div className="text-xs text-muted-foreground">
                    May 30, 2025 - 5:00 PM
                  </div>
                  <p className="mt-1 text-sm">
                    32 candidates registered across all positions.
                  </p>
                </div>

                <div className="mb-8 relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="text-sm font-medium">
                    Campaigning Period Started
                  </div>
                  <div className="text-xs text-muted-foreground">
                    June 1, 2025 - 8:00 AM
                  </div>
                  <p className="mt-1 text-sm">
                    Candidates began their official campaigns across campus.
                  </p>
                </div>

                <div className="mb-8 relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-primary"></div>
                  <div className="text-sm font-medium">Candidate Debate</div>
                  <div className="text-xs text-muted-foreground">
                    June 10, 2025 - 2:00 PM
                  </div>
                  <p className="mt-1 text-sm">
                    Public debate held at the university auditorium with all
                    presidential candidates.
                  </p>
                </div>

                <div className="mb-8 relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-green-500"></div>
                  <div className="text-sm font-medium">Voting Started</div>
                  <div className="text-xs text-muted-foreground">
                    June 15, 2025 - 8:00 AM
                  </div>
                  <p className="mt-1 text-sm">
                    Online voting system opened for all eligible students.
                  </p>
                </div>

                <div className="mb-8 relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-yellow-500"></div>
                  <div className="text-sm font-medium">50% Turnout Reached</div>
                  <div className="text-xs text-muted-foreground">
                    June 18, 2025 - 3:42 PM
                  </div>
                  <p className="mt-1 text-sm">
                    Election reached 50% voter turnout milestone.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-9 top-1 h-4 w-4 rounded-full bg-red-500"></div>
                  <div className="text-sm font-medium">Voting Closed</div>
                  <div className="text-xs text-muted-foreground">
                    June 22, 2025 - 8:00 PM
                  </div>
                  <p className="mt-1 text-sm">
                    Online voting system closed with final turnout of 64%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
