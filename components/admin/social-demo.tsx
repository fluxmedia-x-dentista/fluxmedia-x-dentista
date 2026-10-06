import {
  BarChart3,
  CheckCircle2,
  CircleDot,
  Clock,
  FileText,
  Instagram,
  MessageSquare,
  Music2,
  Facebook,
  TrendingUp,
} from "lucide-react";

import { DemoBadge, Panel, Table } from "@/components/admin/kit";

/**
 * The social media workspace ships with illustrative demo data so the team can
 * see how the screens behave before real accounts are connected. Everything in
 * this file is clearly labelled "Demo data" and never reaches the public site.
 */

function DemoHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-extrabold">{title}</h1>
        <p className="mt-1.5 text-[13px] text-muted">{sub}</p>
      </div>
      <DemoBadge />
    </div>
  );
}

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CALENDAR_ITEMS: Record<
  number,
  { time: string; title: string; channel: string; status: string }[]
> = {
  0: [
    {
      time: "10:00",
      title: "Carousel — 3 automation tips",
      channel: "Instagram",
      status: "Scheduled",
    },
  ],
  1: [
    {
      time: "18:30",
      title: "Reel — behind the scenes",
      channel: "TikTok",
      status: "Draft",
    },
  ],
  2: [
    {
      time: "09:00",
      title: "Story poll — card finishes",
      channel: "Instagram",
      status: "Scheduled",
    },
    {
      time: "20:00",
      title: "Post — client spotlight",
      channel: "Facebook",
      status: "Needs review",
    },
  ],
  4: [
    {
      time: "12:00",
      title: "Reel — NFC card demo",
      channel: "Instagram",
      status: "Scheduled",
    },
  ],
  5: [
    {
      time: "17:00",
      title: "Post — weekend offer",
      channel: "Facebook",
      status: "Draft",
    },
  ],
};

