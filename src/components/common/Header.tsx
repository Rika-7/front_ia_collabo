import * as React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavigationItem {
  icon: string;
  label: string;
  notificationCount?: number;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { icon: "/icons/clipboard.svg", label: "マイページ", href: "/mypage" },

  {
    icon: "/icons/search.svg",
    label: "案件登録",
    href: "/project_registration",
  },
  {
    icon: "/icons/mail.svg",
    label: "メッセージ",
    notificationCount: 5,
    href: "/messages",
  },
  {
    icon: "/icons/clipboard.svg",
    label: "ダッシュボード",
    href: "/dashboard",
  },
];

interface HeaderProps {
  currentPage?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPage = "案件検索" }) => {
  return (
    <header className="flex justify-between items-center px-0 py-3 w-full bg-white border-b border-solid border-b-zinc-400 h-[68px]">
      {/* 研Qアイコン */}
      <div className="flex items-center pl-5">
        <Link href="/home">
          <Image
            src="/icons/kenq_logo.png"
            width={65}
            height={110}
            alt="Logo"
            loading="lazy"
          />
        </Link>
      </div>

      {/* メニューアイコン */}
      <nav className="flex gap-12 items-center ml-10">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex flex-col items-center relative pb-1"
          >
            <div className="flex gap-2.5 items-center text-base font-semibold cursor-pointer text-zinc-800">
              <div className="flex relative gap-2.5 items-center">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <span>{item.label}</span>
                {item.notificationCount && item.notificationCount > 0 && (
                  <div className="absolute -top-2 w-6 h-6 text-sm font-bold bg-red-500 rounded-full right-[-24px] text-white flex items-center justify-center">
                    {item.notificationCount}
                  </div>
                )}
              </div>
            </div>
            {item.label === currentPage && (
              <div className="h-1 bg-violet-900 w-full absolute bottom-0 rounded-t"></div>
            )}
          </Link>
        ))}
      </nav>

      {/* ユーザーアイコン */}
      <div className="flex gap-6 items-center mr-5">
        <i className="ti ti-bell max-sm:text-2xl" />
        <div className="flex gap-2 items-center">
          <Image
            src="/icons/user.svg"
            className="rounded-full"
            width={36}
            height={36}
            alt="Profile"
            loading="lazy"
          />
          <span className="text-sm font-bold text-zinc-800">
            Satoru Moriaki
          </span>
        </div>
      </div>
    </header>
  );
};
