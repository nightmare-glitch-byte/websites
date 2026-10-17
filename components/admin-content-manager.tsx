"use client";

import { useState, type FormEvent } from "react";
import { ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { type CmsRecord } from "@/lib/cms-content";
import { useCmsContent } from "@/components/use-cms-content";

type CollectionKey = "galleryItems" | "events" | "departments" | "aurathonEditions" | "team";

type EditorField = {
  key: string;
  label: string;
  multiline?: boolean;
  required?: boolean;
};

const collectionFields: Record<CollectionKey, EditorField[]> = {
  galleryItems: [
    { key: "title", label: "Photo title", required: true },
    { key: "category", label: "Category", required: true },
    { key: "meta", label: "Caption or event details" },
    { key: "image", label: "Uploaded image path" },
  ],
  events: [
    { key: "title", label: "Event name", required: true },
    { key: "date", label: "Date or timing", required: true },
    { key: "location", label: "Location" },
    { key: "summary", label: "Event description", multiline: true, required: true },
  ],
  departments: [
    { key: "name", label: "Department name", required: true },
    { key: "description", label: "Department description", multiline: true, required: true },
    { key: "focus", label: "Focus areas (one per line)", multiline: true },
  ],
  aurathonEditions: [
    { key: "year", label: "Edition year", required: true },
    { key: "title", label: "Edition title", required: true },
    { key: "subtitle", label: "Headline" },
    { key: "description", label: "Edition details", multiline: true, required: true },
    { key: "stats", label: "Statistics (value | label, one per line)", multiline: true },
    { key: "tracks", label: "Tracks (one per line)", multiline: true },
    { key: "sponsors", label: "Sponsors (one per line)", multiline: true },
    { key: "winners", label: "Winners (placement | team, one per line)", multiline: true },
    { key: "faqs", label: "FAQs (question | answer, one per line)", multiline: true },
    { key: "history", label: "Edition history", multiline: true },
    { key: "image", label: "Uploaded image path" },
  ],
  team: [
    { key: "name", label: "Name or position", required: true },
    { key: "role", label: "Role", required: true },
    { key: "detail", label: "Bio", multiline: true },
    { key: "image", label: "Uploaded image path" },
  ],
};

const collectionLabels: Record<CollectionKey, string> = {
  galleryItems: "Gallery",
  events: "Events",
  departments: "Departments",
  aurathonEditions: "AURATHON editions",
  team: "Team",
};

const panelNames = ["Gallery", "Events", "Departments", "AURATHON editions", "AURA copy", "Team"] as const;
type PanelName = (typeof panelNames)[number];

function makeBlankRecord(fields: EditorField[]): CmsRecord {
  return Object.fromEntries([["id", ""], ...fields.map(({ key }) => [key, ""])]) as CmsRecord;
}

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function CollectionEditor({
  collection,
  items,
  categories,
  onSave,
  onDelete,
}: {
  collection: CollectionKey;
  items: CmsRecord[];
  categories: string[];
  onSave: (record: CmsRecord) => Promise<boolean>;
  onDelete: (id: string) => Promise<void>;
}) {
  const fields = collectionFields[collection];
  const [draft, setDraft] = useState(() => makeBlankRecord(fields));
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const beginNew = () => {
    setDraft(makeBlankRecord(fields));
    setEditingId("");
    setMessage("");
  };

  const edit = (record: CmsRecord) => {
    setDraft({ ...record });
    setEditingId(record.id);
    setMessage("");
  };

  const updateField = (key: string, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing = fields.find(({ key, required }) => required && !draft[key]?.trim());
    if (missing) {
      setMessage(`${missing.label} is required.`);
      return;
    }
    setBusy(true);
    try {
      if (!await onSave({ ...draft, id: editingId || newId() })) {
        setMessage("Unable to save. See the error above and try again.");
        return;
      }
      setMessage("Changes saved to the local database and published on the site.");
      setEditingId(editingId);
      if (!editingId) setDraft(makeBlankRecord(fields));
    } catch (error) {
      console.error("Unable to save AURA content.", error);
      setMessage(error instanceof Error ? error.message : "Could not save changes to the local database.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-3">
        <button type="button" onClick={beginNew} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-4 py-3 text-sm font-bold text-slate-950">
          <Plus size={17} /> Add {collectionLabels[collection].replace(/s$/, "")}
        </button>
        {items.map((item) => (
          <div key={item.id} className={`flex items-center gap-2 rounded-2xl border p-3 ${editingId === item.id ? "border-[#ffb347]/50 bg-[#ffb347]/10" : "border-white/10 bg-slate-950/30"}`}>
            <button type="button" onClick={() => edit(item)} className="min-w-0 flex-1 text-left">
              <span className="block truncate font-semibold text-white">{item.title || item.name || (item.year ? `${item.year} edition` : "Untitled")}</span>
              <span className="mt-1 block truncate text-xs text-slate-400">{item.category || item.role || item.date || item.year || ""}</span>
            </button>
            <button
              type="button"
              aria-label={`Delete ${item.title || item.name || item.year}`}
              disabled={busy}
              onClick={async () => {
                if (window.confirm("Delete this item? This cannot be undone.")) {
                  try {
                    await onDelete(item.id);
                    if (editingId === item.id) beginNew();
                  } catch (error) {
                    setMessage(error instanceof Error ? error.message : "Could not delete this item.");
                  }
                }
              }}
              className="rounded-xl p-2 text-slate-400 hover:bg-red-400/10 hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {items.length === 0 ? <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">No items yet. Add the first one to get started.</p> : null}
      </div>

      <form onSubmit={save} className="space-y-4 rounded-[26px] border border-white/10 bg-slate-950/30 p-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffb347]">{editingId ? "Edit item" : "New item"}</div>
          <h3 className="mt-2 text-xl font-bold text-white">{collectionLabels[collection]}</h3>
        </div>
        {fields.map((field) => (
          <label key={field.key} className="block text-sm font-medium text-slate-300">
            {field.label}
            {field.multiline ? (
              <textarea
                rows={field.key === "faqs" ? 5 : 3}
                required={field.required}
                value={draft[field.key] ?? ""}
                onChange={(event) => updateField(field.key, event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white"
              />
            ) : field.key === "category" ? (
              <select
                required={field.required}
                value={draft[field.key] ?? ""}
                onChange={(event) => updateField(field.key, event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white"
              >
                <option value="">Select a category</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            ) : (
              <input
                type={field.key === "year" ? "number" : "text"}
                min={field.key === "year" ? "1900" : undefined}
                max={field.key === "year" ? "9999" : undefined}
                step={field.key === "year" ? "1" : undefined}
                required={field.required}
                value={draft[field.key] ?? ""}
                onChange={(event) => updateField(field.key, event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white"
              />
            )}
            {field.key === "image" ? (
              <span className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-400">Choose a PNG, JPEG, WebP, or GIF up to 10 MB. Files are stored on this server.</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white">
                  <ImagePlus size={14} />
                  Choose image
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    aria-label="Upload image"
                    disabled={busy}
                    className="max-w-[150px] text-xs file:sr-only"
                    onChange={async (event) => {
                      const input = event.currentTarget;
                      const file = input.files?.[0];
                      if (!file) return;
                      if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
                        setMessage("Choose a PNG, JPEG, WebP, or GIF image no larger than 10 MB.");
                        input.value = "";
                        return;
                      }
                      setBusy(true);
                      try {
                        const formData = new FormData();
                        formData.set("image", file);
                        const response = await fetch("/api/media/upload", { method: "POST", body: formData });
                        const body: unknown = await response.json();
                        if (!response.ok) {
                          const errorMessage = body && typeof body === "object" && "error" in body ? String(body.error) : "Could not upload this image.";
                          throw new Error(errorMessage);
                        }
                        if (!body || typeof body !== "object" || !("url" in body) || typeof body.url !== "string") {
                          throw new Error("The server returned an invalid image upload response.");
                        }
                        updateField(field.key, body.url);
                        setMessage("Image uploaded to local storage. Save the item to publish it.");
                      } catch (error) {
                        console.error("Unable to upload image.", error);
                        setMessage(error instanceof Error ? error.message : "Could not upload this image.");
                      } finally {
                        setBusy(false);
                        input.value = "";
                      }
                    }}
                  />
                </span>
              </span>
            ) : null}
          </label>
        ))}
        {message ? <p role="status" className="text-sm text-[#ffdca8]">{message}</p> : null}
        <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-5 py-3 text-sm font-bold text-slate-950 disabled:opacity-50">
          <Save size={16} /> {busy ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}

function AboutEditor({ values, onSave }: { values: Record<string, string>; onSave: (values: Record<string, string>) => Promise<boolean> }) {
  const fields = [
    ["headline", "About headline"],
    ["description", "About AURA"],
    ["objective", "Objective"],
    ["vision", "Vision"],
    ["values", "Values"],
    ["teamIntro", "Team introduction"],
  ];
  const [draft, setDraft] = useState(values);
  const [message, setMessage] = useState("");

  return (
    <form
      className="max-w-3xl space-y-4 rounded-[26px] border border-white/10 bg-slate-950/30 p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          setMessage(await onSave(draft) ? "AURA copy saved to the local database." : "Unable to save. See the error above and try again.");
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "Could not save AURA copy.");
        }
      }}
    >
      {fields.map(([key, label]) => (
        <label key={key} className="block text-sm font-medium text-slate-300">
          {label}
          <textarea
            rows={key === "headline" ? 2 : 4}
            value={draft[key] ?? ""}
            onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white"
          />
        </label>
      ))}
      {message ? <p role="status" className="text-sm text-[#ffdca8]">{message}</p> : null}
      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ffb347] to-[#f16b54] px-5 py-3 text-sm font-bold text-slate-950">
        <Save size={16} /> Save AURA copy
      </button>
    </form>
  );
}

export function AdminContentManager() {
  const { content, saveContent, storageError, loaded } = useCmsContent();
  const [panel, setPanel] = useState<PanelName>("Gallery");
  const [categoryName, setCategoryName] = useState("");
  const [categoryMessage, setCategoryMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  const updateRecords = async (collection: CollectionKey, record: CmsRecord) => {
    const items = content[collection];
    const exists = items.some((item) => item.id === record.id);
    try {
      await saveContent({
        ...content,
        [collection]: exists
          ? items.map((item) => item.id === record.id ? record : item)
          : [...items, record],
      });
      setSaveError("");
      return true;
    } catch (error) {
      console.error("Unable to save AURA content.", error);
      setSaveError(error instanceof Error ? error.message : "Could not save changes to the local database.");
      return false;
    }
  };

  const removeRecord = async (collection: CollectionKey, id: string) => {
    try {
      await saveContent({ ...content, [collection]: content[collection].filter((item) => item.id !== id) });
      setSaveError("");
    } catch (error) {
      console.error("Unable to delete AURA content.", error);
      setSaveError(error instanceof Error ? error.message : "Could not save this deletion to the local database.");
      throw error;
    }
  };

  const addCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = categoryName.trim();
    if (!name) {
      setCategoryMessage("Enter a category name first.");
      return;
    }
    if (content.galleryCategories.some((category) => category.toLowerCase() === name.toLowerCase())) {
      setCategoryMessage("That category already exists.");
      return;
    }
    try {
      await saveContent({ ...content, galleryCategories: [...content.galleryCategories, name] });
      setCategoryName("");
      setSaveError("");
      setCategoryMessage("Category added to the local database.");
    } catch (error) {
      console.error("Unable to save gallery category.", error);
      setSaveError(error instanceof Error ? error.message : "Could not save this category to the local database.");
      setCategoryMessage("Could not save this category.");
    }
  };

  const collectionsByPanel: Record<PanelName, CollectionKey | null> = {
    Gallery: "galleryItems",
    Events: "events",
    Departments: "departments",
    "AURATHON editions": "aurathonEditions",
    "AURA copy": null,
    Team: "team",
  };
  const activeCollection = collectionsByPanel[panel];

  if (!loaded) {
    return <section className="mt-10 rounded-[30px] border border-white/10 bg-[#091b2a] p-7 text-slate-300">Loading local website content…</section>;
  }

  return (
    <section className="mt-10 rounded-[30px] border border-white/10 bg-[#091b2a] p-5 sm:p-7">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Website content</div>
          <h2 className="mt-2 text-2xl font-black text-white">Manage the public pages</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">Saved changes are written to the local database and appear on the public website.</p>
        </div>
        <span className="rounded-full border border-emerald-300/20 bg-emerald-200/10 px-3 py-2 text-xs font-semibold text-emerald-100">Local database · administrator access</span>
      </div>

      {storageError || saveError ? <p role="alert" className="mb-4 rounded-xl border border-red-300/20 bg-red-300/10 p-3 text-sm text-red-200">{storageError || saveError}</p> : null}

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {panelNames.map((name) => (
          <button key={name} type="button" onClick={() => setPanel(name)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${panel === name ? "border-transparent bg-gradient-to-r from-[#ffb347] to-[#2ec5c4] text-slate-950" : "border-white/10 bg-white/5 text-slate-200"}`}>
            {name}
          </button>
        ))}
      </div>

      {panel === "Gallery" ? (
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="font-bold text-white">Gallery categories</h3>
          <form onSubmit={addCategory} className="mt-3 flex flex-wrap gap-2">
            <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} aria-label="New gallery category" placeholder="Add a category" className="min-w-52 flex-1 rounded-xl border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-white" />
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white"><Plus size={15} /> Add category</button>
          </form>
          <div className="mt-3 flex flex-wrap gap-2">
            {content.galleryCategories.map((category) => (
              <span key={category} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/40 px-3 py-1.5 text-xs text-slate-200">
                {category}
                <button type="button" aria-label={`Remove ${category} category`} onClick={async () => {
                  if (content.galleryItems.some((item) => item.category === category)) {
                    setCategoryMessage("Move or delete the photos using that category before removing it.");
                    return;
                  }
                  try {
                    await saveContent({ ...content, galleryCategories: content.galleryCategories.filter((item) => item !== category) });
                    setSaveError("");
                    setCategoryMessage("Category removed.");
                  } catch (error) {
                    console.error("Unable to remove gallery category.", error);
                    setSaveError(error instanceof Error ? error.message : "Could not save the category change.");
                    setCategoryMessage("Could not save the category change.");
                  }
                }} className="font-bold text-slate-400 hover:text-red-300">×</button>
              </span>
            ))}
          </div>
          {categoryMessage ? <p role="status" className="mt-3 text-xs text-[#ffdca8]">{categoryMessage}</p> : null}
        </div>
      ) : null}

      {activeCollection ? (
        <CollectionEditor
          key={activeCollection}
          collection={activeCollection}
          items={content[activeCollection]}
          categories={content.galleryCategories}
          onSave={(record) => updateRecords(activeCollection, record)}
          onDelete={(id) => removeRecord(activeCollection, id)}
        />
      ) : (
        <AboutEditor
          key={`${panel}-${loaded}`}
          values={content.about}
          onSave={async (about) => {
            try {
              await saveContent({ ...content, about });
              setSaveError("");
              return true;
            } catch (error) {
              console.error("Unable to save AURA copy.", error);
              setSaveError(error instanceof Error ? error.message : "Could not save AURA copy.");
              return false;
            }
          }}
        />
      )}
    </section>
  );
}
