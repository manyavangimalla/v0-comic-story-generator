"use server"

import type { ComicPanelData } from "@/components/comic-generator-form"

const themePrompts = {
  kindness: "a story about being kind to others, sharing, and helping those in need",
  honesty: "a story about telling the truth, being honest, and the importance of integrity",
  friendship: "a story about making friends, being a good friend, and working together",
  courage: "a story about being brave, facing fears, and standing up for what is right",
  environment: "a story about protecting nature, caring for animals, and keeping our planet clean",
  hardwork: "a story about working hard, never giving up, and achieving goals through perseverance",
  superheroes: "a story about a superhero using their powers to help others and save the day",
  marvel: "a story about Marvel-style heroes working together to overcome challenges",
  adventure: "an exciting adventure story with exploration, discovery, and overcoming obstacles",
  magic: "a magical story with wizards, spells, and enchanted adventures",
  animals: "a story about animals, their friendships, and learning important lessons from nature",
  space: "a space adventure story with astronauts, planets, and cosmic discoveries",
}

const templateStories = {
  kindness: {
    title: "Maya's Helping Hand",
    panels: [
      {
        panelNumber: 1,
        title: "A Busy Morning",
        narrative:
          "Maya was walking to school when she saw her neighbor, Mrs. Chen, struggling with heavy grocery bags.",
        dialogue: "Those bags look really heavy!",
        imagePrompt:
          "A cheerful young girl with a backpack walking on a sunny sidewalk, seeing an elderly woman with multiple grocery bags",
        character: "Maya",
      },
      {
        panelNumber: 2,
        title: "Offering Help",
        narrative: "Maya ran over and offered to help carry the bags to Mrs. Chen's house.",
        dialogue: "Can I help you carry those, Mrs. Chen?",
        imagePrompt: "A kind young girl reaching out to help an elderly woman with grocery bags, both smiling",
        character: "Maya",
      },
      {
        panelNumber: 3,
        title: "Working Together",
        narrative: "Together, they carried the bags safely to Mrs. Chen's door. It was much easier with two people!",
        dialogue: "Thank you so much, Maya! You're so kind!",
        imagePrompt: "A girl and elderly woman walking together carrying grocery bags, arriving at a house door",
        character: "Mrs. Chen",
      },
      {
        panelNumber: 4,
        title: "A Sweet Reward",
        narrative: "Mrs. Chen gave Maya a homemade cookie and a big hug. Maya felt happy knowing she helped someone.",
        dialogue: "Helping others makes me feel good inside!",
        imagePrompt:
          "A happy girl holding a cookie, elderly woman smiling warmly, both standing at a doorway with hearts around them",
        character: "Maya",
      },
    ],
  },
  honesty: {
    title: "The Broken Vase",
    panels: [
      {
        panelNumber: 1,
        title: "Uh Oh!",
        narrative:
          "While playing ball inside, Alex accidentally knocked over Mom's favorite vase. It shattered on the floor.",
        dialogue: "Oh no! What do I do?",
        imagePrompt: "A worried boy standing next to a broken vase on the floor, ball nearby, looking concerned",
        character: "Alex",
      },
      {
        panelNumber: 2,
        title: "A Difficult Choice",
        narrative: "Alex thought about hiding it, but he knew that wouldn't be right. He decided to tell the truth.",
        dialogue: "I need to tell Mom what happened, even though I'm scared.",
        imagePrompt:
          "A thoughtful boy looking at broken vase pieces, making a decision, thought bubble showing honesty",
        character: "Alex",
      },
      {
        panelNumber: 3,
        title: "Telling the Truth",
        narrative: "When Mom came home, Alex told her exactly what happened. His voice was shaky but honest.",
        dialogue: "Mom, I'm sorry. I broke your vase while playing ball inside.",
        imagePrompt: "A boy confessing to his mother, looking apologetic, mother listening calmly",
        character: "Mom",
      },
      {
        panelNumber: 4,
        title: "Proud Moment",
        narrative: "Mom was sad about the vase, but proud that Alex told the truth. They cleaned it up together.",
        dialogue: "I'm proud of you for being honest. That took courage!",
        imagePrompt: "Mother hugging her son, both cleaning up broken pieces together, warm and loving scene",
        character: "Mom",
      },
    ],
  },
  friendship: {
    title: "New Friends at the Park",
    panels: [
      {
        panelNumber: 1,
        title: "Feeling Lonely",
        narrative:
          "Sam sat alone on the park bench, watching other kids play together. He wished he had friends to play with.",
        dialogue: "I wish I could join them...",
        imagePrompt: "A shy boy sitting alone on a park bench, other children playing in the background",
        character: "Sam",
      },
      {
        panelNumber: 2,
        title: "Taking a Chance",
        narrative: "Sam took a deep breath and walked over to a group playing soccer. His heart was beating fast!",
        dialogue: "Hi! Can I play with you?",
        imagePrompt: "A nervous but brave boy approaching a group of kids playing soccer, smiling hopefully",
        character: "Sam",
      },
      {
        panelNumber: 3,
        title: "Welcome!",
        narrative: "The kids smiled and welcomed Sam to their game. They were happy to have another player!",
        dialogue: "Of course! We need another player for our team!",
        imagePrompt: "Group of diverse children welcoming a new friend, all smiling and giving high-fives",
        character: "Jamie",
      },
      {
        panelNumber: 4,
        title: "Best Day Ever",
        narrative:
          "Sam had so much fun playing with his new friends. He learned that making friends just takes a little courage!",
        dialogue: "This is the best day ever! See you tomorrow?",
        imagePrompt: "Happy children playing soccer together, laughing and having fun, sunset in background",
        character: "Sam",
      },
    ],
  },
  courage: {
    title: "Lily's Big Speech",
    panels: [
      {
        panelNumber: 1,
        title: "Stage Fright",
        narrative:
          "Lily had to give a speech in front of the whole school. Her hands were shaking and her stomach felt funny.",
        dialogue: "I'm so nervous! What if I mess up?",
        imagePrompt: "A nervous girl holding papers, standing backstage, looking worried at a large auditorium",
        character: "Lily",
      },
      {
        panelNumber: 2,
        title: "A Pep Talk",
        narrative: "Her teacher, Mr. Rodriguez, gave her an encouraging smile and some wise words.",
        dialogue: "Being brave doesn't mean you're not scared. It means doing it anyway!",
        imagePrompt: "A kind teacher kneeling down, talking encouragingly to a nervous student, hand on shoulder",
        character: "Mr. Rodriguez",
      },
      {
        panelNumber: 3,
        title: "Taking the Stage",
        narrative:
          "Lily walked onto the stage. Her legs felt wobbly, but she remembered Mr. Rodriguez's words and began to speak.",
        dialogue: "Good morning, everyone. Today I want to talk about...",
        imagePrompt: "A brave girl standing at a podium on stage, speaking into a microphone, audience watching",
        character: "Lily",
      },
      {
        panelNumber: 4,
        title: "Success!",
        narrative: "Lily finished her speech and everyone clapped! She felt proud that she faced her fear.",
        dialogue: "I did it! I was scared, but I was brave!",
        imagePrompt:
          "A proud, smiling girl on stage with arms raised, audience clapping enthusiastically, confetti falling",
        character: "Lily",
      },
    ],
  },
  environment: {
    title: "The Beach Cleanup Crew",
    panels: [
      {
        panelNumber: 1,
        title: "A Messy Beach",
        narrative:
          "Carlos and his friends went to the beach and were shocked to see plastic bottles and trash everywhere.",
        dialogue: "This is terrible! The animals could get hurt by all this trash!",
        imagePrompt: "Children at a beach looking concerned at plastic bottles and trash scattered on the sand",
        character: "Carlos",
      },
      {
        panelNumber: 2,
        title: "Making a Plan",
        narrative: "Instead of just complaining, Carlos had an idea. They could organize a beach cleanup!",
        dialogue: "Let's clean it up! We can make a difference together!",
        imagePrompt: "An enthusiastic boy with an idea, talking to friends, pointing at the beach with determination",
        character: "Carlos",
      },
      {
        panelNumber: 3,
        title: "Teamwork in Action",
        narrative: "The friends grabbed bags and gloves and started picking up trash. More kids joined to help!",
        dialogue: "Look how much we've collected already!",
        imagePrompt: "Group of diverse children working together picking up trash on beach, holding bags and gloves",
        character: "Mia",
      },
      {
        panelNumber: 4,
        title: "A Clean Beach",
        narrative:
          "After an hour, the beach looked beautiful again! The kids felt proud knowing they helped the environment.",
        dialogue: "We did it! Now the animals are safe and the beach is clean!",
        imagePrompt:
          "Happy children on a clean beach, holding full trash bags, ocean and clean sand behind them, seabirds flying",
        character: "Carlos",
      },
    ],
  },
  hardwork: {
    title: "Emma's Garden Dream",
    panels: [
      {
        panelNumber: 1,
        title: "A Big Dream",
        narrative: "Emma wanted to grow her own vegetable garden, but the backyard was full of weeds and rocks.",
        dialogue: "This looks really hard... but I can do it!",
        imagePrompt: "A determined young girl looking at an overgrown, weedy backyard with gardening tools nearby",
        character: "Emma",
      },
      {
        panelNumber: 2,
        title: "Hard Work Begins",
        narrative: "Every day after school, Emma pulled weeds, moved rocks, and prepared the soil. It was tiring work!",
        dialogue: "My arms are sore, but I won't give up!",
        imagePrompt: "A girl working hard in a garden, pulling weeds, sweating but smiling with determination",
        character: "Emma",
      },
      {
        panelNumber: 3,
        title: "Planting Seeds",
        narrative:
          "After weeks of hard work, the garden was ready. Emma carefully planted tomato, carrot, and lettuce seeds.",
        dialogue: "I can't wait to see them grow!",
        imagePrompt: "A happy girl planting seeds in neat garden rows, watering can nearby, organized garden beds",
        character: "Emma",
      },
      {
        panelNumber: 4,
        title: "Harvest Time",
        narrative: "Months later, Emma's garden was full of vegetables! Her hard work had paid off.",
        dialogue: "I grew these myself! Hard work really does pay off!",
        imagePrompt: "A proud girl holding a basket full of fresh vegetables, beautiful thriving garden behind her",
        character: "Emma",
      },
    ],
  },
  superheroes: {
    title: "Captain Courage Saves the Day",
    panels: [
      {
        panelNumber: 1,
        title: "A City in Danger",
        narrative: "The city alarm rang loudly! A runaway train was speeding toward the station with no way to stop!",
        dialogue: "I need to help those people!",
        imagePrompt:
          "A superhero in a blue and red costume flying above a city, looking at a speeding train below, dramatic action scene",
        character: "Captain Courage",
      },
      {
        panelNumber: 2,
        title: "Using Super Strength",
        narrative: "Captain Courage flew down and used super strength to slow the train safely to a stop!",
        dialogue: "Everyone hold on! I've got you!",
        imagePrompt:
          "A superhero holding the front of a train, muscles glowing with power, passengers visible through windows looking relieved",
        character: "Captain Courage",
      },
      {
        panelNumber: 3,
        title: "Everyone is Safe",
        narrative: "All the passengers cheered as they safely exited the train. No one was hurt!",
        dialogue: "Thank you, Captain Courage! You saved us!",
        imagePrompt: "Happy passengers exiting a train, waving and cheering at a smiling superhero, city background",
        character: "Passenger",
      },
      {
        panelNumber: 4,
        title: "A Hero's Lesson",
        narrative: "Captain Courage reminded everyone that real heroes help others, with or without superpowers!",
        dialogue: "Anyone can be a hero by helping others!",
        imagePrompt:
          "A superhero talking to a group of diverse children, pointing to his heart, inspirational scene with city skyline",
        character: "Captain Courage",
      },
    ],
  },
  marvel: {
    title: "The Avengers Team Up",
    panels: [
      {
        panelNumber: 1,
        title: "A New Threat",
        narrative: "A mysterious robot army appeared in the city! The Avengers assembled to protect everyone!",
        dialogue: "Avengers, assemble! We need to work together!",
        imagePrompt:
          "A team of diverse superheroes in action poses, standing together facing robot enemies, epic team shot",
        character: "Team Leader",
      },
      {
        panelNumber: 2,
        title: "Each Hero's Strength",
        narrative: "Each Avenger used their unique powers - strength, speed, smarts, and teamwork!",
        dialogue: "My tech can disable their systems!",
        imagePrompt:
          "Multiple superheroes in action, one using technology, one using strength, one using speed, coordinated battle scene",
        character: "Tech Hero",
      },
      {
        panelNumber: 3,
        title: "Working Together",
        narrative: "By combining their powers and working as a team, they defeated the robot army!",
        dialogue: "Together, we're unstoppable!",
        imagePrompt:
          "Superheroes high-fiving and celebrating victory, defeated robots in background, teamwork celebration",
        character: "Speed Hero",
      },
      {
        panelNumber: 4,
        title: "Stronger Together",
        narrative: "The city was saved! The Avengers proved that teamwork makes everyone stronger!",
        dialogue: "We're stronger together than apart!",
        imagePrompt: "Superhero team posing heroically with city skyline behind them, citizens cheering below",
        character: "Team Leader",
      },
    ],
  },
  adventure: {
    title: "The Treasure Map Mystery",
    panels: [
      {
        panelNumber: 1,
        title: "A Mysterious Map",
        narrative: "Jake found an old treasure map in his grandpa's attic! It showed a path through the forest!",
        dialogue: "This map leads to hidden treasure! Let's go!",
        imagePrompt:
          "An excited boy holding an old treasure map in an attic, sunlight streaming through window, adventure beginning",
        character: "Jake",
      },
      {
        panelNumber: 2,
        title: "Into the Forest",
        narrative: "Jake and his friends followed the map through the forest, solving riddles and finding clues!",
        dialogue: "The next clue says to look by the old oak tree!",
        imagePrompt:
          "Group of diverse children hiking through a beautiful forest, looking at a map, adventure exploration scene",
        character: "Maya",
      },
      {
        panelNumber: 3,
        title: "The Hidden Cave",
        narrative: "The map led them to a hidden cave! Inside, they found something amazing!",
        dialogue: "Look! There's something glowing inside!",
        imagePrompt:
          "Children discovering a mysterious cave entrance, light glowing from inside, exciting discovery moment",
        character: "Sam",
      },
      {
        panelNumber: 4,
        title: "The Real Treasure",
        narrative:
          "The treasure was a time capsule from their grandparents' childhood! The real treasure was the adventure together!",
        dialogue: "The best treasure is the adventure we shared!",
        imagePrompt:
          "Happy children sitting together looking at old photos and toys from a time capsule, warm friendship scene",
        character: "Jake",
      },
    ],
  },
  magic: {
    title: "Luna's First Spell",
    panels: [
      {
        panelNumber: 1,
        title: "Magic School",
        narrative: "Luna was nervous on her first day at magic school. She had never cast a spell before!",
        dialogue: "What if I can't do magic like everyone else?",
        imagePrompt:
          "A young witch with a pointed hat standing nervously in a magical classroom, wands and spell books around",
        character: "Luna",
      },
      {
        panelNumber: 2,
        title: "Learning Together",
        narrative: "Her teacher, Wizard Willow, showed her that magic comes from believing in yourself!",
        dialogue: "Magic isn't just about wands - it's about believing!",
        imagePrompt:
          "A kind elderly wizard with a long beard teaching a young student, magical sparkles floating around them",
        character: "Wizard Willow",
      },
      {
        panelNumber: 3,
        title: "The First Spell",
        narrative: "Luna closed her eyes, believed in herself, and waved her wand. Sparkles filled the air!",
        dialogue: "I'm doing it! I'm really doing magic!",
        imagePrompt:
          "A young witch successfully casting her first spell, colorful magical sparkles and stars swirling around her wand",
        character: "Luna",
      },
      {
        panelNumber: 4,
        title: "A Magical Success",
        narrative: "Luna created beautiful floating flowers! She learned that believing in yourself is the real magic!",
        dialogue: "I can do anything if I believe in myself!",
        imagePrompt:
          "A happy young witch surrounded by magical floating flowers, other students clapping, celebration of success",
        character: "Luna",
      },
    ],
  },
  animals: {
    title: "The Forest Friends",
    panels: [
      {
        panelNumber: 1,
        title: "A Lonely Rabbit",
        narrative:
          "Rosie the rabbit was new to the forest. She watched other animals play together from behind a tree.",
        dialogue: "I wish I had friends to play with...",
        imagePrompt:
          "A shy brown rabbit peeking from behind a tree, watching other forest animals playing together in a sunny clearing",
        character: "Rosie",
      },
      {
        panelNumber: 2,
        title: "A Kind Invitation",
        narrative: "Benny the bear noticed Rosie and invited her to join their game of hide and seek!",
        dialogue: "Hey! Want to play with us? We need another player!",
        imagePrompt:
          "A friendly bear approaching a shy rabbit, other forest animals (deer, fox, squirrel) waving in background",
        character: "Benny",
      },
      {
        panelNumber: 3,
        title: "Playing Together",
        narrative: "Rosie had so much fun playing with her new friends! They laughed and played all afternoon!",
        dialogue: "This is the best day ever!",
        imagePrompt:
          "Forest animals playing hide and seek together, rabbit jumping happily, bear, deer, and fox all smiling and playing",
        character: "Rosie",
      },
      {
        panelNumber: 4,
        title: "Forest Family",
        narrative: "From that day on, Rosie and the forest animals were best friends. Everyone belongs somewhere!",
        dialogue: "We're so glad you're part of our forest family!",
        imagePrompt:
          "Group of happy forest animals sitting together under a tree at sunset, arms around each other, friendship scene",
        character: "Benny",
      },
    ],
  },
  space: {
    title: "Astronaut Amy's Mission",
    panels: [
      {
        panelNumber: 1,
        title: "Blast Off!",
        narrative: "Astronaut Amy was launching into space for her first mission to explore a new planet!",
        dialogue: "3... 2... 1... Blast off! Here we go!",
        imagePrompt:
          "A rocket ship launching into space with flames and smoke, astronaut visible in window waving, Earth below",
        character: "Amy",
      },
      {
        panelNumber: 2,
        title: "Floating in Space",
        narrative: "Amy floated through her spaceship, looking at the beautiful stars and planets all around!",
        dialogue: "Space is even more amazing than I imagined!",
        imagePrompt:
          "An astronaut floating inside a spaceship, looking out large windows at colorful planets and stars, zero gravity",
        character: "Amy",
      },
      {
        panelNumber: 3,
        title: "A New Discovery",
        narrative: "Amy landed on a new planet and discovered colorful crystals that glowed in the dark!",
        dialogue: "Mission control, I found something incredible!",
        imagePrompt:
          "An astronaut on an alien planet surface, examining glowing colorful crystals, alien landscape with two moons in sky",
        character: "Amy",
      },
      {
        panelNumber: 4,
        title: "Mission Success",
        narrative: "Amy returned home safely with her discoveries. She proved that curiosity leads to amazing things!",
        dialogue: "Never stop exploring and asking questions!",
        imagePrompt:
          "An astronaut presenting glowing crystals to excited children in a classroom, space poster on wall, inspiring scene",
        character: "Amy",
      },
    ],
  },
}

