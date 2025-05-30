import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Users, Trophy, Star, Clock, Target } from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  team: string;
  deadline: string;
  imageUrl: string;
  description: string;
  participants: number;
  difficulty: string;
  prize: string;
  tags: string[];
  type: string;
}

interface ChallengeDetailModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onJoin: (id: number) => void;
  isJoined: boolean;
}

export const ChallengeDetailModal: React.FC<ChallengeDetailModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onJoin,
  isJoined,
}) => {
  // Scroll to top whenever modal opens
  useEffect(() => {
    if (isOpen) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [isOpen]);

  if (!challenge) return null;

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
        return { 
          primary: "#F0B90B", 
          title: "text-[#F0B90B]", 
          accent: "text-[#F0B90B]",
          button: "bg-[#F0B90B] hover:bg-[#D9A441] text-black"
        };
      case "owl":
        return { 
          primary: "#8B5CF6", 
          title: "text-[#8B5CF6]", 
          accent: "text-[#8B5CF6]",
          button: "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
        };
      case "cast":
        return { 
          primary: "#06B6D4", 
          title: "text-[#06B6D4]", 
          accent: "text-[#06B6D4]",
          button: "bg-[#06B6D4] hover:bg-[#0891B2] text-white"
        };
      default: // soccer
        return { 
          primary: "#F97316", 
          title: "text-[#F97316]", 
          accent: "text-[#F97316]",
          button: "bg-[#F97316] hover:bg-[#E86305] text-black"
        };
    }
  };

  const theme = getChallengeTheme(challenge.type);

  const getAdvantages = (type: string) => {
    switch (type) {
      case "binance":
        return [
          "Earn exclusive BNB tokens and crypto rewards",
          "Showcase your knowledge to the crypto community",
          "Get recognition from Binance official team",
          "Access to exclusive trading features and discounts",
          "Build your reputation in the crypto space",
          "Connect with fellow crypto enthusiasts"
        ];
      case "owl":
        return [
          "Earn exclusive OWL tokens and educational rewards",
          "Share your crypto wisdom with the community",
          "Get recognition as a crypto educator",
          "Access to exclusive educational content",
          "Build your reputation as a knowledge creator",
          "Connect with fellow crypto learners"
        ];
      case "cast":
        return [
          "Earn exclusive CAST tokens and podcast rewards",
          "Showcase your content creation skills",
          "Get recognition from podcast influencers",
          "Access to exclusive podcast equipment and tools",
          "Build your reputation in the podcast community",
          "Connect with fellow content creators"
        ];
      default: // soccer
        return [
          "Earn exclusive GOIN tokens and rewards",
          "Showcase your creativity to the soccer community",
          "Get recognition from official teams",
          "Access to exclusive content and merchandise",
          "Build your reputation in the collector community",
          "Connect with fellow soccer enthusiasts"
        ];
    }
  };

  const advantages = getAdvantages(challenge.type);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-[#333] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-2xl font-bold ${theme.title}`}>
            {challenge.title}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Challenge by {challenge.team}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Challenge Image */}
          <div className="relative">
            <AspectRatio ratio={16 / 9}>
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className={`${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty.toUpperCase()}
                </Badge>
              </div>
            </AspectRatio>
          </div>

          {/* Challenge Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Calendar size={16} className={theme.accent} />
              <span>Deadline: {challenge.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users size={16} className={theme.accent} />
              <span>{challenge.participants} participants</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Target size={18} className={theme.accent} />
              Challenge Description
            </h3>
            <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
          </div>

          {/* Prize */}
          <div className="bg-[#222] border border-[#333] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Trophy size={18} className={theme.accent} />
              Prize & Rewards
            </h3>
            <div className={`${theme.accent} font-medium text-lg`}>{challenge.prize}</div>
          </div>

          {/* Advantages */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star size={18} className={theme.accent} />
              Challenge Advantages
            </h3>
            <div className="grid gap-2">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: theme.primary }}></div>
                  <span>{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-[#222] border border-[#333] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Clock size={18} className={theme.accent} />
              Requirements
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Create a themed album with at least 10 cards</li>
              <li>• Follow the challenge guidelines and theme</li>
              <li>• Submit before the deadline</li>
              <li>• Use only official content and imagery</li>
            </ul>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-gray-400">TAGS</h3>
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <Badge key={tag} variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)}`}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className={`text-white hover:bg-transparent border border-[#333] transition-colors`}
            style={{ borderColor: theme.primary }}
          >
            Close
          </Button>
          <Button 
            onClick={() => onJoin(challenge.id)}
            disabled={isJoined}
            className={`flex-1 ${
              isJoined 
                ? "bg-green-600 hover:bg-green-600 text-white cursor-not-allowed" 
                : theme.button
            }`}
          >
            {isJoined ? "Already Joined!" : "Join Challenge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
