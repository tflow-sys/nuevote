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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock, Edit, Plus, Trash2, Users } from "lucide-react";
import { mockElections } from "@/lib/mock-data";
import { ELECTION_STATUSES } from "@/lib/constants";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ElectionStatusCard } from "@/components/dashboard/election-status-card";

export function Elections() {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const upcomingElections = mockElections.filter(
    (e) => e.status === ELECTION_STATUSES.UPCOMING
  );
  const ongoingElections = mockElections.filter(
    (e) => e.status === ELECTION_STATUSES.ONGOING
  );
  const completedElections = mockElections.filter(
    (e) => e.status === ELECTION_STATUSES.COMPLETED
  );

  const handleCreateElection = () => {
    toast({
      title: "Election Created",
      description: "New election has been created successfully",
    });
  };

  const handleDeleteElection = (id: string) => {
    toast({
      title: "Election Deleted",
      description: `Election ID: ${id} has been deleted`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case ELECTION_STATUSES.UPCOMING:
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case ELECTION_STATUSES.ONGOING:
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case ELECTION_STATUSES.COMPLETED:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Elections"
          description="Manage all university elections"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Election
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Election</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new election
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Election Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Student Council Elections 2025"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the election"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <div className="relative">
                    <Input id="start-date" type="date" />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <div className="relative">
                    <Input id="end-date" type="date" />
                    <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="voting-method">Voting Method</Label>
                <Select>
                  <SelectTrigger id="voting-method">
                    <SelectValue placeholder="Select voting method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Choice</SelectItem>
                    <SelectItem value="multiple">Multiple Choice</SelectItem>
                    <SelectItem value="ranked">Ranked Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="show-results"
                  className="rounded border-gray-300"
                />
                <Label htmlFor="show-results">
                  Show live results to voters
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleCreateElection}>Create Election</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockElections.map((election) => (
              <Card key={election.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">
                      {election.name}
                    </CardTitle>
                    <Badge className={getStatusColor(election.status)}>
                      {election.status.charAt(0).toUpperCase() +
                        election.status.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{election.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(election.startDate, "MMM d, yyyy")} -{" "}
                        {format(election.endDate, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {election.status === ELECTION_STATUSES.UPCOMING
                          ? "Not started yet"
                          : election.status === ELECTION_STATUSES.ONGOING
                          ? "In progress"
                          : "Completed"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        Voting Method:{" "}
                        {election.votingMethod.charAt(0).toUpperCase() +
                          election.votingMethod.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteElection(election.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingElections.length > 0 ? (
              upcomingElections.map((election) => (
                <ElectionStatusCard key={election.id} election={election} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">
                  No upcoming elections found
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ongoing" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ongoingElections.length > 0 ? (
              ongoingElections.map((election) => (
                <ElectionStatusCard key={election.id} election={election} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">
                  No ongoing elections found
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedElections.length > 0 ? (
              completedElections.map((election) => (
                <ElectionStatusCard key={election.id} election={election} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/10">
                <p className="text-muted-foreground">
                  No completed elections found
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
