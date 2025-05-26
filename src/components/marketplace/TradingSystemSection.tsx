
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Search, Users } from "lucide-react";

// Mock data para cards do usuário
const userCards = [
  { 
    id: 1, 
    name: "Golden Striker", 
    image: "/placeholder.svg", 
    rarity: "Legendary", 
    collection: "Premier League",
    isTrading: false
  },
  { 
    id: 2, 
    name: "Midfield Maestro", 
    image: "/placeholder.svg", 
    rarity: "Rare", 
    collection: "La Liga",
    isTrading: true
  },
  { 
    id: 3, 
    name: "Top Defender", 
    image: "/placeholder.svg", 
    rarity: "Uncommon", 
    collection: "Serie A",
    isTrading: false
  },
  { 
    id: 4, 
    name: "Star Goalkeeper", 
    image: "/placeholder.svg", 
    rarity: "Rare", 
    collection: "Bundesliga",
    isTrading: false
  },
];

// Mock data para trocas disponíveis
const availableTrades = [
  {
    id: 1,
    user: "ColecionadorPro",
    userAvatar: "/placeholder.svg",
    offering: { name: "Team Captain", rarity: "Legendary", image: "/placeholder.svg" },
    requesting: { name: "Golden Striker", rarity: "Legendary", image: "/placeholder.svg" }
  },
  {
    id: 2,
    user: "NFTTrader99",
    userAvatar: "/placeholder.svg",
    offering: { name: "Rising Star", rarity: "Common", image: "/placeholder.svg" },
    requesting: { name: "Midfield Maestro", rarity: "Rare", image: "/placeholder.svg" }
  }
];

// Cores das raridades
const rarityColors = {
  Common: "bg-gray-400",
  Uncommon: "bg-green-500",
  Rare: "bg-blue-500",
  Legendary: "bg-yellow-400"
};

export const TradingSystemSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sistema de Trocas</h2>
        <p className="text-gray-400 mb-6">
          Troque seus cards com outros colecionadores. Encontre alguém que tenha o card que você precisa e ofereça um dos seus cards em troca.
        </p>
      </div>

      <Tabs defaultValue="my-cards" className="w-full">
        <TabsList className="mb-6 bg-[#111] border border-[#333]">
          <TabsTrigger value="my-cards">Seus Cards</TabsTrigger>
          <TabsTrigger value="available-trades">Trocas Disponíveis</TabsTrigger>
        </TabsList>

        <TabsContent value="my-cards">
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Input 
                  placeholder="Buscar seus cards..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#111] border-[#333] text-white"
                />
              </div>
              <Button variant="outline" className="border-[#333]">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCards.map((card) => (
                <Card key={card.id} className="bg-[#111] border-[#333] overflow-hidden">
                  <div className="p-4">
                    <AspectRatio ratio={1/1}>
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="rounded-md object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </div>
                  <CardContent>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{card.name}</h3>
                      <Badge className={`${rarityColors[card.rarity as keyof typeof rarityColors]} text-black`}>
                        {card.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Collection: {card.collection}</p>
                    {card.isTrading && (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        Em negociação
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="bg-[#0a0a0a] border-t border-[#333] p-4">
                    <Button 
                      className="w-full" 
                      disabled={card.isTrading}
                      variant={card.isTrading ? "outline" : "default"}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {card.isTrading ? "Em negociação" : "Oferecer para troca"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="available-trades">
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Input 
                  placeholder="Buscar trocas disponíveis..." 
                  className="bg-[#111] border-[#333] text-white"
                />
              </div>
              <Button variant="outline" className="border-[#333]">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>

            <div className="space-y-4">
              {availableTrades.map((trade) => (
                <Card key={trade.id} className="bg-[#111] border-[#333]">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{trade.user}</CardTitle>
                        <p className="text-sm text-gray-400">Quer fazer uma troca</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      {/* Card oferecido */}
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Oferece:</p>
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <img 
                            src={trade.offering.image} 
                            alt={trade.offering.name}
                            className="w-20 h-20 mx-auto rounded-md mb-2"
                          />
                          <p className="font-semibold text-sm">{trade.offering.name}</p>
                          <Badge className={`${rarityColors[trade.offering.rarity as keyof typeof rarityColors]} text-black mt-1`} size="sm">
                            {trade.offering.rarity}
                          </Badge>
                        </div>
                      </div>

                      {/* Seta de troca */}
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 mx-auto text-[#FFEB3B]" />
                      </div>

                      {/* Card desejado */}
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-2">Quer:</p>
                        <div className="bg-[#1a1a1a] rounded-lg p-3">
                          <img 
                            src={trade.requesting.image} 
                            alt={trade.requesting.name}
                            className="w-20 h-20 mx-auto rounded-md mb-2"
                          />
                          <p className="font-semibold text-sm">{trade.requesting.name}</p>
                          <Badge className={`${rarityColors[trade.requesting.rarity as keyof typeof rarityColors]} text-black mt-1`} size="sm">
                            {trade.requesting.rarity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-[#0a0a0a] border-t border-[#333] p-4">
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1 border-[#333]">
                        Ver Perfil
                      </Button>
                      <Button className="flex-1">
                        Propor Troca
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
