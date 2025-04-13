import { Header } from "@/components/common/Header";
import { CaseCard } from "@/components/ui/case_card";

export default function MyPage() {
  // In-progress cases data
  const inProgressCases = [
    {
      id: 1,
      title: "AIを用いた画像診断に関する最新の知見",
      registrationDate: "2025/04/07",
      recommendCount: 8,
      hasNotification: true,
    },
    {
      id: 2,
      title: "xxxxx",
      registrationDate: "yyyy/mm/dd",
      recommendCount: "nn",
    },
    {
      id: 3,
      title: "xxxxx",
      registrationDate: "yyyy/mm/dd",
      recommendCount: "nn",
    },
  ];

  // Completed cases data
  const completedCases = [
    {
      id: 1,
      title: "xxxxx",
    },
    {
      id: 2,
      title: "xxxxx",
    },
    {
      id: 3,
      title: "xxxxx",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="マイページ" />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-10">マイページ</h1>

        {/* In-progress cases section */}
        <div className="mb-32">
          {" "}
          {/* Increased bottom margin even more */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <h2 className="text-xl font-bold">進行中案件</h2>
            </div>
            <span className="text-lg font-bold">
              進行中案件 {inProgressCases.length}
            </span>
          </div>
          {/* Force centered grid with fixed width for each card */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
              {inProgressCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <CaseCard
                    number={caseItem.id}
                    title={caseItem.title}
                    registrationDate={caseItem.registrationDate}
                    recommendCount={caseItem.recommendCount}
                    hasNotification={caseItem.hasNotification}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completed cases section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
              <h2 className="text-xl font-bold">終了案件</h2>
            </div>
            <span className="text-lg font-bold">
              終了案件 {completedCases.length}
            </span>
          </div>

          {/* Force centered grid with fixed width for each card */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
              {completedCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <CaseCard
                    number={caseItem.id}
                    title={caseItem.title}
                    isCompleted
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