async function callNvidiaAPI(prompt: string, modelName = "nvidia/nemotron-mini-4b-instruct") {
  const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY

  if (!NVIDIA_API_KEY) {
    throw new Error("NVIDIA_API_KEY environment variable is not set")
  }

  console.log("[v0] Calling NVIDIA API with model:", modelName)

  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NVIDIA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      top_p: 0.95,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("[v0] NVIDIA API error:", error)
    throw new Error(`NVIDIA API error: ${response.status} - ${error}`)
  }

  const result = await response.json()
  console.log("[v0] NVIDIA API response received")

  return result.choices[0]?.message?.content || ""
}

async function generateImageWithPollinations(prompt: string) {
  console.log("[v0] Using Pollinations.ai for free image generation")
  console.log("[v0] Generating image for:", prompt.substring(0, 50))

  // Pollinations.ai - Free AI image generation, no API key required
  const enhancedPrompt = `${prompt}, Ghibli-inspired style, colorful, kid-friendly, comic book illustration, vibrant colors, whimsical, educational, cartoon style`

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=700&height=400&model=flux&nologo=true&enhance=true`

  console.log("[v0] Image URL generated")
  return imageUrl
}

export async function generateComicImage(imagePrompt: string) {
  try {
    console.log("[v0] Generating image with Pollinations.ai (free, no API key needed)")
    const imageUrl = await generateImageWithPollinations(imagePrompt)
    console.log("[v0] Image generation complete")
    return imageUrl
  } catch (error) {
    console.error("[v0] Error generating image, using placeholder:", error)
    // Fallback to placeholder if something goes wrong
    const shortPrompt = imagePrompt.substring(0, 50)
    return `https://placehold.co/700x400/e0f2fe/1e40af?text=${encodeURIComponent(shortPrompt)}`
  }
}

