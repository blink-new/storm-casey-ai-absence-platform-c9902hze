export interface Employee {
  id: string
  name: string
  department: string
  daysAbsent: number
  riskLevel: 'low' | 'medium' | 'high'
  lastContact: string
  reason?: string
  startDate: string
  email: string
  manager: string
  isMyTeam?: boolean
}

export interface CaseyActivity {
  timestamp: string
  action: string
  impact: string
  status: 'complete' | 'in-progress' | 'pending'
}

export interface HumanNeeded {
  priority: 'high' | 'medium' | 'low'
  case: string
  reason: string
  suggestedAction: string
}

// Comprehensive employee data
export const allEmployees: Employee[] = [
  // Last 3 days
  { id: '1', name: 'Sarah Mitchell', department: 'Production', daysAbsent: 2, riskLevel: 'low', lastContact: '2 hours ago', reason: 'Sick leave', startDate: '2025-01-15', email: 'sarah.mitchell@company.com', manager: 'Alex Johnson', isMyTeam: true },
  { id: '2', name: 'John Davis', department: 'Engineering', daysAbsent: 1, riskLevel: 'low', lastContact: '4 hours ago', reason: 'Doctor appointment', startDate: '2025-01-16', email: 'john.davis@company.com', manager: 'Alex Johnson', isMyTeam: true },
  { id: '3', name: 'Emma Wilson', department: 'Marketing', daysAbsent: 3, riskLevel: 'low', lastContact: '1 day ago', reason: 'Personal day', startDate: '2025-01-14', email: 'emma.wilson@company.com', manager: 'Lisa Chen' },
  
  // Last 7 days
  { id: '4', name: 'Michael Brown', department: 'Finance', daysAbsent: 5, riskLevel: 'medium', lastContact: '2 days ago', reason: 'Flu symptoms', startDate: '2025-01-12', email: 'michael.brown@company.com', manager: 'Robert Kim' },
  { id: '5', name: 'Lisa Wang', department: 'HR', daysAbsent: 7, riskLevel: 'medium', lastContact: '1 day ago', reason: 'Family emergency', startDate: '2025-01-10', email: 'lisa.wang@company.com', manager: 'Jennifer Lee', isMyTeam: true },
  { id: '6', name: 'David Chen', department: 'Operations', daysAbsent: 6, riskLevel: 'medium', lastContact: '3 hours ago', reason: 'Medical procedure', startDate: '2025-01-11', email: 'david.chen@company.com', manager: 'Alex Johnson', isMyTeam: true },
  
  // Last 30 days
  { id: '7', name: 'Maria Rodriguez', department: 'Sales', daysAbsent: 15, riskLevel: 'high', lastContact: '5 days ago', reason: 'Extended medical leave', startDate: '2025-01-02', email: 'maria.rodriguez@company.com', manager: 'Tom Wilson' },
  { id: '8', name: 'Alex Thompson', department: 'Production', daysAbsent: 22, riskLevel: 'high', lastContact: '1 week ago', reason: 'Surgery recovery', startDate: '2024-12-26', email: 'alex.thompson@company.com', manager: 'Sarah Davis' },
  { id: '9', name: 'Jennifer Lee', department: 'IT', daysAbsent: 12, riskLevel: 'medium', lastContact: '2 days ago', reason: 'Stress leave', startDate: '2025-01-05', email: 'jennifer.lee@company.com', manager: 'Michael Park' },
  { id: '10', name: 'Robert Kim', department: 'Engineering', daysAbsent: 18, riskLevel: 'high', lastContact: '4 days ago', reason: 'Mental health leave', startDate: '2024-12-30', email: 'robert.kim@company.com', manager: 'Alex Johnson', isMyTeam: true },
  
  // Additional employees for comprehensive data
  { id: '11', name: 'Amanda Foster', department: 'Marketing', daysAbsent: 9, riskLevel: 'medium', lastContact: '1 day ago', reason: 'Maternity leave prep', startDate: '2025-01-08', email: 'amanda.foster@company.com', manager: 'Lisa Chen' },
  { id: '12', name: 'Carlos Mendez', department: 'Sales', daysAbsent: 4, riskLevel: 'low', lastContact: '6 hours ago', reason: 'Vacation', startDate: '2025-01-13', email: 'carlos.mendez@company.com', manager: 'Tom Wilson' },
  { id: '13', name: 'Rachel Green', department: 'Finance', daysAbsent: 11, riskLevel: 'medium', lastContact: '3 days ago', reason: 'Bereavement leave', startDate: '2025-01-06', email: 'rachel.green@company.com', manager: 'Robert Kim' },
  { id: '14', name: 'Kevin Park', department: 'Operations', daysAbsent: 25, riskLevel: 'high', lastContact: '1 week ago', reason: 'Long-term disability', startDate: '2024-12-23', email: 'kevin.park@company.com', manager: 'Jennifer Lee' },
  { id: '15', name: 'Sophie Turner', department: 'HR', daysAbsent: 8, riskLevel: 'medium', lastContact: '12 hours ago', reason: 'Training course', startDate: '2025-01-09', email: 'sophie.turner@company.com', manager: 'Jennifer Lee', isMyTeam: true },
]

