import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Users, User, Flag, TrendingUp, Coins, Zap } from "lucide-react";
import { toast } from "sonner";
import { ChallengeDetailModal } from "./ChallengeDetailModal";

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
  },
  {
    id: 103,
    title: "DeFi Innovation Showcase",
    team: "Binance Labs",
    deadline: "2025-07-15",
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

interface BinanceChallengesProps {
  joinedChallenges: number[];
  onJoinChallenge: (id: number) => void;
}

export const BinanceChallenges: React.FC<BinanceChallengesProps> = ({
  joinedChallenges,
  onJoinChallenge,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<typeof binanceChallenges[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenChallengeModal = (challenge: typeof binanceChallenges[0]) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleJoinChallenge = (id: number) => {
    onJoinChallenge(id);
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

  return (
    <div className="space-y-6">
      {/* Header Section - Removed as requested */}

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {binanceChallenges.map((challenge) => (
          <Card key={challenge.id} className="bg-[#111] border-[#333] text-white overflow-hidden hover:border-[#F0B90B] transition-all">
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
                  <Badge variant="outline" className="bg-[#F0B90B]/90 text-black font-medium">
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
                <div className="text-[#F0B90B] font-medium">{challenge.prize}</div>
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
                className="w-full bg-[#F0B90B] hover:bg-[#D9A441] text-black font-medium"
              >
                <Flag className="h-5 w-5" />
                <span>View Challenge</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ChallengeDetailModal
        challenge={selectedChallenge}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJoin={handleJoinChallenge}
        isJoined={selectedChallenge ? isJoined(selectedChallenge.id) : false}
      />
    </div>
  );
};
