import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SecurityLog } from "@/lib/types";
import { format } from "date-fns";

interface RecentActivityProps {
  logs: SecurityLog[];
  className?: string;
}

export function RecentActivity({ logs, className }: RecentActivityProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest actions performed in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {logs.map((log) => (
            <div className="flex items-start" key={log.id}>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{log.action}</p>
                <p className="text-xs text-muted-foreground">
                  User ID: {log.userId} • IP: {log.ipAddress}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {format(log.timestamp, "MMM d, h:mm a")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}