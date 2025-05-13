
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
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

const AlbumLab = () => {
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [selectedGridType, setSelectedGridType] = useState("3x3");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedStickers, setGeneratedStickers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [stickerCategory, setStickerCategory] = useState("sports");

  const handleGenerateSticker = () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter an AI prompt first");
      return;
    }

    setLoading(true);
    
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

    toast.success(`Album "${albumTitle}" created with a ${selectedGridType} grid!`);
  };

  const clearStickers = () => {
    setGeneratedStickers([]);
    toast.info("Sticker gallery cleared");
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Album Lab</h1>
          <p className="text-muted-foreground">Create custom NFT albums and stickers</p>
        </div>

        <Tabs defaultValue="create-album" className="space-y-6">
          <TabsList>
            <TabsTrigger value="create-album">Create Album</TabsTrigger>
            <TabsTrigger value="generate-stickers">Generate Stickers</TabsTrigger>
          </TabsList>

          <TabsContent value="create-album">
            <Card>
              <CardHeader>
                <CardTitle>Design Your Album</CardTitle>
                <CardDescription>
                  Create a custom album by selecting grid type and adding details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="album-title">Album Title</Label>
                  <Input 
                    id="album-title" 
                    placeholder="Enter album title" 
                    value={albumTitle}
                    onChange={(e) => setAlbumTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="album-description">Album Description</Label>
                  <Textarea 
                    id="album-description" 
                    placeholder="Enter album description"
                    value={albumDescription}
                    onChange={(e) => setAlbumDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <Label>Grid Type</Label>
                  <RadioGroup 
                    value={selectedGridType} 
                    onValueChange={setSelectedGridType}
                    className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                  >
                    {gridOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} />
                        <Label 
                          htmlFor={option.value} 
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          {option.icon}
                          <span>{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="pt-3">
                  <Button onClick={handleCreateAlbum}>
                    Create Album
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate-stickers">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="md:sticky md:top-24 h-fit">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Sticker Generator
                  </CardTitle>
                  <CardDescription>
                    Use AI to create unique NFT stickers for your albums
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Describe your sticker</Label>
                    <div className="relative">
                      <Textarea 
                        id="ai-prompt" 
                        placeholder="e.g., A soccer player with blue jersey making a bicycle kick"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        rows={4}
                        className="pr-10"
                      />
                      <Wand2 className="absolute right-3 top-3 h-5 w-5 text-muted-foreground opacity-70" />
                    </div>
                    
                    {/* Prompt suggestions */}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2">Try these suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {stickerPromptSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setAiPrompt(suggestion)}
                            className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded-md transition-colors"
                          >
                            {suggestion.length > 20 ? `${suggestion.substring(0, 20)}...` : suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sticker Category</Label>
                    <Select 
                      value={stickerCategory} 
                      onValueChange={setStickerCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="animals">Animals</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="cartoon">Cartoon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Art Style</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="aspect-square p-2 h-auto" title="Photorealistic">
                        <Image className="h-6 w-6 opacity-70" />
                        <span className="sr-only">Photorealistic</span>
                      </Button>
                      <Button variant="outline" className="aspect-square p-2 h-auto bg-muted" title="Cartoon">
                        <ImagePlus className="h-6 w-6 opacity-70" />
                        <span className="sr-only">Cartoon</span>
                      </Button>
                      <Button variant="outline" className="aspect-square p-2 h-auto" title="Pixel Art">
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

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Generated Stickers</CardTitle>
                    <CardDescription>
                      Your AI-generated NFT stickers will appear here
                    </CardDescription>
                  </div>
                  {generatedStickers.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={clearStickers}
                    >
                      Clear
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {generatedStickers.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {generatedStickers.map((sticker, index) => (
                        <div key={index} className="group relative rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all">
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
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                        <Wand2 className="h-6 w-6" />
                      </div>
                      <p>No stickers generated yet</p>
                      <p className="text-sm">Use the generator to create stickers</p>
                    </div>
                  )}
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
