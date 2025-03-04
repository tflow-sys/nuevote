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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Calendar,
  Download,
  Filter,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { mockSecurityLogs } from "@/lib/mock-data";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface SecurityLog {
  id: string;
  userId: string;
  action: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  severity?: string;
}

export function SecurityLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleExportLogs = () => {
    toast({
      title: "Logs Exported",
      description: "Security logs have been exported to CSV",
    });
  };

  // Extended mock security logs with severity levels
  const extendedLogs: SecurityLog[] = [
    ...mockSecurityLogs,
    {
      id: "6",
      userId: "1",
      action: "Failed login attempt",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      severity: "warning",
    },
    {
      id: "7",
      userId: "unknown",
      action: "Multiple failed login attempts",
      ipAddress: "192.168.1.120",
      userAgent: "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
      timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      severity: "critical",
    },
    {
      id: "8",
      userId: "2",
      action: "Password changed",
      ipAddress: "192.168.1.2",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      severity: "info",
    },
    {
      id: "9",
      userId: "3",
      action: "User role modified",
      ipAddress: "192.168.1.3",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      severity: "warning",
    },
    {
      id: "10",
      userId: "unknown",
      action: "Suspicious API access attempt",
      ipAddress: "192.168.1.150",
      userAgent: "Unknown",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      severity: "critical",
    },
  ];

  const filteredLogs = extendedLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalLogs = filteredLogs.filter(
    (log) => log.severity === "critical"
  );
  const warningLogs = filteredLogs.filter((log) => log.severity === "warning");
  const infoLogs = filteredLogs.filter(
    (log) => !log.severity || log.severity === "info"
  );

  const getSeverityBadge = (severity: string | undefined) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500/10 text-red-500">Critical</Badge>;
      case "warning":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500">Warning</Badge>
        );
      default:
        return <Badge className="bg-blue-500/10 text-blue-500">Info</Badge>;
    }
  };

  const getSeverityIcon = (severity: string | undefined) => {
    switch (severity) {
      case "critical":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Security Logs"
          description="Monitor system security and audit trails"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search logs..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Log Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{extendedLogs.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All security events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{criticalLogs.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Require immediate attention
              </p>
            </div>
            <ShieldAlert className="h-8 w-8 text-red-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Warning Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{warningLogs.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Potential security concerns
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Audit</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <div className="text-md font-medium">June 10, 2025</div>
              <p className="text-xs text-muted-foreground mt-1">15 days ago</p>
            </div>
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="all">All Logs</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
          <TabsTrigger value="warning">Warning</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Logs</CardTitle>
                  <CardDescription>
                    Complete audit trail of system activities
                  </CardDescription>
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
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Severity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{getSeverityIcon(log.severity)}</TableCell>
                      <TableCell className="font-medium">
                        {log.action}
                      </TableCell>
                      <TableCell>{log.userId}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>
                        {format(log.timestamp, "MMM d, yyyy h:mm a")}
                      </TableCell>
                      <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredLogs.length} of {extendedLogs.length} log
                entries
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
        </TabsContent>

        <TabsContent value="critical" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Critical Security Alerts</CardTitle>
                  <CardDescription>
                    High priority security issues requiring immediate attention
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {criticalLogs.length > 0 ? (
                    criticalLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{getSeverityIcon(log.severity)}</TableCell>
                        <TableCell className="font-medium">
                          {log.action}
                        </TableCell>
                        <TableCell>{log.userId}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>
                          {format(log.timestamp, "MMM d, yyyy h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          No critical security alerts found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warning" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Warning Alerts</CardTitle>
                  <CardDescription>
                    Potential security concerns that should be reviewed
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warningLogs.length > 0 ? (
                    warningLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{getSeverityIcon(log.severity)}</TableCell>
                        <TableCell className="font-medium">
                          {log.action}
                        </TableCell>
                        <TableCell>{log.userId}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>
                          {format(log.timestamp, "MMM d, yyyy h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          No warning alerts found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Informational Logs</CardTitle>
                  <CardDescription>
                    Standard system activities and events
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {infoLogs.length > 0 ? (
                    infoLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{getSeverityIcon(log.severity)}</TableCell>
                        <TableCell className="font-medium">
                          {log.action}
                        </TableCell>
                        <TableCell>{log.userId}</TableCell>
                        <TableCell>{log.ipAddress}</TableCell>
                        <TableCell>
                          {format(log.timestamp, "MMM d, yyyy h:mm a")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          No informational logs found
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Security Overview</CardTitle>
          <CardDescription>
            System security status and recent activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System Status</span>
                  <Badge className="bg-green-500/10 text-green-500">
                    Secure
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Last Security Scan
                  </span>
                  <span className="text-sm">Today, 3:45 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Firewall Status</span>
                  <Badge className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SSL Certificate</span>
                  <Badge className="bg-green-500/10 text-green-500">
                    Valid
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Failed Login Attempts (24h)
                  </span>
                  <span className="text-sm font-bold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Suspicious Activities (24h)
                  </span>
                  <span className="text-sm font-bold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Admin Actions (24h)
                  </span>
                  <span className="text-sm font-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    Data Exports (24h)
                  </span>
                  <span className="text-sm font-bold">2</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">
                Recent Security Events
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 mt-0.5 text-green-500" />
                  <div>
                    <p>System security scan completed successfully</p>
                    <p className="text-xs text-muted-foreground">
                      Today, 3:45 AM
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" />
                  <div>
                    <p>Failed login attempt from IP 192.168.1.100</p>
                    <p className="text-xs text-muted-foreground">
                      Yesterday, 8:32 PM
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <ShieldAlert className="h-4 w-4 mt-0.5 text-red-500" />
                  <div>
                    <p>Multiple failed login attempts from unknown IP</p>
                    <p className="text-xs text-muted-foreground">
                      June 15, 2025, 10:17 AM
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
