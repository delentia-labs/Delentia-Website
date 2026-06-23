"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Workflow,
  Play,
  Plus,
  Settings,
  ChevronRight,
  Layers,
  Zap,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react"

interface WorkflowStep {
  id: string
  name: string
  type: "trigger" | "action" | "condition" | "transform"
  config: Record<string, unknown>
  status: "pending" | "running" | "completed" | "failed"
}

interface Workflow {
  id: string
  name: string
  description: string
  steps: WorkflowStep[]
  status: "active" | "paused" | "draft"
  lastRun?: string
}

const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "wf-001",
    name: "Intent Analysis Pipeline",
    description: "Analyze user intent and route to appropriate handler",
    status: "active",
    lastRun: "2026-03-13T10:30:00Z",
    steps: [
      { id: "s1", name: "Receive Input", type: "trigger", config: {}, status: "completed" },
      { id: "s2", name: "Analysearch", type: "action", config: { service: "analysearch" }, status: "completed" },
      { id: "s3", name: "Route by Intent", type: "condition", config: {}, status: "completed" },
      { id: "s4", name: "Execute Handler", type: "action", config: {}, status: "completed" },
    ],
  },
  {
    id: "wf-002",
    name: "Data Sync Flow",
    description: "Sync data between RCTDB and external services",
    status: "paused",
    lastRun: "2026-03-12T18:45:00Z",
    steps: [
      { id: "s1", name: "Schedule Trigger", type: "trigger", config: { cron: "0 * * * *" }, status: "pending" },
      { id: "s2", name: "Fetch Data", type: "action", config: { source: "rctdb" }, status: "pending" },
      { id: "s3", name: "Transform", type: "transform", config: {}, status: "pending" },
      { id: "s4", name: "Push to Target", type: "action", config: {}, status: "pending" },
    ],
  },
  {
    id: "wf-003",
    name: "Alert Processing",
    description: "Process system alerts and notify appropriate channels",
    status: "draft",
    steps: [
      { id: "s1", name: "Alert Trigger", type: "trigger", config: {}, status: "pending" },
      { id: "s2", name: "Classify Severity", type: "action", config: {}, status: "pending" },
      { id: "s3", name: "Notify Channel", type: "action", config: {}, status: "pending" },
    ],
  },
]

export function WorkflowOrchestrator() {
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [runningWorkflow, setRunningWorkflow] = useState<string | null>(null)

  const getStepIcon = (type: string) => {
    switch (type) {
      case "trigger":
        return <Zap className="w-4 h-4 text-yellow-500" />
      case "action":
        return <Play className="w-4 h-4 text-blue-500" />
      case "condition":
        return <Layers className="w-4 h-4 text-purple-500" />
      case "transform":
        return <Settings className="w-4 h-4 text-orange-500" />
      default:
        return <Workflow className="w-4 h-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      paused: "secondary",
      draft: "outline",
      completed: "default",
      failed: "destructive",
      running: "outline",
      pending: "outline",
    }
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>
  }

  const runWorkflow = useCallback((workflowId: string) => {
    setRunningWorkflow(workflowId)
    setWorkflows((prev) =>
      prev.map((wf) =>
        wf.id === workflowId
          ? { ...wf, steps: wf.steps.map((s) => ({ ...s, status: "running" as const })) }
          : wf
      )
    )

    // Simulate workflow execution
    setTimeout(() => {
      setRunningWorkflow(null)
      setWorkflows((prev) =>
        prev.map((wf) =>
          wf.id === workflowId
            ? {
                ...wf,
                steps: wf.steps.map((s, i) => ({
                  ...s,
                  status: i < wf.steps.length - 1 ? "completed" as const : "completed",
                })),
                lastRun: new Date().toISOString(),
              }
            : wf
        )
      )
    }, 3000)
  }, [])

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Workflow className="w-8 h-8" />
              Workflow Orchestrator
            </h1>
            <p className="text-muted-foreground mt-1">
              Design, manage, and monitor multi-step workflows
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Workflow
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflow List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold">Workflows</h2>
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className={`cursor-pointer transition-colors ${
                  selectedWorkflow?.id === workflow.id ? "border-accent" : ""
                }`}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <CardContent className="py-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{workflow.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {workflow.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(workflow.status)}
                        <span className="text-xs text-muted-foreground">
                          {workflow.steps.length} steps
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Workflow Details */}
          <div className="lg:col-span-2">
            {selectedWorkflow ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{selectedWorkflow.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => runWorkflow(selectedWorkflow.id)}
                          disabled={runningWorkflow === selectedWorkflow.id}
                        >
                          {runningWorkflow === selectedWorkflow.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4 mr-2" />
                          )}
                          Run
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {selectedWorkflow.description}
                    </p>
                    {selectedWorkflow.lastRun && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Last run: {new Date(selectedWorkflow.lastRun).toLocaleString()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Steps Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Workflow Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedWorkflow.steps.map((step, index) => (
                        <div key={step.id} className="flex items-center gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.status === "completed"
                                  ? "bg-green-100 dark:bg-green-900"
                                  : step.status === "running"
                                  ? "bg-blue-100 dark:bg-blue-900"
                                  : step.status === "failed"
                                  ? "bg-red-100 dark:bg-red-900"
                                  : "bg-gray-100 dark:bg-gray-800"
                              }`}
                            >
                              {step.status === "completed" ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : step.status === "running" ? (
                                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                              ) : step.status === "failed" ? (
                                <XCircle className="w-5 h-5 text-red-500" />
                              ) : (
                                getStepIcon(step.type)
                              )}
                            </div>
                            {index < selectedWorkflow.steps.length - 1 && (
                              <div className="w-0.5 h-6 bg-border" />
                            )}
                          </div>
                          <div className="flex-1 py-2">
                            <p className="font-medium">{step.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs capitalize">
                                {step.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground capitalize">
                                {step.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Execution History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Executions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Execution #142</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          2026-03-13 10:30:00
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">Execution #141</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          2026-03-13 09:15:00
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm">Execution #140</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          2026-03-13 08:00:00
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Workflow className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select a workflow to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
