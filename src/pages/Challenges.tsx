import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Trophy, Users, Calendar, User, Coins, TrendingUp, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChallengeDetailModal } from "@/components/challenges/ChallengeDetailModal";

// Binance challenges (expanded to 4)
const binanceChallenges = [
  {
    id: 101,
    title: "Binance 7th Anniversary Challenge",
    team: "Binance Community",
    deadline: "2025-07-01",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
    description: "Celebrate Binance's 7th anniversary by creating an album showcasing the evolution of crypto trading and DeFi innovations. Highlight key milestones, community achievements, and the future of digital finance.",
    participants: 1247,
    difficulty: "medium",
    prize: "10,000 BNB tokens + Exclusive Binance NFT",
    tags: ["binance", "anniversary", "defi", "community"],
    active: true,
    type: "binance"
  },
  {
    id: 102,
    title: "Crypto Trading Masters",
    team: "Binance Academy",
    deadline: "2025-06-20",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop",
    description: "Design an educational album about advanced trading strategies, technical analysis, and risk management. Share your trading knowledge with the community.",
    participants: 892,
    difficulty: "hard",
    prize: "5,000 USDT + Trading Fee Discount",
    tags: ["trading", "education", "technical analysis"],
    active: true,
    type: "binance"
  },
  {
    id: 103,
    title: "DeFi Innovation Showcase",
    team: "Binance Labs",
    deadline: "2025-07-20",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
    description: "Create an album featuring the most innovative DeFi projects and protocols. Showcase the future of decentralized finance and yield farming strategies.",
    participants: 634,
    difficulty: "medium",
    prize: "3,500 BNB + DeFi Project Tokens",
    tags: ["defi", "innovation", "yield farming"],
    active: true,
    type: "binance"
  },
  {
    id: 104,
    title: "NFT Marketplace Revolution",
    team: "Binance NFT",
    deadline: "2025-06-30",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    description: "Build an album celebrating the NFT revolution and digital art. Feature top NFT collections, artists, and marketplace trends.",
    participants: 445,
    difficulty: "easy",
    prize: "2,000 BNB + Rare NFT Collection",
    tags: ["nft", "digital art", "marketplace"],
    active: true,
    type: "binance"
  }
];

// Soccer challenges (expanded to 4)
const soccerChallenges = [
  {
    id: 1,
    title: "World Cup Legends Challenge",
    team: "FIFA Official",
    deadline: "2025-07-15",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    description: "Create an album featuring iconic World Cup moments through history",
    participants: 248,
    difficulty: "medium",
    prize: "5,000 GOIN tokens",
    tags: ["world cup", "legends", "history"],
    active: true,
    type: "soccer"
  },
  {
    id: 2,
    title: "Manchester United Legacy",
    team: "Manchester United",
    deadline: "2025-06-30",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop",
    description: "Design an album showcasing Manchester United's greatest players",
    participants: 187,
    difficulty: "hard",
    prize: "Limited edition NFT + 3,000 GOIN tokens",
    tags: ["manchester united", "premier league", "legacy"],
    active: true,
    type: "soccer"
  },
  {
    id: 3,
    title: "Champions League Glory",
    team: "UEFA",
    deadline: "2025-07-05",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop",
    description: "Create an album featuring the most memorable Champions League finals and moments. Celebrate Europe's premier football competition.",
    participants: 356,
    difficulty: "medium",
    prize: "4,500 GOIN tokens + UEFA NFT",
    tags: ["champions league", "uefa", "finals"],
    active: true,
    type: "soccer"
  },
  {
    id: 4,
    title: "Brazilian Football Legends",
    team: "CBF Brazil",
    deadline: "2025-06-28",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    description: "Showcase the greatest Brazilian football players of all time. From Pelé to Ronaldinho, celebrate the magic of Brazilian football.",
    participants: 298,
    difficulty: "easy",
    prize: "3,200 GOIN tokens + Brazil Jersey NFT",
    tags: ["brazil", "legends", "seleção"],
    active: true,
    type: "soccer"
  }
];

