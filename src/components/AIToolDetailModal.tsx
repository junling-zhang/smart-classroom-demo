import { useState } from 'react'
import { X, Wand2, FileText, BarChart3, Lightbulb, Loader2, Copy, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIToolDetailModalProps {
  toolId: string | null
  isOpen: boolean
  onClose: () => void
}

const toolConfig: Record<string, { name: string; icon: React.ElementType; color: string; bgColor: string; description: string }> = {
  generateQuestion: { name: '智能出题', icon: Wand2, color: 'text-amber-400', bgColor: 'bg-amber-400/10', description: '根据知识点自动生成题目' },
  summarize: { name: '讨论小结', icon: FileText, color: 'text-green-400', bgColor: 'bg-green-400/10', description: 'AI总结讨论要点' },
  analyze: { name: '测验分析', icon: BarChart3, color: 'text-blue-400', bgColor: 'bg-blue-400/10', description: '分析学生答题情况' },
  suggest: { name: '教学建议', icon: Lightbulb, color: 'text-purple-400', bgColor: 'bg-purple-400/10', description: 'AI推荐教学策略' },
}

export default function AIToolDetailModal({ toolId, isOpen, onClose }: AIToolDetailModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  if (!isOpen || !toolId) return null

  const config = toolConfig[toolId] || toolConfig.generateQuestion
  const Icon = config.icon

  const handleGenerate = () => {
    setIsGenerating(true)
    setResult(null)
    setTimeout(() => {
      setIsGenerating(false)
      if (toolId === 'generateQuestion') {
        setResult(`【单选题】TCP协议和UDP协议的主要区别是什么？

A. TCP是面向连接的，UDP是无连接的
B. TCP是无连接的，UDP是面向连接的
C. 两者都支持可靠传输
D. 两者都不支持流量控制

正确答案：A

解析：TCP（传输控制协议）是面向连接的、可靠的传输层协议，提供流量控制和拥塞控制；UDP（用户数据报协议）是无连接的、不可靠的传输层协议，传输效率高但不保证可靠性。`)
      } else if (toolId === 'summarize') {
        setResult(`讨论小结：

核心观点：
1. TCP协议的可靠性高，适合文件传输、网页浏览等场景
2. UDP协议传输效率高，适合视频直播、在线游戏等实时场景
3. 实际应用中需要根据具体需求选择合适的协议

学生关注度：可靠性(15次)、效率(12次)、安全性(10次)

教学建议：可以结合具体案例帮助学生理解两种协议的适用场景。`)
      } else if (toolId === 'analyze') {
        setResult(`测验分析报告：

整体表现：
- 平均分：85.5分
- 提交率：93.8%（45/48人）
- 平均正确率：82%

题目分析：
- 第1题（TCP协议层）：正确率92% - 掌握良好
- 第2题（UDP特点）：正确率88% - 掌握良好
- 第3题（HTTP端口）：正确率76% - 需加强

知识薄弱点：
- HTTP默认端口号（80）记忆不牢固
- TCP三次握手过程理解有偏差`)
      } else {
        setResult(`教学建议：

1. 增加实践环节：让学生通过Wireshark抓包观察TCP三次握手过程
2. 案例教学：结合实际应用场景（如视频通话、文件下载）对比两种协议
3. 互动讨论：组织小组讨论"如果设计一种新的网络协议，你会如何平衡可靠性和效率"
4. 课后巩固：布置实验作业，要求学生搭建简单的客户端/服务端程序`)
      }
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl w-[520px] max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.bgColor)}>
              <Icon className={cn("w-4 h-4", config.color)} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">{config.name}</h2>
              <p className="text-[10px] text-muted-foreground">{config.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          {!result && !isGenerating && (
            <div className="text-center py-8">
              <div className={cn("w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center", config.bgColor)}>
                <Icon className={cn("w-6 h-6", config.color)} />
              </div>
              <p className="text-sm text-foreground mb-2">{config.name}</p>
              <p className="text-xs text-muted-foreground mb-4">{config.description}</p>
              <button
                onClick={handleGenerate}
                className="px-4 py-2 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors"
              >
                开始生成
              </button>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-xs text-muted-foreground">AI正在生成中，请稍候...</p>
            </div>
          )}

          {result && !isGenerating && (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
                <pre className="text-xs text-foreground whitespace-pre-wrap font-sans">{result}</pre>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(result)
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  复制结果
                </button>
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  重新生成
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
