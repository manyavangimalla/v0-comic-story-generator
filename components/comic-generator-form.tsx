"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Wand2, Download, Share2, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateComicStory, generateComicImage } from "@/app/actions"
import { ComicPanel } from "@/components/comic-panel"

const themes = [
  { id: "kindness", label: "Kindness", emoji: "💝", color: "bg-pink-100" },
  { id: "honesty", label: "Honesty", emoji: "🌟", color: "bg-yellow-100" },
  { id: "friendship", label: "Friendship", emoji: "🤝", color: "bg-blue-100" },
  { id: "courage", label: "Courage", emoji: "🦁", color: "bg-orange-100" },
  { id: "environment", label: "Nature", emoji: "🌱", color: "bg-green-100" },
  { id: "hardwork", label: "Hard Work", emoji: "💪", color: "bg-purple-100" },
  { id: "superheroes", label: "Superheroes", emoji: "🦸", color: "bg-red-100" },
  { id: "marvel", label: "Marvel Heroes", emoji: "⚡", color: "bg-indigo-100" },
  { id: "adventure", label: "Adventure", emoji: "🗺️", color: "bg-teal-100" },
  { id: "magic", label: "Magic", emoji: "✨", color: "bg-violet-100" },
  { id: "animals", label: "Animals", emoji: "🐾", color: "bg-amber-100" },
  { id: "space", label: "Space", emoji: "🚀", color: "bg-cyan-100" },
]

const models = [
  {
    id: "nvidia/Nemotron-Mini-4B-Instruct",
    label: "NVIDIA Nemotron Model",
    description: "AI-powered story generation",
  },
  {
    id: "template",
    label: "Template Stories",
    description: "Pre-written educational stories",
  },
  {
    id: "google/flan-t5-large",
    label: "Google Flan-T5",
    description: "Reliable text generation",
  },
]

export interface ComicPanelData {
  panelNumber: number
  title: string
  narrative: string
  dialogue: string
  imagePrompt: string
  character: string
}

