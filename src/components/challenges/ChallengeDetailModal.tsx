import React, { useEffect, useRef } from "react";
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
import { Calendar, Users, Trophy, Star, Clock, Target, X } from "lucide-react";

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
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll modal content to top whenever modal opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Handle ESC key press and scroll page to top when modal opens
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      // Scroll page to top when modal opens
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
          button: "bg-[#F0B90B] hover:bg-[#D9A441] text-black",
          gradient: "from-[#F0B90B]/20 via-[#F0B90B]/10 to-transparent"
        };
      case "owl":
        return { 
          primary: "#8B5CF6", 
          title: "text-[#8B5CF6]", 
          accent: "text-[#8B5CF6]",
          button: "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white",
          gradient: "from-[#8B5CF6]/20 via-[#8B5CF6]/10 to-transparent"
        };
      case "cast":
        return { 
          primary: "#06B6D4", 
          title: "text-[#06B6D4]", 
          accent: "text-[#06B6D4]",
          button: "bg-[#06B6D4] hover:bg-[#0891B2] text-white",
          gradient: "from-[#06B6D4]/20 via-[#06B6D4]/10 to-transparent"
        };
      default: // soccer
        return { 
          primary: "#F97316", 
          title: "text-[#F97316]", 
          accent: "text-[#F97316]",
          button: "bg-[#F97316] hover:bg-[#E86305] text-black",
          gradient: "from-[#F97316]/20 via-[#F97316]/10 to-transparent"
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
      <DialogContent className="max-w-2xl max-h-[90vh] bg-[#0A0A0A] border-[#333] text-white p-0 flex flex-col">
        {/* Header with gradient accent */}
        <div className={`bg-gradient-to-r ${theme.gradient} border-b border-[#333] p-4 relative flex-shrink-0`}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors z-10 p-1 hover:bg-white/10 rounded-full"
          >
            <X size={18} />
          </button>
          
          <DialogHeader>
            <DialogTitle className={`text-2xl font-bold ${theme.title} pr-10`}>
              {challenge.title}
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-base">
              Challenge by {challenge.team}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-[#222] scrollbar-thumb-[#444] hover:scrollbar-thumb-[#555]"
        >
          <div className="p-4 space-y-4 text-white">
            {/* Challenge Image */}
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="object-cover w-full h-full rounded-lg shadow-lg"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className={`${getDifficultyColor(challenge.difficulty)} backdrop-blur-sm text-xs`}>
                    {challenge.difficulty.toUpperCase()}
                  </Badge>
                </div>
              </AspectRatio>
            </div>

            {/* Challenge Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-300 bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                <Calendar size={16} className={theme.accent} />
                <span className="font-medium text-sm">Deadline: {challenge.deadline}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                <Users size={16} className={theme.accent} />
                <span className="font-medium text-sm">{challenge.participants} participants</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Target size={18} className={theme.accent} />
                Challenge Description
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">{challenge.description}</p>
            </div>

            {/* Prize */}
            <div className={`bg-gradient-to-r ${theme.gradient} border border-[#333] rounded-lg p-4`}>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Trophy size={18} className={theme.accent} />
                Prize & Rewards
              </h3>
              <div className={`${theme.accent} font-bold text-lg`}>{challenge.prize}</div>
            </div>

            {/* Advantages */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Star size={18} className={theme.accent} />
                Challenge Advantages
              </h3>
              <div className="grid gap-2">
                {advantages.slice(0, 4).map((advantage, index) => (
                  <div key={index} className="flex items-start gap-2 text-gray-300">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0`} style={{ backgroundColor: theme.primary }}></div>
                    <span className="text-sm leading-relaxed">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Clock size={18} className={theme.accent} />
                Requirements
              </h3>
              <ul className="text-gray-300 space-y-1">
                <li className="flex items-start gap-2">
                  <span className={`${theme.accent} font-medium`}>•</span>
                  <span className="text-sm">Create a themed album with at least 10 cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`${theme.accent} font-medium`}>•</span>
                  <span className="text-sm">Follow the challenge guidelines and theme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`${theme.accent} font-medium`}>•</span>
                  <span className="text-sm">Submit before the deadline</span>
                </li>
              </ul>
            </div>

            {/* Tags */}
            <div className="pb-4">
              <h3 className="text-xs font-medium mb-2 text-gray-400 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {challenge.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className={`text-xs ${getDifficultyColor(challenge.difficulty)} backdrop-blur-sm`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Always visible */}
        <DialogFooter className="border-t border-[#333] p-4 bg-[#0A0A0A] flex flex-col sm:flex-row gap-2 flex-shrink-0">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-gray-300 hover:text-white hover:bg-[#333] border border-[#444] transition-all duration-200"
          >
            Close
          </Button>
          <Button 
            onClick={() => onJoin(challenge.id)}
            disabled={isJoined}
            className={`flex-1 transition-all duration-200 ${
              isJoined 
                ? "bg-green-600 hover:bg-green-600 text-white cursor-not-allowed" 
                : `${theme.button} shadow-lg hover:shadow-xl`
            }`}
          >
            {isJoined ? "Already Joined!" : "Join Challenge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
