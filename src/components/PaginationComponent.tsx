"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") ?? "1");

  const handlePrev = () => {
    if (page > 1) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", (page - 1).toString());
      router.push("?" + newParams.toString());
    }
  };

  const handleNext = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", (page + 1).toString());
    router.push("?" + newParams.toString());
  };

  return (
    <div className="mx-auto flex w-fit items-center gap-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span>Page {page}</span>
      <button onClick={handleNext} className="rounded border px-4 py-2">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
