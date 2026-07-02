import { useState } from 'react'
import Header from '@/components/Header'
import CoursewarePanel from '@/components/CoursewarePanel'
import ActivityList from '@/components/ActivityList'
import AIToolsPanel from '@/components/AIToolsPanel'
import SmartChat from '@/components/SmartChat'
import CreateActivityPanel from '@/components/CreateActivityPanel'
import ActivityDetailModal from '@/components/ActivityDetailModal'
import AIToolDetailModal from '@/components/AIToolDetailModal'
import ScreenCastModal from '@/components/ScreenCastModal'
import type { CourseInfo, Activity, Courseware } from '@/types'

const courseInfo: CourseInfo = {
  title: '计算机网络基础',
  className: '计算机2301班',
  teacher: '张老师',
  totalStudents: 48,
  presentStudents: 46,
  participationRate: 95.8,
  phase: 'during',
}

const courseware: Courseware = {
  id: 'cw-001',
  title: '第3章 网络协议基础',
  type: 'ppt',
  currentPage: 3,
  totalPages: 24,
  url: '#',
}

const initialActivities: Activity[] = [
  {
    id: 'act-001',
    type: 'signin',
    title: '课前签到',
    status: 'ended',
    participantCount: 46,
    totalCount: 48,
    duration: 120,
    startTime: '08:00:00',
  },
  {
    id: 'act-002',
    type: 'question',
    title: 'TCP与UDP的区别',
    status: 'ended',
    participantCount: 45,
    totalCount: 48,
    correctRate: 82,
    duration: 60,
    startTime: '08:15:00',
  },
  {
    id: 'act-003',
    type: 'discussion',
    title: '网络协议在实际应用中的优缺点',
    status: 'ongoing',
    participantCount: 38,
    totalCount: 48,
    duration: 300,
    startTime: '08:30:00',
  },
  {
    id: 'act-004',
    type: 'quiz',
    title: '网络协议知识测验',
    status: 'not_started',
    participantCount: 0,
    totalCount: 48,
    duration: 600,
  },
  {
    id: 'act-005',
    type: 'vote',
    title: '最喜欢的网络协议',
    status: 'not_started',
    participantCount: 0,
    totalCount: 48,
    duration: 60,
  },
  {
    id: 'act-006',
    type: 'brainstorm',
    title: '未来网络技术畅想',
    status: 'not_started',
    participantCount: 0,
    totalCount: 48,
    duration: 180,
  },
  {
    id: 'act-007',
    type: 'homework',
    title: '课后作业：设计一个简单的网络协议',
    status: 'not_started',
    participantCount: 0,
    totalCount: 48,
  },
]

export default function App() {
  const [phase, setPhase] = useState<'pre' | 'during' | 'post'>(courseInfo.phase)
  const [isCasting, setIsCasting] = useState(false)
  const [isCastModalOpen, setIsCastModalOpen] = useState(false)
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [isCreatePanelOpen, setIsCreatePanelOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null)
  const [isToolModalOpen, setIsToolModalOpen] = useState(false)

  const handlePhaseChange = (newPhase: 'pre' | 'during' | 'post') => {
    setPhase(newPhase)
  }

  const handleScreenCast = () => {
    setIsCastModalOpen(true)
  }

  const handleToggleCast = () => {
    setIsCasting(prev => !prev)
  }

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsDetailModalOpen(true)
  }

  const handleCreateActivity = () => {
    setIsCreatePanelOpen(true)
  }

  const handleActivityCreated = (activity: Activity) => {
    setActivities(prev => [activity, ...prev])
  }

  const handleToolClick = (toolId: string) => {
    setSelectedToolId(toolId)
    setIsToolModalOpen(true)
  }

  return (
    <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <Header
        courseInfo={{ ...courseInfo, phase }}
        onPhaseChange={handlePhaseChange}
        onScreenCast={handleScreenCast}
        isCasting={isCasting}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Courseware + Activity */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top: Courseware */}
          <div className="h-[55%] p-3 pb-1.5">
            <CoursewarePanel courseware={courseware} />
          </div>
          {/* Bottom: Activity List */}
          <div className="h-[45%] p-3 pt-1.5">
            <ActivityList
              activities={activities}
              onActivityClick={handleActivityClick}
              onCreateActivity={handleCreateActivity}
            />
          </div>
        </div>

        {/* Right Panel - AI Tools + Chat */}
        <div className="w-[360px] flex flex-col p-3 pl-0 gap-3">
          {/* AI Tools */}
          <div className="h-[35%]">
            <AIToolsPanel onToolClick={handleToolClick} />
          </div>
          {/* Smart Chat */}
          <div className="flex-1 min-h-0">
            <SmartChat />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateActivityPanel
        isOpen={isCreatePanelOpen}
        onClose={() => setIsCreatePanelOpen(false)}
        onCreate={handleActivityCreated}
      />

      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <AIToolDetailModal
        toolId={selectedToolId}
        isOpen={isToolModalOpen}
        onClose={() => setIsToolModalOpen(false)}
      />

      <ScreenCastModal
        isOpen={isCastModalOpen}
        isCasting={isCasting}
        onClose={() => setIsCastModalOpen(false)}
        onToggleCast={handleToggleCast}
      />
    </div>
  )
}
