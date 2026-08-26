import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const STATUS_COLORS = {
  New: "oklch(68% 0.12 275)",
  Assigned: "oklch(65% 0.10 290)",
  Contacted: "oklch(68% 0.09 255)",
  Qualified: "oklch(65% 0.15 155)",
  "Proposal Sent": "oklch(72% 0.12 210)",
  Negotiation: "oklch(82% 0.17 85)",
  Won: "oklch(65% 0.15 155)",
  Lost: "oklch(68% 0.20 25)",
};

const LeadStatusChart = ({ data = [] }) => {
  const total = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="45%"
          innerRadius="60%"
          outerRadius="80%"
          paddingAngle={2}
          stroke="none"
        >
          {data.map((entry) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLORS[entry.status]}
            />
          ))}
        </Pie>

        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
        >
          <tspan
            x="50%"
            dy="-4"
            fontSize="20"
            fontWeight="600"
          >
            {total}
          </tspan>

          <tspan
            x="50%"
            dy="20"
            fontSize="11"
            opacity="0.5"
          >
            Leads
          </tspan>
        </text>

        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--b1))",
            border: "1px solid hsl(var(--b3))",
            borderRadius: "0.5rem",
            color: "hsl(var(--bc))",
          }}
          formatter={(value, name) => [`${value}`, name]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default LeadStatusChart;