export function DemoCalendar() {
  return (
    <div>
      <DemoHeader
        title="Content calendar"
        sub="Weekly plan per client. Connect a workspace to replace this sample week."
      />
      <div className="grid gap-3 lg:grid-cols-7">
        {WEEK_DAYS.map((day, index) => (
          <div key={day} className="card min-h-[180px] p-3">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-muted">
              {day}
            </p>
            <div className="flex flex-col gap-2">
              {(CALENDAR_ITEMS[index] ?? []).map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-line/15 bg-surface2/50 p-2.5"
                >
                  <p className="text-[11px] text-muted">{item.time}</p>
                  <p className="mt-0.5 text-[12.5px] font-semibold leading-snug">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    {item.channel} · {item.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const INBOX_THREADS = [
  {
    name: "Atlas Dental",
    channel: "Instagram DM",
    message: "Can you send the new reel for approval today?",
    time: "12 min ago",
    unread: true,
  },
  {
    name: "Riad Zahra",
    channel: "Facebook",
    message: "We loved the carousel. Same style next week please.",
    time: "2 h ago",
    unread: true,
  },
  {
    name: "Beni Mellal Fitness",
    channel: "Instagram comment",
    message: "Prices for the 500 cards pack?",
    time: "Yesterday",
    unread: false,
  },
];

export function DemoInbox() {
  return (
    <div>
      <DemoHeader
        title="Inbox"
        sub="Conversations pulled from the connected pages. Real orders live in the orders sheet."
      />
      <Panel>
        <ul className="divide-y divide-line/10">
          {INBOX_THREADS.map((thread) => (
            <li key={thread.name} className="flex items-start gap-3 py-3.5">
              <span className="mt-1 text-muted">
                <MessageSquare className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold">
                  {thread.name}
                  <span className="ms-2 text-[11.5px] font-normal text-muted">
                    {thread.channel}
                  </span>
                </p>
                <p className="mt-0.5 text-[13px] text-muted">
                  {thread.message}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11.5px] text-muted">
                {thread.unread ? (
                  <CircleDot className="h-3.5 w-3.5 text-sky" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                )}
                {thread.time}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

const METRICS = [
  { label: "Reach", value: "48.2k", delta: "+12%" },
  { label: "Engagement rate", value: "5.4%", delta: "+0.8 pt" },
  { label: "Profile visits", value: "3 180", delta: "+9%" },
  { label: "New followers", value: "742", delta: "+120" },
];

const BARS = [38, 52, 44, 61, 72, 58, 83, 69, 77, 91, 64, 88];

export function DemoAnalytics() {
  return (
    <div>
      <DemoHeader
        title="Analytics"
        sub="Sample performance overview for a 30 day window."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {METRICS.map((metric) => (
          <div key={metric.label} className="card p-5">
            <p className="text-[12.5px] text-muted">{metric.label}</p>
            <p className="mt-2 font-display text-2xl font-extrabold">
              {metric.value}
            </p>
            <p className="mt-1 inline-flex items-center gap-1 text-[12px] text-emerald-300">
              <TrendingUp className="h-3.5 w-3.5" />
              {metric.delta}
            </p>
          </div>
        ))}
      </div>

      <Panel title="Reach by week" className="mt-6">
        <div className="flex h-48 items-end gap-2">
          {BARS.map((value, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-brand/30 to-sky/70"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[12px] text-muted">
          <BarChart3 className="h-3.5 w-3.5" />
          Illustrative values only.
        </div>
      </Panel>
    </div>
  );
}

const REPORTS = [
  {
    name: "Atlas Dental — September",
    pages: 6,
    status: "Sent",
    date: "01 Oct 2026",
  },
  {
    name: "Riad Zahra — September",
    pages: 4,
    status: "Draft",
    date: "02 Oct 2026",
  },
  {
    name: "Beni Mellal Fitness — Q3",
    pages: 9,
    status: "Sent",
    date: "28 Sep 2026",
  },
];

export function DemoReports() {
  return (
    <div>
      <DemoHeader
        title="Reports"
        sub="Monthly PDF summaries shared with each client."
      />
      <Panel>
        <Table head={["Report", "Pages", "Status", "Date", ""]}>
          {REPORTS.map((report) => (
            <tr key={report.name} className="hover:bg-surface2/40">
              <td className="px-3 py-2.5 font-semibold">
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-muted" />
                  {report.name}
                </span>
              </td>
              <td className="px-3 py-2.5">{report.pages}</td>
              <td className="px-3 py-2.5">{report.status}</td>
              <td className="px-3 py-2.5 text-muted">{report.date}</td>
              <td className="px-3 py-2.5 text-end text-muted">
                <span className="inline-flex items-center gap-1.5 text-[12px]">
                  <Clock className="h-3.5 w-3.5" />
                  Demo
                </span>
              </td>
            </tr>
          ))}
        </Table>
      </Panel>
    </div>
  );
}

const ACCOUNTS = [
  {
    icon: Instagram,
    name: "@fluxmedia.ma",
    platform: "Instagram",
    state: "Connected",
  },
  {
    icon: Facebook,
    name: "FLUXMEDIA",
    platform: "Facebook Page",
    state: "Connected",
  },
  {
    icon: Music2,
    name: "@fluxmedia.ma",
    platform: "TikTok",
    state: "Not connected",
  },
];

export function DemoAccounts() {
  return (
    <div>
      <DemoHeader
        title="Social accounts"
        sub="Accounts used for publishing and reporting."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {ACCOUNTS.map((account) => {
          const Icon = account.icon;
          return (
            <div
              key={account.platform}
              className="card flex items-center gap-4 p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface2 text-sky">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-[13.5px] font-semibold">{account.name}</p>
                <p className="text-[12px] text-muted">{account.platform}</p>
              </div>
              <span
                className={
                  account.state === "Connected"
                    ? "text-[12px] font-semibold text-emerald-300"
                    : "text-[12px] text-muted"
                }
              >
                {account.state}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const LIBRARY = [
  { title: "Automation tips carousel", type: "Carousel", status: "Approved" },
  { title: "NFC card demo reel", type: "Reel", status: "In edit" },
  {
    title: "Client spotlight — Atlas Dental",
    type: "Post",
    status: "Approved",
  },
  { title: "Before / after workflow", type: "Carousel", status: "Idea" },
  { title: "Weekly tip — WhatsApp replies", type: "Story", status: "Approved" },
  { title: "Team behind the scenes", type: "Reel", status: "Idea" },
];

export function DemoContentLibrary() {
  return (
    <div>
      <DemoHeader
        title="Content library"
        sub="Drafts, approved assets and ideas per client."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {LIBRARY.map((item) => (
          <div key={item.title} className="card p-5">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {item.type}
            </p>
            <p className="mt-2 text-[13.5px] font-semibold leading-snug">
              {item.title}
            </p>
            <p className="mt-3 text-[12px] text-muted">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
