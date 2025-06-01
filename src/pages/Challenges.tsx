
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Trophy, Users, Calendar, User, Coins, TrendingUp, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChallengeDetailModal } from "@/components/challenges/ChallengeDetailModal";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Soccer challenges
const soccerChallenges = [
  {
    id: 1,
    title: "Round Stars",
    team: "Rising Stars",
    deadline: "2025-07-15",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop",
    description: "Collect the stickers of the 3 players who stood out the most in the round (based on goals, assists, saves, etc). Build your album with the best performances from each matchday.",
    participants: 1248,
    difficulty: "easy",
    prize: "Animated version of stickers + Fan XP",
    tags: ["round", "highlights", "performance", "goals"],
    active: true,
    type: "soccer"
  },
  {
    id: 2,
    title: "Historic Rivalry",
    team: "Immortal Classics",
    deadline: "2025-06-30",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
    description: "Complete the mini-album with players and iconic moments from historic classics like Fla-Flu, Gre-Nal, São Paulo Derby. Relive the greatest rivalries in Brazilian football.",
    participants: 987,
    difficulty: "medium",
    prize: "Exclusive digital badge + ticket discount",
    tags: ["classics", "rivalry", "history", "tradition"],
    active: true,
    type: "soccer"
  },
  {
    id: 3,
    title: "Heavy Jersey",
    team: "Jersey Legends",
    deadline: "2025-07-20",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop",
    description: "Collect all stickers of players with more than 100 games for the club. Honor the true idols who wore the jersey with pride for years.",
    participants: 756,
    difficulty: "hard",
    prize: "Physical jersey raffled among album completers",
    tags: ["legends", "idols", "tradition", "history"],
    active: true,
    type: "soccer"
  },
  {
    id: 4,
    title: "Brazilians Around the World",
    team: "Export FC",
    deadline: "2025-08-01",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=400&fit=crop",
    description: "Collect stickers of Brazilians playing in foreign leagues. Follow our stars spread across the world's top championships.",
    participants: 1456,
    difficulty: "medium",
    prize: "Special sticker of the best Brazilian of the season",
    tags: ["europe", "worldwide", "brazilians", "leagues"],
    active: true,
    type: "soccer"
  },
  {
    id: 5,
    title: "Fantasy NFT",
    team: "Dream Team",
    deadline: "2025-07-10",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    description: "Choose 5 players per round. If they perform well (goals, assists, etc), you earn bonus stickers. Build your ideal team and cheer for your chosen players' performance.",
    participants: 2134,
    difficulty: "medium",
    prize: "Early access to rare packs",
    tags: ["fantasy", "strategy", "round", "bonus"],
    active: true,
    type: "soccer"
  },
  {
    id: 6,
    title: "Fans Playing Together",
    team: "Community Force",
    deadline: "2025-08-15",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    description: "Collective activity: if 1000 users complete the same album by the deadline, everyone unlocks a special experience sticker with access to training center visit or collective prize raffle.",
    participants: 3421,
    difficulty: "hard",
    prize: "VIP experience or partner club fan token",
    tags: ["community", "collective", "experience", "vip"],
    active: true,
    type: "soccer"
  }
];

// Football challenges (replacing Binance challenges)
const footballChallenges = [
  {
    id: 101,
    title: "Premier League Legends",
    team: "Premier League",
    deadline: "2025-07-01",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop",
    description: "Create an album featuring the greatest Premier League players of all time. Showcase legendary moments, record-breaking performances, and iconic goals that defined English football.",
    participants: 2247,
    difficulty: "medium",
    prize: "Exclusive Premier League NFT Collection + Match Tickets",
    tags: ["premier-league", "legends", "england", "history"],
    active: true,
    type: "soccer"
  },
  {
    id: 102,
    title: "Champions League Glory",
    team: "UEFA Champions League",
    deadline: "2025-06-20",
    imageUrl: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=400&fit=crop",
    description: "Build the ultimate Champions League album featuring historic finals, legendary goals, and unforgettable moments from Europe's most prestigious tournament.",
    participants: 1892,
    difficulty: "hard",
    prize: "Champions League Final Tickets + Exclusive Trophy Replica",
    tags: ["champions-league", "europe", "finals", "glory"],
    active: true,
    type: "soccer"
  }
];

// Football challenges (replacing Coruja Cripto challenges)
const youthFootballChallenges = [
  {
    id: 201,
    title: "Future Stars Academy",
    team: "Youth Development",
    deadline: "2025-06-25",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    description: "Create an educational album showcasing the best young talents in world football. Highlight promising players from youth academies and their development journey.",
    participants: 856,
    difficulty: "medium",
    prize: "Youth Academy Visit + Training Session with Coaches",
    tags: ["youth", "academy", "development", "future"],
    active: true,
    type: "soccer"
  }
];

