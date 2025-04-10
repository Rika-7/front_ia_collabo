"use client";
import React from "react";
import { Header } from "@/components/common/Header";

export default function Mypage() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header currentPage="マイページ" />
      <h1 className="text-4xl font-bold">研Q</h1>
      <p className="text-lg">マイページ</p>
    </div>
  );
}