export async function generateComicStory(theme: string, modelId = "nvidia/nemotron-mini-4b-instruct") {
  const themeDescription = themePrompts[theme as keyof typeof themePrompts] || themePrompts.kindness

  const storyContext = `Create an educational comic story for children (ages 6-10) about ${themeDescription}.`

  const prompt = `${storyContext}

The story should have exactly 4 panels and teach an important life lesson in a fun, engaging way.

Format your response as a JSON object with this structure:
{
  "title": "Story Title",
  "panels": [
    {
      "panelNumber": 1,
      "title": "Panel title (2-4 words)",
      "narrative": "Brief narrative text describing the scene (1-2 sentences)",
      "dialogue": "What the character says (1 sentence)",
      "imagePrompt": "Detailed description for a comic-style illustration showing the scene with characters and setting",
      "character": "Character name speaking"
    }
  ]
}

Make it colorful, positive, and age-appropriate. The story should have a clear beginning, middle, and end with a positive lesson.

Respond ONLY with the JSON object, no additional text.`

  try {
    console.log("[v0] Generating story with NVIDIA model:", modelId)

    // Map the model ID to the correct NVIDIA API model name
    let nvidiaModelName = "nvidia/nemotron-mini-4b-instruct"

    if (modelId.toLowerCase().includes("llama-3.3-nemotron-super")) {
      nvidiaModelName = "nim/nvidia/llama-3.3-nemotron-super-49b-v1"
    } else if (modelId.toLowerCase().includes("nemotron-mini")) {
      nvidiaModelName = "nvidia/nemotron-mini-4b-instruct"
    }

    const text = await callNvidiaAPI(prompt, nvidiaModelName)

    console.log("[v0] Received response:", text.substring(0, 200))

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error("[v0] Failed to find JSON in response, using template fallback")
      throw new Error("No JSON found in response")
    }

    let jsonString = jsonMatch[0]
    let result

    // Try parsing directly first
    try {
      result = JSON.parse(jsonString)
      console.log("[v0] Successfully parsed JSON directly")
    } catch (parseError) {
      // If direct parsing fails, try cleaning the JSON
      console.log("[v0] Direct parse failed, attempting to clean JSON")

      // Only clean if there are actual control characters that need escaping
      // This preserves already-escaped characters
      jsonString = jsonString.replace(/[\x00-\x1F]/g, (char) => {
        // Replace control characters with their escaped equivalents
        switch (char) {
          case "\n":
            return "\\n"
          case "\r":
            return "\\r"
          case "\t":
            return "\\t"
          default:
            return "" // Remove other control characters
        }
      })

      console.log("[v0] Cleaned JSON, attempting parse again")
      result = JSON.parse(jsonString)
    }

    if (!result.title || !result.panels || !Array.isArray(result.panels)) {
      throw new Error("Invalid story format")
    }

    return {
      title: result.title,
      panels: result.panels as ComicPanelData[],
    }
  } catch (error) {
    console.error("[v0] Error in generateComicStory, using template fallback:", error)

    const templateStory = templateStories[theme as keyof typeof templateStories] || templateStories.kindness
    console.log("[v0] Using template story for theme:", theme)

    return templateStory
  }
}
