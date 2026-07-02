import { useState } from 'react'
import { MapPin, HelpCircle, MessageSquare, BarChart3, ClipboardList, Lightbulb, FileText, AlertCircle, Filter, ChevronRight, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Activity } from '@/types'

interface ActivityListProps {
  activities: Activity[]
  onActivityClick: (activity: Activity) => void
  onCreateActivity: () => void
}

const activityConfig: Record<string, { icon: React.ElementType; label: string; color: string; bgColor: string }> = {
  signin: { icon: MapPin, label: '签到', color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  question: { icon: HelpCircle, label: '提问', color: 'text-amber-400', bgColor: 'bg-amber-400/10' },
  discussion: { icon: MessageSquare, label: '讨论', color: 'text-green-400', bgColor: 'bg-green-400/10' },
  vote: { icon: BarChart3, label: '投票', color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  quiz: { icon: ClipboardList, label: '测验', color: 'text-red-400', bgColor: 'bg-red-400/10' },
  brainstorm: { icon: Lightbulb, label: '头脑风暴', color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
  homework: { icon: FileText, label: '作业', color: 'text-pink-400', bgColor: 'bg-pink-400/10' },
}

const statusConfig = {
  not_started: { label: '未开始', color: 'text-muted-foreground', bgColor: 'bg-muted' },
  ongoing: { label: '进行中', color: 'text-green-400', bgColor: 'bg-green-400/10' },
  ended: { label: '已结束', color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  archived: { label: '已归档', color: 'text-muted-foreground', bgColor: 'bg-muted' },
}

export default function ActivityList({ activities, onActivityClick, onCreateActivity }: ActivityListProps) {
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'ended' | 'not_started'>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = filter === 'all'
    ? activities
    : activities.filter(a => a.status === filter)

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">教学活动</h2>
          <span className="text-xs text-muted-foreground">({activities.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-muted-foreground mr-1" />
          {(['all', 'ongoing', 'ended', 'not_started'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-2 py-0.5 text-[10px] rounded transition-colors",
                filter === f
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f === 'all' ? '全部' : f === 'ongoing' ? '进行中' : f === 'ended' ? '已结束' : '未开始'}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Create Button */}
      <div className="px-3 pt-3">
        <button
          onClick={onCreateActivity}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors bg-primary/5 hover:bg-primary/10"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary">手动发起活动</span>
          <span className="text-[10px] text-muted-foreground">（智能发起误判时手动选择）</span>
        </button>
      </div>

      {/* Activity Items */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-2">
        {filtered.map(activity => {
          const config = activityConfig[activity.type] || activityConfig.signin
          const status = statusConfig[activity.status]
          const Icon = config.icon
          const isHovered = hoveredId === activity.id

          return (
            <div
              key={activity.id}
              onClick={() => onActivityClick(activity)}
              onMouseEnter={() => setHoveredId(activity.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "group relative p-3 rounded-lg border transition-all cursor-pointer",
                isHovered
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-card/30 hover:border-border"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", config.bgColor)}>
                  <Icon className={cn("w-4 h-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground truncate">{activity.title}</span>
                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full", status.bgColor, status.color)}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-muted-foreground">
                      {activity.participantCount}/{activity.totalCount}人参与
                    </span>
                    {activity.correctRate !== undefined && (
                      <span className="text-[10px] text-muted-foreground">正确率 {activity.correctRate}%</span>
                    )}
                    {activity.duration && (
                      <span className="text-[10px] text-muted-foreground">时长 {activity.duration}秒</span>
                    )}
                  </div>
                  <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        activity.status === 'ongoing' ? "bg-primary" :
                        activity.status === 'ended' ? "bg-green-400" : "bg-muted-foreground"
                      )}
                      style={{ width: `${(activity.participantCount / activity.totalCount) * 100}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  isHovered && "translate-x-0.5 text-foreground"
                )} />
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <AlertCircle className="w-8 h-8 mb-2 opacity-40" />
            <span className="text-xs">暂无{filter === 'all' ? '' : statusConfig[filter]?.label}活动</span>
          </div>
        )}
      </div>
    </div>
  )
}
