import { useState } from "react";
import Navigation from "@/components/Navigation";
import JourneyDay from "@/components/JourneyDay";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Heart, Clock, BookOpen, Sparkles } from "lucide-react";

interface DayContent {
  day: number;
  title: string;
  description: string;
  duration: string;
  practice: string;
  steps: string[];
  journalPrompts: string[];
  affirmation: string;
}

const journeyDays: DayContent[] = [
  { 
    day: 1, 
    title: "Acknowledging Your Journey", 
    description: "Begin by honoring where you are and setting your intention for healing.",
    duration: "20 minutes",
    practice: "This opening practice invites you to acknowledge your courage in beginning this journey. You'll create a sacred space for healing and set a clear intention that will guide you through the next 21 days.",
    steps: [
      "Find a quiet, comfortable space and sit in a relaxed position",
      "Close your eyes and take 5 deep, slow breaths",
      "Place one hand on your heart and acknowledge: 'I am here. I am ready.'",
      "Visualize a warm, golden light surrounding you—this is your safe space",
      "State your intention for healing either silently or aloud",
      "Spend 10 minutes in quiet reflection, breathing gently"
    ],
    journalPrompts: [
      "What brought me to this healing journey?",
      "What do I hope to release over these 21 days?",
      "What does healing mean to me?"
    ],
    affirmation: "I honor my journey and trust in my capacity to heal."
  },
  { 
    day: 2, 
    title: "Creating Safety", 
    description: "Establish inner resources and a sense of safety within your body.",
    duration: "25 minutes",
    practice: "Today we focus on creating an internal sense of safety. When we've experienced trauma, our nervous system often remains on high alert. This practice helps you build a foundation of felt safety in your body.",
    steps: [
      "Sit or lie down in a comfortable position",
      "Scan your body from head to toe, noticing any tension",
      "Imagine a protective bubble of soft light surrounding you",
      "Bring to mind a place where you feel completely safe—real or imagined",
      "Notice what sensations arise in your body as you visualize this safe place",
      "Anchor this feeling by gently pressing your thumb and forefinger together",
      "Practice returning to this safe place whenever you need throughout the day"
    ],
    journalPrompts: [
      "Where in my body do I feel most safe?",
      "What does safety look and feel like to me?",
      "What small steps can I take to create more safety in my daily life?"
    ],
    affirmation: "I am safe in this moment. My body is my home."
  },
  { 
    day: 3, 
    title: "Grounding Practice", 
    description: "Learn grounding techniques to stay present during emotional moments.",
    duration: "20 minutes",
    practice: "Grounding connects you to the present moment and your physical body. This is essential when emotions feel overwhelming. Today you'll learn the 5-4-3-2-1 technique and body-based grounding.",
    steps: [
      "Stand or sit with your feet firmly on the ground",
      "Press your feet into the floor and notice the sensation",
      "Name 5 things you can see around you",
      "Name 4 things you can physically feel (texture of clothes, air on skin)",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
      "Finish by taking three deep breaths, feeling your connection to the earth"
    ],
    journalPrompts: [
      "When do I feel most ungrounded or disconnected?",
      "What physical sensations help me feel present?",
      "How can I incorporate grounding into my daily routine?"
    ],
    affirmation: "I am rooted in the present moment. I am here now."
  },
  { 
    day: 4, 
    title: "Breath as Anchor", 
    description: "Discover how conscious breathing can regulate your nervous system.",
    duration: "25 minutes",
    practice: "Your breath is always available as an anchor to the present moment. Today you'll learn specific breathing techniques that activate your parasympathetic nervous system, promoting calm and safety.",
    steps: [
      "Sit comfortably with your spine straight but relaxed",
      "Begin with natural breathing, just observing without changing anything",
      "Practice 4-7-8 breathing: Inhale for 4 counts, hold for 7, exhale for 8",
      "Repeat 4-7-8 breathing for 4 cycles",
      "Return to natural breathing and notice any shifts",
      "Try box breathing: 4 counts inhale, 4 counts hold, 4 counts exhale, 4 counts hold",
      "Complete 6 cycles of box breathing",
      "Rest in natural breathing for 5 minutes"
    ],
    journalPrompts: [
      "How does my breathing change when I'm stressed or anxious?",
      "Which breathing technique felt most calming?",
      "How can I use breath awareness in challenging moments?"
    ],
    affirmation: "My breath is my anchor. With each breath, I return to peace."
  },
  { 
    day: 5, 
    title: "Recognizing Patterns", 
    description: "Gently explore recurring emotional patterns without judgment.",
    duration: "30 minutes",
    practice: "Today we begin to notice patterns—recurring thoughts, emotions, and behaviors that may be connected to past experiences. We approach this with curiosity, not criticism.",
    steps: [
      "Find your comfortable, safe space",
      "Take several grounding breaths",
      "Reflect on a recent situation that triggered a strong emotional response",
      "Notice what thoughts arose during that situation",
      "Notice what emotions you felt and where in your body",
      "Ask yourself: 'Does this remind me of anything from my past?'",
      "Without judgment, simply observe any connections that arise",
      "Thank yourself for this awareness and return to grounding breaths"
    ],
    journalPrompts: [
      "What emotional patterns do I notice in my life?",
      "What situations tend to trigger strong reactions in me?",
      "What might these patterns be trying to protect me from?"
    ],
    affirmation: "I observe my patterns with compassion. Awareness is the first step to change."
  },
  { 
    day: 6, 
    title: "The Body Remembers", 
    description: "Understanding how trauma is stored in the body.",
    duration: "25 minutes",
    practice: "Trauma isn't just stored in our minds—it lives in our bodies. Today you'll practice a gentle body scan to notice where you hold tension, pain, or emotion.",
    steps: [
      "Lie down in a comfortable position",
      "Close your eyes and take several deep breaths",
      "Slowly bring awareness to the top of your head",
      "Move your attention down through your face, neck, and shoulders",
      "Notice any areas of tension, tightness, or discomfort",
      "When you find tension, breathe into that area without trying to change it",
      "Continue scanning through your arms, chest, belly, hips, legs, and feet",
      "Spend extra time with any areas that feel significant",
      "End by breathing into your whole body as one"
    ],
    journalPrompts: [
      "Where do I hold tension in my body?",
      "What emotions seem connected to different body areas?",
      "What is my body trying to tell me?"
    ],
    affirmation: "I listen to my body with tenderness. It holds wisdom for my healing."
  },
  { 
    day: 7, 
    title: "Week One Reflection", 
    description: "Integrate the first week's learnings with a compassionate reflection.",
    duration: "35 minutes",
    practice: "You've completed your first week. Today is about integration—allowing the practices and insights to settle into your being. We celebrate your courage and commitment.",
    steps: [
      "Create a comfortable, nurturing environment (tea, candles, soft music)",
      "Review your journal entries from the past 6 days",
      "Practice your favorite grounding or breathing technique",
      "Acknowledge yourself aloud: 'I showed up for myself this week.'",
      "Notice what has shifted—even small changes matter",
      "Write a letter to yourself acknowledging your progress",
      "Set a gentle intention for the week ahead",
      "Rest in gratitude for your journey so far"
    ],
    journalPrompts: [
      "What was my biggest insight this week?",
      "What practice resonated most with me?",
      "What do I want to carry forward into week two?"
    ],
    affirmation: "I celebrate my courage. Every step forward matters."
  },
  { 
    day: 8, 
    title: "Inner Child Connection", 
    description: "Begin the gentle process of connecting with your younger self.",
    duration: "30 minutes",
    practice: "Your inner child holds memories, emotions, and needs that may have been unmet. Today we begin a gentle process of reconnection and reparenting.",
    steps: [
      "Settle into your safe space and close your eyes",
      "Take grounding breaths until you feel centered",
      "Visualize yourself as a young child—whatever age comes naturally",
      "Notice what this child looks like, what they're wearing, how they seem",
      "Approach this child gently, at their pace",
      "Ask silently: 'What do you need me to know?'",
      "Listen without judgment for whatever arises",
      "Offer this child love, safety, or whatever they need",
      "Thank them and slowly return to the present"
    ],
    journalPrompts: [
      "What age did my inner child appear to be?",
      "What did they seem to need?",
      "What would I want to say to my younger self?"
    ],
    affirmation: "I hold my inner child with infinite tenderness and love."
  },
  { 
    day: 9, 
    title: "Naming Your Emotions", 
    description: "Practice identifying and naming emotions without being overwhelmed.",
    duration: "25 minutes",
    practice: "Research shows that naming our emotions reduces their intensity. Today you'll develop a more nuanced emotional vocabulary and practice witnessing emotions without drowning in them.",
    steps: [
      "Begin with grounding breaths",
      "Notice what emotion is present right now",
      "Name it silently: 'This is sadness' or 'This is anxiety'",
      "Get specific: Is it worry, dread, nervousness, or unease?",
      "Notice where this emotion lives in your body",
      "Say to yourself: 'I notice I am feeling [emotion]. This is okay.'",
      "Imagine the emotion as a weather pattern—temporary, passing through",
      "Practice with 3-4 different emotions that arise"
    ],
    journalPrompts: [
      "What emotions do I have the hardest time naming or feeling?",
      "What emotions were allowed or not allowed in my childhood?",
      "How does naming my emotions change my experience of them?"
    ],
    affirmation: "I can feel my emotions without being overwhelmed by them."
  },
  { 
    day: 10, 
    title: "Boundaries as Self-Care", 
    description: "Explore how healthy boundaries support your healing journey.",
    duration: "30 minutes",
    practice: "Boundaries are an act of self-love. Many trauma survivors struggle with boundaries—either too rigid or too porous. Today we explore what healthy boundaries look and feel like.",
    steps: [
      "Ground yourself with your chosen technique",
      "Reflect on a situation where your boundaries were crossed",
      "Notice how it felt in your body when this happened",
      "Visualize a protective bubble around yourself—you decide what comes in",
      "Practice saying 'No' aloud—start softly and build strength",
      "Practice saying 'I need...' statements",
      "Imagine responding differently to past boundary violations",
      "Thank yourself for honoring your needs"
    ],
    journalPrompts: [
      "Where in my life do I need stronger boundaries?",
      "What fears come up when I think about setting boundaries?",
      "What would change if I honored my boundaries more?"
    ],
    affirmation: "My boundaries are sacred. Saying no to others is saying yes to myself."
  },
  { 
    day: 11, 
    title: "Releasing Shame", 
    description: "Work through shame with compassion and understanding.",
    duration: "35 minutes",
    practice: "Shame tells us we are fundamentally flawed. This is a lie trauma taught us. Today we bring shame into the light where it loses its power.",
    steps: [
      "Create a safe, private space for this deeper work",
      "Ground and center yourself thoroughly",
      "Bring to mind something you feel shame about",
      "Notice the physical sensations of shame in your body",
      "Place your hands on your heart and say: 'Even with this, I am worthy of love'",
      "Ask: 'What message did I receive that created this shame?'",
      "Recognize: 'This shame belongs to what happened, not to who I am'",
      "Imagine breathing compassion into the shame",
      "Repeat: 'I release shame that was never mine to carry'"
    ],
    journalPrompts: [
      "What shame have I been carrying that isn't mine?",
      "Whose voice do I hear when I feel shame?",
      "What would I say to a friend who felt this same shame?"
    ],
    affirmation: "Shame is not truth. I am inherently worthy and whole."
  },
  { 
    day: 12, 
    title: "Forgiveness Practice", 
    description: "Explore forgiveness—not for others, but for your own freedom.",
    duration: "30 minutes",
    practice: "Forgiveness is not about condoning what happened or reconciling with those who hurt you. It's about releasing the grip that resentment has on your heart and nervous system.",
    steps: [
      "Ground yourself and connect with your safe inner space",
      "Understand: Forgiveness is for your freedom, not others' absolution",
      "Start with self-forgiveness—places where you blame yourself",
      "Say: 'I forgive myself for [specific thing]. I did the best I could.'",
      "If ready, bring to mind someone who hurt you",
      "Notice any resistance—this is normal and okay",
      "Say: 'I am willing to begin releasing the hold this has on me'",
      "You don't have to feel forgiveness yet—willingness is enough",
      "Return to self-compassion and grounding"
    ],
    journalPrompts: [
      "What am I holding onto that burdens me?",
      "What would it feel like to be free of this resentment?",
      "What does forgiveness mean to me?"
    ],
    affirmation: "I choose to release what weighs on my heart. I choose freedom."
  },
  { 
    day: 13, 
    title: "Movement & Release", 
    description: "Use gentle movement to release stored tension and energy.",
    duration: "30 minutes",
    practice: "Trauma is stored in the body and can be released through movement. Today you'll practice trauma-sensitive movement that allows your body to shake, stretch, and release.",
    steps: [
      "Stand in a comfortable space where you can move freely",
      "Begin with gentle swaying, letting your body find its rhythm",
      "Shake your hands vigorously for 30 seconds, then let them go still",
      "Shake your whole body—let the tremoring happen naturally",
      "Make sounds if they want to come—sighs, groans, anything",
      "Move intuitively—your body knows what it needs",
      "Stretch into any areas that call for attention",
      "End by lying down and feeling the energy settle",
      "Rest for 5 minutes, noticing sensations"
    ],
    journalPrompts: [
      "What did my body want to do when given permission?",
      "What sensations arose during movement?",
      "How do I feel now compared to before?"
    ],
    affirmation: "I give my body permission to move, release, and heal."
  },
  { 
    day: 14, 
    title: "Week Two Integration", 
    description: "Celebrate your progress and prepare for deeper work ahead.",
    duration: "35 minutes",
    practice: "You've completed two weeks of deep, courageous work. Today we integrate and celebrate before continuing the journey.",
    steps: [
      "Create a nurturing space for reflection",
      "Review your journal entries from week two",
      "Practice combining grounding, breathing, and body awareness",
      "Acknowledge specific breakthroughs or difficult moments",
      "Write yourself a note of encouragement for the week ahead",
      "Do a gentle body scan and notice what has shifted",
      "Perform a small ritual of celebration—light a candle, take a bath, enjoy nature",
      "Rest in gratitude for your dedication"
    ],
    journalPrompts: [
      "What has been the most challenging practice so far?",
      "What unexpected insights have emerged?",
      "How am I different than I was two weeks ago?"
    ],
    affirmation: "I am proud of my courage. I am worthy of this healing."
  },
  { 
    day: 15, 
    title: "Meeting Your Protectors", 
    description: "Understand the parts of you that developed to keep you safe.",
    duration: "35 minutes",
    practice: "Parts of us developed protective strategies—anxiety, perfectionism, people-pleasing, numbing. Today we meet these protectors with gratitude rather than shame.",
    steps: [
      "Ground yourself deeply in safety",
      "Think of a behavior or pattern you've judged yourself for",
      "Ask: 'What part of me created this pattern?'",
      "Visualize this protective part—give it a form or image",
      "Ask: 'What were you protecting me from?'",
      "Thank this part for trying to keep you safe",
      "Ask: 'What do you need from me now?'",
      "Offer this part reassurance that you're safe now",
      "Ask if it would be willing to try a different approach"
    ],
    journalPrompts: [
      "What protective patterns have served me in the past?",
      "What did these patterns protect me from?",
      "How can I honor these parts while also growing beyond them?"
    ],
    affirmation: "Every part of me has been trying to help. I meet myself with compassion."
  },
  { 
    day: 16, 
    title: "Grief & Loss", 
    description: "Create space for grieving what was lost or never had.",
    duration: "40 minutes",
    practice: "Trauma often involves loss—loss of safety, innocence, relationships, or opportunities. Grief that isn't processed stays stuck. Today we create safe space for grieving.",
    steps: [
      "Create a private, comfortable space—have tissues nearby",
      "Ground yourself and activate your safe inner place",
      "Allow yourself to consider: What did I lose? What did I never have?",
      "Let feelings arise without judgment—tears, anger, sadness are welcome",
      "If it feels safe, speak what you're grieving aloud",
      "Hold yourself with compassion—hands on heart or self-hug",
      "Allow sounds of grief if they come—crying, keening, sighing",
      "When ready, slowly return to grounding",
      "Offer yourself gentleness for the rest of the day"
    ],
    journalPrompts: [
      "What losses have I never fully grieved?",
      "What did I need as a child that I didn't receive?",
      "What feelings arise when I allow myself to grieve?"
    ],
    affirmation: "My grief is valid. I give myself permission to feel and release."
  },
  { 
    day: 17, 
    title: "Rewiring Beliefs", 
    description: "Identify and gently challenge limiting beliefs from the past.",
    duration: "30 minutes",
    practice: "Trauma often instills false beliefs—'I'm not good enough,' 'The world is dangerous,' 'I can't trust anyone.' Today we identify these beliefs and begin to create new ones.",
    steps: [
      "Ground yourself and connect with your wise, adult self",
      "Identify a limiting belief you hold about yourself or the world",
      "Ask: 'Where did I learn this? Whose voice originally said this?'",
      "Recognize: 'This belief was formed to make sense of trauma'",
      "Ask: 'Is this belief actually true? What evidence contradicts it?'",
      "Create a new belief that feels true and supportive",
      "Repeat the new belief while placing hands on heart",
      "Notice how the new belief feels in your body"
    ],
    journalPrompts: [
      "What negative beliefs about myself feel most true?",
      "Where did these beliefs originate?",
      "What would I believe about myself if trauma hadn't happened?"
    ],
    affirmation: "I am rewriting my story. I choose beliefs that serve my highest good."
  },
  { 
    day: 18, 
    title: "Self-Compassion Practice", 
    description: "Deepen your capacity for self-love and acceptance.",
    duration: "30 minutes",
    practice: "Self-compassion is treating yourself with the same kindness you'd offer a dear friend. For trauma survivors, this can be revolutionary.",
    steps: [
      "Place both hands on your heart and feel the warmth",
      "Think of how you would comfort a friend who was suffering",
      "Now offer that same comfort to yourself",
      "Say: 'May I be kind to myself. May I give myself the compassion I need.'",
      "Acknowledge: 'This is a moment of suffering. Suffering is part of being human.'",
      "Recognize you're not alone—many others feel this same way",
      "Ask: 'What do I need right now?' and offer it to yourself",
      "Spend 10 minutes in loving-kindness meditation toward yourself"
    ],
    journalPrompts: [
      "What makes self-compassion difficult for me?",
      "How would my life change if I were kinder to myself?",
      "What would I say to comfort my best friend in my situation?"
    ],
    affirmation: "I deserve my own compassion. I am worthy of my own love."
  },
  { 
    day: 19, 
    title: "Connecting with Others", 
    description: "Explore how healing impacts your relationships.",
    duration: "30 minutes",
    practice: "Trauma affects our relationships. As we heal, our relational patterns shift. Today we explore how to bring our healing into connection with others.",
    steps: [
      "Ground yourself and feel your own wholeness",
      "Reflect on how trauma has affected your relationships",
      "Notice patterns: withdrawal, people-pleasing, mistrust, over-giving",
      "Consider: What do healthy relationships look like?",
      "Visualize being in a relationship where you feel safe and seen",
      "Practice expressing a need: 'I need...' (say it aloud)",
      "Practice expressing a boundary: 'I'm not comfortable with...'",
      "Imagine receiving support and allowing it in"
    ],
    journalPrompts: [
      "How has my healing journey affected my relationships?",
      "What do I need from the people in my life?",
      "What kind of relationships do I want to create going forward?"
    ],
    affirmation: "I am capable of healthy, nourishing relationships. I am safe to connect."
  },
  { 
    day: 20, 
    title: "Your Future Self", 
    description: "Visualize and connect with your healed, whole self.",
    duration: "35 minutes",
    practice: "Your future self—the healed version of you—already exists in potential. Today you'll connect with this version of yourself for guidance and inspiration.",
    steps: [
      "Ground deeply and enter a meditative state",
      "Imagine walking down a beautiful path toward your future",
      "At the end of the path, see your future self—fully healed and whole",
      "Notice how they look, how they carry themselves, their energy",
      "Approach them and allow them to embrace you",
      "Ask: 'What do I need to know for my healing journey?'",
      "Listen for their wisdom",
      "Ask: 'What should I let go of? What should I embrace?'",
      "Thank them and carry their wisdom back with you"
    ],
    journalPrompts: [
      "What did my future self look and feel like?",
      "What wisdom did they offer me?",
      "What one thing can I do today to move toward this future self?"
    ],
    affirmation: "My healed self is not a fantasy—it is my destination and my birthright."
  },
  { 
    day: 21, 
    title: "Celebration & Continuation", 
    description: "Honor your journey and create a plan for ongoing healing.",
    duration: "45 minutes",
    practice: "You have completed 21 days of profound healing work. Today we celebrate your courage, integrate your journey, and create a path forward.",
    steps: [
      "Create a sacred, celebratory space",
      "Review your entire journal from the past 21 days",
      "Acknowledge every breakthrough, every difficult moment, every insight",
      "Write a letter to the person you were on Day 1",
      "Perform a closing ritual: light a candle, speak intentions, release what no longer serves",
      "Create a maintenance plan: which practices will you continue?",
      "Set an intention for the next phase of your healing",
      "Celebrate yourself—you showed up for 21 days of deep work",
      "Rest in gratitude and self-love"
    ],
    journalPrompts: [
      "How have I transformed over these 21 days?",
      "What practices do I want to continue?",
      "What message do I want to carry forward?"
    ],
    affirmation: "I have done sacred work. My healing continues, and I am forever changed."
  }
];

