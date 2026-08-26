import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const LeadOverviewChart = ({ data = [] }) => {
  const chartData = data.map((item) => ({
    ...item,
    label: formatDate(item.date),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          left: -20,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient
            id="leadOverviewGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--color-primary)"
              stopOpacity={0.25}
            />

            <stop
              offset="100%"
              stopColor="var(--color-primary)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          stroke="var(--color-base-content)"
          strokeOpacity={0.08}
          vertical={false}
        />

        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "var(--color-base-content)",
            opacity: 0.5,
            fontSize: 12,
          }}
          dy={8}
        />

        <YAxis
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: "var(--color-base-content)",
            opacity: 0.5,
            fontSize: 12,
          }}
          width={35}
        />

        <Tooltip
          cursor={{
            stroke: "var(--color-base-content)",
            strokeOpacity: 0.15,
          }}
          contentStyle={{
            backgroundColor: "var(--color-base-100)",
            border: "1px solid var(--color-base-300)",
            borderRadius: "0.5rem",
            color: "var(--color-base-content)",
          }}
          labelStyle={{
            color: "var(--color-base-content)",
            marginBottom: "4px",
          }}
          itemStyle={{
            color: "var(--color-base-content)",
          }}
          formatter={(value) => [`${value}`, "Leads"]}
        />

        <Area
          type="monotone"
          dataKey="count"
          stroke="var(--color-primary)"
          strokeWidth={2}
          fill="url(#leadOverviewGradient)"
          dot={false}
          activeDot={{
            r: 4,
            fill: "var(--color-primary)",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LeadOverviewChart;