"use client"

import { useState, useRef, useEffect, useCallback, Fragment, type FormEvent } from "react"
import Link from "next/link"
import { m, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  Send,
  Loader2,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  ChevronDown,
  Minimize2,
  Maximize2,
  CheckCircle,
  BrainCircuit,
  Copy,
  Check,
} from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"
// Chat is proxied through /api/chat (server-side route) to hide backend credentials
// and provide graceful fallback when the backend is not yet deployed.

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  verified?: boolean
  intent?: string
  topic?: string | null
  suggestions?: string[]
  suggestions_th?: string[]
  feedback?: "up" | "down" | null
  source?: "knowledge_base" | "llm" | "hybrid" | "cache" | "fallback" | "analysearch" | "rate_limit" | "intent_loop_cache"
  model_used?: string
  tokens_used?: number
  graphrag_hits?: number
  isStreaming?: boolean
  isAuthError?: boolean
  isError?: boolean        // G9: marks a failed message that can be retried
  retryQuery?: string      // G9: original query text for retry
  mode?: AnalysisMode      // G5: which mode produced this message
  page_links?: Array<{ label: string; url: string; section?: string }>
  external_links?: Array<{ label: string; url: string }>
  signedai_score?: number
  rct7_steps?: {
    tier: number
    steps_run: string[]
    trace: Record<string, string>
    elapsed_ms: number
    quality_score: number
    mode: "heuristic" | "llm"
  }
  metadata?: {
    intent?: string
    keywords?: string[]
    confidence?: number
    crystallized?: string
    iterations?: number
  }
}

type AnalysisMode = "chat" | "analyze" | "mirror"

/* ------------------------------------------------------------------ */
/* Quick-action scenarios (locale-aware) — G2                        */
/* ------------------------------------------------------------------ */

const SCENARIOS_TH = [
  { emoji: "🎯", label: "เข้าใจ RCT ใน 3 นาที", query: "RCT คืออะไร?" },
  { emoji: "🧪", label: "สูตร FDIA คืออะไร?", query: "FDIA คืออะไร?" },
  { emoji: "✅", label: "SignedAI ตรวจสอบอย่างไร?", query: "SignedAI ทำงานอย่างไร?" },
  { emoji: "🧠", label: "เลือกโมเดลอย่างไร?", query: "Delentia เลือกและสลับโมเดล AI อย่างไร?" },
  { emoji: "👤", label: "ใครสร้าง RCT?", query: "ใครสร้าง RCT?" },
  { emoji: "🏢", label: "RCT ต่างจาก ChatGPT อย่างไร?", query: "Delentia Labs แตกต่างจาก ChatGPT อย่างไร?" },
  { emoji: "💰", label: "ราคาและแพลน Tier", query: "RCT มี pricing plan อะไรบ้าง?" },
  { emoji: "🔐", label: "Data Sovereignty คืออะไร?", query: "Data Sovereignty และ Sovereignty Vault คืออะไร?" },
]

const SCENARIOS_EN = [
  { emoji: "🎯", label: "Understand RCT in 3 min", query: "What is RCT?" },
  { emoji: "🧪", label: "The FDIA formula", query: "What is the FDIA formula?" },
  { emoji: "✅", label: "AI verifies AI (SignedAI)", query: "How does SignedAI verification work?" },
  { emoji: "👤", label: "Who built this?", query: "Who created RCT?" },
  { emoji: "🏢", label: "RCT vs ChatGPT", query: "How is RCT different from ChatGPT or regular LLM APIs?" },
  { emoji: "💰", label: "Pricing & Tiers", query: "What are the RCT pricing plans and tiers?" },
  { emoji: "🔐", label: "Data Sovereignty", query: "What is Data Sovereignty and the Sovereignty Vault?" },
  { emoji: "🧬", label: "41 Algorithms", query: "What are the 41 algorithms in the RCT Ecosystem?" },
]

function useScenarios() {
  const isThai = typeof window !== "undefined" && window.location.pathname.startsWith("/th")
  return isThai ? SCENARIOS_TH : SCENARIOS_EN
}

/* ------------------------------------------------------------------ */
/* A3: classifyIntent — pure module-level function (stable reference) */
/* ------------------------------------------------------------------ */

