"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1");

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const handlePrev = () => {
    if (currentPage > 1) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", (currentPage - 1).toString());
      window.history.pushState(null, "", "?" + newParams.toString());
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", (currentPage + 1).toString());
    window.history.pushState(null, "", "?" + newParams.toString());
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="mx-auto flex w-fit items-center gap-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNext} className="rounded border px-4 py-2">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
