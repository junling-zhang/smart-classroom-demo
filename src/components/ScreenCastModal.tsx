import { useState } from 'react'
import { X, Cast, Monitor, Smartphone, Laptop, Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScreenCastModalProps {
  isOpen: boolean
  isCasting: boolean
  onClose: () => void
  onToggleCast: () => void
}

const devices = [
  { id: 'screen-1', name: '教室大屏', type: '大屏', icon: Monitor, status: 'available' as const },
  { id: 'screen-2', name: '投影仪', type: '投影', icon: Laptop, status: 'available' as const },
  { id: 'mobile-1', name: '学生端同步', type: '移动端', icon: Smartphone, status: 'connected' as const },
]

export default function ScreenCastModal({ isOpen, isCasting, onClose, onToggleCast }: ScreenCastModalProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>('screen-1')
  const [isConnecting, setIsConnecting] = useState(false)

  if (!isOpen) return null

  const handleToggle = () => {
    if (isCasting) {
      onToggleCast()
    } else {
      setIsConnecting(true)
      setTimeout(() => {
        setIsConnecting(false)
        onToggleCast()
      }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl w-[400px] max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Cast className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">智能投屏</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          {/* Status */}
          <div className={cn(
            "p-3 rounded-lg mb-4 flex items-center gap-3",
            isCasting ? "bg-green-400/10 border border-green-400/20" : "bg-secondary/30 border border-border/50"
          )}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", isCasting ? "bg-green-400/20" : "bg-muted")}>
              {isCasting ? (
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              ) : (
                <Cast className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                {isCasting ? '正在投屏中' : '投屏未开启'}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {isCasting ? '当前内容正在投屏到教室大屏' : '选择设备开始投屏'}
              </p>
            </div>
          </div>

          {/* Device List */}
          <h3 className="text-xs font-medium text-foreground mb-2">可用设备</h3>
          <div className="space-y-2 mb-4">
            {devices.map(device => {
              const Icon = device.icon
              const isSelected = selectedDevice === device.id
              return (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
                    isSelected
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/50 bg-card/30 hover:border-border"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{device.name}</p>
                    <p className="text-[10px] text-muted-foreground">{device.type}</p>
                  </div>
                  {device.status === 'connected' && (
                    <span className="text-[10px] text-green-400 flex items-center gap-0.5">
                      <Check className="w-3 h-3" />
                      已连接
                    </span>
                  )}
                  {isSelected && !isCasting && (
                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Info */}
          <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
            <p className="text-[10px] text-muted-foreground">
              投屏后，学生端将同步显示当前课件和活动内容
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-border">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            关闭
          </button>
          <button
            onClick={handleToggle}
            disabled={isConnecting}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-lg transition-colors",
              isCasting
                ? "bg-red-400/20 text-red-400 hover:bg-red-400/30 border border-red-400/30"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {isConnecting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isCasting ? '停止投屏' : isConnecting ? '连接中...' : '开始投屏'}
          </button>
        </div>
      </div>
    </div>
  )
}
