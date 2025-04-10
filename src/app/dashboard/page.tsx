"use client";
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { Header } from "@/components/common/Header";

interface RechartsComponents {
  BarChart: React.FC<Record<string, unknown>>;
  Bar: React.FC<Record<string, unknown>>;
  LineChart: React.FC<Record<string, unknown>>;
  Line: React.FC<Record<string, unknown>>;
  PieChart: React.FC<Record<string, unknown>>;
  Pie: React.FC<Record<string, unknown>>;
  Cell: React.FC<Record<string, unknown>>;
  XAxis: React.FC<Record<string, unknown>>;
  YAxis: React.FC<Record<string, unknown>>;
  CartesianGrid: React.FC<Record<string, unknown>>;
  Tooltip: React.FC<Record<string, unknown>>;
  Legend: React.FC<Record<string, unknown>>;
  ResponsiveContainer: React.FC<Record<string, unknown>>;
  RadarChart: React.FC<Record<string, unknown>>;
  Radar: React.FC<Record<string, unknown>>;
  PolarGrid: React.FC<Record<string, unknown>>;
  PolarAngleAxis: React.FC<Record<string, unknown>>;
  PolarRadiusAxis: React.FC<Record<string, unknown>>;
  ComposedChart: React.FC<Record<string, unknown>>;
}

// Data definitions
const facultyOrders = [
  { name: "工学部", value: 45 },
  { name: "医学部", value: 38 },
  { name: "農学部", value: 29 },
  { name: "経済学部", value: 22 },
  { name: "文学部", value: 17 },
];

const facultyResponseSuccess = [
  { name: "A先生", response: 80, success: 60 },
  { name: "B先生", response: 70, success: 50 },
  { name: "C先生", response: 60, success: 40 },
  { name: "D先生", response: 50, success: 30 },
];

const caseMonthly = [
  { month: "1月", count: 25 },
  { month: "2月", count: 30 },
  { month: "3月", count: 22 },
  { month: "4月", count: 28 },
  { month: "5月", count: 35 },
];

const statusDist = [
  { name: "進行中", value: 40 },
  { name: "終了", value: 30 },
];

const matchingDays = [
  { year: "2022年", days: 22 },
  { year: "2023年", days: 18 },
  { year: "2024年", days: 14 },
];

const outcomeTypes = [
  { name: "論文", value: 42 },
  { name: "特許", value: 15 },
  { name: "製品化", value: 8 },
  { name: "報告書", value: 12 },
];

const fundingTrend = [
  { year: "2019年", amount: 150 },
  { year: "2020年", amount: 200 },
  { year: "2021年", amount: 250 },
  { year: "2022年", amount: 300 },
  { year: "2023年", amount: 280 },
];

const customerSatisfaction = [
  { name: "満足", value: 65 },
  { name: "普通", value: 25 },
  { name: "不満", value: 10 },
];

const avgFirstResponseDays = [
  { department: "工学部", days: 3.2 },
  { department: "医学部", days: 2.5 },
  { department: "経済学部", days: 4.0 },
];

const avgCollabDuration = [
  { field: "AI", months: 6 },
  { field: "バイオ", months: 9 },
  { field: "農業", months: 7 },
];

const industryData = [
  {
    industry: "製造業",
    orders: 156,
    successRate: 0.78,
    avgBudget: 850000,
    failedOrders: 44,
  },
  {
    industry: "IT・通信",
    orders: 203,
    successRate: 0.83,
    avgBudget: 720000,
    failedOrders: 42,
  },
  {
    industry: "小売・流通",
    orders: 134,
    successRate: 0.72,
    avgBudget: 680000,
    failedOrders: 52,
  },
  {
    industry: "金融・保険",
    orders: 98,
    successRate: 0.81,
    avgBudget: 1250000,
    failedOrders: 23,
  },
  {
    industry: "医療・ヘルスケア",
    orders: 76,
    successRate: 0.7,
    avgBudget: 950000,
    failedOrders: 33,
  },
  {
    industry: "教育・学習",
    orders: 67,
    successRate: 0.76,
    avgBudget: 520000,
    failedOrders: 21,
  },
];

// 平均予算を算出
const calculateAvgBudget = (): number => {
  const total = industryData.reduce((sum, item) => sum + item.avgBudget, 0);
  return total / industryData.length;
};

const fieldRadar = [
  { subject: "AI", value: 120 },
  { subject: "バイオ", value: 98 },
  { subject: "エネルギー", value: 86 },
  { subject: "農業", value: 99 },
  { subject: "材料", value: 85 },
  { subject: "環境", value: 65 },
];

const scaleBar = [
  { name: "小規模", value: 45 },
  { name: "中規模", value: 78 },
  { name: "大規模", value: 32 },
];

const repeaterPie = [
  { name: "リピーター", value: 65 },
  { name: "新規", value: 35 },
];

const repeaterHistogram = [
  { times: "1回", value: 35 },
  { times: "2回", value: 28 },
  { times: "3回", value: 22 },
  { times: "4回以上", value: 15 },
];

const continuousLine = [
  { year: "2019年", count: 15 },
  { year: "2020年", count: 18 },
  { year: "2021年", count: 25 },
  { year: "2022年", count: 32 },
  { year: "2023年", count: 30 },
];

