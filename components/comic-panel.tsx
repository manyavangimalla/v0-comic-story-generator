import { Card } from "@/components/ui/card"
import type { ComicPanelData } from "@/components/comic-generator-form"
import Image from "next/image"

interface ComicPanelProps {
  panel: ComicPanelData
  generatedImage?: string | null
}

export function ComicPanel({ panel, generatedImage }: ComicPanelProps) {
  return (
    <Card className="comic-panel overflow-hidden">
      <div className="bg-gradient-to-r from-primary/80 to-secondary/80 text-primary-foreground p-4 flex items-center gap-4">
        <div className="bg-white/90 text-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl border-2 border-white/50 shadow-md font-serif">
          {panel.panelNumber}
        </div>
        <h3 className="font-bold text-xl md:text-2xl flex-1 font-serif">{panel.title}</h3>
      </div>

      {/* Panel Content */}
      <div className="p-6 space-y-5">
        <div className="bg-gradient-to-br from-muted/40 to-secondary/20 p-4 rounded-2xl border-2 border-primary/20">
          <p className="text-base md:text-lg text-foreground/90 italic leading-relaxed font-serif">{panel.narrative}</p>
        </div>

        <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary/30 via-lavender/20 to-accent/30 rounded-3xl border-2 border-primary/20 overflow-hidden shadow-lg">
          {generatedImage ? (
            <Image src={generatedImage || "/placeholder.svg"} alt={panel.imagePrompt} fill className="object-cover" />
          ) : (
            <Image
              src={`/.jpg?height=400&width=500&query=${encodeURIComponent(panel.imagePrompt)}`}
              alt={panel.imagePrompt}
              fill
              className="object-cover"
            />
          )}

          {/* Thought bubble overlay */}
          {panel.dialogue && (
            <div className="absolute top-2 right-2 max-w-[45%] z-10">
              <div className="thought-bubble-cloud bg-white/95 backdrop-blur-sm rounded-[50%] p-3 shadow-xl border-2 border-primary/30 relative">
                <p className="text-xs md:text-sm text-foreground/90 font-medium text-center leading-tight">
                  {panel.dialogue}
                </p>
                {/* Thought bubble tail */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
                  <div className="w-2 h-2 bg-white/95 rounded-full border border-primary/30"></div>
                  <div className="w-1.5 h-1.5 bg-white/95 rounded-full border border-primary/30"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
