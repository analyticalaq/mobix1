import { useState } from "react";
import { toast } from "sonner";
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col">
      <div className="max-w-4xl mx-auto space-y-8 flex-grow">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Image Generation
          </h1>
          <p className="text-gray-500">Create stunning images with artificial intelligence</p>
        </div>

        <div className="space-y-6">
          <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          
          <div className="backdrop-blur-sm bg-white/80 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            <ImagePromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          <ImageDisplay image={generatedImage} isLoading={isGenerating} />
        </div>
      </div>
      
      {/* Branding Footer */}
      <footer className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-600">Powered by</span>
          <a href="https://www.mobix.fr" target="_blank" rel="noopener noreferrer" className="inline-block">
            <img 
              src="https://www.mobix.fr/wp-content/themes/mobix/assets/svg/mobix-logo.svg" 
              alt="MOBIX" 
              className="h-6"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;