"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, ArrowLeft, Sparkles } from "lucide-react"
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
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <Link href="/">
            <Button variant="outline" size="lg" className="mb-4 border-2 bg-white/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generator
            </Button>
          </Link>

          <div className="text-center bg-white/95 backdrop-blur-sm p-6 rounded-2xl border-4 border-foreground shadow-xl">
            <div className="inline-flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <h1 className="text-3xl md:text-5xl font-bold text-foreground font-serif">Liked Stories</h1>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <p className="text-lg text-muted-foreground">Your collection of favorite magical comic stories</p>
          </div>
        </header>

        {likedStories.length === 0 ? (
          <Card className="p-12 text-center bg-white/95 border-4 border-foreground">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No liked stories yet</h2>
            <p className="text-muted-foreground mb-6">
              Start generating stories and click the heart button to save your favorites!
            </p>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Generate Your First Story
              </Button>
            </Link>
          </Card>
        ) : selectedStory ? (
          <div className="space-y-6">
            <Card className="p-6 bg-white/95 border-4 border-foreground">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-2">{selectedStory.title}</h2>
                  <p className="text-lg text-muted-foreground">
                    Theme: {getThemeInfo(selectedStory.theme).emoji} {getThemeInfo(selectedStory.theme).label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Saved on {new Date(selectedStory.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedStory(null)} className="border-2">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to List
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleUnlike(selectedStory.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {selectedStory.panels.map((panel) => (
                <ComicPanel
                  key={panel.panelNumber}
                  panel={panel}
                  generatedImage={selectedStory.images[panel.panelNumber]}
                />
              ))}
            </div>

            <div className="text-center bg-white/95 p-6 rounded-2xl border-4 border-foreground shadow-xl">
              <p className="text-xl font-bold text-foreground mb-2">The End! 🎉</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedStories.map((story) => (
              <Card
                key={story.id}
                className="overflow-hidden border-4 border-foreground hover:shadow-xl transition-all cursor-pointer bg-white/95"
                onClick={() => setSelectedStory(story)}
              >
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  {story.images[1] ? (
                    <img
                      src={story.images[1] || "/placeholder.svg"}
                      alt={story.panels[0]?.title || "Story preview"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border-2 border-foreground">
                    <span className="text-xs font-bold">{story.panels.length} panels</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-primary/80 to-secondary/80 p-2">
                  <h3 className="font-bold text-lg text-primary-foreground font-serif line-clamp-2 leading-tight">
                    {story.title}
                  </h3>
                </div>
                <div className="p-1.5">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xl">{getThemeInfo(story.theme).emoji}</span>
                    <span className="font-medium text-sm text-foreground">{getThemeInfo(story.theme).label}</span>
                  </div>

                  {story.panels[0]?.narrative && (
                    <p className="text-xs text-muted-foreground mb-0.5 line-clamp-2 italic leading-tight">
                      "{story.panels[0].narrative}"
                    </p>
                  )}

                  {story.panels.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mb-0.5">
                      {Array.from(new Set(story.panels.map((p) => p.character).filter(Boolean)))
                        .slice(0, 3)
                        .map((character, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full border border-primary/20"
                          >
                            {character}
                          </span>
                        ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mb-1.5">
                    Saved {new Date(story.timestamp).toLocaleDateString()}
                  </p>
                  <div className="flex gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2 bg-transparent text-xs h-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedStory(story)
                      }}
                    >
                      View Story
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUnlike(story.id)
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
