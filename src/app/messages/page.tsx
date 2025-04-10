"use client";
import React from "react";
import { Header } from "@/components/common/Header";

export default function Messages() {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header currentPage="メッセージ" />
      <h1 className="text-4xl font-bold">研Q</h1>
      <p className="text-lg">メッセージ</p>
    </div>
  );
}
