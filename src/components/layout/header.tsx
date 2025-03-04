import { Bell, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "@/router";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { currentRoute, navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      });
      setSearchQuery("");
    }
  };

  const getPageTitle = () => {
    switch (currentRoute) {
      case "dashboard": return "Dashboard";
      case "elections": return "Elections";
      case "candidates": return "Candidates";
      case "voter-lists": return "Voter Lists";
      case "analytics": return "Analytics";
      case "reports": return "Reports";
      case "security-logs": return "Security Logs";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <header className={`flex h-14 items-center gap-4 border-b bg-card px-4 lg:px-6 ${className}`}>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <nav className="grid gap-2 py-6">
              <Button 
                variant={currentRoute === "dashboard" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("dashboard")}
              >
                Dashboard
              </Button>
              <Button 
                variant={currentRoute === "elections" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("elections")}
              >
                Elections
              </Button>
              <Button 
                variant={currentRoute === "candidates" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("candidates")}
              >
                Candidates
              </Button>
              <Button 
                variant={currentRoute === "voter-lists" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("voter-lists")}
              >
                Voter Lists
              </Button>
              <Button 
                variant={currentRoute === "analytics" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("analytics")}
              >
                Analytics
              </Button>
              <Button 
                variant={currentRoute === "reports" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("reports")}
              >
                Reports
              </Button>
              <Button 
                variant={currentRoute === "security-logs" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("security-logs")}
              >
                Security Logs
              </Button>
              <Button 
                variant={currentRoute === "settings" ? "secondary" : "ghost"} 
                className="justify-start" 
                onClick={() => navigate("settings")}
              >
                Settings
              </Button>
            </nav>
            <div className="flex items-center justify-between border-t pt-4">
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">admin@nkumba.edu</p>
              </div>
              <ThemeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="hidden md:block">
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
      </div>
      
      <div className="w-full flex-1 flex items-center gap-2 md:ml-auto md:gap-4 lg:gap-6">
        <form className="ml-auto flex-1 sm:flex-initial" onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full relative"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[280px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("candidates")}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">New candidate application</p>
                <p className="text-xs text-muted-foreground">
                  Robert Wilson applied for Vice President position
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("elections")}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">Election started</p>
                <p className="text-xs text-muted-foreground">
                  Faculty Representatives Election has begun
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("analytics")}>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">High voter turnout</p>
                <p className="text-xs text-muted-foreground">
                  Faculty Representatives Election reached 50% turnout
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-sm text-muted-foreground">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
            >
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("settings")}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("security-logs")}>
              Security Logs
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}