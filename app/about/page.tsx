import { BookOpen, Sparkles, Heart, Cpu, Zap, Globe, Users, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <Button variant="outline" size="lg" className="border-2 border-primary/50 bg-transparent">
              Back to Generator
            </Button>
          </Link>

          <div className="inline-flex items-center gap-3 mb-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-primary/30 shadow-lg">
            <BookOpen className="w-10 h-10 text-primary" strokeWidth={2.5} />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">About This Project</h1>
          </div>
        </header>

        <div className="space-y-8">
          {/* Mission Statement */}
          <Card className="p-8 bg-white/95 border-4 border-foreground shadow-xl">
            <div className="flex items-start gap-4 mb-4">
              <Heart className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  Magical Comic Stories empowers children to learn important life values through engaging, AI-generated
                  comic narratives. By combining cutting-edge AI technology with educational storytelling, we make
                  learning fun, accessible, and memorable for kids aged 6-10.
                </p>
              </div>
            </div>
          </Card>

          {/* Technology Stack */}
          <Card className="p-8 bg-white/95 border-4 border-foreground shadow-xl">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Cpu className="w-8 h-8 text-primary" />
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-foreground">NVIDIA Nemotron Mini</h3>
                    <p className="text-sm text-foreground/70">
                      Advanced AI model for creative story generation with sophisticated reasoning capabilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-foreground">Hugging Face FLUX</h3>
                    <p className="text-sm text-foreground/70">
                      State-of-the-art image generation for vibrant, kid-friendly comic illustrations
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-foreground">Vercel & Next.js</h3>
                    <p className="text-sm text-foreground/70">
                      Modern web framework with server actions for seamless, fast user experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-bold text-foreground">Ghibli-Inspired Design</h3>
                    <p className="text-sm text-foreground/70">
                      Whimsical, dreamy UI that captures children's imagination and wonder
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Impact & Features */}
          <Card className="p-8 bg-white/95 border-4 border-foreground shadow-xl">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              Impact & Features
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Educational Value</h3>
                  <p className="text-foreground/70">
                    12 carefully crafted themes teaching kindness, honesty, courage, and more through relatable stories
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Accessibility</h3>
                  <p className="text-foreground/70">
                    Free, web-based platform accessible to children worldwide, no downloads required
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">Scalable & Fast</h3>
                  <p className="text-foreground/70">
                    Built on Vercel's edge network for instant loading and generation anywhere in the world
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-1">AI-Powered Creativity</h3>
                  <p className="text-foreground/70">
                    NVIDIA Nemotron generates unique, contextual stories while maintaining educational integrity
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Business Impact */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-4 border-foreground shadow-xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">Business Impact</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-4">
              This project demonstrates the potential of AI in education technology, addressing the growing need for
              engaging, personalized learning content. With the global EdTech market projected to reach $404B by 2025,
              AI-powered storytelling platforms can revolutionize how children learn values and develop literacy skills.
            </p>
            <p className="text-foreground/70">
              By leveraging NVIDIA's advanced AI models and Vercel's infrastructure, we've created a scalable solution
              that can serve millions of children while maintaining high-quality, educational content generation.
            </p>
          </Card>

          {/* CTA */}
          <div className="text-center pt-6">
            <Link href="/">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 border-3 border-foreground">
                <Sparkles className="w-5 h-5 mr-2" />
                Try It Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
