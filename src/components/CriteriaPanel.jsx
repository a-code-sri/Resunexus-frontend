import { useState } from "react";
import {
  Plus,
  Pencil,
  X,
  Check,
  Loader2,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Criteria management + weight sliders shown above the leaderboard.
 *
 * - Add / change a criterion  -> onSave(text, index|null)  (re-scores that ONE criterion via LLM)
 * - Remove a criterion        -> onRemove(index)           (no LLM, leaderboard just recomputes)
 * - Weight sliders            -> onWeightChange(index, value) (purely client-side)
 */
export default function CriteriaPanel({
  skills,
  weights,
  resultCount,
  busyLabel, // non-empty string while an LLM re-evaluation is running
  error,
  onSave,
  onRemove,
  onWeightChange,
  onResetWeights,
}) {
  const [open, setOpen] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [newText, setNewText] = useState("");

  const busy = Boolean(busyLabel);
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  const share = (w) =>
    totalWeight > 0 ? Math.round((w / totalWeight) * 100) : 0;

  const startEdit = (i) => {
    setEditingIndex(i);
    setEditText(skills[i]);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  };

  const confirmEdit = async () => {
    const text = editText.trim();
    if (!text || text === skills[editingIndex]) {
      cancelEdit();
      return;
    }
    const idx = editingIndex;
    cancelEdit();
    await onSave(text, idx);
  };

  const confirmAdd = async () => {
    const text = newText.trim();
    if (!text) return;
    const ok = await onSave(text, null);
    if (ok) setNewText("");
  };

  const handleRemove = (i) => {
    const ok = window.confirm(
      `Remove "${skills[i]}"?\n\nThe leaderboard will update instantly. ` +
        `Adding it back later requires re-evaluating all resumes for it.`
    );
    if (ok) onRemove(i);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3"
      >
        <span className="flex items-center gap-2 font-semibold text-slate-800 text-sm">
          <SlidersHorizontal size={15} className="text-indigo-500" />
          Criteria &amp; Weights
          <span className="text-xs font-normal text-slate-400">
            ({skills.length} criteria)
          </span>
        </span>
        {open ? (
          <ChevronUp size={16} className="text-slate-400" />
        ) : (
          <ChevronDown size={16} className="text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100">
          {busy && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm px-4 py-3">
              <Loader2 size={14} className="animate-spin flex-shrink-0" />
              {busyLabel}
            </div>
          )}

          {error && !busy && (
            <div className="mt-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 mb-2">
            <p className="text-xs text-slate-400">
              Drag a slider to set how much each criterion counts. Percentages
              show each criterion&apos;s share of the total score.
            </p>
            <button
              onClick={onResetWeights}
              disabled={busy}
              className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 disabled:opacity-40 whitespace-nowrap ml-4"
            >
              <RotateCcw size={12} />
              Reset to equal
            </button>
          </div>

          <ul className="divide-y divide-slate-100">
            {skills.map((skill, i) => (
              <li key={i} className="py-2.5 flex items-center gap-4">
                {/* Name / inline editor */}
                <div className="w-64 flex-shrink-0 min-w-0">
                  {editingIndex === i ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") confirmEdit();
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="flex-1 min-w-0 px-2 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                      <button
                        onClick={confirmEdit}
                        title="Save and re-evaluate"
                        className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        title="Cancel"
                        className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ) : (
                    <span
                      className="text-sm text-slate-700 block truncate"
                      title={skill}
                    >
                      {skill}
                    </span>
                  )}
                </div>

                {/* Weight slider */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={weights[i] ?? 0}
                  disabled={busy}
                  onChange={(e) => onWeightChange(i, Number(e.target.value))}
                  className="flex-1 accent-indigo-600 disabled:opacity-40"
                  aria-label={`Weight for ${skill}`}
                />

                <span className="w-12 text-right text-sm font-semibold text-slate-700 tabular-nums">
                  {share(weights[i] ?? 0)}%
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 w-16 justify-end">
                  <button
                    onClick={() => startEdit(i)}
                    disabled={busy}
                    title="Change criterion (re-evaluates all resumes for it)"
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded disabled:opacity-30"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleRemove(i)}
                    disabled={busy || skills.length <= 1}
                    title={
                      skills.length <= 1
                        ? "At least one criterion is required"
                        : "Remove criterion (no re-evaluation needed)"
                    }
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded disabled:opacity-30"
                  >
                    <X size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Add criterion */}
          <div className="mt-3 flex items-center gap-2">
            <input
              value={newText}
              disabled={busy}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && confirmAdd()}
              placeholder="Add a criterion, e.g. 'Cloud architecture experience'"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
            />
            <button
              onClick={confirmAdd}
              disabled={busy || !newText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus size={14} />
              Add &amp; evaluate
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Adding or changing a criterion re-evaluates all {resultCount}{" "}
            resume{resultCount === 1 ? "" : "s"} for that criterion only.
            Removing one needs no re-evaluation.
          </p>
        </div>
      )}
    </div>
  );
}