const Journey = () => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const progress = (completedDays.length / 21) * 100;

  const getStatus = (day: number): "completed" | "current" | "locked" => {
    if (completedDays.includes(day)) return "completed";
    // Day 1 is always accessible, subsequent days unlock when previous day is completed
    if (day === 1 || completedDays.includes(day - 1)) return "current";
    return "locked";
  };

  const handleMarkComplete = (day: number) => {
    if (!completedDays.includes(day)) {
      setCompletedDays([...completedDays, day]);
    }
  };

  const selectedDayData = selectedDay ? journeyDays.find(d => d.day === selectedDay) : null;

  if (selectedDayData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedDay(null)}
              className="mb-8 gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Journey
            </Button>

            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full gradient-sage flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">{selectedDayData.day}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">Day {selectedDayData.day} of 21</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {selectedDayData.duration}
                  </div>
                </div>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {selectedDayData.title}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {selectedDayData.description}
              </p>

              {/* Practice Overview */}
              <div className="bg-sage-light rounded-2xl p-6 mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Today's Practice
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedDayData.practice}
                </p>
              </div>

              {/* Steps */}
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Step-by-Step Guide
                </h3>
                <ol className="space-y-3">
                  {selectedDayData.steps.map((step, index) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Journal Prompts */}
              <div className="bg-muted/30 rounded-2xl p-6 mb-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Journal Prompts
                </h3>
                <ul className="space-y-2">
                  {selectedDayData.journalPrompts.map((prompt, index) => (
                    <li key={index} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="italic">{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Affirmation */}
              <div className="bg-gradient-to-r from-primary/10 to-sage-light rounded-2xl p-6 mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Today's Affirmation
                  </h3>
                </div>
                <p className="text-foreground font-medium text-lg italic">
                  "{selectedDayData.affirmation}"
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="flex-1">
                  Begin Session
                </Button>
                <Button 
                  variant="calm" 
                  size="lg" 
                  onClick={() => handleMarkComplete(selectedDayData.day)}
                  disabled={completedDays.includes(selectedDayData.day)}
                >
                  {completedDays.includes(selectedDayData.day) ? "Completed" : "Mark Complete"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light rounded-full text-sage-dark text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                21-Day Trauma Release Journey
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Your Healing <span className="text-primary italic">Journey</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                A gentle, guided path to release stored trauma and reclaim your inner peace.
              </p>
            </div>

            {/* Progress Section */}
            <div className="bg-card rounded-2xl p-6 mb-8 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  Your Progress
                </span>
                <span className="text-primary font-medium">
                  {completedDays.length} of 21 completed
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-muted-foreground text-sm mt-3">
                {completedDays.length < 21 
                  ? `${21 - completedDays.length} days remaining in your journey`
                  : "Congratulations! You've completed the journey!"
                }
              </p>
            </div>

            {/* Days List */}
            <div className="space-y-4">
              {journeyDays.map((day) => (
                <JourneyDay
                  key={day.day}
                  day={day.day}
                  title={day.title}
                  description={day.description}
                  status={getStatus(day.day)}
                  onSelect={() => setSelectedDay(day.day)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journey;
