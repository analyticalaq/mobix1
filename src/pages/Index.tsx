import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Key, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ImagePromptInput } from "@/components/ImagePromptInput";
import { ImageDisplay } from "@/components/ImageDisplay";
import { generateImage } from "@/lib/huggingface";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("hf_api_key") || "");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!apiKey) {
      toast.error("Please enter your HuggingFace API key");
      return;
    }
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const image = await generateImage(prompt, apiKey);
      setGeneratedImage(image);
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Image Generation</h1>
          <p className="text-gray-500">Create stunning images with artificial intelligence</p>
        </div>

        <div className="space-y-6">
          <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          
          <Card className="p-6 space-y-4 backdrop-blur-sm bg-white/80">
            <ImagePromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </Card>

          <ImageDisplay image={generatedImage} isLoading={isGenerating} />
        </div>
      </div>
    </div>
  );
};

export default Index;