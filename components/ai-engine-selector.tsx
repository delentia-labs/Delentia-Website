"use client"

import { useCallback, useEffect, useState } from "react"
import { Cpu } from "lucide-react"

interface AIModel {
  id: string
  name: string
  role: string
}

interface AIEngineSelectorProps {
  userId: string
  userTier: "ANONYMOUS" | "REGISTERED" | "SUBSCRIBER" | "ENTERPRISE"
  onModelSelect?: (modelId: string) => void
  currentModelId?: string
}

const ROLE_LABELS: Record<string, string> = {
  supreme_architect: "Supreme Architect",
  lead_builder: "Lead Builder",
  junior_builder: "Junior Builder",
  specialist: "Specialist",
  librarian: "Librarian",
  humanizer: "Humanizer",
  regional_core: "Regional Core LLM",
  regional_thai: "Thai NLP (Typhoon)",
}

const ROLE_COLORS: Record<string, string> = {
  supreme_architect: "text-purple-400",
  lead_builder: "text-blue-400",
  junior_builder: "text-green-400",
  specialist: "text-yellow-400",
  librarian: "text-cyan-400",
  humanizer: "text-pink-400",
  regional_core: "text-orange-400",
  regional_thai: "text-orange-400",
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export function AIEngineSelector({
  userId,
  userTier,
  onModelSelect,
  currentModelId,
}: AIEngineSelectorProps) {
  const [models, setModels] = useState<AIModel[]>([])
  const [selected, setSelected] = useState(currentModelId ?? "")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_BASE}/api/v1/ai-models?tier=${encodeURIComponent(userTier)}`)
      .then((r) => r.json())
      .then((data) => {
        setModels(data.models ?? [])
        if (data.models?.length) {
          setSelected((prev) => prev || data.models[0].id)
        }
      })
      .catch(() => setModels([]))
      .finally(() => setLoading(false))
  }, [userTier])

  const handleChange = useCallback(
    async (modelId: string) => {
      setSelected(modelId)
      setSaving(true)
      try {
        await fetch(`${API_BASE}/api/v1/user/${encodeURIComponent(userId)}/settings`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selected_model_id: modelId }),
        })
        onModelSelect?.(modelId)
      } finally {
        setSaving(false)
      }
    },
    [userId, onModelSelect],
  )

  if (loading) {
    return (
      <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 animate-pulse">
        <div className="h-4 w-32 rounded bg-white/5 mb-4" />
        <div className="h-10 rounded bg-white/5" />
      </div>
    )
  }

  const selectedModel = models.find((m) => m.id === selected)

  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="w-4 h-4 text-blue-400" />
        <label className="text-sm font-medium text-gray-300">
          AI Engine
        </label>
      </div>

      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value)}
        disabled={saving}
        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-colors disabled:opacity-50"
      >
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name} — {ROLE_LABELS[m.role] ?? m.role}
          </option>
        ))}
      </select>

      {selectedModel && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">Role:</span>
          <span className={`text-xs font-medium ${ROLE_COLORS[selectedModel.role] ?? "text-gray-400"}`}>
            {ROLE_LABELS[selectedModel.role] ?? selectedModel.role}
          </span>
          {saving && (
            <span className="text-xs text-yellow-500 ml-auto">Saving…</span>
          )}
        </div>
      )}
    </div>
  )
}
