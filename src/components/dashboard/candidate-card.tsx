import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  className?: string;
}

export function CandidateCard({ candidate, className }: CandidateCardProps) {
  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2 flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={candidate.photoUrl} alt={candidate.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{candidate.name}</h3>
            <p className="text-sm text-muted-foreground">
              {candidate.position}
            </p>
          </div>
        </div>
        {candidate.approved ? (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            Approved
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
          >
            Pending
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Faculty:</span>
            <span>{String(candidate.faculty ?? "")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Year:</span>
            <span>Year {candidate.studyYear}</span>
          </div>
          {candidate.votes > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Votes:</span>
              <span className="font-medium">{candidate.votes}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
