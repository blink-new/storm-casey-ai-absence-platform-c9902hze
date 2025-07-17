import { useState } from 'react'
import { NaturalLanguageInput } from './components/NaturalLanguageInput'
import { SmartChip } from './components/SmartChip'
import { ResultsLayer } from './components/ResultsLayer'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { TabsWrapper, TabsContent, TabsList, TabsTrigger } from './components/TabsWrapper'
import { caseyActivity, needsHuman, allEmployees, filterEmployees } from './data/mockData'

// Enhanced frequent actions with real counts
const getFrequentActions = () => {
  const newCases = filterEmployees.last7Days(allEmployees).length
  const highRisk = filterEmployees.urgentOnly(allEmployees).length
  const pendingApprovals = allEmployees.filter(emp => emp.riskLevel === 'medium' || emp.riskLevel === 'high').length
  const followUps = allEmployees.filter(emp => emp.daysAbsent >= 5 && emp.daysAbsent <= 15).length
  
  return [
    { label: "Review new cases", count: newCases, icon: "📋", query: "review new cases" },
    { label: "Check high risk", count: highRisk, icon: "⚠️", query: "show absent employees high risk" },
    { label: "Pending approvals", count: pendingApprovals, icon: "✓", query: "pending approvals" },
    { label: "Today's follow-ups", count: followUps, icon: "📅", query: "follow-ups" }
  ]
}

// Enhanced contextual chips with real functionality
const getContextualChips = () => {
  const last3Days = filterEmployees.last3Days(allEmployees).length
  const myTeam = filterEmployees.myTeam(allEmployees).length
  const urgent = filterEmployees.urgentOnly(allEmployees).length
  
  return [
    { label: "last 3 days", type: "timeframe", count: last3Days, query: "show absent employees last 3 days" },
    { label: "last 7 days", type: "timeframe", count: filterEmployees.last7Days(allEmployees).length, query: "show absent employees last 7 days" },
    { label: "last 30 days", type: "timeframe", count: filterEmployees.last30Days(allEmployees).length, query: "show absent employees last 30 days" },
    { label: "my team", type: "scope", count: myTeam, query: "show absent employees my team" },
    { label: "urgent only", type: "filter", count: urgent, query: "show absent employees urgent only" },
    { label: "production", type: "department", count: filterEmployees.production(allEmployees).length, query: "show absent employees production" },
    { label: "engineering", type: "department", count: filterEmployees.engineering(allEmployees).length, query: "show absent employees engineering" },
    { label: "sales", type: "department", count: filterEmployees.sales(allEmployees).length, query: "show absent employees sales" }
  ]
}

const autocompleteOptions = [
  { text: "show absent employees last 3 days", description: "View employees absent in the last 3 days" },
  { text: "show absent employees last 7 days", description: "View employees absent in the last week" },
  { text: "show absent employees last 30 days", description: "View employees absent in the last month" },
  { text: "show absent employees my team", description: "View absences in your direct team" },
  { text: "show absent employees high risk", description: "Display high-risk absence cases requiring attention" },
  { text: "show absent employees by department", description: "Group absence data by department" },
  { text: "show absent employees production", description: "View absences in Production department" },
  { text: "show absent employees engineering", description: "View absences in Engineering department" },
  { text: "show absent employees urgent only", description: "Show only urgent/high-risk cases" },
  { text: "review new cases", description: "Cases submitted in the last 7 days" },
  { text: "pending approvals", description: "Cases awaiting manager approval" },
  { text: "follow-ups", description: "Employees requiring follow-up contact" }
]

