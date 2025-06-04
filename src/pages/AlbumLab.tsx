
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useSupabaseAlbums } from "@/hooks/useSupabaseAlbums";
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
import { Grid2x2, Grid3x3, GridIcon, Wand2, Sparkles } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { validateAlbumTitle, validateAlbumDescription, validateAIPrompt, sanitizeInput } from "@/utils/inputValidation";

const AlbumLab = () => {
  const { albums, createAlbum, addStickerToAlbum } = useSupabaseAlbums();
  const navigate = useNavigate();
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [selectedGridType, setSelectedGridType] = useState("3x3");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generatedSticker, setGeneratedSticker] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stickerCategory, setStickerCategory] = useState("sports");

  // Check album limit (max 5 albums for better UX)
  const hasReachedAlbumLimit = albums.length >= 5;

  const handleGenerateSticker = async () => {
    const promptValidation = validateAIPrompt(aiPrompt);
    if (!promptValidation.isValid) {
      toast.error(promptValidation.error);
      return;
    }

    setLoading(true);
    try {
      console.log('Calling generate-sticker function with prompt:', aiPrompt);
      
      const { data, error } = await supabase.functions.invoke('generate-sticker', {
        body: {
          prompt: sanitizeInput(aiPrompt),
          category: stickerCategory
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        toast.error("Error calling sticker generation service");
        return;
      }

      if (data?.imageUrl) {
        setGeneratedSticker(data.imageUrl);
        toast.success("Sticker generated successfully!");
      } else {
        toast.error("Failed to generate image");
        console.error('No image URL in response:', data);
      }
    } catch (error) {
      toast.error("Error generating sticker");
      console.error("Sticker generation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAlbum = async () => {
    if (hasReachedAlbumLimit) {
      toast.error("You have reached the maximum limit of 5 albums!");
      return;
    }

    const titleValidation = validateAlbumTitle(albumTitle);
    if (!titleValidation.isValid) {
      toast.error(titleValidation.error);
      return;
    }

    const descriptionValidation = validateAlbumDescription(albumDescription);
    if (!descriptionValidation.isValid) {
      toast.error(descriptionValidation.error);
      return;
    }

    const albumData = {
      title: sanitizeInput(albumTitle),
      description: sanitizeInput(albumDescription),
      grid_type: selectedGridType,
    };

    const newAlbum = await createAlbum(albumData);
    
    if (newAlbum) {
      toast.success(`Album "${albumData.title}" created successfully!`);

      // Add generated sticker to the new album if exists
      if (generatedSticker) {
        await addStickerToAlbum(newAlbum.id, generatedSticker, sanitizeInput(aiPrompt));
      }

      // Clear form
      setAlbumTitle("");
      setAlbumDescription("");
      setGeneratedSticker(null);
      setAiPrompt("");

      // Navigate to albums page
      setTimeout(() => {
        navigate("/albums");
      }, 1500);
    }
  };

  const clearStickers = () => {
    setGeneratedSticker(null);
    toast.info("Sticker cleared");
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
    <ProtectedRoute>
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
                    {hasReachedAlbumLimit && (
                      <span className="block mt-2 text-red-400 font-medium">
                        ⚠️ You have reached the maximum limit of 5 albums
                      </span>
                    )}
                    {!hasReachedAlbumLimit && albums.length > 0 && (
                      <span className="block mt-2 text-green-400 font-medium">
                        📝 You can create {5 - albums.length} more album(s)
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="album-title" className="text-white">Album Title</Label>
                    <Input
                      id="album-title"
                      placeholder="Enter album title (2-100 characters)"
                      value={albumTitle}
                      onChange={(e) => setAlbumTitle(e.target.value)}
                      disabled={hasReachedAlbumLimit}
                      maxLength={100}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="album-description" className="text-white">Album Description</Label>
                    <Textarea
                      id="album-description"
                      placeholder="Enter album description (optional, max 500 characters)"
                      value={albumDescription}
                      onChange={(e) => setAlbumDescription(e.target.value)}
                      disabled={hasReachedAlbumLimit}
                      maxLength={500}
                      rows={3}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-white">Grid Type</Label>
                    <RadioGroup
                      value={selectedGridType}
                      onValueChange={setSelectedGridType}
                      disabled={hasReachedAlbumLimit}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                    >
                      {gridOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            disabled={hasReachedAlbumLimit}
                            className="border-gray-600 disabled:opacity-50"
                          />
                          <Label
                            htmlFor={option.value}
                            className={`flex items-center gap-2 cursor-pointer text-white ${hasReachedAlbumLimit ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                      disabled={hasReachedAlbumLimit}
                      className="bg-[#FFEB3B] text-black hover:bg-[#FFEB3B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {hasReachedAlbumLimit ? "Limit Reached" : "Create Album"}
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
                          placeholder="e.g., A soccer player with blue jersey making a bicycle kick (5-200 characters)"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          maxLength={200}
                          rows={4}
                          className="pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                        <Wand2 className="absolute right-3 top-3 h-5 w-5 text-gray-400 opacity-70" />
                      </div>
                      <div className="text-xs text-gray-400">
                        {aiPrompt.length}/200 characters
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
                        AI-generated NFT stickers for your albums
                      </CardDescription>
                    </div>
                    {generatedSticker && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearStickers}
                        className="text-white hover:bg-gray-700"
                      >
                        Clear
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {!generatedSticker ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Sparkles className="mx-auto h-12 w-12 opacity-50" />
                        </div>
                        <p className="text-gray-400">No stickers generated yet</p>
                        <p className="text-sm text-gray-500 mt-2">Use the AI generator to create your first sticker</p>
                      </div>
                    ) : (
                      <div className="group relative rounded-lg overflow-hidden border border-gray-600 hover:border-[#FFEB3B]/50 transition-all">
                        <AspectRatio ratio={1 / 1}>
                          <img
                            src={generatedSticker}
                            alt="Generated sticker"
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AlbumLab;
