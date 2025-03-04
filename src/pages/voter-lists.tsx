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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Download,
  FileSpreadsheet,
  Filter,
  RefreshCw,
  Search,
  Upload,
} from "lucide-react";
import { mockVoterStats } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

export function VoterLists() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleImportVoters = () => {
    toast({
      title: "Voters Imported",
      description: "Voter list has been imported successfully",
    });
  };

  const handleExportVoters = () => {
    toast({
      title: "Voters Exported",
      description: "Voter list has been exported to CSV",
    });
  };

  const handleRefreshList = () => {
    toast({
      title: "List Refreshed",
      description: "Voter list has been refreshed with latest data",
    });
  };

  // Mock voter data
  const voters = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@nkumba.edu",
      faculty: "Business Administration",
      year: 3,
      voted: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@nkumba.edu",
      faculty: "Law",
      year: 2,
      voted: true,
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "michael.j@nkumba.edu",
      faculty: "Education",
      year: 4,
      voted: false,
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.w@nkumba.edu",
      faculty: "Social Sciences",
      year: 1,
      voted: true,
    },
    {
      id: "5",
      name: "Robert Brown",
      email: "robert.b@nkumba.edu",
      faculty: "Science and Technology",
      year: 3,
      voted: false,
    },
    {
      id: "6",
      name: "Emily Davis",
      email: "emily.d@nkumba.edu",
      faculty: "Environmental Sciences",
      year: 2,
      voted: false,
    },
    {
      id: "7",
      name: "David Wilson",
      email: "david.w@nkumba.edu",
      faculty: "Business Administration",
      year: 4,
      voted: true,
    },
    {
      id: "8",
      name: "Lisa Taylor",
      email: "lisa.t@nkumba.edu",
      faculty: "Law",
      year: 3,
      voted: false,
    },
    {
      id: "9",
      name: "James Anderson",
      email: "james.a@nkumba.edu",
      faculty: "Education",
      year: 2,
      voted: true,
    },
    {
      id: "10",
      name: "Jennifer Martin",
      email: "jennifer.m@nkumba.edu",
      faculty: "Social Sciences",
      year: 1,
      voted: false,
    },
  ];

  const filteredVoters = voters.filter(
    (voter) =>
      voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.faculty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Voter Lists"
          description="Manage eligible voters for elections"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search voters..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Import Voters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Import Voter List</DialogTitle>
                <DialogDescription>
                  Upload a CSV file containing the list of eligible voters
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="file">CSV File</Label>
                  <Input id="file" type="file" accept=".csv" />
                </div>
                <div className="grid gap-2">
                  <Label>File Format</Label>
                  <div className="text-sm text-muted-foreground">
                    <p>The CSV file should have the following columns:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Student ID</li>
                      <li>Full Name</li>
                      <li>Email</li>
                      <li>Faculty</li>
                      <li>Year of Study</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="replace" />
                  <Label htmlFor="replace" className="text-sm">
                    Replace existing voter list
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleImportVoters}>Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleExportVoters}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button variant="outline" onClick={handleRefreshList}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Registered Voters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockVoterStats.total.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Eligible to vote in elections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Voted in Current Election
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockVoterStats.voted.toLocaleString()}
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Turnout</span>
                <span>
                  {Math.round(
                    (mockVoterStats.voted / mockVoterStats.total) * 100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={(mockVoterStats.voted / mockVoterStats.total) * 100}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Highest Turnout Faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Education</div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Turnout</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Lowest Turnout Faculty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Environmental Sciences</div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Turnout</span>
                <span>42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Voter List</CardTitle>
              <CardDescription>List of all registered voters</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVoters.map((voter) => (
                <TableRow key={voter.id}>
                  <TableCell className="font-medium">{voter.name}</TableCell>
                  <TableCell>{voter.email}</TableCell>
                  <TableCell>{voter.faculty}</TableCell>
                  <TableCell>Year {voter.year}</TableCell>
                  <TableCell>
                    {voter.voted ? (
                      <Badge className="bg-green-500/10 text-green-500">
                        Voted
                      </Badge>
                    ) : (
                      <Badge variant="outline">Not Voted</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredVoters.length} of {voters.length} voters
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Voter Distribution by Faculty</CardTitle>
          <CardDescription>
            Breakdown of registered voters by faculty
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(mockVoterStats.byFaculty).map(
              ([faculty, stats]) => (
                <div key={faculty}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{faculty}</span>
                    <span className="text-sm text-muted-foreground">
                      {stats.voted} / {stats.total} (
                      {Math.round((stats.voted / stats.total) * 100)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={(stats.voted / stats.total) * 100}
                      className="h-2 flex-1"
                    />
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {Math.round((stats.voted / stats.total) * 100)}%
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleExportVoters}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Detailed Report
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
