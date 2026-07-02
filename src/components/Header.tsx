import { useState } from 'react'
import { Users, Clock, Monitor, ChevronDown, Sparkles, Cast, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CourseInfo } from '@/types'

interface HeaderProps {
  courseInfo: CourseInfo
  onPhaseChange: (phase: 'pre' | 'during' | 'post') => void
  onScreenCast: () => void
  isCasting: boolean
}

export default function Header({ courseInfo, onPhaseChange, onScreenCast, isCasting }: HeaderProps) {
  const [showPhaseDropdown, setShowPhaseDropdown] = useState(false)
  const phases = [
    { key: 'pre' as const, label: '课前', desc: '预习阶段' },
    { key: 'during' as const, label: '课中', desc: '授课阶段' },
    { key: 'post' as const, label: '课后', desc: '复习阶段' },
  ]

  return (
    <header className="h-14 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3 flex-1">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">智能云课堂</span>
        </div>

        <div className="h-6 w-px bg-border mx-3" />
        <h1 className="text-sm font-medium text-foreground truncate max-w-[200px]">
          {courseInfo.title}
        </h1>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
          {courseInfo.className}
        </span>

        {/* Phase Switcher */}
        <div className="relative ml-4">
          <button
            onClick={() => setShowPhaseDropdown(!showPhaseDropdown)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <Monitor className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">
              {phases.find(p => p.key === courseInfo.phase)?.label}
            </span>
            <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform", showPhaseDropdown && "rotate-180")} />
          </button>
          {showPhaseDropdown && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-xl py-1 z-50">
              {phases.map(phase => (
                <button
                  key={phase.key}
                  onClick={() => {
                    onPhaseChange(phase.key)
                    setShowPhaseDropdown(false)
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs hover:bg-secondary/50 transition-colors",
                    courseInfo.phase === phase.key ? "text-primary font-medium" : "text-foreground"
                  )}
                >
                  <div>{phase.label}</div>
                  <div className="text-muted-foreground text-[10px]">{phase.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats + Screen Cast */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">应到</span>
          <span className="text-sm font-medium text-foreground">{courseInfo.totalStudents}</span>
          <span className="text-xs text-muted-foreground">实到</span>
          <span className="text-sm font-medium text-green-400">{courseInfo.presentStudents}</span>
          <span className="text-xs text-muted-foreground">参与率</span>
          <span className="text-sm font-medium text-primary">{courseInfo.participationRate}%</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">已上课</span>
          <span className="text-sm font-mono text-foreground">23:45</span>
        </div>

        {/* Smart Screen Cast */}
        <div className="h-6 w-px bg-border ml-2" />
        <button
          onClick={onScreenCast}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs transition-all",
            isCasting
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-secondary text-foreground hover:bg-secondary/80 border border-transparent"
          )}
        >
          {isCasting ? (
            <>
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>投屏中</span>
            </>
          ) : (
            <>
              <Cast className="w-3.5 h-3.5" />
              <span>智能投屏</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
