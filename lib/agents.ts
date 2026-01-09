export type AgentType =
  | "property-recommendation"
  | "market-analysis"
  | "negotiation"
  | "documentation"
  | "customer-support"
  | "financing"

export interface AgentTask {
  id: string
  title: string
  description: string
  icon: string
  prompt: string
  inputPlaceholder: string
}

export interface Agent {
  id: AgentType
  name: string
  description: string
  icon: string
  color: string
  tasks: AgentTask[]
  systemPrompt: string
  capabilities: string[]
  model: string
  temperature: number
}

export const agents: Record<AgentType, Agent> = {
  "property-recommendation": {
    id: "property-recommendation",
    name: "Property Recommendation Agent",
    description: "AI-powered property recommendations based on your preferences and budget",
    icon: "Home",
    color: "hsl(221 89% 50%)",
    model: "openai/gpt-5",
    temperature: 0.7,
    systemPrompt: `You are an expert real estate advisor specializing in Abuja property market. 
You help users find the perfect property based on their preferences, budget, and lifestyle needs.
Provide detailed recommendations with reasoning, market insights, and negotiation tips.`,
    capabilities: [
      "Analyze user preferences",
      "Match properties to requirements",
      "Provide market insights",
      "Estimate property value trends",
    ],
    tasks: [
      {
        id: "find-property",
        title: "Find Matching Properties",
        description: "Get personalized property recommendations",
        icon: "Search",
        prompt: "Based on the following preferences, recommend the best properties for me:",
        inputPlaceholder: "Budget: ₦50M, Bedrooms: 3, Location: Maitama, Type: Apartment",
      },
      {
        id: "investment-analysis",
        title: "Investment Analysis",
        description: "Analyze investment potential of properties",
        icon: "TrendingUp",
        prompt: "Analyze the investment potential of this property:",
        inputPlaceholder: "Property location and details...",
      },
    ],
  },
  "market-analysis": {
    id: "market-analysis",
    name: "Market Analysis Agent",
    description: "Deep market analysis and trend forecasting for Abuja real estate",
    icon: "TrendingUp",
    color: "hsl(145 60% 40%)",
    model: "openai/gpt-5",
    temperature: 0.5,
    systemPrompt: `You are an expert market analyst specializing in Abuja real estate trends.
Provide comprehensive market analysis, price trends, growth forecasts, and investment opportunities.
Base recommendations on historical data, current market conditions, and emerging trends.`,
    capabilities: [
      "Analyze market trends",
      "Forecast price movements",
      "Identify investment hotspots",
      "Compare neighborhood values",
    ],
    tasks: [
      {
        id: "market-trends",
        title: "Market Trends Analysis",
        description: "Analyze current market trends and forecasts",
        icon: "BarChart3",
        prompt: "Provide a comprehensive market analysis for:",
        inputPlaceholder: "Location or property type (e.g., Apartments in Maitama)",
      },
      {
        id: "price-forecast",
        title: "Price Forecast",
        description: "Get property price predictions",
        icon: "LineChart",
        prompt: "Forecast the price movement for properties in:",
        inputPlaceholder: "Neighborhood or area name...",
      },
    ],
  },
  negotiation: {
    id: "negotiation",
    name: "Negotiation Assistant",
    description: "Expert guidance for successful property negotiations",
    icon: "Handshake",
    color: "hsl(45 95% 55%)",
    model: "openai/gpt-5",
    temperature: 0.6,
    systemPrompt: `You are a skilled real estate negotiation expert. 
Help users develop winning negotiation strategies, understand market values, and achieve their goals.
Provide tactical advice, psychological insights, and counteroffer strategies.`,
    capabilities: [
      "Develop negotiation strategies",
      "Analyze fair pricing",
      "Create counteroffer plans",
      "Identify negotiation leverage",
    ],
    tasks: [
      {
        id: "negotiation-strategy",
        title: "Negotiation Strategy",
        description: "Get a negotiation plan",
        icon: "Target",
        prompt: "Help me develop a negotiation strategy for:",
        inputPlaceholder: "Property details, asking price, your budget...",
      },
      {
        id: "price-analysis",
        title: "Fair Price Analysis",
        description: "Determine fair market value",
        icon: "Calculator",
        prompt: "Analyze if this asking price is fair:",
        inputPlaceholder: "Property location, size, features, asking price...",
      },
    ],
  },
  documentation: {
    id: "documentation",
    name: "Documentation Agent",
    description: "Automated handling of property documentation and legal requirements",
    icon: "FileText",
    color: "hsl(0 72% 51%)",
    model: "openai/gpt-5",
    temperature: 0.3,
    systemPrompt: `You are a legal documentation expert for Nigerian real estate transactions.
Provide guidance on required documents, checklist management, and legal compliance.
Ensure all documentation meets regulatory standards for Abuja property transfers.`,
    capabilities: [
      "Generate document checklists",
      "Verify legal requirements",
      "Track documentation status",
      "Identify missing documents",
    ],
    tasks: [
      {
        id: "doc-checklist",
        title: "Documentation Checklist",
        description: "Get required documents list",
        icon: "CheckSquare",
        prompt: "Generate a documentation checklist for:",
        inputPlaceholder: "Transaction type (buy/sell/rent) and property details...",
      },
      {
        id: "legal-review",
        title: "Legal Compliance Check",
        description: "Verify legal compliance",
        icon: "Shield",
        prompt: "Check legal compliance for:",
        inputPlaceholder: "Transaction details and document list...",
      },
    ],
  },
  "customer-support": {
    id: "customer-support",
    name: "Customer Support Agent",
    description: "24/7 intelligent customer support for real estate inquiries",
    icon: "MessageCircle",
    color: "hsl(193 82% 31%)",
    model: "openai/gpt-5",
    temperature: 0.7,
    systemPrompt: `You are a friendly and knowledgeable customer support specialist for Abuja Premier Estates.
Answer user questions about properties, services, processes, and account management.
Provide helpful, accurate, and courteous assistance. Escalate complex issues appropriately.`,
    capabilities: [
      "Answer property questions",
      "Guide through processes",
      "Troubleshoot issues",
      "Provide account support",
    ],
    tasks: [
      {
        id: "property-questions",
        title: "Property Questions",
        description: "Get detailed property information",
        icon: "HelpCircle",
        prompt: "I have a question about properties:",
        inputPlaceholder: "What would you like to know about properties?",
      },
      {
        id: "process-help",
        title: "Process Guidance",
        description: "Get help with processes",
        icon: "Navigation",
        prompt: "Help me understand:",
        inputPlaceholder: "What process would you like help with?",
      },
    ],
  },
  financing: {
    id: "financing",
    name: "Financing Advisor Agent",
    description: "Expert financial guidance for property purchases and investments",
    icon: "Wallet",
    color: "hsl(283 65% 50%)",
    model: "openai/gpt-5",
    temperature: 0.6,
    systemPrompt: `You are a financial advisor specializing in real estate financing in Nigeria.
Provide guidance on mortgages, financing options, loan structures, and financial planning.
Help users understand their financial capacity and optimize their investment strategy.`,
    capabilities: [
      "Analyze financing options",
      "Calculate affordability",
      "Plan investment strategy",
      "Optimize loan structure",
    ],
    tasks: [
      {
        id: "financing-options",
        title: "Financing Options",
        description: "Explore financing solutions",
        icon: "DollarSign",
        prompt: "Help me explore financing options for:",
        inputPlaceholder: "Property price, down payment, desired loan term...",
      },
      {
        id: "affordability-check",
        title: "Affordability Analysis",
        description: "Check your buying capacity",
        icon: "CheckCircle",
        prompt: "Analyze my purchasing power:",
        inputPlaceholder: "Monthly income, existing debts, available down payment...",
      },
    ],
  },
}

export function getAgent(id: AgentType): Agent {
  return agents[id]
}

export function getAllAgents(): Agent[] {
  return Object.values(agents)
}
