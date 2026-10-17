"use client";

import { useSyncExternalStore } from "react";
import { defaultCmsContent, isCmsContent, type CmsContent } from "@/lib/cms-content";

type CmsSnapshot = {
  content: CmsContent;
  loaded: boolean;
  storageError: string;
};

const serverSnapshot: CmsSnapshot = {
  content: defaultCmsContent,
  loaded: false,
  storageError: "",
};

let browserSnapshot: CmsSnapshot | null = null;
let refreshTimer: ReturnType<typeof setInterval> | null = null;
let refreshInProgress = false;
let lastContentJson = "";
const subscribers = new Set<() => void>();

function getSnapshot() {
  if (typeof window === "undefined") return serverSnapshot;
  browserSnapshot ??= { ...serverSnapshot };
  return browserSnapshot;
}

function getServerSnapshot() {
  return serverSnapshot;
}

function notifySubscribers() {
  for (const subscriber of subscribers) subscriber();
}

function setContentSnapshot(content: CmsContent) {
  const serialized = JSON.stringify(content);
  if (serialized === lastContentJson && browserSnapshot?.storageError === "") return;
  lastContentJson = serialized;
  browserSnapshot = { content, loaded: true, storageError: "" };
  notifySubscribers();
}

async function refreshContent() {
  if (refreshInProgress) return;
  refreshInProgress = true;
  try {
    const response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) throw new Error(`Content request failed (${response.status}).`);
    const body: unknown = await response.json();
    if (!body || typeof body !== "object" || !isCmsContent((body as Record<string, unknown>).content)) {
      throw new Error("The local content database returned invalid content.");
    }
    setContentSnapshot((body as { content: CmsContent }).content);
  } catch (error) {
    console.error("Unable to refresh AURA content from the local database.", error);
    browserSnapshot = {
      ...(browserSnapshot ?? serverSnapshot),
      loaded: true,
      storageError: "Could not load saved site content from the local database.",
    };
    notifySubscribers();
  } finally {
    refreshInProgress = false;
  }
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  if (subscribers.size === 1) {
    void refreshContent();
    refreshTimer = setInterval(() => { void refreshContent(); }, 5000);
  }
  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0 && refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  };
}

async function saveCmsContent(content: CmsContent) {
  const response = await fetch("/api/content", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  const body: unknown = await response.json();
  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body
      ? String(body.error)
      : "Could not save site content.";
    throw new Error(message);
  }
  if (!body || typeof body !== "object" || !isCmsContent((body as Record<string, unknown>).content)) {
    throw new Error("The local database returned an invalid content update.");
  }
  setContentSnapshot((body as { content: CmsContent }).content);
}

export function useCmsContent() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { ...snapshot, saveContent: saveCmsContent };
}