export function ComicGeneratorForm() {
  const [selectedTheme, setSelectedTheme] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>(models[0].id)
  const [isGenerating, setIsGenerating] = useState(false)
  const [comicPanels, setComicPanels] = useState<ComicPanelData[]>([])
  const [storyTitle, setStoryTitle] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [generatedImages, setGeneratedImages] = useState<Record<number, string | null>>({})
  const [savedComics, setSavedComics] = useState<Array<{ title: string; theme: string; timestamp: number }>>([])
  const [showHistory, setShowHistory] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!selectedTheme) return

    console.log("[v0] Generating comic with theme:", selectedTheme, "model:", selectedModel)

    setIsGenerating(true)
    setComicPanels([])
    setStoryTitle("")
    setError("")
    setGeneratedImages({})

    try {
      const result = await generateComicStory(selectedTheme, selectedModel)
      setStoryTitle(result.title)
      setComicPanels(result.panels)

      saveToHistory()

      console.log("[v0] Starting image generation for all panels")
      const imagePromises = result.panels.map(async (panel) => {
        const image = await generateComicImage(panel.imagePrompt)
        return { panelNumber: panel.panelNumber, image }
      })

      const images = await Promise.all(imagePromises)
      const imageMap: Record<number, string | null> = {}
      images.forEach(({ panelNumber, image }) => {
        imageMap[panelNumber] = image
      })
      setGeneratedImages(imageMap)
      console.log("[v0] Image generation complete")
    } catch (error) {
      console.error("[v0] Error generating comic:", error)
      const errorMessage = error instanceof Error ? error.message : "Something went wrong"
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleModelSelect = (modelId: string) => {
    console.log("[v0] Model selected:", modelId)
    setSelectedModel(modelId)
  }

  const handleDownload = () => {
    // Create a rich text document content
    let docContent = `${storyTitle}\n`
    docContent += `${"=".repeat(storyTitle.length)}\n\n`
    docContent += `Theme: ${themes.find((t) => t.id === selectedTheme)?.label}\n`
    docContent += `Generated: ${new Date().toLocaleDateString()}\n\n`
    docContent += `${"=".repeat(50)}\n\n`

    comicPanels.forEach((panel, index) => {
      docContent += `Panel ${panel.panelNumber}: ${panel.title}\n`
      docContent += `${"-".repeat(40)}\n\n`
      docContent += `Scene Description:\n${panel.narrative}\n\n`
      docContent += `Character: ${panel.character}\n`
      docContent += `Dialogue: "${panel.dialogue}"\n\n`
      docContent += `Visual Description: ${panel.imagePrompt}\n\n`
      if (index < comicPanels.length - 1) {
        docContent += `${"=".repeat(50)}\n\n`
      }
    })

    docContent += `\n${"=".repeat(50)}\n`
    docContent += `The End\n\n`
    docContent += `This story was created with AI-powered storytelling technology.\n`
    docContent += `Powered by NVIDIA Nemotron and Hugging Face.\n`

    // Create blob and download as .doc (RTF format that Word can open)
    const blob = new Blob([docContent], { type: "application/msword" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${storyTitle.replace(/\s+/g, "-").toLowerCase()}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShare = async () => {
    if (!storyTitle || comicPanels.length === 0) {
      toast({
        title: "No story to share",
        description: "Please generate a story first before sharing!",
        variant: "destructive",
      })
      return
    }

    const shareText = `Check out this magical comic story: "${storyTitle}"!\n\nTheme: ${themes.find((t) => t.id === selectedTheme)?.label}\n\nCreated with AI-powered storytelling. 🎨✨`

    // Try Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: storyTitle,
          text: shareText,
        })
        console.log("[v0] Story shared successfully")
        toast({
          title: "Story shared!",
          description: "Your comic story has been shared successfully.",
        })
      } catch (error) {
        // User cancelled or share failed
        if (error instanceof Error && error.name !== "AbortError") {
          // If it's not a user cancellation, fall back to clipboard
          fallbackToClipboard(shareText)
        }
      }
    } else {
      // Web Share API not supported, use clipboard
      fallbackToClipboard(shareText)
    }
  }

  const fallbackToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard!",
        description: "Story details copied. You can now paste and share it anywhere.",
      })
    } catch (error) {
      console.error("[v0] Failed to copy to clipboard:", error)
      toast({
        title: "Share failed",
        description: "Unable to share or copy. Please try again.",
        variant: "destructive",
      })
    }
  }

  const saveToHistory = () => {
    const newComic = {
      title: storyTitle,
      theme: selectedTheme,
      timestamp: Date.now(),
    }
    const updated = [newComic, ...savedComics].slice(0, 10)
    setSavedComics(updated)
    localStorage.setItem("comicHistory", JSON.stringify(updated))
  }

  return (
    <div className="space-y-8">
      <Card className="p-6 md:p-8 bg-white/95 border-4 border-foreground shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground text-center">Choose Your Story Theme</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-2 md:p-3 rounded-lg border-2 border-foreground transition-all ${
                selectedTheme === theme.id
                  ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                  : "bg-white hover:scale-105 hover:shadow-md"
              }`}
            >
              <div className="text-2xl md:text-3xl mb-1">{theme.emoji}</div>
              <div className="font-bold text-sm md:text-base">{theme.label}</div>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-bold mb-3 text-foreground">Story Generator Model</label>
          <div className="grid md:grid-cols-2 gap-3">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => handleModelSelect(model.id)}
                className={`p-4 rounded-lg border-2 border-foreground transition-all text-left ${
                  selectedModel === model.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-white hover:scale-105 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-bold text-base mb-1">{model.label}</div>
                    <div className="text-sm opacity-90">{model.description}</div>
                  </div>
                  {selectedModel === model.id && <Check className="w-5 h-5 ml-2 flex-shrink-0" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!selectedTheme || isGenerating}
          size="lg"
          className="w-full text-lg font-bold py-6 bg-primary hover:bg-primary/90 border-3 border-foreground shadow-lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Your Comic Story...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Comic Story!
            </>
          )}
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg">
            <p className="text-red-700 font-medium text-base">{error}</p>
            <p className="text-base text-red-600 mt-1">
              The AI model may not be available. Try using "Template Stories" instead, or add your API keys in the Vars
              section.
            </p>
          </div>
        )}
      </Card>

      {storyTitle && (
        <div className="space-y-6">
          <div className="text-center bg-white/95 p-6 rounded-2xl border-4 border-foreground shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{storyTitle}</h2>
            <p className="text-muted-foreground text-lg mb-4">
              A story about {themes.find((t) => t.id === selectedTheme)?.label.toLowerCase()}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={handleDownload} variant="outline" size="lg" className="border-2 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Download Story
              </Button>
              <Button onClick={handleShare} variant="outline" size="lg" className="border-2 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                Share Story
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {comicPanels.map((panel) => (
              <ComicPanel key={panel.panelNumber} panel={panel} generatedImage={generatedImages[panel.panelNumber]} />
            ))}
          </div>

          <div className="text-center bg-white/95 p-6 rounded-2xl border-4 border-foreground shadow-xl">
            <p className="text-xl font-bold text-foreground mb-2">The End! 🎉</p>
            <p className="text-muted-foreground">Want another story? Choose a different theme above!</p>
          </div>
        </div>
      )}
    </div>
  )
}