function App() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [showResults, setShowResults] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const frequentActions = getFrequentActions()
  const contextualChips = getContextualChips()

  const handleSubmit = async (value: string) => {
    setIsProcessing(true)
    setCurrentQuery(value)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsProcessing(false)
    setShowResults(true)
  }

  const handleQuickAction = async (actionQuery: string) => {
    setIsProcessing(true)
    setCurrentQuery(actionQuery)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsProcessing(false)
    setShowResults(true)
  }

  const handleChipClick = (chip: any) => {
    if (chip.query) {
      // Direct query execution
      handleQuickAction(chip.query)
    } else {
      // Add to input for combination
      const newQuery = query.trim() ? `${query} ${chip.label}` : `show absent employees ${chip.label}`
      setQuery(newQuery)
      
      // Update active filters for visual feedback
      setActiveFilters(prev => 
        prev.includes(chip.label) 
          ? prev.filter(f => f !== chip.label)
          : [...prev, chip.label]
      )
    }
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setQuery("")
    setCurrentQuery("")
    setActiveFilters([])
  }

  return (
    <div className="min-h-screen bg-page-background">
      {/* Mountain Hero Background */}
      <div className="relative h-screen flex flex-col">
        {/* Mountain SVG Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            viewBox="0 0 1200 800"
            className="w-full h-full object-cover opacity-10"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--casey-purple))" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(var(--casey-blue))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path
              d="M0,600 L200,400 L400,500 L600,300 L800,450 L1000,250 L1200,400 L1200,800 L0,800 Z"
              fill="url(#mountainGradient)"
            />
            <path
              d="M0,650 L150,500 L350,550 L550,350 L750,500 L950,300 L1200,450 L1200,800 L0,800 Z"
              fill="url(#mountainGradient)"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Main Content - Wrapped in Tabs */}
        <TabsWrapper activeTab={activeTab} onTabChange={setActiveTab}>
          {/* Header */}
          <header className="p-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-primary-text">Good morning, Alex</h1>
                <p className="text-secondary-text mt-1">How can Casey help you today?</p>
              </div>
              
              <TabsList className="bg-card-background border border-card-border">
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="casey">Casey's Work</TabsTrigger>
              </TabsList>
            </div>
          </header>

          <TabsContent value="home" className="flex-1 flex flex-col">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-full max-w-5xl space-y-8">
                {/* Quick Actions */}
                <div className="flex justify-center gap-4 mb-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleQuickAction("generate absence report")}
                    className="bg-card-background border-card-border hover:bg-chip-hover text-primary-text px-6 py-3 h-auto"
                  >
                    📊 Report
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleQuickAction("show absent employees urgent only")}
                    className="bg-card-background border-card-border hover:bg-chip-hover text-primary-text px-6 py-3 h-auto"
                  >
                    🚨 Urgent cases
                  </Button>
                </div>

                {/* Main Content - Cases Display */}
                {!isProcessing && query.length === 0 && (
                  <div className="animate-fade-in space-y-12">
                    {/* Recent Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* High Priority Cases */}
                      <Card className="p-6 bg-gradient-to-br from-risk-red/5 to-risk-red/10 border-risk-red/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-primary-text">High Priority</h3>
                          <span className="px-2 py-1 bg-risk-red/20 text-risk-red text-xs font-medium rounded-full">
                            {filterEmployees.urgentOnly(allEmployees).length} cases
                          </span>
                        </div>
                        <div className="space-y-3">
                          {filterEmployees.urgentOnly(allEmployees).slice(0, 3).map((emp, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm text-primary-text">{emp.name}</p>
                                <p className="text-xs text-secondary-text">{emp.daysAbsent} days absent</p>
                              </div>
                              <div className="w-2 h-2 bg-risk-red rounded-full"></div>
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 text-risk-red hover:bg-risk-red/10"
                          onClick={() => handleQuickAction("show absent employees urgent only")}
                        >
                          View all high priority
                        </Button>
                      </Card>

                      {/* Recent Activity */}
                      <Card className="p-6 bg-gradient-to-br from-casey-blue/5 to-casey-purple/5 border-casey-blue/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-primary-text">Recent Activity</h3>
                          <span className="px-2 py-1 bg-casey-blue/20 text-casey-blue text-xs font-medium rounded-full">
                            {filterEmployees.last7Days(allEmployees).length} new
                          </span>
                        </div>
                        <div className="space-y-3">
                          {filterEmployees.last7Days(allEmployees).slice(0, 3).map((emp, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm text-primary-text">{emp.name}</p>
                                <p className="text-xs text-secondary-text">{emp.department}</p>
                              </div>
                              <div className="w-2 h-2 bg-casey-blue rounded-full"></div>
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 text-casey-blue hover:bg-casey-blue/10"
                          onClick={() => handleQuickAction("show absent employees last 7 days")}
                        >
                          View recent cases
                        </Button>
                      </Card>

                      {/* Team Overview */}
                      <Card className="p-6 bg-gradient-to-br from-success-green/5 to-success-green/10 border-success-green/20">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-primary-text">My Team</h3>
                          <span className="px-2 py-1 bg-success-green/20 text-success-green text-xs font-medium rounded-full">
                            {filterEmployees.myTeam(allEmployees).length} members
                          </span>
                        </div>
                        <div className="space-y-3">
                          {filterEmployees.myTeam(allEmployees).slice(0, 3).map((emp, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm text-primary-text">{emp.name}</p>
                                <p className="text-xs text-secondary-text">{emp.daysAbsent} days</p>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${
                                emp.riskLevel === 'high' ? 'bg-risk-red' : 
                                emp.riskLevel === 'medium' ? 'bg-human-needed' : 'bg-success-green'
                              }`}></div>
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 text-success-green hover:bg-success-green/10"
                          onClick={() => handleQuickAction("show absent employees my team")}
                        >
                          View team status
                        </Button>
                      </Card>
                    </div>

                    {/* Department Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['production', 'engineering', 'sales'].map((dept) => {
                        const deptEmployees = filterEmployees[dept as keyof typeof filterEmployees](allEmployees)
                        const highRisk = deptEmployees.filter(emp => emp.riskLevel === 'high').length
                        return (
                          <Card key={dept} className="p-4 bg-card-background border-card-border hover:shadow-hover transition-all duration-200 cursor-pointer"
                                onClick={() => handleQuickAction(`show absent employees ${dept}`)}>
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-primary-text capitalize">{dept}</h4>
                                <p className="text-sm text-secondary-text">{deptEmployees.length} absent</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-semibold text-primary-text">{deptEmployees.length}</div>
                                {highRisk > 0 && (
                                  <div className="text-xs text-risk-red">{highRisk} high risk</div>
                                )}
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Active Filters Display */}
                {activeFilters.length > 0 && !isProcessing && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-casey-blue/10 border border-casey-blue/20 rounded-lg">
                      <span className="text-sm text-casey-blue font-medium">Active filters:</span>
                      {activeFilters.map((filter, index) => (
                        <span key={index} className="text-sm text-casey-blue">
                          {filter}{index < activeFilters.length - 1 ? ',' : ''}
                        </span>
                      ))}
                      <button 
                        onClick={() => setActiveFilters([])}
                        className="text-casey-blue hover:text-casey-blue/80 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Input Bar */}
            <div className="sticky bottom-0 bg-page-background/95 backdrop-blur-sm border-t border-card-border p-6">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Natural Language Input */}
                <div className="flex justify-center">
                  <NaturalLanguageInput
                    value={query}
                    onChange={setQuery}
                    onSubmit={handleSubmit}
                    autocompleteOptions={autocompleteOptions}
                    isProcessing={isProcessing}
                  />
                </div>

                {/* Compact Smart Chips */}
                {!isProcessing && query.length === 0 && (
                  <div className="animate-fade-in">
                    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                      {/* Frequent Actions - Smaller */}
                      {frequentActions.slice(0, 4).map((action, index) => (
                        <SmartChip
                          key={`freq-${index}`}
                          label={action.label}
                          count={action.count}
                          icon={action.icon}
                          variant={action.count > 5 ? "urgent" : "default"}
                          onClick={() => handleQuickAction(action.query)}
                          className="text-xs px-2 py-1"
                        />
                      ))}
                      
                      {/* Time Filters - Smaller */}
                      {contextualChips.filter(chip => chip.type === 'timeframe').slice(0, 3).map((chip, index) => (
                        <SmartChip
                          key={`time-${index}`}
                          label={chip.label}
                          count={chip.count}
                          variant="filter"
                          isActive={activeFilters.includes(chip.label)}
                          onClick={() => handleChipClick(chip)}
                          className="text-xs px-2 py-1"
                        />
                      ))}
                      
                      {/* Quick Filters - Smaller */}
                      {contextualChips.filter(chip => chip.type === 'scope' || chip.type === 'filter').slice(0, 2).map((chip, index) => (
                        <SmartChip
                          key={`quick-${index}`}
                          label={chip.label}
                          count={chip.count}
                          variant={chip.type === 'filter' ? 'urgent' : 'default'}
                          isActive={activeFilters.includes(chip.label)}
                          onClick={() => handleChipClick(chip)}
                          className="text-xs px-2 py-1"
                        />
                      ))}
                      
                      {/* Department Filters - Smaller */}
                      {contextualChips.filter(chip => chip.type === 'department').map((chip, index) => (
                        <SmartChip
                          key={`dept-${index}`}
                          label={chip.label}
                          count={chip.count}
                          isActive={activeFilters.includes(chip.label)}
                          onClick={() => handleChipClick(chip)}
                          className="text-xs px-2 py-1"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="casey" className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Casey Status Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-casey-purple/10 to-casey-blue/10 border border-casey-blue/20 rounded-2xl">
                  <div className="w-3 h-3 bg-gradient-to-r from-casey-purple to-casey-blue rounded-full animate-pulse" />
                  <span className="text-primary-text font-medium">Casey is actively monitoring 47 cases</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Casey's Recent Work */}
                <Card className="p-6 bg-card-background border-card-border shadow-default">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-primary-text">Casey's Recent Work</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-secondary-text hover:text-primary-text"
                    >
                      View all
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {caseyActivity.map((activity, index) => (
                      <div key={index} className="group p-4 rounded-lg hover:bg-chip-background transition-colors duration-200">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 bg-success-green/10 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-success-green rounded-full" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <p className="text-primary-text font-medium leading-tight">{activity.action}</p>
                              <span className="text-tertiary-text text-xs whitespace-nowrap ml-2">{activity.timestamp}</span>
                            </div>
                            <p className="text-secondary-text text-sm mb-2">{activity.impact}</p>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex items-center px-2 py-1 bg-success-green/10 text-success-green text-xs font-medium rounded">
                                ✓ {activity.status}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-xs h-6 px-2 text-secondary-text hover:text-primary-text"
                              >
                                View details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Activity Summary */}
                  <div className="mt-6 pt-4 border-t border-card-border">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-primary-text">23</div>
                        <div className="text-xs text-secondary-text">Cases processed</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-primary-text">8</div>
                        <div className="text-xs text-secondary-text">Messages sent</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-primary-text">5</div>
                        <div className="text-xs text-secondary-text">Escalations</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Needs Your Input */}
                <Card className="p-6 bg-card-background border-card-border shadow-default">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-primary-text">Needs Your Input</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-secondary-text">{needsHuman.filter(item => item.priority === 'high').length} urgent</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-secondary-text hover:text-primary-text"
                      >
                        Sort by priority
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {needsHuman.map((item, index) => (
                      <div key={index} className="group p-4 bg-chip-background rounded-xl border border-card-border hover:shadow-hover transition-all duration-200">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${
                              item.priority === 'high' 
                                ? 'bg-risk-red' 
                                : item.priority === 'medium'
                                ? 'bg-human-needed'
                                : 'bg-success-green'
                            }`} />
                            <h3 className="font-medium text-primary-text">{item.case}</h3>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.priority === 'high' 
                              ? 'bg-risk-red/10 text-risk-red' 
                              : item.priority === 'medium'
                              ? 'bg-human-needed/10 text-human-needed'
                              : 'bg-success-green/10 text-success-green'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                        
                        <p className="text-secondary-text text-sm mb-4 leading-relaxed">{item.reason}</p>
                        
                        <div className="flex items-center justify-between">
                          <Button 
                            size="sm" 
                            className="bg-casey-blue hover:bg-casey-blue/90 text-white shadow-sm"
                          >
                            {item.suggestedAction}
                          </Button>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-secondary-text hover:text-primary-text h-8 px-3"
                            >
                              Defer
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-secondary-text hover:text-primary-text h-8 px-3"
                            >
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-4 border-t border-card-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary-text">Quick actions</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8 px-3 border-card-border hover:bg-chip-hover"
                        >
                          Approve all low priority
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs h-8 px-3 border-card-border hover:bg-chip-hover"
                        >
                          Schedule review meeting
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Casey Insights */}
              <Card className="p-6 bg-gradient-to-r from-casey-purple/5 to-casey-blue/5 border-casey-blue/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-casey-purple to-casey-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">AI</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-text mb-2">Casey's Daily Insights</h3>
                    <p className="text-secondary-text text-sm leading-relaxed mb-4">
                      Today's absence patterns show a 15% increase in Production department cases. I've identified 3 potential workflow bottlenecks and scheduled proactive check-ins with 8 at-risk employees.
                    </p>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-casey-blue/30 text-casey-blue hover:bg-casey-blue/10"
                      >
                        View full analysis
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-secondary-text hover:text-primary-text"
                      >
                        Configure insights
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </TabsWrapper>
      </div>

      {/* Results Layer */}
      <ResultsLayer 
        query={currentQuery}
        isVisible={showResults}
        onClose={handleCloseResults}
      />
    </div>
  )
}

export default App