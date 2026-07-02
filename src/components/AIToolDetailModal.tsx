import { useState } from 'react'
import { X, Layers, ClipboardList, FileCheck, FlaskConical, Loader2, Copy, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AIToolDetailModalProps {
  toolId: string | null
  isOpen: boolean
  onClose: () => void
}

const toolConfig: Record<string, { name: string; icon: React.ElementType; color: string; bgColor: string; description: string }> = {
  aiChain: { name: 'AI接龙', icon: Layers, color: 'text-amber-400', bgColor: 'bg-amber-400/10', description: 'AI驱动的课堂互动接龙活动' },
  aiReport: { name: 'AI课堂教学报告', icon: ClipboardList, color: 'text-green-400', bgColor: 'bg-green-400/10', description: '自动生成课堂教学分析报告' },
  aiTicket: { name: 'AI工单', icon: FileCheck, color: 'text-blue-400', bgColor: 'bg-blue-400/10', description: '智能化工单管理与跟踪' },
  aiPractice: { name: 'AI实践', icon: FlaskConical, color: 'text-purple-400', bgColor: 'bg-purple-400/10', description: 'AI辅助的实践教学工具' },
}

export default function AIToolDetailModal({ toolId, isOpen, onClose }: AIToolDetailModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  if (!isOpen || !toolId) return null

  const config = toolConfig[toolId] || toolConfig.aiChain
  const Icon = config.icon

  const handleGenerate = () => {
    setIsGenerating(true)
    setResult(null)
    setTimeout(() => {
      setIsGenerating(false)
      if (toolId === 'aiChain') {
        setResult(`【AI接龙活动】计算机网络协议接龙

活动主题：TCP/IP协议族知识接龙
参与人数：48人
活动时间：15分钟

接龙内容：
1. TCP是面向连接的传输层协议 —— 张三
2. UDP是无连接的传输层协议 —— 李四
3. IP协议工作在网络层 —— 王五
4. HTTP默认端口是80 —— 赵六
5. HTTPS默认端口是443 —— 孙七
6. DNS使用UDP端口53 —— 周八
7. FTP使用TCP端口21 —— 吴九
8. SMTP用于发送邮件 —— 郑十

统计：
- 参与人数：48人（覆盖率100%）
- 接龙条数：48条
- 正确率：91.7%
- 活跃关键词：端口、协议、层`)
      } else if (toolId === 'aiReport') {
        setResult(`【AI课堂教学报告】

课程：计算机网络基础
班级：计算机科学2024级1班
课时：第5周 第2节

一、课堂参与情况
- 应到人数：48人
- 实到人数：46人（出勤率95.8%）
- 互动参与率：89.6%
- 平均专注度：87.3分

二、知识点掌握情况
- TCP/IP协议层次结构：掌握率92%
- 常用端口号：掌握率78%（需加强）
- OSI七层模型：掌握率85%
- 三次握手/四次挥手：掌握率81%

三、课堂活动效果
- 签到活动：完成率100%
- AI接龙活动：参与率100%，正确率91.7%
- 课堂讨论：发言人次32人

四、教学建议
1. 针对端口号记忆薄弱点，建议采用联想记忆法
2. 增加三次握手过程的动画演示
3. 课后推送练习题巩固知识点`)
      } else if (toolId === 'aiTicket') {
        setResult(`【AI工单管理】

待处理工单：3条

工单 #20240702001
- 类型：设备故障
- 提交人：张老师
- 时间：2024-07-02 09:15
- 内容：多媒体教室A301投影仪无法正常显示
- 状态：待处理
- AI建议：优先处理，影响正常授课，预计维修时间30分钟

工单 #20240702002
- 类型：网络问题
- 提交人：李同学
- 时间：2024-07-02 10:30
- 内容：实验室网络连接不稳定，频繁掉线
- 状态：处理中
- AI建议：联系网络中心排查交换机状态

工单 #20240702003
- 类型：软件申请
- 提交人：王老师
- 时间：2024-07-02 14:00
- 内容：申请在机房安装Python 3.12环境
- 状态：待审批
- AI建议：批量部署，预计影响50台机器

统计：本月累计处理工单28条，平均处理时长2.3小时`)
      } else {
        setResult(`【AI实践教学】

实践项目：Wireshark抓包分析实验

一、实验目标
1. 掌握Wireshark抓包工具的基本使用
2. 观察TCP三次握手过程
3. 分析HTTP请求/响应报文结构

二、实验环境
- Wireshark 4.0+
- 操作系统：Windows 10/11 或 macOS
- 网络环境：校园网

三、实验步骤
1. 打开Wireshark，选择网卡开始抓包
2. 访问 http://example.com 并停止抓包
3. 过滤TCP协议，找到三次握手报文
4. 分析SYN、SYN-ACK、ACK报文
5. 过滤HTTP协议，查看请求头和响应头

四、AI辅助功能
- 自动识别异常报文
- 智能标注关键字段
- 生成实验报告模板
- 提供拓展练习题

五、评价标准
- 完成抓包操作（30分）
- 正确识别三次握手（30分）
- 分析HTTP报文（20分）
- 实验报告质量（20分）`)
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
