import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { X, ChevronRight, Users, AlertTriangle, Calendar, FileText, Mail, Phone, Clock, Building } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Employee, processQuery, getQuerySummary } from '../data/mockData'

interface ResultsLayerProps {
  query: string
  isVisible: boolean
  onClose: () => void
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'high': return 'bg-risk-red/10 text-risk-red border-risk-red/20'
    case 'medium': return 'bg-human-needed/10 text-human-needed border-human-needed/20'
    case 'low': return 'bg-success-green/10 text-success-green border-success-green/20'
    default: return 'bg-chip-background text-secondary-text border-card-border'
  }
}

const getDepartmentIcon = (department: string) => {
  switch (department.toLowerCase()) {
    case 'production': return '🏭'
    case 'engineering': return '⚙️'
    case 'sales': return '💼'
    case 'hr': return '👥'
    case 'finance': return '💰'
    case 'marketing': return '📢'
    case 'operations': return '🔧'
    case 'it': return '💻'
    default: return '🏢'
  }
}

export function ResultsLayer({ query, isVisible, onClose }: ResultsLayerProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'daysAbsent' | 'riskLevel' | 'department'>('daysAbsent')
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  
  // Process query to get results
  const allResults = processQuery(query)
  
  // Apply additional filters
  let results = allResults
  if (filterRisk !== 'all') {
    results = results.filter(emp => emp.riskLevel === filterRisk)
  }
  
  // Sort results
  results.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'daysAbsent':
        return b.daysAbsent - a.daysAbsent
      case 'riskLevel': {
        const riskOrder = { high: 3, medium: 2, low: 1 }
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel]
      }
      case 'department':
        return a.department.localeCompare(b.department)
      default:
        return 0
    }
  })

  const summary = getQuerySummary(query, allResults)
  const riskCounts = {
    high: allResults.filter(r => r.riskLevel === 'high').length,
    medium: allResults.filter(r => r.riskLevel === 'medium').length,
    low: allResults.filter(r => r.riskLevel === 'low').length
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-fade-in">
      <div className="absolute inset-y-0 right-0 w-full max-w-6xl bg-page-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-card-border bg-card-background">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-primary-text">{summary}</h2>
            <p className="text-sm text-secondary-text mt-1">Query: "{query}"</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-tertiary-text">Risk breakdown:</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-risk-red">High: {riskCounts.high}</span>
                <span className="text-xs text-human-needed">Medium: {riskCounts.medium}</span>
                <span className="text-xs text-success-green">Low: {riskCounts.low}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-secondary-text hover:text-primary-text"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Filters and Sort */}
        <div className="p-4 border-b border-card-border bg-card-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-text">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm bg-chip-background border border-card-border rounded px-2 py-1 text-primary-text"
                >
                  <option value="daysAbsent">Days Absent</option>
                  <option value="riskLevel">Risk Level</option>
                  <option value="name">Name</option>
                  <option value="department">Department</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-text">Risk:</span>
                <select 
                  value={filterRisk} 
                  onChange={(e) => setFilterRisk(e.target.value as any)}
                  className="text-sm bg-chip-background border border-card-border rounded px-2 py-1 text-primary-text"
                >
                  <option value="all">All Levels</option>
                  <option value="high">High Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="low">Low Risk</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-secondary-text">
              Showing {results.length} of {allResults.length} results
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="flex h-[calc(100vh-200px)]">
          {/* Results List */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {results.map((employee) => (
                <Card 
                  key={employee.id}
                  className={cn(
                    "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-card-border",
                    selectedEmployee?.id === employee.id && "ring-2 ring-casey-blue/20 border-casey-blue/50"
                  )}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getDepartmentIcon(employee.department)}</span>
                          <h3 className="font-medium text-primary-text">{employee.name}</h3>
                        </div>
                        <Badge className={getRiskColor(employee.riskLevel)}>
                          {employee.riskLevel} risk
                        </Badge>
                        {employee.isMyTeam && (
                          <Badge className="bg-casey-blue/10 text-casey-blue border-casey-blue/20">
                            My Team
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-secondary-text">
                          <Building className="w-4 h-4" />
                          {employee.department}
                        </div>
                        <div className="flex items-center gap-2 text-secondary-text">
                          <Calendar className="w-4 h-4" />
                          {employee.daysAbsent} days absent
                        </div>
                        <div className="flex items-center gap-2 text-secondary-text">
                          <FileText className="w-4 h-4" />
                          {employee.reason}
                        </div>
                        <div className="flex items-center gap-2 text-secondary-text">
                          <Clock className="w-4 h-4" />
                          Last: {employee.lastContact}
                        </div>
                      </div>
                      
                      <div className="mt-2 text-xs text-tertiary-text">
                        Started: {employee.startDate} • Manager: {employee.manager}
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-tertiary-text" />
                  </div>
                </Card>
              ))}
              
              {results.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-tertiary-text mb-2">No results found</div>
                  <div className="text-sm text-secondary-text">Try adjusting your filters or search query</div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {results.length > 0 && (
              <div className="mt-8 p-4 bg-card-background rounded-xl border border-card-border">
                <h4 className="font-medium text-primary-text mb-3">Bulk Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="bg-casey-blue hover:bg-casey-blue/90 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email All ({results.length})
                  </Button>
                  <Button size="sm" variant="outline" className="border-card-border">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button size="sm" variant="outline" className="border-card-border">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Follow-ups
                  </Button>
                  <Button size="sm" variant="outline" className="border-card-border">
                    Export Data
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selectedEmployee && (
            <div className="w-96 border-l border-card-border bg-card-background p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{getDepartmentIcon(selectedEmployee.department)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-text">
                        {selectedEmployee.name}
                      </h3>
                      <p className="text-sm text-secondary-text">{selectedEmployee.department}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getRiskColor(selectedEmployee.riskLevel)}>
                      {selectedEmployee.riskLevel} risk
                    </Badge>
                    {selectedEmployee.isMyTeam && (
                      <Badge className="bg-casey-blue/10 text-casey-blue border-casey-blue/20">
                        My Team
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-secondary-text">Contact Information</label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-primary-text">
                        <Mail className="w-4 h-4 text-secondary-text" />
                        {selectedEmployee.email}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-text">Absence Details</label>
                    <div className="mt-1 space-y-2">
                      <div className="text-sm text-primary-text">
                        <strong>{selectedEmployee.daysAbsent} days</strong> absent
                      </div>
                      <div className="text-sm text-primary-text">
                        Started: {selectedEmployee.startDate}
                      </div>
                      <div className="text-sm text-primary-text">
                        Reason: {selectedEmployee.reason}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-text">Management</label>
                    <div className="mt-1 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-primary-text">
                        <Users className="w-4 h-4 text-secondary-text" />
                        Manager: {selectedEmployee.manager}
                      </div>
                      <div className="text-sm text-primary-text">
                        Last contact: {selectedEmployee.lastContact}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-primary-text">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-casey-blue hover:bg-casey-blue/90 text-white">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-card-border">
                      <Phone className="w-4 h-4 mr-2" />
                      Schedule Call
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-card-border">
                      <FileText className="w-4 h-4 mr-2" />
                      Update Status
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-card-border">
                      <Clock className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </div>
                </div>

                {selectedEmployee.riskLevel === 'high' && (
                  <div className="p-3 bg-risk-red/5 border border-risk-red/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-risk-red mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-risk-red">High Risk Alert</p>
                        <p className="text-xs text-risk-red/80 mt-1">
                          Extended absence requires immediate attention and follow-up.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedEmployee.daysAbsent >= 20 && (
                  <div className="p-3 bg-human-needed/5 border border-human-needed/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-human-needed mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-human-needed">Long-term Absence</p>
                        <p className="text-xs text-human-needed/80 mt-1">
                          Consider disability assessment or return-to-work planning.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}