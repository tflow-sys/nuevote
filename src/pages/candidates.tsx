import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Download, FileText, Plus, Search, X } from "lucide-react";
import { mockCandidates } from "@/lib/mock-data";
import { FACULTIES, STUDY_YEARS } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Candidate } from "@/lib/types";

export function Candidates() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const approvedCandidates = mockCandidates.filter((c) => c.approved);
  const pendingCandidates = mockCandidates.filter((c) => !c.approved);

  const handleApproveCandidate = (id: string) => {
    toast({
      title: "Candidate Approved",
      description: `Candidate ID: ${id} has been approved`,
    });
  };

  const handleRejectCandidate = (id: string) => {
    toast({
      title: "Candidate Rejected",
      description: `Candidate ID: ${id} has been rejected`,
      variant: "destructive",
    });
  };

  const handleAddCandidate = () => {
    toast({
      title: "Candidate Added",
      description: "New candidate has been added successfully",
    });
  };

  const filteredCandidates = mockCandidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(candidate.faculty)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<Candidate>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const candidate = row.original;
        const initials = candidate.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{candidate.name}</div>
              <div className="text-xs text-muted-foreground">
                Year {candidate.studyYear}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "faculty",
      header: "Faculty",
    },
    {
      accessorKey: "approved",
      header: "Status",
      cell: ({ row }) => {
        const approved = row.original.approved;
        return (
          <Badge
            className={
              approved
                ? "bg-green-500/10 text-green-500"
                : "bg-yellow-500/10 text-yellow-500"
            }
          >
            {approved ? "Approved" : "Pending"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const candidate = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              View
            </Button>
            {!candidate.approved && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-500"
                  onClick={() => handleApproveCandidate(candidate.id)}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={() => handleRejectCandidate(candidate.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Candidates"
          description="Manage election candidates"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Candidate</DialogTitle>
                <DialogDescription>
                  Enter candidate details to add them to an election
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="e.g., John Doe" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Select>
                      <SelectTrigger id="faculty">
                        <SelectValue placeholder="Select faculty" />
                      </SelectTrigger>
                      <SelectContent>
                        {FACULTIES.map((faculty) => (
                          <SelectItem key={faculty} value={faculty}>
                            {faculty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Study Year</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {STUDY_YEARS.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            Year {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="e.g., President" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="election">Election</Label>
                  <Select>
                    <SelectTrigger id="election">
                      <SelectValue placeholder="Select election" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        Student Council Elections 2025
                      </SelectItem>
                      <SelectItem value="2">
                        Faculty Representatives Election
                      </SelectItem>
                      <SelectItem value="3">
                        Sports Committee Election
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="manifesto">Manifesto</Label>
                  <Textarea
                    id="manifesto"
                    placeholder="Candidate's election manifesto"
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="photo">Photo URL</Label>
                  <Input id="photo" placeholder="URL to candidate's photo" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleAddCandidate}>Add Candidate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">All Candidates</h3>
                <p className="text-sm text-muted-foreground">
                  Total: {filteredCandidates.length}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable columns={columns} data={filteredCandidates} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Approved Candidates</h3>
                <p className="text-sm text-muted-foreground">
                  Total: {approvedCandidates.length}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable columns={columns} data={approvedCandidates} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Pending Candidates</h3>
                <p className="text-sm text-muted-foreground">
                  Total: {pendingCandidates.length}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <DataTable columns={columns} data={pendingCandidates} />
            </CardContent>
            <CardFooter className="p-4 border-t">
              <div className="flex justify-between items-center w-full">
                <p className="text-sm text-muted-foreground">
                  Pending candidates require approval before they appear in
                  elections
                </p>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    pendingCandidates.forEach((c) =>
                      handleApproveCandidate(c.id)
                    );
                  }}
                >
                  Approve All
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