function classifyIntent(text: string): AnalysisMode {
  const lower = text.toLowerCase()
  const ANALYZE_KEYWORDS = [
    "architecture", "layer", "algorithm", "fdia", "jitna", "signedai",
    "consensus", "rctdb", "genome", "benchmark", "hallucination", "แสดง", "วิเคราะห์",
    "อธิบาย", "explain", "compare", "breakdown", "how does", "what is",
    "สถาปัตยกรรม", "โปรโตคอล",
    "คืออะไร", "คือ", "ทำงานอย่างไร", "บอกเกี่ยวกับ",
    "แสดงรายละเอียด", "อธิบายระบบ", "ระบบทำงาน", "อธิบายเกี่ยวกับ",
    "อัลกอริทึม", "ผู้สร้าง", "เปรียบเทียบ", "ดีกว่า", "แผน", "โรดแมป", "วิธีใช้",
    "tier", "ราคา", "แพลน", "สมัคร", "sovereign", "privacy",
  ]
  const MIRROR_KEYWORDS = [
    "refine", "improve", "rewrite", "revise", "better", "alternative", "version",
    "ปรับปรุง", "เขียนใหม่", "แก้ไข",
  ]
  if (MIRROR_KEYWORDS.some((kw) => lower.includes(kw))) return "mirror"
  if (text.length > 80 || ANALYZE_KEYWORDS.some((kw) => lower.includes(kw))) return "analyze"
  return "chat"
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScenarios, setShowScenarios] = useState(true)
  // C1: Initialize messages from localStorage so history survives page refresh
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem("rct-chat-history")
      if (!stored) return []
      const parsed = JSON.parse(stored) as Array<Record<string, unknown>>
      return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp as string) })) as ChatMessage[]
    } catch {
      return []
    }
  })
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  // G2: locale-aware scenarios
  const scenarios = useScenarios()

  // P7 — Session ID: persistent across page navigations within the same browser session
  const [sessionId] = useState<string>(() => {
    if (typeof window === "undefined") return "rctlabs-v0-ssr"
    const stored = sessionStorage.getItem("rct-session-id")
    if (stored) return stored
    const id = "rctlabs-v0-" + Date.now()
    sessionStorage.setItem("rct-session-id", id)
    return id
  })

  // P6 — Authenticated user ID from Supabase session
  // B7: refresh on window focus so login/logout mid-session is reflected
  const [userId, setUserId] = useState<string>("anonymous")
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: { session } } = await supabase.auth.getSession()
        setUserId(session?.user?.id ?? "anonymous")
      } catch { /* not critical */ }
    }
    void fetchUserId()
    const onFocus = () => void fetchUserId()
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [])

  // Analysis mode state
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>("chat")
  // P8 — analysisResult is now read + used for metadata display
  const [analysisResult, setAnalysisResult] = useState<Record<string, unknown> | null>(null)
  // S3.2: Track which message IDs have the JITNA trace panel expanded
  const [expandedTraces, setExpandedTraces] = useState<Set<string>>(new Set())
  // D-copy: Track which message was just copied (for checkmark flash)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  /* Auto-scroll on new messages */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, loading])

  /* F5 — Mobile keyboard: when the virtual keyboard opens on iOS/Android,
     visualViewport fires a resize event. Scroll the message list to the
     bottom so the input stays visible and the latest reply isn't hidden. */
  useEffect(() => {
    if (!isOpen) return
    const vv = typeof window !== "undefined" ? window.visualViewport : null
    if (!vv) return
    const onResize = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
      }
    }
    vv.addEventListener("resize", onResize)
    return () => vv.removeEventListener("resize", onResize)
  }, [isOpen])

  /* D-kbd: Ctrl+Shift+A → toggle FloatingAI widget */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  /* Build conversation_history from last 6 messages for API context.
     Filters out empty streaming placeholders to avoid polluting history. */
  const buildHistory = useCallback((): Array<{ role: string; content: string; _topic?: string }> => {
    return messages.filter((m) => !m.isStreaming && m.content).slice(-8).map((_item) => ({
      role: _item.role,
      content: _item.content,
      ...(_item.topic ? { _topic: _item.topic } : {}),
    }))
  }, [messages])

  /* C1: Persist messages to localStorage (max 20) — survives page refresh */
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("rct-chat-history", JSON.stringify(messages.slice(-20)))
    }
  }, [messages])

  /* ---------------------------------------------------------------- */
  /* Send message to L3 API                                           */
  /* ---------------------------------------------------------------- */

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return

      // Capture history before any state changes
      const history = buildHistory()

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setLoading(true)
      setShowScenarios(false)

      // Add streaming placeholder immediately so user sees activity
      const assistantId = `asst-${Date.now()}`
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant" as const,
          content: "",
          timestamp: new Date(),
          feedback: null,
          source: "knowledge_base" as const,
          isStreaming: true,
        },
      ])

      try {
        const res = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            session_id: sessionId,
            message: text.trim(),
            language: typeof window !== "undefined" && window.location.pathname.startsWith("/th") ? "th" : "en",
            channel: "web",
            conversation_history: history,
          }),
        })

        if (!res.ok) {
          const isAuth = res.status === 401
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: isAuth
                      ? "กรุณาล็อกอินก่อนใช้งาน RCT AI Assistant"
                      : "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\nสามารถติดต่อทีมงานได้ที่ contact@delentia.com",
                    verified: false,
                    source: "fallback" as const,
                    isStreaming: false,
                    isAuthError: isAuth,
                  }
                : m,
            ),
          )
          return
        }

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        let accumulated = ""
        let finalMeta: Partial<ChatMessage> = {}

        if (reader) {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() ?? ""
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue
              const jsonStr = line.slice(6).trim()
              if (!jsonStr) continue
              try {
                const event = JSON.parse(jsonStr) as Record<string, unknown>
                if (event.done) {
                  // D1: Handle rate limit response from gateway (429 converted to SSE)
                  if (event.error === "rate_limit") {
                    const retryAfter = typeof event.retryAfter === "number" ? event.retryAfter : 60
                    const isThai = typeof window !== "undefined" && window.location.pathname.startsWith("/th")
                    finalMeta = {
                      content: isThai
                        ? `⏱ ระบบขอพักสักครู่ — กรุณารอ ${retryAfter} วินาทีแล้วลองใหม่`
                        : `⏱ Rate limit reached — please wait ${retryAfter}s and try again`,
                      source: "rate_limit" as const,
                      verified: false,
                    }
                  } else {
                    finalMeta = {
                      verified: true,
                      intent: typeof event.intent === "string" ? event.intent : undefined,
                      topic: typeof event.topic === "string" ? event.topic : null,
                      suggestions: Array.isArray(event.suggestions) ? (event.suggestions as string[]) : [],
                      suggestions_th: Array.isArray(event.suggestions_th) ? (event.suggestions_th as string[]) : [],
                      source: (event.source as ChatMessage["source"]) ?? "knowledge_base",
                      page_links: Array.isArray(event.page_links) ? (event.page_links as ChatMessage["page_links"]) : [],
                      external_links: Array.isArray(event.external_links) ? (event.external_links as ChatMessage["external_links"]) : [],
                      signedai_score: typeof event.signedai_score === "number" ? event.signedai_score : undefined,
                      rct7_steps: event.rct7_steps && typeof event.rct7_steps === "object"
                        ? (event.rct7_steps as ChatMessage["rct7_steps"])
                        : undefined,
                      graphrag_hits: typeof event.graphrag_hits === "number" ? event.graphrag_hits : undefined,
                    }
                  }
                } else {
                  accumulated += typeof event.token === "string" ? event.token : ""
                  setMessages((prev) =>
                    prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m)),
                  )
                }
              } catch {
                /* ignore malformed SSE event */
              }
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: accumulated || "ขออภัย — ไม่ได้รับข้อมูลจากระบบ",
                  isStreaming: false,
                  ...finalMeta,
                }
              : m,
          ),
        )
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\nสามารถติดต่อทีมงานได้ที่ contact@delentia.com หรือดูข้อมูลเพิ่มเติมได้ที่ /docs",
                  verified: false,
                  source: "fallback" as const,
                  isStreaming: false,
                  isError: true,
                  retryQuery: text,
                }
              : m,
          ),
        )
      } finally {
        setLoading(false)
      }
    },
    [loading, buildHistory, userId, sessionId],
  )

  /* ---------------------------------------------------------------- */
  /* Handlers                                                          */
  /* ---------------------------------------------------------------- */

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    handleAnalysisSubmit(input)
  }

  function handleSuggestion(text: string) {
    sendMessage(text)
  }

  function handleScenario(query: string) {
    sendMessage(query)
  }

  function handleFeedback(msgId: string, type: "up" | "down") {
    setMessages((prev) =>
      prev.map((_item) => (_item.id === msgId ? { ..._item, feedback: type } : _item)),
    )
    // Fire-and-forget feedback to backend analytics — failure is non-critical
    void fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_id: msgId, type, session_id: sessionId }),
    }).catch(() => { /* intentionally silent */ })
  }

  function handleClearChat() {
    setMessages([])
    setShowScenarios(true)
    setAnalysisResult(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("rct-chat-history")
    }
  }

  // Analysis function
  const runAnalysis = useCallback(
    async (text: string, mode: AnalysisMode) => {
      if (!text.trim() || loading) return

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setLoading(true)
      setShowScenarios(false)

      try {
        // B3: capture conversation history for context-aware analysis
        const history = buildHistory()
        // B5: max_iterations moved from query param to request body
        const endpoint = mode === "mirror" ? `/api/mirror` : `/api/analyze`

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: text.trim(),
            mode: mode === "mirror" ? "mirror" : "deep",
            query_type: "general",
            complexity: "high",
            session_id: sessionId,
            max_iterations: 3,
            conversation_history: history,
          }),
        })

        if (!res.ok) {
          const isAuth = res.status === 401
          // D1: Rate limit handling for analyze/mirror endpoints
          if (res.status === 429) {
            let retryAfter = 60
            try {
              const body = await res.clone().json() as { retryAfter?: number }
              if (typeof body.retryAfter === "number") retryAfter = body.retryAfter
            } catch { /* ignore */ }
            const isThai = typeof window !== "undefined" && window.location.pathname.startsWith("/th")
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                role: "assistant" as const,
                content: isThai
                  ? `⏱ ระบบขอพักสักครู่ — กรุณารอ ${retryAfter} วินาทีแล้วลองใหม่`
                  : `⏱ Rate limit reached — please wait ${retryAfter}s and try again`,
                timestamp: new Date(),
                source: "rate_limit" as const,
                verified: false,
              },
            ])
            return
          }
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant" as const,
              content: isAuth
                ? "กรุณาล็อกอินก่อนใช้งาน RCT AI Assistant"
                : "ขออภัย — ไม่สามารถวิเคราะห์คำถามได้ในขณะนี้",
              timestamp: new Date(),
              verified: false,
              source: "fallback" as const,
              isAuthError: isAuth,
            },
          ])
          return
        }

        const data = await res.json()
        setAnalysisResult(data)

        // Format analysis result for display
        const analysis = data.analysis || {}
        const formattedContent = formatAnalysisResult(analysis)

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: formattedContent,
            timestamp: new Date(),
            verified: data.status === "success",
            source: data.source || "analysearch",
            mode: mode,  // G5: stamp mode
            page_links: Array.isArray(analysis.page_links) ? (analysis.page_links as ChatMessage["page_links"]) : [],
            external_links: Array.isArray(analysis.external_links) ? (analysis.external_links as ChatMessage["external_links"]) : [],
            metadata: {
              intent: analysis.intent,
              keywords: analysis.keywords,
              confidence: analysis.confidence,
              crystallized: analysis.crystallized,
              iterations: analysis.iterations,
            },
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "ขออภัย — ไม่สามารถวิเคราะห์คำถามได้ในขณะนี้",
            timestamp: new Date(),
            verified: false,
            source: "fallback",
            isError: true,
            retryQuery: text,
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading, sessionId, buildHistory]
  )

  // Format analysis result
  const formatAnalysisResult = (analysis: Record<string, unknown>): string => {
    const lines: string[] = []
    
    // If backend is in fallback mode, show the helpful reply directly
    if (typeof analysis.reply === "string") {
      return analysis.reply
    }
    if (analysis.intent) {
      lines.push(`**Intent Detected:** ${analysis.intent}`)
    }
    if (analysis.confidence) {
      lines.push(`**Confidence:** ${((analysis.confidence as number) * 100).toFixed(1)}%`)
    }
    if (analysis.keywords && Array.isArray(analysis.keywords) && (analysis.keywords as string[]).length > 0) {
      lines.push(`**Keywords:** ${(analysis.keywords as string[]).join(", ")}`)
    }
    if (analysis.crystallized) {
      lines.push(`\n**Crystallized:** ${analysis.crystallized}`)
    }
    if (analysis.iterations) {
      lines.push(`**Mirror Iterations:** ${analysis.iterations}`)
    }
    
    return lines.join("\n") || "No analysis data available"
  }

  // Handle analysis mode submission
  const handleAnalysisSubmit = useCallback(
    (text: string) => {
      const detectedMode = classifyIntent(text)
      if (detectedMode !== analysisMode) {
        setAnalysisMode(detectedMode)
      }
      if (detectedMode === "chat") {
        sendMessage(text)
      } else {
        runAnalysis(text, detectedMode)
      }
    },
    [analysisMode, sendMessage, runAnalysis]
  )

  /* ---------------------------------------------------------------- */
  /* Source indicator helper                                           */
  /* ---------------------------------------------------------------- */

  function sourceIndicator(msg: ChatMessage) {
    if (msg.source === "llm") {
      return (
        <span className="text-purple-400" title={`Answered by ${msg.model_used || "Ollama LLM"}`}>
          🤖
        </span>
      )
    }
    if (msg.source === "hybrid") {
      return (
        <span className="text-blue-400" title={`Hybrid KB+LLM (${msg.model_used || "Ollama"})`}>
          🔗
        </span>
      )
    }
    if (msg.source === "cache" || msg.source === "intent_loop_cache") {
      return (
        <span className="text-cyan-400" title="Cached response (instant)">
          ⚡
        </span>
      )
    }
    if (msg.source === "fallback") {
      return (
        <span className="text-yellow-400" title="Fallback response">
          ⚠️
        </span>
      )
    }
    if (msg.source === "rate_limit") {
      return (
        <span className="text-orange-400" title="Rate limit — too many requests">
          ⏱
        </span>
      )
    }
    return (
      <span className="text-green-400" title="Answered by RCT Knowledge Base">
        ✓
      </span>
    )
  }

  /* ---------------------------------------------------------------- */
  /* Markdown renderer — G4: heading, bullet, numbered, divider       */
  /* ---------------------------------------------------------------- */

  // Inline renderer: **bold** and `code` only
  function renderInline(text: string) {
    const parts = text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="font-mono text-[0.8em] bg-warm-amber/20 dark:bg-warm-amber/10 px-1 rounded">
            {part.slice(1, -1)}
          </code>
        )
      }
      return <Fragment key={i}>{part}</Fragment>
    })
  }

  // Full block renderer — handles headings, bullets, numbered lists, dividers
  function renderMarkdown(text: string) {
    const lines = text.split("\n")
    return lines.map((line, lineIdx) => {
      // Horizontal divider
      if (line.trim() === "---") {
        return <hr key={lineIdx} className="border-border/30 my-1.5" />
      }
      // ## Heading 2
      if (line.startsWith("## ")) {
        return (
          <p key={lineIdx} className="font-bold text-sm mt-2 mb-0.5 text-foreground">
            {renderInline(line.slice(3))}
          </p>
        )
      }
      // # Heading 1
      if (line.startsWith("# ")) {
        return (
          <p key={lineIdx} className="font-bold text-base mt-2 mb-0.5 text-foreground">
            {renderInline(line.slice(2))}
          </p>
        )
      }
      // Bullet: • or -
      if (line.startsWith("• ") || line.startsWith("- ")) {
        const content = line.startsWith("• ") ? line.slice(2) : line.slice(2)
        return (
          <div key={lineIdx} className="flex gap-1.5 ml-1 my-0.5">
            <span className="text-warm-amber mt-0.5 shrink-0">•</span>
            <span>{renderInline(content)}</span>
          </div>
        )
      }
      // Numbered list: 1. 2. 3.
      const numMatch = line.match(/^(\d+)\.\s(.+)/)
      if (numMatch) {
        return (
          <div key={lineIdx} className="flex gap-1.5 ml-1 my-0.5">
            <span className="text-warm-amber font-mono text-xs min-w-[1.1rem] mt-0.5 shrink-0">{numMatch[1]}.</span>
            <span>{renderInline(numMatch[2])}</span>
          </div>
        )
      }
      // Empty line → spacer
      if (line.trim() === "") {
        return <span key={lineIdx} className="block h-1" />
      }
      // Normal line
      return <span key={lineIdx} className="block">{renderInline(line)}</span>
    })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  const lastAssistant = [...messages].reverse().find((msg) => msg.role === "assistant")
  const lastUser = [...messages].reverse().find((msg) => msg.role === "user")
  const isLastQueryThai = lastUser ? /[\u0e00-\u0e7f]/.test(lastUser.content) : false
  const suggestions = isLastQueryThai
    ? (lastAssistant?.suggestions_th?.length ? lastAssistant.suggestions_th : lastAssistant?.suggestions || [])
    : (lastAssistant?.suggestions || [])

  return (
    <>
      {/* ============ Floating Button ============ */}
      <AnimatePresence>
        {!isOpen && (
          <m.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal shadow-lg shadow-warm-amber/20 flex items-center justify-center animate-glow-pulse"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </m.button>
        )}
      </AnimatePresence>

      {/* ============ Chat Panel ============ */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-50 flex flex-col rounded-2xl border border-warm-light-gray dark:border-border bg-background/85 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "inset-4 md:inset-8"
                : "bottom-6 right-6 w-[min(25rem,calc(100vw-1.5rem))] h-[min(35rem,calc(100vh-3rem))]"
            }`}
          >
            {/* ---------- Header ---------- */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-warm-light-gray dark:border-border bg-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-warm-amber/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-warm-amber" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">RCT Assistant</p>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs px-1.5 py-0 text-warm-amber border-warm-amber/30">
                      SignedAI
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                    title="Clear conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                  aria-label={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ---------- Analysis Mode Selector ---------- */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-warm-light-gray dark:border-[#2A2A2A] bg-warm-cream/60 dark:bg-[#141414]/60">
              <button
                onClick={() => setAnalysisMode("chat")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  analysisMode === "chat"
                    ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                    : "text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:bg-[#EDE8E0] dark:hover:bg-[#2A2A2A]"
                }`}
              >
                <span>💬</span>
                <span>Chat</span>
              </button>
              <button
                onClick={() => setAnalysisMode("analyze")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  analysisMode === "analyze"
                    ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                    : "text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:bg-[#EDE8E0] dark:hover:bg-[#2A2A2A]"
                }`}
              >
                <span>🔍</span>
                <span>Analyze</span>
              </button>
              <button
                onClick={() => setAnalysisMode("mirror")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  analysisMode === "mirror"
                    ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                    : "text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:bg-[#EDE8E0] dark:hover:bg-[#2A2A2A]"
                }`}
              >
                <span>🪞</span>
                <span>Mirror</span>
              </button>
              {analysisMode !== "chat" && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {analysisMode === "mirror" ? "Iterative refinement" : "Deep intent analysis"}
                </span>
              )}
            </div>

            {/* ---------- B2: Login Banner for anonymous users ---------- */}
            {userId === "anonymous" && (
              <div className="px-4 py-1.5 border-b border-border/30 bg-warm-amber/5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">ล็อกอินเพื่อบันทึกประวัติการสนทนา</span>
                <Link
                  href="/auth/signin"
                  className="text-xs text-warm-amber hover:underline font-medium ml-2 whitespace-nowrap"
                >
                  Sign in →
                </Link>
              </div>
            )}

            {/* ---------- Context window indicator ---------- */}
            {messages.filter((m) => !m.isStreaming && m.content).length > 0 && (
              <div className="px-4 py-0.5 text-[10px] text-muted-foreground/50 text-right border-b border-border/20 bg-transparent select-none">
                {Math.min(messages.filter((m) => !m.isStreaming && m.content).length, 8)} / 8 messages in context
              </div>
            )}

            {/* ---------- Messages Area ---------- */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">

              {/* Scenario Picker (shown on first open) */}
              {showScenarios && messages.length === 0 && (
                <div className="space-y-3">
                  <div className="text-center py-2">
                    <Sparkles className="w-8 h-8 text-warm-amber mx-auto mb-2" />
                    <p className="text-sm text-foreground font-medium">Welcome to RCT Ecosystem</p>
                    <p className="text-xs text-muted-foreground mt-1">เลือกหัวข้อที่สนใจ หรือพิมพ์คำถามของคุณ</p>
                  </div>
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-0.5">
                    {scenarios.map((s) => (
                      <button
                        key={s.query}
                        onClick={() => handleScenario(s.query)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-warm-light-gray dark:border-[#2A2A2A] bg-warm-cream dark:bg-[#1E1E1E] hover:border-warm-amber/50 hover:bg-[#F5EFE6] dark:hover:bg-[#2A2A2A] transition-all text-left group"
                      >
                        <span className="text-lg">{s.emoji}</span>
                        <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground">{s.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#999] group-hover:text-warm-amber" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                          : "bg-[#EDE8E0] dark:bg-[#1E1E1E] text-warm-charcoal dark:text-warm-light-gray border border-[#D8D3CC] dark:border-[#2A2A2A]"
                      }`}
                    >
                      {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                      {msg.isStreaming && (
                        <span className="inline-block w-0.5 h-3.5 bg-warm-amber animate-pulse ml-0.5 align-text-bottom" />
                      )}
                      {msg.role === "assistant" && !msg.isStreaming && (
                        <span className="ml-1 text-xs">
                          {sourceIndicator(msg)}
                        </span>
                      )}
                      {msg.isAuthError && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <Link href="/auth/signin" className="text-xs text-warm-amber hover:underline">
                            → ล็อกอินเพื่อใช้งาน RCT AI Assistant
                          </Link>
                        </div>
                      )}

                      {/* Verification Badge */}
                      {msg.role === "assistant" && msg.verified && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs font-mono text-green-400">SignedAI Verified</span>
                          {msg.signedai_score !== undefined && (
                            <span className={`text-xs font-mono ml-1 ${msg.signedai_score >= 0.8 ? "text-green-400" : msg.signedai_score >= 0.5 ? "text-yellow-400" : "text-red-400"}`}>
                              {(msg.signedai_score * 100).toFixed(0)}%
                            </span>
                          )}
                          {/* B2: GraphRAG Knowledge Graph indicator */}
                          {msg.graphrag_hits !== undefined && msg.graphrag_hits > 0 && (
                            <span className="text-xs text-blue-400 ml-1" title={`${msg.graphrag_hits} related nodes from Knowledge Graph`}>
                              🕸️ Graph×{msg.graphrag_hits}
                            </span>
                          )}
                        </div>
                      )}

                      {/* S3.2: RCT7 JITNA Reasoning Trace (collapsible) */}
                      {msg.role === "assistant" && msg.rct7_steps && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <button
                            onClick={() => setExpandedTraces((prev) => {
                              const next = new Set(prev)
                              next.has(msg.id) ? next.delete(msg.id) : next.add(msg.id)
                              return next
                            })}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-warm-amber transition-colors"
                          >
                            <BrainCircuit className="w-3 h-3" />
                            <span>RCT7 Reasoning — Tier {msg.rct7_steps.tier} ({msg.rct7_steps.steps_run.length} steps, {msg.rct7_steps.mode})</span>
                            {expandedTraces.has(msg.id)
                              ? <ChevronDown className="w-3 h-3" />
                              : <ChevronRight className="w-3 h-3" />
                            }
                          </button>
                          {expandedTraces.has(msg.id) && (
                            <div className="mt-2 space-y-1.5 text-xs font-mono bg-muted/20 rounded-md p-2 border border-border/40">
                              {msg.rct7_steps.steps_run.map((step) => (
                                <div key={step} className="flex gap-2">
                                  <span className="text-warm-amber shrink-0 uppercase">[{step}]</span>
                                  <span className="text-muted-foreground leading-relaxed">{msg.rct7_steps!.trace[step]}</span>
                                </div>
                              ))}
                              <div className="text-muted-foreground/40 text-right mt-1">
                                quality: {(msg.rct7_steps.quality_score * 100).toFixed(0)}% · {msg.rct7_steps.elapsed_ms}ms
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Page Links */}
                      {msg.role === "assistant" && msg.page_links && msg.page_links.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-border/50">
                          {msg.page_links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              className="text-xs px-2 py-0.5 rounded-full bg-warm-amber/10 text-warm-amber border border-warm-amber/30 hover:bg-warm-amber/20 transition-colors"
                            >
                              → {link.label}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* External Links (GitHub etc.) */}
                      {msg.role === "assistant" && msg.external_links && msg.external_links.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {msg.external_links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground border border-border hover:border-warm-amber/40 transition-colors"
                            >
                              ↗ {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Feedback buttons for assistant messages */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1 mt-1 ml-1">
                      <button
                        onClick={() => handleFeedback(msg.id, "up")}
                        className={`p-0.5 rounded ${
                          msg.feedback === "up"
                            ? "text-green-400"
                            : "text-muted-foreground/40 hover:text-muted-foreground"
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, "down")}
                        className={`p-0.5 rounded ${
                          msg.feedback === "down"
                            ? "text-red-400"
                            : "text-muted-foreground/40 hover:text-muted-foreground"
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      {/* D-copy: Copy message content to clipboard */}
                      {!msg.isStreaming && msg.content && (
                        <button
                          onClick={() => {
                            void navigator.clipboard.writeText(msg.content).then(() => {
                              setCopiedId(msg.id)
                              setTimeout(() => setCopiedId(null), 2000)
                            })
                          }}
                          className="p-0.5 rounded text-muted-foreground/40 hover:text-muted-foreground"
                          title="Copy message"
                        >
                          {copiedId === msg.id
                            ? <Check className="w-3 h-3 text-green-400" />
                            : <Copy className="w-3 h-3" />
                          }
                        </button>
                      )}
                      {/* G5: mode badge */}
                      {msg.mode && msg.mode !== "chat" && (
                        <span className="text-xs text-muted-foreground/60 ml-1" title={`Answered in ${msg.mode} mode`}>
                          {msg.mode === "analyze" ? "🔍" : "🪩"}
                        </span>
                      )}
                      {msg.intent && (
                        <span className="text-xs text-muted-foreground/60 ml-1">{msg.intent}</span>
                      )}
                      {msg.source === "llm" && msg.model_used && (
                        <span className="text-xs text-muted-foreground/60 ml-1">({msg.model_used})</span>
                      )}
                      {/* G9: retry button for error messages */}
                      {msg.isError && msg.retryQuery && (
                        <button
                          onClick={() => sendMessage(msg.retryQuery!)}
                          className="ml-auto text-xs text-warm-amber hover:underline"
                          title="ลองใหม่"
                        >
                          ↺ ลองใหม่
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator — only for analyze/mirror mode.
                  Chat mode uses live-streaming message bubble instead. */}
              {loading && !messages.some((m) => m.isStreaming) && (
                <div className="flex justify-start">
                  <div className="bg-[#EDE8E0] dark:bg-[#1E1E1E] border border-[#D8D3CC] dark:border-[#2A2A2A] rounded-xl px-4 py-3">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-warm-amber rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-warm-amber rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-warm-amber rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ---------- Suggestions ---------- */}
            {suggestions.length > 0 && !loading && (
              <div className="px-3 pb-1 flex flex-wrap gap-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="text-xs px-2 py-1 rounded-full border border-warm-light-gray dark:border-[#2A2A2A] text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:border-warm-amber/50 transition-colors truncate max-w-45"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ---------- P8: Analysis Result Metadata Strip ---------- */}
            {analysisResult && analysisMode !== "chat" && (
              <div className="mx-3 mb-1 px-3 py-2 rounded-lg bg-warm-amber/5 border border-warm-amber/20 text-xs text-muted-foreground flex items-center gap-3 flex-wrap">
                <span className="text-warm-amber font-medium">
                  {analysisMode === "mirror" ? "🪞 Mirror" : "🔍 Analyse"}
                </span>
                {typeof (analysisResult as Record<string, unknown>).status === "string" && (
                  <span>Status: {String((analysisResult as Record<string, unknown>).status)}</span>
                )}
                {typeof ((analysisResult as Record<string, unknown>).analysis as Record<string, unknown> | undefined)?.confidence === "number" && (
                  <span>Confidence: {(((analysisResult as Record<string, unknown>).analysis as Record<string, unknown>).confidence as number * 100).toFixed(0)}%</span>
                )}
                {typeof ((analysisResult as Record<string, unknown>).analysis as Record<string, unknown> | undefined)?.iterations === "number" && (
                  <span>Iterations: {((analysisResult as Record<string, unknown>).analysis as Record<string, unknown>).iterations as number}</span>
                )}
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="ml-auto text-muted-foreground/50 hover:text-muted-foreground"
                  aria-label="Dismiss"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ---------- Input ---------- */}
            <form onSubmit={handleSubmit} className="border-t border-border px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={typeof window !== "undefined" && window.location.pathname.startsWith("/th") ? "ถามเกี่ยวกับ RCT Ecosystem..." : "Ask about RCT Ecosystem..."}
                className="flex-1 h-9 text-sm bg-secondary/30"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 bg-warm-charcoal hover:bg-[#333] dark:bg-warm-amber dark:hover:bg-[#C49A48] text-warm-sand dark:text-warm-charcoal shrink-0"
                disabled={loading || !input.trim()}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
