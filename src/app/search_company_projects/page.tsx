"use client";

import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

// Define specific types for search parameters
interface SearchParams {
  keyword: string;
  budget: string;
  field: string;
  deadline: string;
}

export default function SearchCompanyProjects() {
  // Add state for search parameters with specific types
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: "",
    budget: "",
    field: "",
    deadline: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  // Handle search parameter changes
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...searchParams, keyword: e.target.value });
  };

  const handleBudgetChange = (value: string) => {
    setSearchParams({ ...searchParams, budget: value });
  };

  const handleFieldChange = (value: string) => {
    setSearchParams({ ...searchParams, field: value });
  };

  const handleDeadlineChange = (value: string) => {
    setSearchParams({ ...searchParams, deadline: value });
  };

  // Handle search button click
  const handleSearch = () => {
    // This would typically be an API call
    console.log("Searching with parameters:", searchParams);
    // Set isSearched to true to indicate a search was performed
    setIsSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="案件検索" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">企業からの依頼案件を検索</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Keyword Search */}
            <Card className="bg-gray-200">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">キーワード</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <Input
                    className="pl-10 bg-white"
                    placeholder="キーワードを入力"
                    value={searchParams.keyword}
                    onChange={handleKeywordChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget */}
            <Card className="bg-gray-200">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">予算</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Select
                    value={searchParams.budget}
                    onValueChange={handleBudgetChange}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="選択 ▼" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-md">
                      <SelectItem value="100">〜100万円まで</SelectItem>
                      <SelectItem value="100-250">
                        100万円〜250万円未満
                      </SelectItem>
                      <SelectItem value="250-500">
                        250万円〜500万円未満
                      </SelectItem>
                      <SelectItem value="500-750">
                        500万円〜750万円未満
                      </SelectItem>
                      <SelectItem value="750-1000">
                        750万円〜1000万円未満
                      </SelectItem>
                      <SelectItem value="1000+">1000万円以上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Research Field */}
            <Card className="bg-gray-200">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  <div className="flex items-center">
                    <span>研究</span>
                    <span>分野</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Select
                    value={searchParams.field}
                    onValueChange={handleFieldChange}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="選択 ▼" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-md">
                      <SelectItem value="humanities">人文・社会科学</SelectItem>
                      <SelectItem value="science">理学</SelectItem>
                      <SelectItem value="engineering">工学</SelectItem>
                      <SelectItem value="agriculture">
                        農学・環境科学
                      </SelectItem>
                      <SelectItem value="medicine">医学・歯学・薬学</SelectItem>
                      <SelectItem value="interdisciplinary">
                        複合領域・情報・デザイン
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Application Deadline */}
            <Card className="bg-gray-200">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  <div className="flex items-center">
                    <span>募集</span>
                    <span>締切</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Select
                    value={searchParams.deadline}
                    onValueChange={handleDeadlineChange}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="選択 ▼" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-md">
                      <SelectItem value="7days">7日以内</SelectItem>
                      <SelectItem value="14days">14日以内</SelectItem>
                      <SelectItem value="30days">30日以内</SelectItem>
                      <SelectItem value="60days">60日以内</SelectItem>
                      <SelectItem value="90days">90日以内</SelectItem>
                      <SelectItem value="no-limit">期限なし</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              className="h-14 text-lg bg-slate-600 hover:bg-slate-700 w-[300px]"
              onClick={handleSearch}
            >
              検索する
            </Button>
          </div>
        </div>

        {/* Results would go here */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">検索結果</h2>
          {isSearched ? (
            <div className="text-center text-gray-500 py-8">
              検索結果はありません。検索条件を変更してお試しください。
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              検索条件を設定して検索ボタンを押してください
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
