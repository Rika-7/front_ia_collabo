"use client";
import React from "react";
import { Header } from "@/components/common/Header";


interface Researcher {
  id: number;
  name: string;
  nameReading: string;
  affiliation: string;
  position: string;
  score: number;
  papers: number;
}

export default function ResearcherRecommendation() {
  const researchers: Researcher[] = [
    {
      id: 1,
      name: "米田 穣",
      nameReading: "ヨネダ ミノル",
      affiliation: "東京大学 総合研究博物館",
      position: "教授",
      score: 90,
      papers: 1,
    },
    {
      id: 2,
      name: "伊福部 達",
      nameReading: "イフクベ トオル",
      affiliation: "東京大学 先端科学技術研究センター",
      position: "名誉教授",
      score: 89,
      papers: 1,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header currentPage="案件登録" />
      
      <main className="px-20 py-6 bg-gray-50 min-h-[calc(100vh_-_68px)] max-md:px-12 max-md:py-4 max-sm:p-4">
        <header className="mb-8">
          <h1 className="text-xl font-normal mb-8">
            AIを用いた画像診断に関する最新の知見／ライフサイエンス／教授 ＞ レコメンド結果（研究者一覧）
          </h1>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">案件「AIを用いた画像診断に関する最新の知見」</h2>
            <div className="text-right">
              レコメンド数　{researchers.length}
            </div>
          </div>
        </header>

        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 bg-gray-200 py-2 px-4">
            <div className="col-span-2">名前</div>
            <div className="col-span-5">所属</div>
            <div className="col-span-1 text-center">スコア</div>
            <div className="col-span-1 text-center">件数</div>
            <div className="col-span-1 text-center">詳しく見る</div>
            <div className="col-span-2 text-center">連絡する</div>
          </div>

          {researchers.map((researcher, index) => (
            <div
              key={researcher.id}
              className={`grid grid-cols-12 py-4 px-4 border-b border-gray-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <div className="col-span-2">
                <div className="font-medium">{researcher.name}</div>
                <div className="text-sm text-gray-600">{researcher.nameReading}</div>
              </div>
              <div className="col-span-5">
                <div>{researcher.affiliation}</div>
                <div>{researcher.position}</div>
              </div>
              <div className="col-span-1 flex items-center justify-center">{researcher.score}</div>
              <div className="col-span-1 flex items-center justify-center">{researcher.papers}</div>
              <div className="col-span-1 flex justify-center items-center">
                <button className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800">●</span>
                </button>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <button className="bg-gray-700 text-white px-4 py-1 rounded">
                  連絡する
                </button>
              </div>
            </div>
          ))}
        </div>
        </main>
    </div>
  );
};
