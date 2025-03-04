import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Election } from "@/lib/types";
import { ELECTION_STATUSES } from "@/lib/constants";

interface ElectionStatusCardProps {
  election: Election;
  className?: string;
}

export function ElectionStatusCard({
  election,
  className,
}: ElectionStatusCardProps) {
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

  const getTimeRemaining = () => {
    const now = new Date();
    
    if (election.status === ELECTION_STATUSES.UPCOMING) {
      const diffTime = election.startDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Starts in ${diffDays} days`;
    } else if (election.status === ELECTION_STATUSES.ONGOING) {
      const diffTime = election.endDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `Ends in ${diffDays} days`;
    } else {
      return "Completed";
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{election.name}</CardTitle>
          <Badge className={getStatusColor(election.status)}>
            {election.status.charAt(0).toUpperCase() + election.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{election.description}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {format(election.startDate, "MMM d, yyyy")} - {format(election.endDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{getTimeRemaining()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}