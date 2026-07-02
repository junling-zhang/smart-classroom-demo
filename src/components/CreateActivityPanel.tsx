import { useState } from 'react'
import { X, Plus, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Activity } from '@/types'

interface CreateActivityPanelProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (activity: Activity) => void
}

const activityTemplates = [
  { type: 'signin' as const, label: '签到', desc: '发起课堂签到', color: 'text-blue-400', bgColor: 'bg-blue-400/10', borderColor: 'border-blue-400/20' },
  { type: 'question' as const, label: '提问', desc: '发布课堂提问', color: 'text-amber-400', bgColor: 'bg-amber-400/10', borderColor: 'border-amber-400/20' },
  { type: 'discussion' as const, label: '讨论', desc: '创建讨论话题', color: 'text-green-400', bgColor: 'bg-green-400/10', borderColor: 'border-green-400/20' },
  { type: 'vote' as const, label: '投票', desc: '发起投票活动', color: 'text-purple-400', bgColor: 'bg-purple-400/10', borderColor: 'border-purple-400/20' },
  { type: 'quiz' as const, label: '测验', desc: '发布课堂测验', color: 'text-red-400', bgColor: 'bg-red-400/10', borderColor: 'border-red-400/20' },
  { type: 'brainstorm' as const, label: '头脑风暴', desc: '发起头脑风暴', color: 'text-cyan-400', bgColor: 'bg-cyan-400/10', borderColor: 'border-cyan-400/20' },
  { type: 'homework' as const, label: '作业', desc: '布置课后作业', color: 'text-pink-400', bgColor: 'bg-pink-400/10', borderColor: 'border-pink-400/20' },
]

export default function CreateActivityPanel({ isOpen, onClose, onCreate }: CreateActivityPanelProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState(120)
  const [step, setStep] = useState<'select' | 'config'>('select')

  if (!isOpen) return null

  const handleSelect = (type: string) => {
    setSelectedType(type)
    setStep('config')
  }

  const handleCreate = () => {
    if (!selectedType || !title.trim()) return
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      type: selectedType as Activity['type'],
      title: title.trim(),
      status: 'ongoing',
      participantCount: 0,
      totalCount: 48,
      duration,
      startTime: new Date().toLocaleTimeString('zh-CN'),
    }
    onCreate(newActivity)
    setSelectedType(null)
    setTitle('')
    setDuration(120)
    setStep('select')
    onClose()
  }

  const selectedTemplate = activityTemplates.find(t => t.type === selectedType)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl w-[480px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            {step === 'select' ? '手动发起活动' : `发起${selectedTemplate?.label || '活动'}`}
          </h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 'select' ? (
            <div className="grid grid-cols-2 gap-3">
              {activityTemplates.map(template => (
                <button
                  key={template.type}
                  onClick={() => handleSelect(template.type)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    "hover:scale-[1.02] active:scale-[0.98]",
                    template.bgColor,
                    template.borderColor,
                    "border-opacity-50 hover:border-opacity-100"
                  )}
                >
                  <span className={cn("text-xs font-medium", template.color)}>{template.label}</span>
                  <span className="text-[10px] text-muted-foreground">{template.desc}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">活动名称</label>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder={`请输入${selectedTemplate?.label}名称...`}
                  className="w-full h-9 px-3 text-xs bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  活动时长（秒）
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="30"
                    max="3600"
                    step="30"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-xs text-foreground w-16 text-right font-mono">{duration}秒</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[60, 120, 300, 600].map(d => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={cn(
                        "px-2 py-1 text-[10px] rounded transition-colors",
                        duration === d
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {d >= 60 ? `${d / 60}分钟` : `${d}秒`}
                    </button>
                  ))}
                </div>
              </div>
              {selectedType === 'signin' && (
                <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground">签到方式：手动签到（签到码）</p>
                </div>
              )}
              {selectedType === 'question' && (
                <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground">题型：单选题 / 多选题 / 判断题</p>
                </div>
              )}
              {selectedType === 'quiz' && (
                <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                  <p className="text-[10px] text-muted-foreground">可设置：单选/多选/判断题，系统自动评分</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border">
          {step === 'config' && (
            <button
              onClick={() => setStep('select')}
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              返回
            </button>
          )}
          {step === 'config' && (
            <button
              onClick={handleCreate}
              disabled={!title.trim()}
              className="flex items-center gap-1 px-4 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              确认发起
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
