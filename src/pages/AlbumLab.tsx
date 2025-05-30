import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { useAlbums } from "@/contexts/AlbumContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Grid2x2, Grid3x3, GridIcon, Wand2, Image, ImagePlus, Sparkles } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AlbumLab = () => {
  const { addAlbum } = useAlbums();
  const navigate = useNavigate();
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [selectedGridType, setSelectedGridType] = useState("3x3");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedStickers, setGeneratedStickers] = useState<string[]>([
    "/lovable-uploads/80344331-9269-48f1-82d3-4434d48c11a7.png",
    "/lovable-uploads/2837a9c3-b272-4196-a96c-3daad0a03103.png",
    "/lovable-uploads/0983abca-88df-4210-8a62-e53e8eba5231.png",
    "/lovable-uploads/335ddb23-10eb-4cfa-b92f-a4032a6bb10d.png",
    "/lovable-uploads/ccf9d52f-fe2c-4962-a1c6-8932da3cbaff.png",
    "/lovable-uploads/8ae3dc78-3659-4fd5-a3bd-43991715ced4.png",
    "/lovable-uploads/1b8ffbae-6dd6-42be-8aad-55b2f592e2b6.png",
    "/lovable-uploads/5d66beca-ee47-4a4e-a404-dc84aa62883f.png"
  ]);
  const [loading, setLoading] = useState(false);
  const [stickerCategory, setStickerCategory] = useState("sports");

  const handleGenerateSticker = async () => {
  if (!aiPrompt.trim()) {
    toast.error("Please enter an AI prompt first");
    return;
  }

    setLoading(true);
    try {
    const enhancedPrompt = `${aiPrompt} - style: ${stickerCategory}, sticker design`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3", // ou "dall-e-2" se preferir
        prompt: enhancedPrompt,
        n: 1,
        size: "1024x1024" // ou "512x512" para versões menores
      })
    });

    const data = await response.json();

    if (data?.data?.[0]?.url) {
      setGeneratedStickers(prev => [...prev, data.data[0].url]);
      toast.success("Sticker generated successfully!");
    } else {
      toast.error("Failed to generate image");
      console.error(data);
    }
  } catch (error) {
    toast.error("Error calling OpenAI API");
    console.error("OpenAI error", error);
  } finally {
    setLoading(false);
  }

    
    // Simulate AI generation
    setTimeout(() => {
      // In a real application, this would call an actual AI image generation API
      const placeholderImages = [
        "/placeholder.svg",
        "https://images.unsplash.com/photo-1486218119243-13883505764c?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=300&h=300&fit=crop",
      ];
      
      // Select a random placeholder image
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      const newSticker = placeholderImages[randomIndex];
      
      setGeneratedStickers(prev => [...prev, newSticker]);
      setLoading(false);
      toast.success("Sticker generated successfully!");
    }, 1500);
  };

  const handleCreateAlbum = () => {
    if (!albumTitle) {
      toast.error("Please enter an album title");
      return;
    }

    // Salvar o álbum usando o contexto
    addAlbum({
      title: albumTitle,
      description: albumDescription,
      gridType: selectedGridType,
      stickers: generatedStickers,
    });

    toast.success(`Album "${albumTitle}" created successfully!`);
    
    // Limpar formulário
    setAlbumTitle("");
    setAlbumDescription("");
    setGeneratedStickers([
      "/lovable-uploads/80344331-9269-48f1-82d3-4434d48c11a7.png",
      "/lovable-uploads/2837a9c3-b272-4196-a96c-3daad0a03103.png",
      "/lovable-uploads/0983abca-88df-4210-8a62-e53e8eba5231.png",
      "/lovable-uploads/335ddb23-10eb-4cfa-b92f-a4032a6bb10d.png",
      "/lovable-uploads/ccf9d52f-fe2c-4962-a1c6-8932da3cbaff.png",
      "/lovable-uploads/8ae3dc78-3659-4fd5-a3bd-43991715ced4.png",
      "/lovable-uploads/1b8ffbae-6dd6-42be-8aad-55b2f592e2b6.png",
      "/lovable-uploads/5d66beca-ee47-4a4e-a404-dc84aa62883f.png"
    ]);
    setAiPrompt("");
    
    // Navegar para a página de álbuns após 1.5 segundos
    setTimeout(() => {
      navigate("/albums");
    }, 1500);
  };

  const clearStickers = () => {
    setGeneratedStickers([
      "/lovable-uploads/80344331-9269-48f1-82d3-4434d48c11a7.png",
      "/lovable-uploads/2837a9c3-b272-4196-a96c-3daad0a03103.png",
      "/lovable-uploads/0983abca-88df-4210-8a62-e53e8eba5231.png",
      "/lovable-uploads/335ddb23-10eb-4cfa-b92f-a4032a6bb10d.png",
      "/lovable-uploads/ccf9d52f-fe2c-4962-a1c6-8932da3cbaff.png",
      "/lovable-uploads/8ae3dc78-3659-4fd5-a3bd-43991715ced4.png",
      "/lovable-uploads/1b8ffbae-6dd6-42be-8aad-55b2f592e2b6.png",
      "/lovable-uploads/5d66beca-ee47-4a4e-a404-dc84aa62883f.png"
    ]);
    toast.info("Reset to default soccer stickers");
  };

  const gridOptions = [
    { value: "2x2", label: "2x2 Grid", icon: <Grid2x2 className="h-5 w-5" /> },
    { value: "3x3", label: "3x3 Grid", icon: <Grid3x3 className="h-5 w-5" /> },
    { value: "3x4", label: "3x4 Grid", icon: <GridIcon className="h-5 w-5" /> },
    { value: "4x4", label: "4x4 Grid", icon: <GridIcon className="h-5 w-5" /> },
  ];

  const stickerPromptSuggestions = [
    "Soccer player with blue jersey making a bicycle kick",
    "Basketball player dunking with dramatic lighting",
    "Tennis player serving with a detailed expression",
    "Cartoon race car driver celebrating a win",
    "Fantasy warrior with glowing sword and shield"
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Album Lab</h1>
          <p className="text-gray-300">Create custom NFT albums and stickers</p>
        </div>

        <Tabs defaultValue="create-album" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="create-album" className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black">Create Album</TabsTrigger>
            <TabsTrigger value="generate-stickers" className="text-white data-[state=active]:bg-[#FFEB3B] data-[state=active]:text-black">Generate Stickers</TabsTrigger>
          </TabsList>

          <TabsContent value="create-album">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Design Your Album</CardTitle>
                <CardDescription className="text-gray-300">
                  Create a custom album by selecting grid type and adding details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="album-title" className="text-white">Album Title</Label>
                  <Input 
                    id="album-title" 
                    placeholder="Enter album title" 
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="album-description" className="text-white">Album Description</Label>
                  <Textarea 
                    id="album-description" 
                    placeholder="Enter album description"
                    value={albumDescription}
                    onChange={(e) => setAlbumDescription(e.target.value)}
                    rows={3}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-white">Grid Type</Label>
                  <RadioGroup 
                    value={selectedGridType} 
                    onValueChange={setSelectedGridType}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                  >
                    {gridOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} className="border-gray-600" />
                        <Label 
                          htmlFor={option.value} 
                          className="flex items-center gap-2 cursor-pointer text-white"
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="pt-3">
                  <Button 
                    onClick={handleCreateAlbum}
                    className="bg-[#FFEB3B] text-black hover:bg-[#FFEB3B]/90"
                  >
                    Create Album
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate-stickers">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="md:sticky md:top-24 h-fit bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Sticker Generator
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Use AI to create unique NFT stickers for your albums
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt" className="text-white">Describe your sticker</Label>
                    <div className="relative">
                      <Textarea 
                        id="ai-prompt" 
                        placeholder="e.g., A soccer player with blue jersey making a bicycle kick"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        rows={4}
                        className="pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Wand2 className="absolute right-3 top-3 h-5 w-5 text-gray-400 opacity-70" />
                    </div>
                    
                    {/* Prompt suggestions */}
                    <div className="pt-2">
                      <p className="text-xs text-gray-400 mb-2">Try these suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {stickerPromptSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setAiPrompt(suggestion)}
                            className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md transition-colors text-white"
                          >
                            {suggestion.length > 20 ? `${suggestion.substring(0, 20)}...` : suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Sticker Category</Label>
                    <Select 
                      value={stickerCategory} 
                      onValueChange={setStickerCategory}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="sports" className="text-white">Sports</SelectItem>
                        <SelectItem value="animals" className="text-white">Animals</SelectItem>
                        <SelectItem value="fantasy" className="text-white">Fantasy</SelectItem>
                        <SelectItem value="art" className="text-white">Art</SelectItem>
                        <SelectItem value="cartoon" className="text-white">Cartoon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Art Style</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="aspect-square p-2 h-auto border-gray-600 text-white hover:bg-gray-700" title="Photorealistic">
                        <Image className="h-6 w-6 opacity-70" />
                        <span className="sr-only">Photorealistic</span>
                      </Button>
                      <Button variant="outline" className="aspect-square p-2 h-auto bg-gray-700 border-gray-600 text-white hover:bg-gray-600" title="Cartoon">
                        <ImagePlus className="h-6 w-6 opacity-70" />
                        <span className="sr-only">Cartoon</span>
                      </Button>
                      <Button variant="outline" className="aspect-square p-2 h-auto border-gray-600 text-white hover:bg-gray-700" title="Pixel Art">
                        <GridIcon className="h-6 w-6 opacity-70" />
                        <span className="sr-only">Pixel Art</span>
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerateSticker} 
                    disabled={loading || !aiPrompt.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    {loading ? (
                      <span>Generating...</span>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        <span>Generate Sticker</span>
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-white">Generated Stickers</CardTitle>
                    <CardDescription className="text-gray-300">
                      Soccer player stickers and AI-generated NFT stickers
                    </CardDescription>
                  </div>
                  {generatedStickers.length > 8 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearStickers}
                      className="text-white hover:bg-gray-700"
                    >
                      Reset
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {generatedStickers.map((sticker, index) => (
                      <div key={index} className="group relative rounded-lg overflow-hidden border border-gray-600 hover:border-[#FFEB3B]/50 transition-all">
                        <AspectRatio ratio={1/1}>
                          <img 
                            src={sticker} 
                            alt={`Generated sticker ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                          <Button size="sm" variant="outline" className="h-8 bg-black/80 text-white border-white/30 hover:bg-white/20">
                            Save
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AlbumLab;
