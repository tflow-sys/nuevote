import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface FacultyChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

export function FacultyChart({ data, className }: FacultyChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Votes by Faculty</CardTitle>
        <CardDescription>
          Distribution of votes across different faculties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const value = Number(payload[0]?.value) || 0;
                  const total = data.reduce((acc, curr) => acc + curr.value, 0);
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="flex flex-col">
                        <span className="font-bold">{payload[0]?.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {value} votes ({((value / total) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
