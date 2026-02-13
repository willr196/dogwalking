"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useRef, useState } from "react";
import {
  BREED_CATEGORIES,
  DOG_SIZES,
  type BreedCategory,
  type DogSize,
} from "@/lib/dog-breeds";

type BreedRecord = {
  id: string;
  slug: string;
  name: string;
  size: string;
  category: string;
  temperament: string;
  exercise: string;
  coatCare: string;
  idealFor: string;
  note: string;
  imageUrl: string | null;
  isActive: boolean;
  displayOrder: number;
};

type BreedFormState = {
  id: string | null;
  slug: string;
  name: string;
  size: DogSize;
  category: BreedCategory;
  temperament: string;
  exercise: string;
  coatCare: string;
  idealFor: string;
  note: string;
  imageUrl: string;
  isActive: boolean;
};

type Notice = {
  type: "success" | "error";
  text: string;
};

type Props = {
  initialBreeds: BreedRecord[];
  defaultBreedCount: number;
};

function sortBreeds(breeds: BreedRecord[]) {
  return [...breeds].sort((a, b) => {
    if (a.displayOrder === b.displayOrder) {
      return a.name.localeCompare(b.name);
    }
    return a.displayOrder - b.displayOrder;
  });
}

function parseDogSize(value: string): DogSize {
  return DOG_SIZES.find((size) => size === value) ?? "Medium";
}

function parseBreedCategory(value: string): BreedCategory {
  return BREED_CATEGORIES.find((category) => category === value) ?? "Family Favourites";
}

function toFormState(breed: BreedRecord | null): BreedFormState {
  if (!breed) {
    return {
      id: null,
      slug: "",
      name: "",
      size: "Medium",
      category: "Family Favourites",
      temperament: "",
      exercise: "",
      coatCare: "",
      idealFor: "",
      note: "",
      imageUrl: "",
      isActive: true,
    };
  }

  return {
    id: breed.id,
    slug: breed.slug,
    name: breed.name,
    size: parseDogSize(breed.size),
    category: parseBreedCategory(breed.category),
    temperament: breed.temperament,
    exercise: breed.exercise,
    coatCare: breed.coatCare,
    idealFor: breed.idealFor,
    note: breed.note,
    imageUrl: breed.imageUrl || "",
    isActive: breed.isActive,
  };
}

function normalizeOrder(breeds: BreedRecord[]) {
  return breeds.map((breed, index) => ({
    ...breed,
    displayOrder: index,
  }));
}

function moveItem(breeds: BreedRecord[], fromId: string, toId: string) {
  const fromIndex = breeds.findIndex((breed) => breed.id === fromId);
  const toIndex = breeds.findIndex((breed) => breed.id === toId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return breeds;
  }

  const next = [...breeds];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return normalizeOrder(next);
}