// Football challenges (replacing CastaCripto challenges)
const womenFootballChallenges = [
  {
    id: 301,
    title: "Women's Football Rising",
    team: "Women's Football",
    deadline: "2025-07-10",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0fa06bf9ce2?w=400&h=400&fit=crop",
    description: "Design an album celebrating women's football around the world. Feature top players, historic matches, and the growth of women's football globally.",
    participants: 625,
    difficulty: "easy",
    prize: "Women's World Cup Merchandise + Stadium Tour",
    tags: ["womens-football", "equality", "growth", "global"],
    active: true,
    type: "soccer"
  }
];

const allChallenges = [...soccerChallenges, ...footballChallenges, ...youthFootballChallenges, ...womenFootballChallenges];

const Challenges = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<typeof allChallenges[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleJoinChallenge = (id: number) => {
    if (joinedChallenges.includes(id)) {
      toast.error("You've already joined this challenge!");
      return;
    }
    
    setJoinedChallenges(prev => [...prev, id]);
    toast.success("Successfully joined the challenge! Redirecting to Lab...");
    
    // Navigate to the lab page
    setTimeout(() => {
      navigate("/album-lab");
    }, 1500);
  };
  
  const handleOpenChallengeModal = (challenge: typeof allChallenges[0]) => {
    console.log("Opening modal for challenge:", challenge.title, "Type:", challenge.type);
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };
  
  const isJoined = (id: number) => joinedChallenges.includes(id);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-900/20 text-green-400 border-green-900";
      case "medium": return "bg-yellow-900/20 text-yellow-400 border-yellow-900";
      case "hard": return "bg-red-900/20 text-red-400 border-red-900";
      default: return "bg-blue-900/20 text-blue-400 border-blue-900";
    }
  };

  const getChallengeTheme = (type: string) => {
    switch (type) {
      default: // All challenges are now soccer-themed
        return { border: "hover:border-[#F97316]", button: "bg-[#F97316] hover:bg-[#E86305] text-black", badge: "bg-[#F97316]/90 text-white", prize: "text-[#F97316]", label: "SOCCER" };
    }
  };

  const renderChallengeCard = (challenge: any) => {
    const theme = getChallengeTheme(challenge.type);
    return (
      <Card key={challenge.id} className={`bg-[#111] border-[#333] text-white overflow-hidden ${theme.border} transition-all`}>
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <OptimizedImage
              src={challenge.imageUrl}
              alt={challenge.title}
              width={400}
              height={225}
              className="object-cover w-full h-full"
              priority={false}
            />
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className={`bg-black/70 border-current ${theme.prize}`}>
                {challenge.difficulty.toUpperCase()}
              </Badge>
            </div>
            <div className="absolute top-2 left-2">
              <Badge variant="outline" className={theme.badge}>
                {theme.label}
              </Badge>
            </div>
          </AspectRatio>
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{challenge.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <User size={14} />
            <span>By {challenge.team}</span>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <p className="text-sm text-gray-300 mb-3">{challenge.description}</p>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar size={14} />
              <span>Deadline: {challenge.deadline}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Users size={14} />
              <span>{challenge.participants} participants</span>
            </div>
          </div>
          
          <div className={`bg-gradient-to-r from-[#F97316]/10 to-[#F97316]/5 border-[#F97316]/30 border rounded-md p-3 mb-3`}>
            <div className="text-xs text-gray-400 mb-1">PRIZE</div>
            <div className={`${theme.prize} font-medium`}>{challenge.prize}</div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {challenge.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={() => handleOpenChallengeModal(challenge)}
            className={`w-full ${theme.button} font-medium`}
          >
            <Flag className="h-5 w-5" />
            <span>View Challenge</span>
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Trophy className="mr-2 text-[#FFEB3B]" size={24} />
            <h1 className="text-3xl font-bold">Community Challenges</h1>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-gray-300">
            Join exclusive challenges from your favorite teams and communities. 
            Earn rewards, showcase your creativity, and celebrate your passions!
          </p>
        </div>

        {/* All Challenges - Updated Grid Layout */}
        <div className="mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {allChallenges.map(renderChallengeCard)}
          </div>
        </div>

        <ChallengeDetailModal
          challenge={selectedChallenge}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onJoin={handleJoinChallenge}
          isJoined={selectedChallenge ? isJoined(selectedChallenge.id) : false}
        />
      </main>
    </div>
  );
};

export default Challenges;