export const caseyActivity: CaseyActivity[] = [
  {
    timestamp: "2 minutes ago",
    action: "Detected pattern in Production absences",
    impact: "Scheduled manager notification",
    status: "complete"
  },
  {
    timestamp: "10 minutes ago",
    action: "Analyzed 15 new absence reports",
    impact: "3 flagged for review",
    status: "complete"
  },
  {
    timestamp: "25 minutes ago", 
    action: "Sent follow-up messages to 8 employees",
    impact: "5 responses received",
    status: "complete"
  },
  {
    timestamp: "45 minutes ago",
    action: "Processed medical documentation",
    impact: "2 cases approved, 1 needs review",
    status: "complete"
  },
  {
    timestamp: "1 hour ago",
    action: "Updated risk assessments for 12 cases",
    impact: "2 cases escalated to high-risk",
    status: "complete"
  },
  {
    timestamp: "1.5 hours ago",
    action: "Automated return-to-work reminders",
    impact: "Sent to 6 employees due back tomorrow",
    status: "complete"
  },
  {
    timestamp: "2 hours ago",
    action: "Generated weekly absence report",
    impact: "Sent to 12 managers",
    status: "complete"
  },
  {
    timestamp: "3 hours ago",
    action: "Processed return-to-work forms",
    impact: "4 employees cleared for return",
    status: "complete"
  }
]

export const needsHuman: HumanNeeded[] = [
  {
    priority: "high",
    case: "Sarah Mitchell - Stakeholder Conflict",
    reason: "Conflicting medical opinions from two doctors. Casey detected inconsistencies that require human judgment to resolve.",
    suggestedAction: "Review medical documentation"
  },
  {
    priority: "high",
    case: "Kevin Park - Extended Absence",
    reason: "25+ days absence triggers mandatory HR review. Casey has prepared all documentation and risk assessment.",
    suggestedAction: "Schedule disability assessment"
  },
  {
    priority: "medium",
    case: "Production Team Pattern Alert",
    reason: "15% increase in Production absences detected. Casey identified potential workplace stress factors requiring investigation.",
    suggestedAction: "Approve wellness intervention"
  },
  {
    priority: "medium",
    case: "Maria Rodriguez - Documentation Gap",
    reason: "Medical certification expires in 3 days. Casey attempted contact but needs manager approval for extension request.",
    suggestedAction: "Approve extension request"
  },
  {
    priority: "medium",
    case: "Policy Compliance Update",
    reason: "New FMLA regulations require policy updates. Casey has drafted changes based on legal requirements.",
    suggestedAction: "Review policy changes"
  },
  {
    priority: "low",
    case: "Quarterly Absence Analytics",
    reason: "Q1 absence trends analysis complete. Casey identified 3 key recommendations for process improvements.",
    suggestedAction: "Review recommendations"
  }
]

// Filter functions
export const filterEmployees = {
  last3Days: (employees: Employee[]) => employees.filter(emp => emp.daysAbsent <= 3),
  last7Days: (employees: Employee[]) => employees.filter(emp => emp.daysAbsent <= 7),
  last30Days: (employees: Employee[]) => employees.filter(emp => emp.daysAbsent <= 30),
  myTeam: (employees: Employee[]) => employees.filter(emp => emp.isMyTeam),
  urgentOnly: (employees: Employee[]) => employees.filter(emp => emp.riskLevel === 'high'),
  highRisk: (employees: Employee[]) => employees.filter(emp => emp.riskLevel === 'high'),
  mediumRisk: (employees: Employee[]) => employees.filter(emp => emp.riskLevel === 'medium'),
  lowRisk: (employees: Employee[]) => employees.filter(emp => emp.riskLevel === 'low'),
  production: (employees: Employee[]) => employees.filter(emp => emp.department === 'Production'),
  engineering: (employees: Employee[]) => employees.filter(emp => emp.department === 'Engineering'),
  sales: (employees: Employee[]) => employees.filter(emp => emp.department === 'Sales'),
  hr: (employees: Employee[]) => employees.filter(emp => emp.department === 'HR'),
  finance: (employees: Employee[]) => employees.filter(emp => emp.department === 'Finance'),
  marketing: (employees: Employee[]) => employees.filter(emp => emp.department === 'Marketing'),
  operations: (employees: Employee[]) => employees.filter(emp => emp.department === 'Operations'),
  it: (employees: Employee[]) => employees.filter(emp => emp.department === 'IT')
}

