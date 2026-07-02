import { useState } from 'react'
import { FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize } from 'lucide-react'
import type { Courseware } from '@/types'

interface CoursewarePanelProps {
  courseware: Courseware
}

export default function CoursewarePanel({ courseware }: CoursewarePanelProps) {
  const [currentPage, setCurrentPage] = useState(courseware.currentPage)
  const [zoom, setZoom] = useState(100)

  return (
    <div className="flex flex-col h-full bg-card/50 rounded-xl border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card/80">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
            {courseware.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(50, z - 10))}
            className="p-1.5 rounded hover:bg-secondary transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-xs text-muted-foreground w-10 text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(z => Math.min(200, z + 10))}
            className="p-1.5 rounded hover:bg-secondary transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="h-4 w-px bg-border mx-1" />
          <button className="p-1.5 rounded hover:bg-secondary transition-colors">
            <Maximize className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center bg-[#1a1a2e] relative overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center p-8"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {/* Slide content simulation */}
          <div className="w-[640px] h-[360px] bg-gradient-to-br from-[#2a2a4a] to-[#1a1a3a] rounded-xl border border-border/50 flex flex-col items-center justify-center shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">第{currentPage}章 网络协议基础</h2>
              <p className="text-muted-foreground text-sm max-w-md">
                TCP/IP协议是互联网通信的基础，本节课我们将深入理解协议的分层模型与数据封装过程。
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-xs text-primary">应用层</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-xs text-primary">传输层</span>
                </div>
                <div className="w-8 h-px bg-border" />
                <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-xs text-primary">网络层</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-border bg-card/80">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          上一页
        </button>
        <span className="text-xs text-muted-foreground font-mono">
          {currentPage} / {courseware.totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(courseware.totalPages, p + 1))}
          disabled={currentPage >= courseware.totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-md hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          下一页
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
