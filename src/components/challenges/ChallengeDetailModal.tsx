
import React from "react";
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
  if (!challenge) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-900/20 text-green-400 border-green-900";
      case "medium": return "bg-yellow-900/20 text-yellow-400 border-yellow-900";
      case "hard": return "bg-red-900/20 text-red-400 border-red-900";
      default: return "bg-blue-900/20 text-blue-400 border-blue-900";
    }
  };

  const advantages = [
    "Earn exclusive GOIN tokens and rewards",
    "Showcase your creativity to the soccer community",
    "Get recognition from official teams",
    "Access to exclusive content and merchandise",
    "Build your reputation in the collector community",
    "Connect with fellow soccer enthusiasts"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#111] border-[#333] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#F97316]">
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
              <Calendar size={16} className="text-[#F97316]" />
              <span>Deadline: {challenge.deadline}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Users size={16} className="text-[#F97316]" />
              <span>{challenge.participants} participants</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Target size={18} className="text-[#F97316]" />
              Challenge Description
            </h3>
            <p className="text-gray-300 leading-relaxed">{challenge.description}</p>
          </div>

          {/* Prize */}
          <div className="bg-[#222] border border-[#333] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Trophy size={18} className="text-[#F97316]" />
              Prize & Rewards
            </h3>
            <div className="text-[#F97316] font-medium text-lg">{challenge.prize}</div>
          </div>

          {/* Advantages */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Star size={18} className="text-[#F97316]" />
              Challenge Advantages
            </h3>
            <div className="grid gap-2">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-[#F97316] rounded-full"></div>
                  <span>{advantage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-[#222] border border-[#333] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Clock size={18} className="text-[#F97316]" />
              Requirements
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Create a themed album with at least 10 cards</li>
              <li>• Follow the challenge guidelines and theme</li>
              <li>• Submit before the deadline</li>
              <li>• Use only official team content and imagery</li>
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
            className="text-white hover:bg-transparent border border-[#333] hover:border-[#F97316] transition-colors"
          >
            Close
          </Button>
          <Button 
            onClick={() => onJoin(challenge.id)}
            disabled={isJoined}
            className={`flex-1 ${
              isJoined 
                ? "bg-green-600 hover:bg-green-600 text-white cursor-not-allowed" 
                : "bg-[#F97316] hover:bg-[#E86305] text-black"
            }`}
          >
            {isJoined ? "Already Joined!" : "Join Challenge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
