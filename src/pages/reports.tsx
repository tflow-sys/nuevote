"use client";

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
  FileIcon as FilePdf,
  FileText,
  Printer,
  Share2,
  Calendar,
  Trash2,
  Plus,
  RefreshCw,
} from "lucide-react";
import { mockElections } from "@/lib/mock-data";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function Reports() {
  const [selectedElection, setSelectedElection] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const { toast } = useToast();

  const handleGenerateReport = (type: string) => {
    toast({
      title: `${type} Report Generated`,
      description: `The ${type.toLowerCase()} report has been generated successfully`,
    });
  };

  const handleShareReport = () => {
    toast({
      title: "Report Shared",
      description: "Report link has been copied to clipboard",
    });
  };

  const handlePrintReport = () => {
    toast({
      title: "Printing Report",
      description: "Sending report to printer",
    });
  };

  const handleDeleteReport = (reportId: string) => {
    toast({
      title: "Report Deleted",
      description: `Report ${reportId} has been deleted successfully`,
    });
  };

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Your report has been scheduled successfully",
    });
  };

  // Mock reports data
  const reports = [
    {
      id: "1",
      name: "Student Council Election Results",
      type: "Election Results",
      election: "Student Council Elections 2025",
      date: new Date(2025, 5, 23),
      format: "PDF",
      size: "1.2 MB",
    },
    {
      id: "2",
      name: "Faculty Representatives Voter Turnout",
      type: "Voter Turnout",
      election: "Faculty Representatives Election",
      date: new Date(2025, 5, 10),
      format: "CSV",
      size: "856 KB",
    },
    {
      id: "3",
      name: "Sports Committee Demographic Analysis",
      type: "Demographic Analysis",
      election: "Sports Committee Election",
      date: new Date(2025, 4, 15),
      format: "PDF",
      size: "2.4 MB",
    },
    {
      id: "4",
      name: "Student Council Candidate Performance",
      type: "Candidate Analysis",
      election: "Student Council Elections 2025",
      date: new Date(2025, 5, 25),
      format: "XLSX",
      size: "1.8 MB",
    },
    {
      id: "5",
      name: "Faculty Representatives Hourly Turnout",
      type: "Time Analysis",
      election: "Faculty Representatives Election",
      date: new Date(2025, 5, 12),
      format: "CSV",
      size: "720 KB",
    },
    {
      id: "6",
      name: "Sports Committee Election Audit Log",
      type: "Audit Log",
      election: "Sports Committee Election",
      date: new Date(2025, 4, 16),
      format: "PDF",
      size: "3.1 MB",
    },
  ];

  const filteredReports =
    selectedElection === "all"
      ? reports
      : reports.filter((report) => report.election.includes(selectedElection));

  // Report templates
  const reportTemplates = [
    {
      id: "1",
      name: "Election Results Summary",
      description:
        "Overview of election results with vote counts and percentages",
    },
    {
      id: "2",
      name: "Detailed Voter Turnout",
      description:
        "Comprehensive breakdown of voter participation by demographics",
    },
    {
      id: "3",
      name: "Candidate Performance Analysis",
      description: "Detailed analysis of each candidate's performance",
    },
    {
      id: "4",
      name: "Faculty Participation Report",
      description: "Comparison of voter turnout across different faculties",
    },
    {
      id: "5",
      name: "Time-based Voting Pattern",
      description: "Analysis of voting patterns throughout the election period",
    },
    {
      id: "6",
      name: "Audit Trail Report",
      description:
        "Complete log of all election activities for auditing purposes",
    },
  ];

  // Scheduled reports
  const scheduledReports = [
    {
      id: "1",
      name: "Weekly Voter Turnout",
      template: "Detailed Voter Turnout",
      election: "Student Council Elections 2025",
      frequency: "Weekly",
      nextRun: new Date(2025, 6, 1),
      format: "PDF",
    },
    {
      id: "2",
      name: "Daily Results Summary",
      template: "Election Results Summary",
      election: "Faculty Representatives Election",
      frequency: "Daily",
      nextRun: new Date(2025, 5, 25),
      format: "CSV",
    },
    {
      id: "3",
      name: "Monthly Audit Report",
      template: "Audit Trail Report",
      election: "Sports Committee Election",
      frequency: "Monthly",
      nextRun: new Date(2025, 6, 15),
      format: "PDF",
    },
  ];

  const getFormatIcon = (format: string) => {
    switch (format.toUpperCase()) {
      case "PDF":
        return <FilePdf className="h-4 w-4 text-red-500" />;
      case "CSV":
        return <FileText className="h-4 w-4 text-green-500" />;
      case "XLSX":
        return <FileSpreadsheet className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title="Reports"
          description="Generate and manage election reports"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedElection} onValueChange={setSelectedElection}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filter by election" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Elections</SelectItem>
              <SelectItem value="Student Council">
                Student Council Elections
              </SelectItem>
              <SelectItem value="Faculty Representatives">
                Faculty Representatives Election
              </SelectItem>
              <SelectItem value="Sports Committee">
                Sports Committee Election
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="saved">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>
                View and manage your previously generated reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Type
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Election
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Format
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No reports found for the selected filter
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{report.name}</span>
                              <span className="text-xs text-muted-foreground md:hidden">
                                {report.type} •{" "}
                                {format(report.date, "MMM d, yyyy")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{report.type}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {report.election}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {format(report.date, "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              {getFormatIcon(report.format)}
                              <span>{report.format}</span>
                              <span className="text-xs text-muted-foreground">
                                ({report.size})
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleGenerateReport("Download")}
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleShareReport}
                              >
                                <Share2 className="h-4 w-4" />
                                <span className="sr-only">Share</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePrintReport}
                              >
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Print</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteReport(report.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>
                Select a template and customize your report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    1. Select Report Template
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reportTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all ${
                          selectedTemplate === template.id
                            ? "ring-2 ring-primary"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {template.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    2. Select Election
                  </h3>
                  <Select>
                    <SelectTrigger className="w-full md:w-[350px]">
                      <SelectValue placeholder="Select an election" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockElections.map((election) => (
                        <SelectItem key={election.id} value={election.id}>
                          {election.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">3. Report Format</h3>
                  <RadioGroup
                    value={selectedFormat}
                    onValueChange={setSelectedFormat}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div
                      className={`flex items-center space-x-2 rounded-md border p-4 ${
                        selectedFormat === "pdf" ? "border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem value="pdf" id="pdf" />
                      <Label
                        htmlFor="pdf"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FilePdf className="h-5 w-5 text-red-500" />
                        PDF Document
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 rounded-md border p-4 ${
                        selectedFormat === "csv" ? "border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem value="csv" id="csv" />
                      <Label
                        htmlFor="csv"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileText className="h-5 w-5 text-green-500" />
                        CSV Spreadsheet
                      </Label>
                    </div>
                    <div
                      className={`flex items-center space-x-2 rounded-md border p-4 ${
                        selectedFormat === "xlsx" ? "border-primary" : ""
                      }`}
                    >
                      <RadioGroupItem value="xlsx" id="xlsx" />
                      <Label
                        htmlFor="xlsx"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <FileSpreadsheet className="h-5 w-5 text-blue-500" />
                        Excel Spreadsheet
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    4. Additional Options
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-charts" />
                      <Label htmlFor="include-charts">
                        Include charts and visualizations
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-demographics" />
                      <Label htmlFor="include-demographics">
                        Include demographic breakdown
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-timestamps" />
                      <Label htmlFor="include-timestamps">
                        Include timestamps
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">5. Report Name</h3>
                  <Input
                    placeholder="Enter report name"
                    className="w-full md:w-[350px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center">
                <Checkbox id="schedule-report" className="mr-2" />
                <Label htmlFor="schedule-report">Schedule this report</Label>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => handleGenerateReport("Generate")}>
                  Generate Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Manage your recurring report generation
                </CardDescription>
              </div>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Template
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Election
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Frequency
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Next Run
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{report.name}</span>
                            <span className="text-xs text-muted-foreground md:hidden">
                              {report.template} • {report.frequency}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {report.template}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {report.election}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">{report.frequency}</Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {format(report.nextRun, "MMM d, yyyy")}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleScheduleReport()}
                            >
                              <RefreshCw className="h-4 w-4" />
                              <span className="sr-only">Run Now</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
