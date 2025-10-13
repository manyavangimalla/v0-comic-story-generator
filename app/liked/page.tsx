"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, ArrowLeft, Sparkles, BookOpen } from "lucide-react"
import Link from "next/link"
import { ComicPanel } from "@/components/comic-panel"
import type { LikedStory } from "@/components/comic-generator-form"
import { useToast } from "@/hooks/use-toast"

const themes = [
  { id: "kindness", label: "Kindness", emoji: "💝" },
  { id: "honesty", label: "Honesty", emoji: "🌟" },
  { id: "friendship", label: "Friendship", emoji: "🤝" },
  { id: "courage", label: "Courage", emoji: "🦁" },
  { id: "environment", label: "Nature", emoji: "🌱" },
  { id: "hardwork", label: "Hard Work", emoji: "💪" },
  { id: "superheroes", label: "Superheroes", emoji: "🦸" },
  { id: "marvel", label: "Marvel Heroes", emoji: "⚡" },
  { id: "adventure", label: "Adventure", emoji: "🗺️" },
  { id: "magic", label: "Magic", emoji: "✨" },
  { id: "animals", label: "Animals", emoji: "🐾" },
  { id: "space", label: "Space", emoji: "🚀" },
]

export default function LikedStoriesPage() {
  const [likedStories, setLikedStories] = useState<LikedStory[]>([])
  const [selectedStory, setSelectedStory] = useState<LikedStory | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadLikedStories()
  }, [])

  const loadLikedStories = () => {
    const stories = JSON.parse(localStorage.getItem("likedStories") || "[]") as LikedStory[]
    setLikedStories(stories)
  }

  const handleUnlike = (storyId: string) => {
    const updated = likedStories.filter((story) => story.id !== storyId)
    localStorage.setItem("likedStories", JSON.stringify(updated))
    setLikedStories(updated)
    if (selectedStory?.id === storyId) {
      setSelectedStory(null)
    }
    toast({
      title: "Removed from favorites",
      description: "Story removed from your liked list.",
    })
  }

  const getThemeInfo = (themeId: string) => {
    return themes.find((t) => t.id === themeId) || { label: themeId, emoji: "📖" }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 35px, #8b4513 35px, #8b4513 40px)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-8">
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="mb-4 border-2 bg-amber-100/80 hover:bg-amber-200/80 border-amber-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generator
            </Button>
          </Link>

          <div className="relative bg-gradient-to-br from-amber-800 to-amber-900 p-8 rounded-lg shadow-2xl border-4 border-amber-950">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-700 px-6 py-2 rounded-full border-4 border-amber-950 shadow-lg">
              <BookOpen className="w-6 h-6 text-amber-50 inline mr-2" />
              <span className="text-amber-50 font-bold text-sm">Story Collection</span>
            </div>
            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 text-red-400 fill-current" />
                <h1 className="text-3xl md:text-5xl font-bold text-amber-50 font-serif">My Favorite Tales</h1>
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <p className="text-lg text-amber-200 font-serif italic">A treasury of beloved stories</p>
            </div>
          </div>
        </header>

        {likedStories.length === 0 ? (
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-12 rounded-lg shadow-2xl border-8 border-double border-amber-800">
            <div className="absolute top-0 left-1/2 w-1 h-full bg-amber-800 -translate-x-1/2" />
            <div className="text-center relative">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-amber-700" />
              <h2 className="text-2xl font-bold text-amber-900 mb-2 font-serif">Your Story Book is Empty</h2>
              <p className="text-amber-700 mb-6 font-serif">
                Begin your collection by generating stories and saving your favorites!
              </p>
              <Link href="/">
                <Button size="lg" className="bg-amber-800 hover:bg-amber-900 text-amber-50 border-2 border-amber-950">
                  Write Your First Story
                </Button>
              </Link>
            </div>
          </div>
        ) : selectedStory ? (
          <div className="space-y-6">
            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg shadow-2xl border-8 border-double border-amber-800">
              <div className="absolute top-0 left-1/2 w-1 h-full bg-amber-800 -translate-x-1/2" />
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-amber-900 mb-2 font-serif">{selectedStory.title}</h2>
                  <p className="text-lg text-amber-700 font-serif">
                    Theme: {getThemeInfo(selectedStory.theme).emoji} {getThemeInfo(selectedStory.theme).label}
                  </p>
                  <p className="text-sm text-amber-600 font-serif italic">
                    Saved on {new Date(selectedStory.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStory(null)}
                    className="border-2 border-amber-800 bg-amber-100 hover:bg-amber-200"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Library
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleUnlike(selectedStory.id)}
                    className="bg-red-700 hover:bg-red-800"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedStory.panels.map((panel) => (
                <ComicPanel
                  key={panel.panelNumber}
                  panel={panel}
                  generatedImage={selectedStory.images[panel.panelNumber]}
                />
              ))}
            </div>

            <div className="text-center bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg shadow-2xl border-8 border-double border-amber-800">
              <p className="text-xl font-bold text-amber-900 font-serif">The End 🎉</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedStories.map((story) => (
              <div key={story.id} className="relative group cursor-pointer" onClick={() => setSelectedStory(story)}>
                <div className="relative bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg shadow-2xl border-4 border-amber-950 overflow-hidden transform transition-all hover:scale-105 hover:shadow-3xl">
                  {/* Book spine edge effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-amber-950/50 to-transparent" />
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/30 to-transparent" />

                  {/* Book cover image */}
                  <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden border-b-4 border-amber-950">
                    {story.images[1] ? (
                      <img
                        src={story.images[1] || "/placeholder.svg"}
                        alt={story.panels[0]?.title || "Story preview"}
                        className="w-full h-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-amber-700/40" />
                      </div>
                    )}
                    {/* Page count badge */}
                    <div className="absolute top-2 right-2 bg-amber-100 px-2 py-1 rounded border-2 border-amber-900 shadow-lg">
                      <span className="text-xs font-bold text-amber-900">{story.panels.length} pages</span>
                    </div>
                  </div>

                  {/* Book title on spine */}
                  <div className="bg-gradient-to-br from-amber-800 to-amber-900 p-3 border-b-2 border-amber-950">
                    <h3 className="font-bold text-base text-amber-50 font-serif line-clamp-2 leading-tight text-center">
                      {story.title}
                    </h3>
                  </div>

                  {/* Book details */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-2">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      <span className="text-lg">{getThemeInfo(story.theme).emoji}</span>
                      <span className="font-medium text-xs text-amber-900 font-serif">
                        {getThemeInfo(story.theme).label}
                      </span>
                    </div>

                    {story.panels[0]?.narrative && (
                      <p className="text-xs text-amber-700 mb-1 line-clamp-2 italic leading-tight text-center font-serif">
                        "{story.panels[0].narrative.substring(0, 60)}..."
                      </p>
                    )}

                    {story.panels.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1 justify-center">
                        {Array.from(new Set(story.panels.map((p) => p.character).filter(Boolean)))
                          .slice(0, 2)
                          .map((character, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded border border-amber-800 font-serif"
                            >
                              {character}
                            </span>
                          ))}
                      </div>
                    )}

                    <p className="text-xs text-amber-600 mb-2 text-center font-serif italic">
                      {new Date(story.timestamp).toLocaleDateString()}
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-2 border-amber-800 bg-amber-100 hover:bg-amber-200 text-xs h-7 font-serif"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedStory(story)
                        }}
                      >
                        Read Story
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-7 w-7 p-0 bg-red-700 hover:bg-red-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUnlike(story.id)
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
