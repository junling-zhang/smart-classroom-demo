import { X, MapPin, HelpCircle, MessageSquare, BarChart3, ClipboardList, Lightbulb, FileText, Check, User, Clock, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Activity } from '@/types'

interface ActivityDetailModalProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
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

// Mock data generators
function getSigninDetail(activity: Activity) {
  return {
    code: '4827',
    signinType: '手动签到（签到码）',
    duration: activity.duration || 120,
    signedStudents: activity.participantCount,
    unsignedStudents: activity.totalCount - activity.participantCount,
    signedList: ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十'].slice(0, activity.participantCount),
    unsignedList: ['钱十一', '冯十二', '陈十三'].slice(0, activity.totalCount - activity.participantCount),
  }
}

function getQuestionDetail(activity: Activity) {
  return {
    content: 'TCP与UDP的主要区别是什么？',
    options: [
      { key: 'A', text: 'TCP是面向连接的，UDP是无连接的' },
      { key: 'B', text: 'TCP是无连接的，UDP是面向连接的' },
      { key: 'C', text: '两者都是面向连接的' },
      { key: 'D', text: '两者都是无连接的' },
    ],
    correctAnswer: ['A'],
    correctRate: activity.correctRate || 82,
    optionStats: [
      { key: 'A', count: 37, percentage: 82 },
      { key: 'B', count: 5, percentage: 11 },
      { key: 'C', count: 2, percentage: 4 },
      { key: 'D', count: 1, percentage: 2 },
    ],
  }
}

function getDiscussionDetail(activity: Activity) {
  return {
    topic: '网络协议在实际应用中的优缺点',
    duration: activity.duration || 300,
    replyCount: activity.participantCount,
    hotWords: [
      { word: '可靠性', count: 15 },
      { word: '效率', count: 12 },
      { word: '安全性', count: 10 },
      { word: '传输速度', count: 8 },
      { word: '拥塞控制', count: 6 },
    ],
    replies: [
      { student: '张三', content: 'TCP协议的可靠性非常高，适合传输重要数据。', time: '08:35' },
      { student: '李四', content: 'UDP传输效率更高，适合实时性要求高的场景。', time: '08:36' },
      { student: '王五', content: '在实际应用中，需要根据场景选择合适的协议。', time: '08:38' },
      { student: '赵六', content: 'HTTP协议虽然简单，但是 overhead 较大。', time: '08:40' },
      { student: '孙七', content: 'HTTPS的安全性更好，适合敏感数据传输。', time: '08:42' },
    ].slice(0, Math.min(activity.participantCount, 5)),
  }
}

function getVoteDetail(activity: Activity) {
  return {
    title: '最喜欢的网络协议',
    options: [
      { key: 'A', text: 'TCP协议', count: 28, percentage: 58 },
      { key: 'B', text: 'UDP协议', count: 12, percentage: 25 },
      { key: 'C', text: 'HTTP协议', count: 5, percentage: 10 },
      { key: 'D', text: '其他', count: 3, percentage: 6 },
    ],
    totalVotes: activity.participantCount,
    allowMultiple: false,
  }
}

function getQuizDetail(activity: Activity) {
  return {
    title: '网络协议知识测验',
    duration: activity.duration || 600,
    questions: [
      { id: 'q1', type: 'single', content: 'TCP协议工作在哪一层？', options: [{ key: 'A', text: '应用层' }, { key: 'B', text: '传输层' }, { key: 'C', text: '网络层' }, { key: 'D', text: '数据链路层' }], correctAnswer: ['B'], correctRate: 92 },
      { id: 'q2', type: 'single', content: 'UDP协议的特点是？', options: [{ key: 'A', text: '面向连接' }, { key: 'B', text: '无连接' }, { key: 'C', text: '可靠传输' }, { key: 'D', text: '有序传输' }], correctAnswer: ['B'], correctRate: 88 },
      { id: 'q3', type: 'single', content: 'HTTP协议默认使用哪个端口？', options: [{ key: 'A', text: '21' }, { key: 'B', text: '80' }, { key: 'C', text: '443' }, { key: 'D', text: '8080' }], correctAnswer: ['B'], correctRate: 76 },
    ],
    avgScore: 85.5,
    submitCount: activity.participantCount,
    avgRate: activity.correctRate || 82,
  }
}