export default function Dashboard() {
  // State for client-side rendering
  const [isMounted, setIsMounted] = useState(false);
  const [recharts, setRecharts] = useState<RechartsComponents | null>(null);

  // Get the average budget
  const avgBudget = calculateAvgBudget();

  // Use effect to handle client-side initialization
  useEffect(() => {
    setIsMounted(true);

    // Import recharts dynamically
    import("recharts").then((module) => {
      setRecharts(module as unknown as RechartsComponents);
    });
  }, []);

  // ChartCard component for the loaded recharts
  const ChartCard = ({
    title,
    children,
  }: {
    title: string;
    children: ReactElement;
  }) => {
    if (!recharts) return null;

    const { ResponsiveContainer } = recharts;

    return (
      <div className="bg-white rounded-2xl p-4 shadow w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Show loading state until client-side rendering is ready
  if (!isMounted || !recharts) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <Header currentPage="マイページ" />
        <main className="px-5 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
          <div className="text-center py-8">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            <p className="mt-2">ダッシュボードを読み込んでいます...</p>
          </div>
        </main>
      </div>
    );
  }

  // Destructure recharts components
  const {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ComposedChart,
  } = recharts;

  // Main component render
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header currentPage="ダッシュボード" />
      <main className="px-5 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="学部別依頼数">
            <BarChart data={facultyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="件数" fill="#8884d8" />
            </BarChart>
          </ChartCard>

          <ChartCard title="教員の応答率・連携成功率">
            <BarChart data={facultyResponseSuccess}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="response" name="応答率" fill="#82ca9d" />
              <Bar dataKey="success" name="成功率" fill="#8884d8" />
            </BarChart>
          </ChartCard>

          <ChartCard title="案件数の推移（月別）">
            <LineChart data={caseMonthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="件数"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ChartCard>

          <ChartCard title="平均マッチング日数">
            <BarChart data={matchingDays}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="days" name="日数" fill="#ffc658" />
            </BarChart>
          </ChartCard>

          <ChartCard title="ステータス別の案件分布">
            <PieChart>
              <Pie
                data={statusDist}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusDist.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#00C49F" : "#FF8042"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartCard>

          <ChartCard title="成果物の種類・件数">
            <BarChart layout="vertical" data={outcomeTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="件数" fill="#8884d8" />
            </BarChart>
          </ChartCard>

          <ChartCard title="資金額の推移">
            <LineChart data={fundingTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis unit="M" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                name="資金額"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ChartCard>

          <ChartCard title="顧客満足度（アンケート結果）">
            <BarChart data={customerSatisfaction}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                domain={[0, 100]}
                tickFormatter={(value: number) => `${value}%`}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="回答数" fill="#ffc658" />
            </BarChart>
          </ChartCard>

          <ChartCard title="初回対応までの平均日数">
            <BarChart data={avgFirstResponseDays}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis unit="日" />
              <Tooltip />
              <Legend />
              <Bar dataKey="days" name="平均日数" fill="#82ca9d" />
            </BarChart>
          </ChartCard>

          <ChartCard title="分野別の平均連携期間">
            <BarChart data={avgCollabDuration}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="field" />
              <YAxis unit="ヶ月" />
              <Tooltip />
              <Legend />
              <Bar dataKey="months" name="期間" fill="#8884d8" />
            </BarChart>
          </ChartCard>

          <ChartCard title="業種別依頼数">
            <BarChart
              layout="vertical"
              data={[...industryData].sort((a, b) => b.orders - a.orders)}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="industry" />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" name="連携件数" fill="#0088FE" />
            </BarChart>
          </ChartCard>

          <ChartCard title="業種別成約率">
            <BarChart
              data={industryData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" name="成功" stackId="a" fill="#00C49F" />
              <Bar
                dataKey="failedOrders"
                name="未成功"
                stackId="a"
                fill="#FF8042"
              />
            </BarChart>
          </ChartCard>

          <ChartCard title="業種別予算">
            <ComposedChart
              data={industryData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="industry" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [
                  `${Number(value).toLocaleString()}円`,
                  "平均予算",
                ]}
              />
              <Legend />
              <Bar dataKey="avgBudget" name="予算平均" fill="#8884d8" />
              <Line
                type="monotone"
                dataKey={() => avgBudget}
                stroke="#ff7300"
                name="全体平均"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ChartCard>

          <ChartCard title="企業の研究分野傾向">
            <RadarChart data={fieldRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="件数"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ChartCard>

          <ChartCard title="企業規模別傾向">
            <BarChart data={scaleBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="件数" fill="#82ca9d" />
            </BarChart>
          </ChartCard>

          <ChartCard title="リピーター企業率">
            <PieChart>
              <Pie
                data={repeaterPie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {repeaterPie.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#0088FE" : "#FFBB28"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ChartCard>

          <ChartCard title="リピート回数分布">
            <BarChart data={repeaterHistogram}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="times" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="企業数" fill="#ffc658" />
            </BarChart>
          </ChartCard>

          <ChartCard title="継続案件の推移">
            <LineChart data={continuousLine}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                name="継続件数"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ChartCard>
        </div>
      </main>
    </div>
  );
}
