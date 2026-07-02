import { useState } from 'react'
import { Sparkles, Layers, ClipboardList, FileCheck, FlaskConical, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AITool {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
}

const tools: AITool[] = [
  {
    id: 'aiChain',
    name: 'AI接龙',
    description: 'AI驱动的课堂互动接龙活动',
    icon: Layers,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
  },
  {
    id: 'aiReport',
    name: 'AI课堂教学报告',
    description: '自动生成课堂教学分析报告',
    icon: ClipboardList,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    id: 'aiTicket',
    name: 'AI工单',
    description: '智能化工单管理与跟踪',
    icon: FileCheck,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    id: 'aiPractice',
    name: 'AI实践',
    description: 'AI辅助的实践教学工具',
    icon: FlaskConical,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
]

interface AIToolsPanelProps {
  onToolClick: (toolId: string) => void
}

export default function AIToolsPanel({ onToolClick }: AIToolsPanelProps) {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80">
        <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">AI工具箱</h2>
      </div>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-2">
        {tools.map(tool => {
          const Icon = tool.icon
          const isHovered = hoveredTool === tool.id

          return (
            <button
              key={tool.id}
              onClick={() => onToolClick(tool.id)}
              onMouseEnter={() => setHoveredTool(tool.id)}
              onMouseLeave={() => setHoveredTool(null)}
              className={cn(
                "w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left",
                isHovered
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
              )}
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", tool.bgColor)}>
                <Icon className={cn("w-4 h-4", tool.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-foreground">{tool.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{tool.description}</div>
              </div>
              <ChevronRight className={cn(
                "w-3.5 h-3.5 text-muted-foreground transition-transform",
                isHovered && "translate-x-0.5 text-foreground"
              )} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
