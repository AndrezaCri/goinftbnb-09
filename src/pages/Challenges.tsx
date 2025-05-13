import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flag, Trophy, Users, Calendar, User } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for soccer team challenges
const initialChallenges = [
  {
    id: 1,
    title: "World Cup Legends Challenge",
    team: "FIFA Official",
    deadline: "2025-07-15",
    imageUrl: "https://picsum.photos/seed/fifa1/400/400",
    description: "Create an album featuring iconic World Cup moments through history",
    participants: 248,
    difficulty: "medium",
    prize: "5,000 GOIN tokens",
    tags: ["world cup", "legends", "history"],
    active: true
  },
  {
    id: 2,
    title: "Manchester United Legacy",
    team: "Manchester United",
    deadline: "2025-06-30",
    imageUrl: "https://picsum.photos/seed/manu/400/400",
    description: "Design an album showcasing Manchester United's greatest players",
    participants: 187,
    difficulty: "hard",
    prize: "Limited edition NFT + 3,000 GOIN tokens",
    tags: ["manchester united", "premier league", "legacy"],
    active: true
  },
  {
    id: 3,
    title: "Barcelona Golden Era",
    team: "FC Barcelona",
    deadline: "2025-06-25",
    imageUrl: "https://picsum.photos/seed/barca/400/400",
    description: "Create a tribute album to Barcelona's most successful period",
    participants: 215,
    difficulty: "medium",
    prize: "2,500 GOIN tokens + Official Merchandise",
    tags: ["barcelona", "la liga", "golden era"],
    active: true
  },
  {
    id: 4,
    title: "Liverpool Champions Collection",
    team: "Liverpool FC",
    deadline: "2025-07-10",
    imageUrl: "https://picsum.photos/seed/liverpool/400/400",
    description: "Curate Liverpool's greatest Champions League memories",
    participants: 156,
    difficulty: "medium",
    prize: "4,000 GOIN tokens",
    tags: ["liverpool", "champions league", "anfield"],
    active: true
  },
  {
    id: 5,
    title: "Women's World Cup Moments",
    team: "FIFA Women's Football",
    deadline: "2025-07-20",
    imageUrl: "https://picsum.photos/seed/wwc/400/400",
    description: "Showcase the best moments from Women's World Cup tournaments",
    participants: 132,
    difficulty: "easy",
    prize: "3,500 GOIN tokens",
    tags: ["women's football", "world cup", "international"],
    active: true
  },
  {
    id: 6,
    title: "Real Madrid Galácticos",
    team: "Real Madrid",
    deadline: "2025-06-15",
    imageUrl: "https://picsum.photos/seed/madrid/400/400",
    description: "Create an album featuring Real Madrid's greatest Galácticos",
    participants: 203,
    difficulty: "hard",
    prize: "5,500 GOIN tokens + Stadium Tour",
    tags: ["real madrid", "la liga", "galacticos"],
    active: false
  }
];

const pastChallenges = [
  {
    id: 7,
    title: "Bayern Munich Dynasty",
    team: "Bayern Munich",
    deadline: "2025-05-01",
    imageUrl: "https://picsum.photos/seed/bayern/400/400",
    description: "A retrospective of Bayern Munich's dominance in German football",
    participants: 178,
    difficulty: "medium",
    prize: "3,000 GOIN tokens",
    tags: ["bayern munich", "bundesliga", "german"],
    active: false,
    winner: "SoccerHistorian22"
  },
  {
    id: 8,
    title: "MLS Rising Stars",
    team: "Major League Soccer",
    deadline: "2025-05-10",
    imageUrl: "https://picsum.photos/seed/mls/400/400",
    description: "Highlight the emerging talents in Major League Soccer",
    participants: 124,
    difficulty: "easy",
    prize: "2,000 GOIN tokens",
    tags: ["mls", "north america", "rising stars"],
    active: false,
    winner: "MLSFanatic"
  }
];

const Challenges = () => {
  const [activeTab, setActiveTab] = useState("active");
  
  const handleJoinChallenge = (id: number) => {
    toast.success("You've joined the challenge! Get creative with your soccer album.");
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-900/20 text-green-400 border-green-900";
      case "medium": return "bg-yellow-900/20 text-yellow-400 border-yellow-900";
      case "hard": return "bg-red-900/20 text-red-400 border-red-900";
      default: return "bg-blue-900/20 text-blue-400 border-blue-900";
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Trophy className="mr-2 text-[#F97316]" size={24} />
            <h1 className="text-3xl font-bold">Soccer Team Challenges</h1>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-300">
            Join exclusive challenges from your favorite soccer teams and create themed albums. 
            Earn rewards, showcase your creativity, and celebrate the beautiful game!
          </p>
        </div>
        
        <Tabs defaultValue="active" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="bg-[#222] border border-[#333]">
            <TabsTrigger value="active" className="data-[state=active]:bg-[#111] data-[state=active]:text-white">
              Active Challenges
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-[#111] data-[state=active]:text-white">
              Past Challenges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {initialChallenges.filter(challenge => challenge.active).map((challenge) => (
                <Card key={challenge.id} className="bg-[#111] border-[#333] text-white overflow-hidden hover:border-[#F97316] transition-all">
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
                      <div className="text-[#F97316] font-medium">{challenge.prize}</div>
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
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className="w-full bg-[#F97316] hover:bg-[#E86305] text-black"
                    >
                      <Flag className="h-5 w-5" />
                      <span>Join Challenge</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastChallenges.map((challenge) => (
                <Card key={challenge.id} className="bg-[#111] border-[#333] text-white overflow-hidden opacity-80">
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={challenge.imageUrl}
                        alt={challenge.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-black/70 border-gray-500 text-gray-300">
                          COMPLETED
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
                    
                    <div className="bg-[#222] border border-[#333] rounded-md p-3 mb-3">
                      <div className="text-xs text-gray-400 mb-1">WINNER</div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-[#F97316]" />
                        <span className="text-white font-medium">{challenge.winner}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {challenge.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs bg-gray-800/30 text-gray-400 border-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#333] hover:border-[#F97316] hover:text-[#F97316]"
                    >
                      View Winning Album
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Challenges;
