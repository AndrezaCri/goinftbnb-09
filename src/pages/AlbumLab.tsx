
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
import { Grid2x2, Grid3x3, GridIcon, Wand2 } from "lucide-react";
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

  const handleGenerateSticker = () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter an AI prompt first");
      return;
    }

    setLoading(true);
    
    // Simulate AI generation
    setTimeout(() => {
      // In a real application, this would call an actual AI image generation API
      const newSticker = `/placeholder.svg`;
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

  const gridOptions = [
    { value: "2x2", label: "2x2 Grid", icon: <Grid2x2 className="h-5 w-5" /> },
    { value: "3x3", label: "3x3 Grid", icon: <Grid3x3 className="h-5 w-5" /> },
    { value: "3x4", label: "3x4 Grid", icon: <GridIcon className="h-5 w-5" /> },
    { value: "4x4", label: "4x4 Grid", icon: <GridIcon className="h-5 w-5" /> },
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
              <Card>
                <CardHeader>
                  <CardTitle>AI Sticker Generator</CardTitle>
                  <CardDescription>
                    Use AI to create unique NFT stickers for your albums
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-prompt">Describe your sticker</Label>
                    <Textarea 
                      id="ai-prompt" 
                      placeholder="e.g., A soccer player with blue jersey making a bicycle kick"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sticker Category</Label>
                    <Select defaultValue="sports">
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

                  <Button 
                    onClick={handleGenerateSticker} 
                    disabled={loading || !aiPrompt.trim()}
                    className="w-full"
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
                <CardHeader>
                  <CardTitle>Generated Stickers</CardTitle>
                  <CardDescription>
                    Your AI-generated NFT stickers will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedStickers.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {generatedStickers.map((sticker, index) => (
                        <div key={index} className="rounded-lg overflow-hidden border border-border">
                          <AspectRatio ratio={1/1}>
                            <img 
                              src={sticker} 
                              alt={`Generated sticker ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </AspectRatio>
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
