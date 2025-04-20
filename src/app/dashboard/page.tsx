"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Header } from "@/components/common/Header";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dayjs from "dayjs";

interface CompanyRow {
  月: string;
  企業名: string;
  業種: string;
  案件数: string;
  依頼キーワード: string;
  エリア: string;
}

interface UniversityRow {
  月: string;
  研究者名: string;
  分野: string;
  希望予算: string;
  希望職位: string;
  アクセス数: string;
  マッチング数: string;
}

export default function DashboardPage() {
  const [dateFilter, setDateFilter] = useState({ start: "2025-01", end: "2028-12" });
  const [companyRaw, setCompanyRaw] = useState<CompanyRow[]>([]);
  const [universityRaw, setUniversityRaw] = useState<UniversityRow[]>([]);

  const [companyData, setCompanyData] = useState<any[]>([]);
  const [industryDist, setIndustryDist] = useState<any[]>([]);
  const [topCompanies, setTopCompanies] = useState<any[]>([]);
  const [areaDist, setAreaDist] = useState<any[]>([]);
  const [keywordData, setKeywordData] = useState<any[]>([]);
  const [universityData, setUniversityData] = useState<any[]>([]);
  const [fieldDist, setFieldDist] = useState<any[]>([]);
  const [budgetHist, setBudgetHist] = useState<any[]>([]);
  const [positionRank, setPositionRank] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/company_data.csv").then((res) => res.text()),
      fetch("/data/university_data.csv").then((res) => res.text()),
    ]).then(([companyText, universityText]) => {
      const parsedCompany = Papa.parse<CompanyRow>(companyText, {
        header: true,
        skipEmptyLines: true,
      }).data;
      const parsedUniversity = Papa.parse<UniversityRow>(universityText, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setCompanyRaw(parsedCompany);
      setUniversityRaw(parsedUniversity);
    });
  }, []);

  useEffect(() => {
    const isInRange = (month: string) => month >= dateFilter.start && month <= dateFilter.end;
    const formatGrouped = <T,>(rows: T[], key: keyof T, countField: keyof T) => {
      const map: Record<string, number> = {};
      rows.forEach((row: any) => {
        const keyVal = row[key];
        const count = parseInt(row[countField] || "0", 10);
        map[keyVal] = (map[keyVal] || 0) + count;
      });
      return Object.entries(map).map(([name, value]) => ({ name, value }));
    };

    const filteredCompany = companyRaw.filter((row) => isInRange(row["月"]));
    const filteredUniversity = universityRaw.filter((row) => isInRange(row["月"]));

    setCompanyData(
      Object.values(
        filteredCompany.reduce((acc: any, row) => {
          const month = row["月"];
          acc[month] = acc[month] || { month, companies: new Set(), cases: 0 };
          acc[month].companies.add(row["企業名"]);
          acc[month].cases += parseInt(row["案件数"] || "0", 10);
          return acc;
        }, {})
      )
        .map((d: any) => ({ month: d.month, companies: d.companies.size, cases: d.cases }))
        .sort((a: any, b: any) => a.month.localeCompare(b.month))
    );

    setIndustryDist(formatGrouped(filteredCompany, "業種", "案件数"));
    setTopCompanies(
      formatGrouped(filteredCompany, "企業名", "案件数").sort((a, b) => b.value - a.value).slice(0, 10)
    );
    setAreaDist(formatGrouped(filteredCompany, "エリア", "案件数"));

    const keywordMap: Record<string, number> = {};
    filteredCompany.forEach((row) => {
      const keyword = row["依頼キーワード"];
      if (keyword) keywordMap[keyword] = (keywordMap[keyword] || 0) + 1;
    });
    setKeywordData(Object.entries(keywordMap).map(([text, value]) => ({ text, value })));

    setUniversityData(
      Object.values(
        filteredUniversity.reduce((acc: any, row) => {
          const month = row["月"];
          acc[month] = acc[month] || {
            month,
            researchers: new Set(),
            access: 0,
            match: 0,
          };
          acc[month].researchers.add(row["研究者名"]);
          acc[month].access += parseInt(row["アクセス数"] || "0", 10);
          acc[month].match += parseInt(row["マッチング数"] || "0", 10);
          return acc;
        }, {})
      )
        .map((d: any) => ({ month: d.month, researchers: d.researchers.size, access: d.access, match: d.match }))
        .sort((a: any, b: any) => a.month.localeCompare(b.month))
    );

    setFieldDist(formatGrouped(filteredUniversity, "分野", "アクセス数"));

    const budgetMap: Record<string, number> = {};
    filteredUniversity.forEach((row) => {
      const budget = parseInt(row["希望予算"] || "0", 10);
      const bin = Math.floor(budget / 100) * 100;
      budgetMap[`${bin}万円`] = (budgetMap[`${bin}万円`] || 0) + 1;
    });
    setBudgetHist(Object.entries(budgetMap).map(([name, value]) => ({ name, value })));

    setPositionRank(
      formatGrouped(filteredUniversity, "希望職位", "アクセス数").sort((a, b) => b.value - a.value)
    );
  }, [companyRaw, universityRaw, dateFilter]);

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="ダッシュボード" />
      <main className="container mx-auto p-6 space-y-10">
        <div className="flex justify-end gap-4">
          <label className="text-sm font-medium">
            開始月:
            <input
              type="month"
              value={dateFilter.start}
              min="2000-01"
              max="2050-12"
              onChange={(e) => setDateFilter((prev) => ({ ...prev, start: e.target.value }))}
              className="ml-2 border px-2 py-1 rounded"
            />
          </label>
          <label className="text-sm font-medium">
            終了月:
            <input
              type="month"
              value={dateFilter.end}
              min="2000-01"
              max="2050-12"
              onChange={(e) => setDateFilter((prev) => ({ ...prev, end: e.target.value }))}
              className="ml-2 border px-2 py-1 rounded"
            />
          </label>
        </div>
        <div className="text-sm text-gray-500 mb-8">
          現在の期間フィルタ: {dateFilter.start} ～ {dateFilter.end}
        </div>

        <h2 className="text-2xl font-bold mb-4">企業データ</h2>
        <div className="grid grid-cols-2 gap-6">
          <ChartCard title="登録企業数の推移">
            <LineChart data={companyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="companies" stroke="#8884d8" name="企業数" /></LineChart>
          </ChartCard>
          <ChartCard title="登録案件数の推移">
            <BarChart data={companyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="cases" fill="#82ca9d" name="案件数" /></BarChart>
          </ChartCard>
          <ChartCard title="業種別案件分布">
            <BarChart data={industryDist} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Legend /><Bar dataKey="value" fill="#ffc658" name="案件数" /></BarChart>
          </ChartCard>
          <ChartCard title="依頼企業ランキング（件数順）">
            <BarChart data={topCompanies} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Legend /><Bar dataKey="value" fill="#8884d8" name="案件数" /></BarChart>
          </ChartCard>
          <ChartCard title="エリア別依頼企業の分布">
            <PieChart><Pie data={areaDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>{areaDist.map((entry, index) => (<Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"][index % 5]} />))}</Pie><Tooltip /><Legend /></PieChart>
          </ChartCard>
          <ChartCard title="依頼キーワードトレンド">
            <div className="text-center text-gray-500 pt-12">（工事中：WordCloudClientエラーのため）</div>
          </ChartCard>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">大学内データ</h2>
        <div className="grid grid-cols-2 gap-6">
          <ChartCard title="登録研究者数の推移">
            <LineChart data={universityData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="researchers" stroke="#8884d8" name="研究者数" /></LineChart>
          </ChartCard>
          <ChartCard title="アクセス数推移">
            <LineChart data={universityData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Line type="monotone" dataKey="access" stroke="#82ca9d" name="アクセス数" /></LineChart>
          </ChartCard>
          <ChartCard title="マッチング数推移">
            <BarChart data={universityData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Legend /><Bar dataKey="match" fill="#ffc658" name="マッチング数" /></BarChart>
          </ChartCard>
          <ChartCard title="分野別研究者数">
            <BarChart data={fieldDist} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Legend /><Bar dataKey="value" fill="#8884d8" name="研究者数" /></BarChart>
          </ChartCard>
          <ChartCard title="希望予算の分布">
            <BarChart data={budgetHist} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Legend /><Bar dataKey="value" fill="#82ca9d" name="件数" /></BarChart>
          </ChartCard>
          <ChartCard title="希望職位ランキング">
            <BarChart data={positionRank} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Legend /><Bar dataKey="value" fill="#ffc658" name="件数" /></BarChart>
          </ChartCard>
        </div>
      </main>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
