
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Trophy, Users, Calendar, User, Coins, TrendingUp, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChallengeDetailModal } from "@/components/challenges/ChallengeDetailModal";

// Binance challenges (showing only 2)
const binanceChallenges = [
  {
    id: 101,
    title: "Binance 7th Anniversary Challenge",
    team: "Binance Community",
    deadline: "2025-07-01",
    imageUrl: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400&h=400&fit=crop",
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
  }
];

// Soccer challenges (showing only 2)
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
  }
];

const allChallenges = [...binanceChallenges, ...soccerChallenges];

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
    return type === "binance" 
      ? { border: "hover:border-[#F0B90B]", button: "bg-[#F0B90B] hover:bg-[#D9A441] text-black", badge: "bg-[#F0B90B]/90 text-black", prize: "text-[#F0B90B]" }
      : { border: "hover:border-[#F97316]", button: "bg-[#F97316] hover:bg-[#E86305] text-black", badge: "bg-[#F97316]/90 text-white", prize: "text-[#F97316]" };
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
          <div className="bg-gradient-to-r from-[#F0B90B]/20 to-[#F0B90B]/5 border border-[#F0B90B]/30 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F0B90B] rounded-lg flex items-center justify-center">
                <Coins className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#F0B90B]">Binance Community Challenges</h2>
                <p className="text-gray-300">Exclusive challenges for the Binance ecosystem</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-[#F0B90B]" />
                <span className="text-gray-300">High Rewards</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-[#F0B90B]" />
                <span className="text-gray-300">Fast Track to Recognition</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-[#F0B90B]" />
                <span className="text-gray-300">Active Community</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {binanceChallenges.map((challenge) => {
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
                        <Badge variant="outline" className="bg-black/70 border-[#F0B90B] text-[#F0B90B]">
                          {challenge.difficulty.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className={theme.badge}>
                          BINANCE
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
                    
                    <div className="bg-gradient-to-r from-[#F0B90B]/10 to-[#F0B90B]/5 border border-[#F0B90B]/30 rounded-md p-3 mb-3">
                      <div className="text-xs text-gray-400 mb-1">PRIZE</div>
                      <div className={`${theme.prize} font-medium`}>{challenge.prize}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {challenge.tags.map((tag) => (
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
            })}
          </div>
        </div>

        {/* Soccer Section */}
        <div>
          <div className="bg-gradient-to-r from-[#F97316]/20 to-[#F97316]/5 border border-[#F97316]/30 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#F97316] rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#F97316]">Soccer Team Challenges</h2>
                <p className="text-gray-300">Official challenges from your favorite soccer teams</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {soccerChallenges.map((challenge) => {
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
                        <Badge variant="outline" className="bg-black/70 border-[#F97316] text-[#F97316]">
                          {challenge.difficulty.toUpperCase()}
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
                    
                    <div className="bg-[#222] border border-[#333] rounded-md p-3 mb-3">
                      <div className="text-xs text-gray-400 mb-1">PRIZE</div>
                      <div className={`${theme.prize} font-medium`}>{challenge.prize}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {challenge.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      onClick={() => handleOpenChallengeModal(challenge)}
                      className={`w-full ${theme.button}`}
                    >
                      <Flag className="h-5 w-5" />
                      <span>View Challenge</span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
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