async function readJsonSafe(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

type BreedListResponse = {
  breeds?: BreedRecord[];
  error?: string;
};

type BreedMutationResponse = {
  error?: string;
  inserted?: number;
  created?: number;
  updated?: number;
  errors?: unknown[];
  url?: string;
};

async function readJsonSafeTyped<T>(response: Response): Promise<T | null> {
  return readJsonSafe(response) as Promise<T | null>;
}

export function AdminDogBreedsManager({
  initialBreeds,
  defaultBreedCount,
}: Props) {
  const [breeds, setBreeds] = useState<BreedRecord[]>(sortBreeds(initialBreeds));
  const [form, setForm] = useState<BreedFormState>(toFormState(null));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [orderDirty, setOrderDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const activeCount = useMemo(
    () => breeds.filter((breed) => breed.isActive).length,
    [breeds],
  );

  const selectedBreed = useMemo(
    () => breeds.find((breed) => breed.id === selectedId) || null,
    [breeds, selectedId],
  );

  const setSuccess = (text: string) => setNotice({ type: "success", text });
  const setError = (text: string) => setNotice({ type: "error", text });

  const loadBreeds = async (message?: string) => {
    const response = await fetch("/api/admin/dog-breeds", { cache: "no-store" });
    const payload = await readJsonSafeTyped<BreedListResponse>(response);

    if (!response.ok) {
      throw new Error(payload?.error || "Failed to load breeds");
    }

    const nextBreeds = sortBreeds(payload?.breeds ?? []);
    setBreeds(nextBreeds);
    setOrderDirty(false);

    if (selectedId) {
      const match = nextBreeds.find((breed) => breed.id === selectedId) || null;
      if (match) {
        setForm(toFormState(match));
      } else {
        setSelectedId(null);
        setForm(toFormState(null));
      }
    }

    if (message) {
      setSuccess(message);
    }
  };

  const startCreate = () => {
    setSelectedId(null);
    setForm(toFormState(null));
    setNotice(null);
  };

  const startEdit = (breed: BreedRecord) => {
    setSelectedId(breed.id);
    setForm(toFormState(breed));
    setNotice(null);
  };

  const handleFormField = <K extends keyof BreedFormState>(
    key: K,
    value: BreedFormState[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSaveBreed = async () => {
    setBusy(true);
    setNotice(null);

    try {
      if (!form.name.trim()) {
        throw new Error("Breed name is required");
      }

      const payload = {
        ...(form.id ? { id: form.id } : {}),
        slug: form.slug,
        name: form.name.trim(),
        size: form.size,
        category: form.category,
        temperament: form.temperament.trim(),
        exercise: form.exercise.trim(),
        coatCare: form.coatCare.trim(),
        idealFor: form.idealFor.trim(),
        note: form.note.trim(),
        imageUrl: form.imageUrl.trim(),
        isActive: form.isActive,
      };

      const response = await fetch("/api/admin/dog-breeds", {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await readJsonSafeTyped<BreedMutationResponse>(response);

      if (!response.ok) {
        throw new Error(result?.error || "Failed to save breed");
      }

      await loadBreeds(form.id ? "Breed updated" : "Breed created");
      if (!form.id) {
        setForm(toFormState(null));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save breed");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteBreed = async () => {
    if (!selectedBreed) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedBreed.name}? This cannot be undone.`,
    );
    if (!confirmed) {
      return;
    }

    setBusy(true);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/admin/dog-breeds?id=${encodeURIComponent(selectedBreed.id)}`,
        {
          method: "DELETE",
        },
      );

      const result = await readJsonSafeTyped<BreedMutationResponse>(response);
      if (!response.ok) {
        throw new Error(result?.error || "Failed to delete breed");
      }

      setSelectedId(null);
      setForm(toFormState(null));
      await loadBreeds("Breed deleted");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete breed");
    } finally {
      setBusy(false);
    }
  };

  const handleImportDefaults = async () => {
    setBusy(true);
    setNotice(null);

    try {
      const response = await fetch("/api/admin/dog-breeds/import-defaults", {
        method: "POST",
      });
      const result = await readJsonSafeTyped<BreedMutationResponse>(response);
      if (!response.ok) {
        throw new Error(result?.error || "Failed to import defaults");
      }

      await loadBreeds(`Imported ${result?.inserted ?? 0} default breeds`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to import");
    } finally {
      setBusy(false);
    }
  };

  const handleSaveOrder = async () => {
    if (!orderDirty) {
      return;
    }

    setBusy(true);
    setNotice(null);

    try {
      const response = await fetch("/api/admin/dog-breeds/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: breeds.map((breed) => breed.id) }),
      });

      const result = await readJsonSafeTyped<BreedMutationResponse>(response);
      if (!response.ok) {
        throw new Error(result?.error || "Failed to save order");
      }

      setOrderDirty(false);
      setSuccess("Order saved");
      await loadBreeds();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save order");
    } finally {
      setBusy(false);
    }
  };

  const handleDragStart = (breedId: string) => {
    setDraggingId(breedId);
  };

  const handleDragOver = (overBreedId: string) => {
    if (!draggingId || draggingId === overBreedId) {
      return;
    }

    setBreeds((current) => moveItem(current, draggingId, overBreedId));
    setOrderDirty(true);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleCsvImport = async (file: File) => {
    setBusy(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/dog-breeds/import", {
        method: "POST",
        body: formData,
      });

      const result = await readJsonSafeTyped<BreedMutationResponse>(response);
      if (!response.ok) {
        throw new Error(result?.error || "Failed to import CSV");
      }

      await loadBreeds(
        `CSV imported: ${result?.created ?? 0} created, ${result?.updated ?? 0} updated`,
      );

      if (Array.isArray(result?.errors) && result.errors.length > 0) {
        setError(`Imported with ${result.errors.length} row error(s).`);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed CSV import");
    } finally {
      setBusy(false);
      if (csvInputRef.current) {
        csvInputRef.current.value = "";
      }
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setNotice(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/dog-breeds/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await readJsonSafeTyped<BreedMutationResponse>(response);
      if (!response.ok) {
        throw new Error(result?.error || "Image upload failed");
      }

      handleFormField("imageUrl", result?.url || "");
      setSuccess("Image uploaded");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Image upload failed");
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="bg-[var(--warm-white)] rounded-xl p-4 border border-[var(--green)]/10">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wide">
            Total records
          </p>
          <p className="ww-serif text-2xl mt-1">{breeds.length}</p>
        </div>
        <div className="bg-[var(--warm-white)] rounded-xl p-4 border border-[var(--green)]/10">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wide">
            Active breeds
          </p>
          <p className="ww-serif text-2xl mt-1">{activeCount}</p>
        </div>
        <div className="bg-[var(--warm-white)] rounded-xl p-4 border border-[var(--green)]/10">
          <p className="text-xs text-[var(--muted)] uppercase tracking-wide">
            Ordering mode
          </p>
          <p className="text-sm mt-2 text-[var(--muted)]">
            Drag rows in the left list, then save order.
          </p>
        </div>
      </div>

      {notice && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            notice.type === "success"
              ? "bg-[var(--green)]/10 text-[var(--deep-green)] border border-[var(--green)]/25"
              : "bg-[var(--danger)]/10 text-[var(--danger)] border border-[var(--danger)]/25"
          }`}
        >
          {notice.text}
        </div>
      )}

      <section className="bg-[var(--warm-white)] rounded-2xl p-5 border border-[var(--green)]/10 shadow-[var(--shadow)]">
        <h2 className="ww-serif text-xl mb-4">Bulk Tools</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleImportDefaults}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-[var(--deep-green)] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            Import default breeds ({defaultBreedCount})
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/api/admin/dog-breeds/export";
            }}
            className="inline-flex items-center gap-2 bg-white border border-[var(--green)]/25 text-[var(--deep-green)] px-5 py-2.5 rounded-full text-sm font-semibold hover:border-[var(--green)]/45 transition-colors"
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={() => csvInputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-white border border-[var(--green)]/25 text-[var(--deep-green)] px-5 py-2.5 rounded-full text-sm font-semibold hover:border-[var(--green)]/45 transition-colors"
          >
            Import CSV
          </button>
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleCsvImport(file);
              }
            }}
          />
        </div>
      </section>

      <div className="grid xl:grid-cols-[360px_1fr] gap-6">
        <section className="bg-[var(--warm-white)] rounded-2xl p-5 border border-[var(--green)]/10 shadow-[var(--shadow)]">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h2 className="ww-serif text-xl">Drag to Reorder</h2>
            <button
              type="button"
              onClick={handleSaveOrder}
              disabled={!orderDirty || busy}
              className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Save order
            </button>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {breeds.map((breed, index) => {
              const isSelected = selectedId === breed.id;

              return (
                <div
                  key={breed.id}
                  draggable
                  onDragStart={() => handleDragStart(breed.id)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    handleDragOver(breed.id);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDragEnd();
                  }}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 cursor-grab active:cursor-grabbing transition-colors ${
                    isSelected
                      ? "border-[var(--green)]/45 bg-[var(--green)]/6"
                      : "border-[var(--green)]/15 bg-white hover:border-[var(--green)]/35"
                  }`}
                >
                  <span className="text-xs font-semibold text-[var(--muted)] w-6 text-right">
                    {index + 1}
                  </span>
                  <span
                    className="text-[var(--muted)] select-none"
                    aria-label="Drag handle"
                  >
                    ☰
                  </span>
                  <button
                    type="button"
                    onClick={() => startEdit(breed)}
                    className="min-w-0 text-left flex-1"
                  >
                    <p className="text-sm font-medium truncate">{breed.name}</p>
                    <p className="text-xs text-[var(--muted)] truncate">
                      {breed.slug} · {breed.category}
                    </p>
                  </button>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      breed.isActive
                        ? "bg-[var(--green)]/10 text-[var(--deep-green)]"
                        : "bg-[var(--orange)]/10 text-[var(--deep-orange)]"
                    }`}
                  >
                    {breed.isActive ? "active" : "off"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-[var(--warm-white)] rounded-2xl p-5 border border-[var(--green)]/10 shadow-[var(--shadow)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="ww-serif text-xl">
              {selectedBreed ? `Edit ${selectedBreed.name}` : "Add New Breed"}
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={startCreate}
                className="inline-flex items-center gap-2 bg-white border border-[var(--green)]/25 text-[var(--deep-green)] px-4 py-2 rounded-full text-xs font-semibold hover:border-[var(--green)]/45 transition-colors"
              >
                New
              </button>
              {selectedBreed && (
                <button
                  type="button"
                  onClick={handleDeleteBreed}
                  disabled={busy}
                  className="inline-flex items-center gap-2 bg-[var(--danger)] text-white px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(event) => handleFormField("name", event.target.value)}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(event) => handleFormField("slug", event.target.value)}
                  placeholder="auto-generated if blank"
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Size
                </label>
                <select
                  value={form.size}
                  onChange={(event) => {
                    handleFormField("size", parseDogSize(event.target.value));
                  }}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                >
                  {DOG_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(event) => {
                    handleFormField(
                      "category",
                      parseBreedCategory(event.target.value),
                    );
                  }}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                >
                  {BREED_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Temperament
                </label>
                <input
                  value={form.temperament}
                  onChange={(event) =>
                    handleFormField("temperament", event.target.value)
                  }
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Image URL
                </label>
                <input
                  value={form.imageUrl}
                  onChange={(event) => handleFormField("imageUrl", event.target.value)}
                  placeholder="https://... or use upload"
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploadingImage}
                className="inline-flex items-center gap-2 bg-white border border-[var(--green)]/25 text-[var(--deep-green)] px-4 py-2 rounded-full text-xs font-semibold hover:border-[var(--green)]/45 transition-colors disabled:opacity-60"
              >
                {uploadingImage ? "Uploading..." : "Upload image"}
              </button>
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    void handleImageUpload(file);
                  }
                }}
              />
              {form.imageUrl && (
                <span className="text-xs text-[var(--muted)] break-all">
                  {form.imageUrl}
                </span>
              )}
            </div>

            {form.imageUrl && (
              <div className="rounded-xl border border-[var(--green)]/15 bg-white p-3 inline-flex items-center gap-3">
                <img
                  src={form.imageUrl}
                  alt="Breed preview"
                  className="h-14 w-14 rounded-lg object-cover border border-[var(--green)]/20 bg-[var(--cream)]"
                />
                <p className="text-xs text-[var(--muted)]">Image preview</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Exercise
                </label>
                <textarea
                  rows={3}
                  value={form.exercise}
                  onChange={(event) => handleFormField("exercise", event.target.value)}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Coat care
                </label>
                <textarea
                  rows={3}
                  value={form.coatCare}
                  onChange={(event) => handleFormField("coatCare", event.target.value)}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Great for
                </label>
                <textarea
                  rows={3}
                  value={form.idealFor}
                  onChange={(event) => handleFormField("idealFor", event.target.value)}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Note
                </label>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={(event) => handleFormField("note", event.target.value)}
                  className="rounded-lg border border-[var(--green)]/20 px-3 py-2 text-sm bg-white"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-[var(--text)]">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  handleFormField("isActive", event.target.checked)
                }
                className="rounded border-[var(--green)]/30"
              />
              Active on public page
            </label>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleSaveBreed}
                disabled={busy}
                className="inline-flex items-center gap-2 bg-[var(--green)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {busy ? "Saving..." : selectedBreed ? "Save Changes" : "Create Breed"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
