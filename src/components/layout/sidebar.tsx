import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Home,
  LogOut,
  Settings,
  Shield,
  Users,
  VoteIcon,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "@/router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { currentRoute, navigate } = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    setLogoutDialogOpen(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system",
    });
    // In a real app, we would clear auth state here
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col border-r bg-card transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className
        )}
      >
        <div className="flex h-30 items-center px-6 py-4 border-b">
          {!collapsed && (
            <div className="flex items-center gap-10 font-semibold mx-2">
              <img
                src="https://cdn.worldvectorlogo.com/logos/nkumba-uninersity.svg"
                alt="Nkumba University Logo"
                className="h-100 w-30 p-2" // Added padding around the image
              />
              {/* <span className="text-primary">Nkumba E-Voting</span> */}
            </div>
          )}
          {collapsed && <VoteIcon className="h-6 w-6 mx-auto text-primary" />}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-4 translate-x-1/2 rounded-full border shadow-md bg-background"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            <NavItem
              icon={<Home className="h-4 w-4" />}
              label="Dashboard"
              route="dashboard"
              collapsed={collapsed}
              active={currentRoute === "dashboard"}
              onClick={() => navigate("dashboard")}
            />
            <NavItem
              icon={<CalendarDays className="h-4 w-4" />}
              label="Elections"
              route="elections"
              collapsed={collapsed}
              active={currentRoute === "elections"}
              onClick={() => navigate("elections")}
            />
            <NavItem
              icon={<Users className="h-4 w-4" />}
              label="Candidates"
              route="candidates"
              collapsed={collapsed}
              active={currentRoute === "candidates"}
              onClick={() => navigate("candidates")}
            />
            <NavItem
              icon={<CheckSquare className="h-4 w-4" />}
              label="Voter Lists"
              route="voter-lists"
              collapsed={collapsed}
              active={currentRoute === "voter-lists"}
              onClick={() => navigate("voter-lists")}
            />
            <NavItem
              icon={<BarChart3 className="h-4 w-4" />}
              label="Analytics"
              route="analytics"
              collapsed={collapsed}
              active={currentRoute === "analytics"}
              onClick={() => navigate("analytics")}
            />
            <NavItem
              icon={<ClipboardList className="h-4 w-4" />}
              label="Reports"
              route="reports"
              collapsed={collapsed}
              active={currentRoute === "reports"}
              onClick={() => navigate("reports")}
            />
            <NavItem
              icon={<Shield className="h-4 w-4" />}
              label="Security Logs"
              route="security-logs"
              collapsed={collapsed}
              active={currentRoute === "security-logs"}
              onClick={() => navigate("security-logs")}
            />
            <NavItem
              icon={<Settings className="h-4 w-4" />}
              label="Settings"
              route="settings"
              collapsed={collapsed}
              active={currentRoute === "settings"}
              onClick={() => navigate("settings")}
            />
          </nav>
        </ScrollArea>
        <div className="flex flex-col gap-2 p-4 border-t">
          {!collapsed && (
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  admin@nkumba.edu
                </p>
              </div>
              <ThemeToggle />
            </div>
          )}
          {collapsed && (
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          )}
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className="justify-start"
            onClick={() => setLogoutDialogOpen(true)}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of the system?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  route: string;
  collapsed: boolean;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, collapsed, active, onClick }: NavItemProps) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      size={collapsed ? "icon" : "default"}
      className={cn(
        "justify-start",
        collapsed ? "h-10 w-10" : "h-10 px-4 py-2"
      )}
      onClick={onClick}
    >
      {icon}
      {!collapsed && <span className="ml-2">{label}</span>}
    </Button>
  );
}
