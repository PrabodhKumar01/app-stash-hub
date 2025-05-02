
import { AppItem } from "@/types/app";

export const defaultCategories = [
  "Productivity",
  "Development",
  "Design",
  "Social",
  "Entertainment",
  "Utilities",
  "Finance",
  "Education",
  "Other"
];

export const mockApps: AppItem[] = [
  {
    id: "1",
    name: "GitHub",
    url: "https://github.com",
    description: "GitHub is where over 100 million developers shape the future of software, together.",
    category: "Development",
    addedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Figma",
    url: "https://figma.com",
    description: "Figma is the collaborative interface design tool.",
    category: "Design",
    addedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Gmail",
    url: "https://mail.google.com",
    description: "Google's email service offering secure, spam-free email.",
    category: "Productivity",
    addedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Notion",
    url: "https://notion.so",
    description: "All-in-one workspace for notes, tasks, wikis, and databases.",
    category: "Productivity",
    addedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Vercel",
    url: "https://vercel.com",
    description: "Vercel combines the best developer experience with an obsessive focus on end-user performance.",
    category: "Development",
    addedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "YouTube",
    url: "https://youtube.com",
    description: "Enjoy the videos and music you love, upload original content, and share it with friends, family, and the world.",
    category: "Entertainment",
    addedAt: new Date().toISOString(),
  },
];
