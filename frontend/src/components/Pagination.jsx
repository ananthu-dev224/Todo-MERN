export default function Pagination({ page, pages, setPage }) {
  return (
    <div className="flex justify-center gap-2 mt-3">
      <button
        disabled={page <= 1}
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span className="font-semibold">{page} / {pages}</span>

      <button
        disabled={page >= pages}
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
