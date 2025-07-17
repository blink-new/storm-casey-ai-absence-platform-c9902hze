import { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

interface TabsWrapperProps {
  activeTab: string
  onTabChange: (value: string) => void
  children: ReactNode
}

export function TabsWrapper({ activeTab, onTabChange, children }: TabsWrapperProps) {
  return (
    <Tabs defaultValue="home" value={activeTab} onValueChange={onTabChange} className="relative z-10 flex-1 flex flex-col">
      {children}
    </Tabs>
  )
}

export { TabsContent, TabsList, TabsTrigger }