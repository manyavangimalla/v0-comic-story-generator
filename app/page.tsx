import { ComicGeneratorForm } from "@/components/comic-generator-form"
import { BookOpen, Sparkles, Cloud, Leaf, Zap, Cpu, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-20 left-10 opacity-20 floating-cloud">
        <Cloud className="w-24 h-24 text-sky-blue" />
      </div>
      <div className="absolute top-40 right-20 opacity-20 floating-cloud" style={{ animationDelay: "2s" }}>
        <Cloud className="w-32 h-32 text-lavender" />
      </div>
      <div className="absolute bottom-40 left-1/4 opacity-20 floating-cloud" style={{ animationDelay: "4s" }}>
        <Leaf className="w-20 h-20 text-grass-green" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-primary/30 shadow-lg ghibli-glow">
            <BookOpen className="w-10 h-10 text-primary" strokeWidth={2.5} />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground font-serif">Magical Comic Stories</h1>
            <Sparkles className="w-10 h-10 text-accent" strokeWidth={2.5} />
          </div>
          <p className="text-lg md:text-2xl text-foreground/80 font-medium max-w-2xl mx-auto leading-relaxed mb-6">
            Create enchanting educational tales for children, where every story is a new adventure
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white/30">
              <Cpu className="w-5 h-5" />
              <span className="font-bold text-base">Powered by NVIDIA Nemotron</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-black to-gray-800 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white/30">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-base">Built on Vercel</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/liked">
              <Button variant="outline" size="lg" className="border-2 border-red-500/50 hover:bg-red-50 bg-white/80">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                View Liked Stories
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary/50 hover:bg-primary/10 bg-white/80"
              >
                Learn About This Project
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <ComicGeneratorForm />
      </div>
    </main>
  )
}
