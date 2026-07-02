import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, User, Bot, Check, X, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    content: '您好！我是智能教学助手。请问有什么可以帮您？您可以让我发起签到、创建讨论、分析数据等。',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'text',
  },
  {
    id: '2',
    role: 'teacher',
    content: '发起签到，2分钟',
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
    type: 'text',
  },
  {
    id: '3',
    role: 'ai',
    content: '已识别为"发起签到"意图，准备创建签到活动。',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    type: 'plan',
    actions: [
      { label: '确认执行', action: 'confirm' },
      { label: '取消', action: 'cancel' },
    ],
  },
  {
    id: '4',
    role: 'teacher',
    content: '确认执行',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    type: 'text',
  },
  {
    id: '5',
    role: 'ai',
    content: '签到活动已创建！签到码：4827，应到48人，已签到46人。签到将在2分钟后自动结束。',
    timestamp: new Date(Date.now() - 1000 * 60),
    type: 'result',
  },
]

export default function SmartChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [status, setStatus] = useState<'idle' | 'parsing' | 'planning' | 'executing'>('idle')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'teacher',
      content: input.trim(),
      timestamp: new Date(),
      type: 'text',
    }

    setMessages(prev => [...prev, newMessage])
    setInput('')
    setIsAiThinking(true)
    setStatus('parsing')

    // Simulate AI thinking
    setTimeout(() => {
      setStatus('planning')
    }, 800)

    setTimeout(() => {
      setStatus('executing')
    }, 1500)

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: input.includes('测验')
          ? '已为您创建测验活动，包含5道选择题，预计用时10分钟。学生可以开始答题了。'
          : input.includes('讨论')
          ? '已创建讨论活动："网络协议在实际应用中的优缺点"，时长5分钟。'
          : '收到您的指令，正在处理中...',
        timestamp: new Date(),
        type: 'result',
      }
      setMessages(prev => [...prev, aiResponse])
      setIsAiThinking(false)
      setStatus('idle')
    }, 2500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'parsing': return '正在理解您的指令...'
      case 'planning': return '正在规划执行方案...'
      case 'executing': return '正在执行...'
      default: return '输入指令...'
    }
  }

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card/80">
        <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
        <h2 className="text-sm font-semibold text-foreground">智能助手</h2>
        <div className="ml-auto flex items-center gap-1">
          <div className={cn(
            "w-2 h-2 rounded-full",
            status === 'idle' ? "bg-green-400" : "bg-primary animate-pulse"
          )} />
          <span className="text-[10px] text-muted-foreground">
            {status === 'idle' ? '就绪' : '处理中'}
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2.5",
              msg.role === 'teacher' ? "justify-end" : "justify-start"
            )}
          >
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-primary" />
              </div>
            )}
            <div className={cn(
              "max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed",
              msg.role === 'teacher'
                ? "bg-primary text-primary-foreground rounded-br-none"
                : msg.type === 'plan'
                  ? "bg-amber-400/10 border border-amber-400/20 text-foreground rounded-bl-none"
                  : msg.type === 'result'
                    ? "bg-green-400/10 border border-green-400/20 text-foreground rounded-bl-none"
                    : "bg-secondary/50 text-foreground rounded-bl-none"
            )}>
              {msg.content}
              {msg.actions && (
                <div className="flex gap-2 mt-2">
                  {msg.actions.map(action => (
                    <button
                      key={action.label}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] transition-colors",
                        action.action === 'confirm'
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      )}
                    >
                      {action.action === 'confirm' && <Check className="w-3 h-3 inline mr-0.5" />}
                      {action.action === 'cancel' && <X className="w-3 h-3 inline mr-0.5" />}
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="text-[10px] text-muted-foreground mt-1">
                {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {msg.role === 'teacher' && (
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isAiThinking && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 text-primary animate-pulse" />
            </div>
            <div className="bg-secondary/50 rounded-xl rounded-bl-none px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                </div>
                <span className="text-[10px] text-muted-foreground ml-1">{getStatusText()}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-2.5 border-t border-border bg-card/80">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={getStatusText()}
              className="w-full h-9 pl-3 pr-10 text-xs bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
            <button
              onClick={() => {
                setInput('')
                inputRef.current?.focus()
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isAiThinking}
            className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] text-muted-foreground">快捷指令：</span>
          {['发起签到', '创建讨论', '生成测验', '查看统计'].map(cmd => (
            <button
              key={cmd}
              onClick={() => {
                setInput(cmd)
                inputRef.current?.focus()
              }}
              className="text-[10px] px-2 py-0.5 rounded bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