function getBrainstormDetail(activity: Activity) {
  return {
    title: '未来网络技术畅想',
    duration: activity.duration || 180,
    ideaCount: activity.participantCount,
    ideas: [
      { student: '张三', content: '量子通信网络将实现真正的安全传输', votes: 12 },
      { student: '李四', content: '6G网络将实现全息通信', votes: 9 },
      { student: '王五', content: 'AI驱动的自适应网络协议', votes: 7 },
      { student: '赵六', content: '去中心化的P2P网络协议', votes: 5 },
      { student: '孙七', content: '基于生物特征的网络认证', votes: 3 },
    ].slice(0, Math.min(activity.participantCount, 5)),
  }
}

function getHomeworkDetail(activity: Activity) {
  return {
    title: '设计一个简单的网络协议',
    content: '请设计一个适合物联网场景的网络协议，包括协议架构、数据格式、传输方式等，字数不少于500字。',
    deadline: '2026-07-08 23:59',
    submitType: 'text' as const,
    submitCount: activity.participantCount,
    unsubmittedCount: activity.totalCount - activity.participantCount,
  }
}

export default function ActivityDetailModal({ activity, isOpen, onClose }: ActivityDetailModalProps) {
  if (!isOpen || !activity) return null

  const config = activityConfig[activity.type] || activityConfig.signin
  const Icon = config.icon

  const statusConfig = {
    not_started: { label: '未开始', color: 'text-muted-foreground', bgColor: 'bg-muted' },
    ongoing: { label: '进行中', color: 'text-green-400', bgColor: 'bg-green-400/10' },
    ended: { label: '已结束', color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    archived: { label: '已归档', color: 'text-muted-foreground', bgColor: 'bg-muted' },
  }
  const status = statusConfig[activity.status]

  const renderContent = () => {
    switch (activity.type) {
      case 'signin': {
        const detail = getSigninDetail(activity)
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">签到码</p>
                <p className="text-xl font-bold text-primary font-mono mt-1">{detail.code}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">已签到</p>
                <p className="text-xl font-bold text-green-400 mt-1">{detail.signedStudents}<span className="text-sm font-normal text-muted-foreground">/{activity.totalCount}</span></p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">签到方式</p>
                <p className="text-sm font-medium text-foreground mt-1">{detail.signinType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>签到时长：{detail.duration}秒</span>
            </div>
            <div>
              <h3 className="text-xs font-medium text-foreground mb-2">签到进度</h3>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(detail.signedStudents / activity.totalCount) * 100}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{((detail.signedStudents / activity.totalCount) * 100).toFixed(1)}% 已完成</p>
            </div>
          </div>
        )
      }
      case 'question': {
        const detail = getQuestionDetail(activity)
        return (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs font-medium text-foreground mb-2">{detail.content}</p>
              <div className="space-y-1.5">
                {detail.options.map(opt => (
                  <div key={opt.key} className={cn("flex items-center gap-2 text-xs p-2 rounded", detail.correctAnswer.includes(opt.key) ? "bg-green-400/10 text-green-400" : "text-muted-foreground")}>
                    <span className="font-medium">{opt.key}.</span>
                    <span>{opt.text}</span>
                    {detail.correctAnswer.includes(opt.key) && <Check className="w-3.5 h-3.5 ml-auto" />}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2">答题统计</p>
              <div className="space-y-2">
                {detail.optionStats.map(stat => (
                  <div key={stat.key}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-muted-foreground">选项 {stat.key}</span>
                      <span className="text-foreground">{stat.count}人 ({stat.percentage}%)</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${stat.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 font-medium">正确率 {detail.correctRate}%</span>
            </div>
          </div>
        )
      }
      case 'discussion': {
        const detail = getDiscussionDetail(activity)
        return (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs font-medium text-foreground">讨论主题：{detail.topic}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />时长 {detail.duration}秒</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><MessageSquare className="w-3 h-3" />{detail.replyCount}人参与</span>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-foreground mb-2">热门关键词</h3>
              <div className="flex flex-wrap gap-2">
                {detail.hotWords.map(word => (
                  <span key={word.word} className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full">{word.word} ({word.count})</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-foreground mb-2">学生回复</h3>
              <div className="space-y-2">
                {detail.replies.map((reply, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{reply.student}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{reply.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-7">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
      case 'vote': {
        const detail = getVoteDetail(activity)
        return (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs font-medium text-foreground mb-2">{detail.title}</p>
              <p className="text-[10px] text-muted-foreground">{detail.allowMultiple ? '多选' : '单选'} · 共{detail.totalVotes}人投票</p>
            </div>
            <div className="space-y-3">
              {detail.options.map(opt => (
                <div key={opt.key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground">{opt.key}. {opt.text}</span>
                    <span className="text-muted-foreground">{opt.count}票 ({opt.percentage}%)</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${opt.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
      case 'quiz': {
        const detail = getQuizDetail(activity)
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">平均分</p>
                <p className="text-xl font-bold text-primary mt-1">{detail.avgScore}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">提交人数</p>
                <p className="text-xl font-bold text-foreground mt-1">{detail.submitCount}<span className="text-sm font-normal text-muted-foreground">/48</span></p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">平均正确率</p>
                <p className="text-xl font-bold text-green-400 mt-1">{detail.avgRate}%</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-foreground mb-2">题目分析</h3>
              <div className="space-y-2">
                {detail.questions.map((q, idx) => (
                  <div key={q.id} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-primary font-medium mt-0.5">{idx + 1}.</span>
                      <div className="flex-1">
                        <p className="text-xs text-foreground">{q.content}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("text-[10px] px-1.5 py-0.5 rounded", q.correctRate >= 80 ? "bg-green-400/10 text-green-400" : q.correctRate >= 60 ? "bg-amber-400/10 text-amber-400" : "bg-red-400/10 text-red-400")}>
                            正确率 {q.correctRate}%
                          </span>
                          <span className="text-[10px] text-muted-foreground">答案：{q.correctAnswer.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
      case 'brainstorm': {
        const detail = getBrainstormDetail(activity)
        return (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs font-medium text-foreground">主题：{detail.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{detail.ideaCount}人参与 · {detail.duration}秒</p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-foreground mb-2">创意列表</h3>
              <div className="space-y-2">
                {detail.ideas.map((idea, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-secondary/30 border border-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-medium text-foreground">{idea.student}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />{idea.votes}票
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-7">{idea.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
      case 'homework': {
        const detail = getHomeworkDetail(activity)
        return (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs font-medium text-foreground">{detail.title}</p>
              <p className="text-xs text-muted-foreground mt-2">{detail.content}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />截止：{detail.deadline}</span>
                <span className="text-[10px] text-muted-foreground">提交方式：{detail.submitType === 'text' ? '文本' : '文件'}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">已提交</p>
                <p className="text-xl font-bold text-green-400 mt-1">{detail.submitCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/50 text-center">
                <p className="text-xs text-muted-foreground">未提交</p>
                <p className="text-xl font-bold text-red-400 mt-1">{detail.unsubmittedCount}</p>
              </div>
            </div>
          </div>
        )
      }
      default:
        return null
    }
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
              <h2 className="text-sm font-semibold text-foreground">{activity.title}</h2>
              <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full mt-0.5 inline-flex items-center gap-1", status.bgColor, status.color)}>
                {status.label}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-secondary transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
