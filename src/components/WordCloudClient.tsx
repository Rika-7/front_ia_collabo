// components/WordCloudClient.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";

const ReactWordcloud = dynamic(() => import("react-wordcloud"), { ssr: false });

type Word = {
  text: string;
  value: number;
};

type Props = {
  words: Word[];
};

const WordCloudClient: React.FC<Props> = ({ words }) => {
  if (!words || words.length === 0 || !words[0]?.text) {
    return <p className="text-gray-500">表示するキーワードがありません</p>;
  }

  return (
    <ReactWordcloud
      words={words}
      options={{
        rotations: 2,
        rotationAngles: [-45, 0],
        fontSizes: [20, 60],
      }}
    />
  );
};

export default WordCloudClient;