// Coruja Cripto challenges (expanded to 2)
const corujaCriptoChallenge = [
  {
    id: 201,
    title: "Owl's Crypto Wisdom Collection",
    team: "Coruja Cripto",
    deadline: "2025-06-25",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    description: "Create an educational album about cryptocurrency fundamentals and blockchain technology. Share your knowledge and wisdom with the crypto community like a wise owl.",
    participants: 456,
    difficulty: "medium",
    prize: "7,500 OWL tokens + Exclusive Owl NFT",
    tags: ["education", "blockchain", "cryptocurrency", "wisdom"],
    active: true,
    type: "owl"
  },
  {
    id: 202,
    title: "DeFi Mastery Guide",
    team: "Coruja Cripto Academy",
    deadline: "2025-07-08",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&h=400&fit=crop",
    description: "Design an advanced guide to DeFi protocols, liquidity mining, and smart contract interactions. Help the community understand complex DeFi concepts.",
    participants: 325,
    difficulty: "hard",
    prize: "6,000 OWL tokens + DeFi Course Access",
    tags: ["defi", "protocols", "smart contracts", "advanced"],
    active: true,
    type: "owl"
  }
];

// CastaCripto challenges (expanded to 2)
const castaCriptoChallenge = [
  {
    id: 301,
    title: "Crypto Podcast Masters",
    team: "CastaCripto",
    deadline: "2025-07-10",
    imageUrl: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop",
    description: "Design an album featuring the best crypto podcasts, influencers, and educational content creators. Showcase the voices that shape the crypto community.",
    participants: 325,
    difficulty: "easy",
    prize: "4,000 CAST tokens + Podcast Equipment",
    tags: ["podcast", "influencers", "education", "community"],
    active: true,
    type: "cast"
  },
  {
    id: 302,
    title: "Crypto Content Creator Awards",
    team: "CastaCripto Network",
    deadline: "2025-06-22",
    imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
    description: "Create an album celebrating the best crypto content creators, YouTubers, and educational channels. Highlight their contributions to crypto adoption.",
    participants: 278,
    difficulty: "medium",
    prize: "5,500 CAST tokens + Creator Badge NFT",
    tags: ["creators", "youtube", "content", "awards"],
    active: true,
    type: "cast"
  }
];

const allChallenges = [...binanceChallenges, ...soccerChallenges, ...corujaCriptoChallenge, ...castaCriptoChallenge];

const Challenges = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<typeof allChallenges[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleJoinChallenge = (id: number) => {
    if (joinedChallenges.includes(id)) {
      toast.error("You've already joined this challenge!");
      return;
    }
    
    setJoinedChallenges(prev => [...prev, id]);
    toast.success("Successfully joined the challenge! Start creating your album.");
    setIsModalOpen(false);
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
      case "binance":
        return { border: "hover:border-[#F0B90B]", button: "bg-[#F0B90B] hover:bg-[#D9A441] text-black", badge: "bg-[#F0B90B]/90 text-black", prize: "text-[#F0B90B]", label: "BINANCE" };
      case "owl":
        return { border: "hover:border-[#8B5CF6]", button: "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white", badge: "bg-[#8B5CF6]/90 text-white", prize: "text-[#8B5CF6]", label: "CORUJA CRIPTO" };
      case "cast":
        return { border: "hover:border-[#06B6D4]", button: "bg-[#06B6D4] hover:bg-[#0891B2] text-white", badge: "bg-[#06B6D4]/90 text-white", prize: "text-[#06B6D4]", label: "CASTAcripto" };
      default:
        return { border: "hover:border-[#F97316]", button: "bg-[#F97316] hover:bg-[#E86305] text-black", badge: "bg-[#F97316]/90 text-white", prize: "text-[#F97316]", label: "SOCCER" };
    }
  };

  const renderChallengeCard = (challenge: any) => {
    const theme = getChallengeTheme(challenge.type);
    return (
      <Card key={challenge.id} className={`bg-[#111] border-[#333] text-white overflow-hidden ${theme.border} transition-all`}>
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="object-cover w-full h-full"
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
          
          <div className={`bg-gradient-to-r ${challenge.type === 'binance' ? 'from-[#F0B90B]/10 to-[#F0B90B]/5 border-[#F0B90B]/30' : challenge.type === 'owl' ? 'from-[#8B5CF6]/10 to-[#8B5CF6]/5 border-[#8B5CF6]/30' : challenge.type === 'cast' ? 'from-[#06B6D4]/10 to-[#06B6D4]/5 border-[#06B6D4]/30' : 'from-[#F97316]/10 to-[#F97316]/5 border-[#F97316]/30'} border rounded-md p-3 mb-3`}>
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

        {/* Binance Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {binanceChallenges.map(renderChallengeCard)}
          </div>
        </div>

        {/* Soccer Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {soccerChallenges.map(renderChallengeCard)}
          </div>
        </div>

        {/* Coruja Cripto and CastaCripto Section - Side by Side */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corujaCriptoChallenge.map(renderChallengeCard)}
            {castaCriptoChallenge.map(renderChallengeCard)}
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