// Query processing
export const processQuery = (query: string): Employee[] => {
  const lowerQuery = query.toLowerCase()
  let results = [...allEmployees]
  
  // Apply filters based on query content
  if (lowerQuery.includes('last 3 days') || lowerQuery.includes('3 days')) {
    results = filterEmployees.last3Days(results)
  } else if (lowerQuery.includes('last 7 days') || lowerQuery.includes('7 days') || lowerQuery.includes('week')) {
    results = filterEmployees.last7Days(results)
  } else if (lowerQuery.includes('last 30 days') || lowerQuery.includes('30 days') || lowerQuery.includes('month')) {
    results = filterEmployees.last30Days(results)
  }
  
  if (lowerQuery.includes('my team')) {
    results = filterEmployees.myTeam(results)
  }
  
  if (lowerQuery.includes('urgent') || lowerQuery.includes('high risk')) {
    results = filterEmployees.urgentOnly(results)
  }
  
  if (lowerQuery.includes('production')) {
    results = filterEmployees.production(results)
  } else if (lowerQuery.includes('engineering')) {
    results = filterEmployees.engineering(results)
  } else if (lowerQuery.includes('sales')) {
    results = filterEmployees.sales(results)
  } else if (lowerQuery.includes('hr')) {
    results = filterEmployees.hr(results)
  } else if (lowerQuery.includes('finance')) {
    results = filterEmployees.finance(results)
  } else if (lowerQuery.includes('marketing')) {
    results = filterEmployees.marketing(results)
  } else if (lowerQuery.includes('operations')) {
    results = filterEmployees.operations(results)
  } else if (lowerQuery.includes('it')) {
    results = filterEmployees.it(results)
  }
  
  // Handle specific action queries
  if (lowerQuery.includes('review new cases') || lowerQuery.includes('new cases')) {
    results = results.filter(emp => emp.daysAbsent <= 7).slice(0, 5)
  }
  
  if (lowerQuery.includes('pending approvals') || lowerQuery.includes('approvals')) {
    results = results.filter(emp => emp.riskLevel === 'medium' || emp.riskLevel === 'high').slice(0, 7)
  }
  
  if (lowerQuery.includes('follow-ups') || lowerQuery.includes('followups')) {
    results = results.filter(emp => emp.daysAbsent >= 5 && emp.daysAbsent <= 15).slice(0, 5)
  }
  
  return results
}

// Generate query summary
export const getQuerySummary = (query: string, results: Employee[]): string => {
  const count = results.length
  const highRisk = results.filter(r => r.riskLevel === 'high').length
  const lowerQuery = query.toLowerCase()
  
  if (lowerQuery.includes('last 3 days') || lowerQuery.includes('3 days')) {
    return `Found ${count} employees absent in the last 3 days${highRisk > 0 ? `, ${highRisk} high-risk` : ''}`
  } else if (lowerQuery.includes('last 7 days') || lowerQuery.includes('7 days') || lowerQuery.includes('week')) {
    return `Found ${count} employees absent in the last 7 days${highRisk > 0 ? `, ${highRisk} high-risk` : ''}`
  } else if (lowerQuery.includes('last 30 days') || lowerQuery.includes('30 days') || lowerQuery.includes('month')) {
    return `Found ${count} employees absent in the last 30 days${highRisk > 0 ? `, ${highRisk} high-risk` : ''}`
  } else if (lowerQuery.includes('my team')) {
    return `Found ${count} team members with absences${highRisk > 0 ? `, ${highRisk} high-risk` : ''}`
  } else if (lowerQuery.includes('urgent') || lowerQuery.includes('high risk')) {
    return `Found ${count} high-risk absence cases requiring immediate attention`
  } else if (lowerQuery.includes('review new cases') || lowerQuery.includes('new cases')) {
    return `${count} new absence cases submitted for review`
  } else if (lowerQuery.includes('pending approvals') || lowerQuery.includes('approvals')) {
    return `${count} absence cases pending manager approval`
  } else if (lowerQuery.includes('follow-ups') || lowerQuery.includes('followups')) {
    return `${count} employees requiring follow-up contact`
  } else if (lowerQuery.includes('report')) {
    return `Absence management report - ${count} total cases`
  }
  
  return `Found ${count} results for "${query}"`
}