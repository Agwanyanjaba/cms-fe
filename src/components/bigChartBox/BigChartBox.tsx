import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./bigChartBox.scss";

const data = [
  {
    name: "Term 1",
    Female: 2400,
    Male: 2400,
  },
  {
    name: "Term 2",
    Female: 1398,
    Male: 2210,
  },
  {
    name: "Term 3",
    Female: 9800,
    Male: 2290,
  },
];

const BigChartBox = () => {
  return (
    <div className="bigChartBox">
      <h1>Applications Analytics</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Male"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="Female"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigChartBox;
