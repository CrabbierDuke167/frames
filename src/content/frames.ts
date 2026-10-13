/**
 * Frames content source of truth.
 *
 * Everything here is real, user-supplied information or an intentionally empty
 * placeholder. Do not invent copy, projects, clients or claims — add real
 * content by filling in the empty strings / arrays below.
 */

import amalJustine from "@/assets/amal-justine.jpg.asset.json";
import luqmanSubair from "@/assets/luqman-subair.jpg.asset.json";
import manasaKa from "@/assets/manasa-new-portrait.jpg.asset.json";
import zakiAbdulRahimi from "@/assets/zaki-new-portrait.jpg.asset.json";
import reel1 from "@/assets/reel-1.jpg.asset.json";
import reel2 from "@/assets/reel-2.jpg.asset.json";
import reel3 from "@/assets/reel-3.jpg.asset.json";

export type ServiceId = "smm" | "advertising" | "studio";

export type Service = {
  id: ServiceId;
  /** Nav + hero label */
  name: string;
  /** Short qualifier supplied by the brief */
  kind: string;
  path: "/smm" | "/advertising" | "/studio";
  /** Supplied later by Frames. Leave empty until then. */
  description: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Image or video URL. Leave empty until real assets are supplied. */
  media?: string;
  mediaType?: "image" | "video";
  service?: ServiceId;
  /** Supplied later by Frames. */
  description?: string;
  credits?: { role: string; name: string }[];
};

export type TeamMember = {
  name: string;
  role: string;
  instagram: string;
  /** Real profile photo URL, supplied later. */
  photo?: string;
};

export const brand = {
  name: "Frames",
  tagline: "your vision, our craft.",
  email: "framess.co@gmail.com",
  instagram: "theframesstudio",
  instagramUrl: "https://instagram.com/theframesstudio",
  /** Supplied later by Frames. */
  about: "",
};

export const services: Service[] = [
  { id: "smm", name: "SMM", kind: "Social Media Management", path: "/smm", description: "Frames’ Social Media Management (SMM) helps brands build a strong online presence through creative content, engaging reels, strategic planning, and consistent account management. We combine storytelling and digital strategy to strengthen brand identity, connect with audiences, and grow online engagement." },
  { id: "advertising", name: "Advertising", kind: "", path: "/advertising", description: "Frames’ Advertising service transforms brand ideas into compelling visual campaigns through cinematic video production, promotional reels, and creative storytelling. We craft engaging advertisements that capture attention, communicate your message, and help your brand stand out." },
  {
    id: "studio",
    name: "Frames Studio",
    kind: "Photo and video works, including events",
    path: "/studio",
    description: "Frames Studio specializes in professional event coverage, capturing the highlights, emotions, and unforgettable moments of every occasion. From celebrations to special events, we deliver cinematic videos and creative visual content that preserve memories and tell your story beautifully.",
  },
];

export const getService = (id: ServiceId) => services.find((s) => s.id === id)!;

/** Real projects go here. Empty until Frames supplies assets. */
export const projects: Project[] = [];

export const projectsFor = (service: ServiceId) => projects.filter((p) => p.service === service);

export const founders: TeamMember[] = [
  {
    name: "Zaki Abdul Rahimi",
    role: "CEO, Founder",
    instagram: "zakiabdulrahimi",
    photo: zakiAbdulRahimi.url,
  },
  {
    name: "Amal Justine",
    role: "Creative Head, \nCo Founder",
    instagram: "amaljustine",
    photo: amalJustine.url,
  },
  {
    name: "Manasa KA",
    role: "Operations Head, \nCo Founder",
    instagram: "manasaa.anil",
    photo: manasaKa.url,
  },
  {
    name: "Muhamad Luqman KS",
    role: "CFO, Co Founder",
    instagram: "luqman_subair",
    photo: luqmanSubair.url,
  },
  {
    name: "Noyal Noby",
    role: "Client Relations Executive, \nCo Founder",
    instagram: "luqman_subair",
    photo: luqmanSubair.url,
  },
];

/**
 * Wider Frames team. Instagram is optional — leave empty to hide the link.
 * Role is optional too — leave empty until a role is actually assigned.
 */
export const team: TeamMember[] = [
  { name: "Alwin Biju", role: "Marketing Lead", instagram: "al.w.in" },
  { name: "Sreehari K Praveen", role: "Creative & \nContent Lead", instagram: "sreehar1ii" },
  { name: "Diyon Daison", role: "Technical Lead", instagram: "diyon_daison" },
];

export type Reel = {
  label: string;
  url: string;
  /** Cover image URL. Leave empty to show the polished fallback. */
  cover?: string;
  description?: string;
  order: number;
  active: boolean;
  service: ServiceId;
};

/** Instagram reels, kept separate from portfolio projects. */
export const reels: Reel[] = [
  { label: "Advertising reel 1", url: "https://www.instagram.com/reel/DVOwdPKE5Y8/?obrf=ankyaGtrM3p4", cover: reel1.url, order: 1, active: true, service: "advertising" },
  { label: "Advertising reel 2", url: "https://www.instagram.com/reel/DXZGj90kcTd/?psln=NXdtMXoyaGhxM2Vz", cover: reel2.url, order: 2, active: true, service: "advertising" },
  { label: "Advertising reel 3", url: "https://www.instagram.com/reel/DYCpkJQxSWJ/?xtok=MXN1Njl0c3M5bXd1NQ==", cover: reel3.url, order: 3, active: true, service: "advertising" },
];

export const reelsFor = (service: ServiceId) =>
  reels.filter((r) => r.active && r.service === service).sort((a, b) => a.order - b.order);

export const navItems = [
  { label: "Work", to: "/work" as const },
  { label: "SMM", to: "/smm" as const, sectionId: "smm" },
  { label: "Advertising", to: "/advertising" as const, sectionId: "advertising" },
  { label: "Studio", to: "/studio" as const, sectionId: "studio" },
  { label: "About", to: "/about" as const, sectionId: "about" },
  { label: "Contact", to: "/contact" as const, sectionId: "contact" },
];
