import type { Agent } from "./agents"

export interface CollaborationWorkflow {
  id: string
  name: string
  description: string
  agents: Agent[]
  steps: WorkflowStep[]
  createdAt: Date
}

export interface WorkflowStep {
  id: string
  agentId: string
  task: string
  inputFromPrevious?: string
  position: number
}

export const collaborationWorkflows: CollaborationWorkflow[] = [
  {
    id: "complete-property-analysis",
    name: "Complete Property Analysis",
    description: "Get comprehensive analysis using multiple AI agents for informed decision making",
    agents: [], // Will be populated from agents list
    steps: [
      {
        id: "step1",
        agentId: "property-recommendation",
        task: "Analyze property features and potential",
        position: 1,
      },
      {
        id: "step2",
        agentId: "market-analysis",
        task: "Evaluate market conditions and trends",
        inputFromPrevious: "step1",
        position: 2,
      },
      {
        id: "step3",
        agentId: "negotiation",
        task: "Develop negotiation strategy",
        inputFromPrevious: "step2",
        position: 3,
      },
      {
        id: "step4",
        agentId: "financing",
        task: "Analyze financing options",
        inputFromPrevious: "step1",
        position: 4,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "investment-assessment",
    name: "Investment Assessment Workflow",
    description: "Comprehensive investment analysis combining market data, financing, and support",
    agents: [],
    steps: [
      {
        id: "step1",
        agentId: "property-recommendation",
        task: "Evaluate investment property features",
        position: 1,
      },
      {
        id: "step2",
        agentId: "market-analysis",
        task: "Analyze market growth potential",
        inputFromPrevious: "step1",
        position: 2,
      },
      {
        id: "step3",
        agentId: "financing",
        task: "Structure financing for ROI optimization",
        inputFromPrevious: "step2",
        position: 3,
      },
    ],
    createdAt: new Date(),
  },
  {
    id: "transaction-support",
    name: "Complete Transaction Support",
    description: "Full transaction support from analysis through documentation and closing",
    agents: [],
    steps: [
      {
        id: "step1",
        agentId: "property-recommendation",
        task: "Validate property choice",
        position: 1,
      },
      {
        id: "step2",
        agentId: "negotiation",
        task: "Prepare negotiation strategy",
        inputFromPrevious: "step1",
        position: 2,
      },
      {
        id: "step3",
        agentId: "documentation",
        task: "Prepare documentation checklist",
        position: 3,
      },
      {
        id: "step4",
        agentId: "customer-support",
        task: "Provide ongoing support",
        inputFromPrevious: "step3",
        position: 4,
      },
    ],
    createdAt: new Date(),
  },
]
