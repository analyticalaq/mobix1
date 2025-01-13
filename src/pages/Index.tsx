import { useState } from "react";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";
import { APIKeyInput } from "@/components/APIKeyInput";
import { ImagePromptInput } from "@/components/ImagePromptInput";
import { ImageDisplay } from "@/components/ImageDisplay";
import { generateImage } from "@/lib/huggingface";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("hf_api_key") || "");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header with Logo and Theme Toggle */}
      <div className="w-full flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <a href="https://www.mobix.fr" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://www.mobix.fr/wp-content/themes/mobix/assets/svg/mobix-logo.svg" 
              alt="MOBIX" 
              className="h-8 dark:filter dark:brightness-0 dark:invert"
            />
          </a>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 p-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Image Generation
          </h1>
          <p className="text-muted-foreground">Create stunning images with artificial intelligence</p>
        </div>

        <div className="space-y-6">
          <APIKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          
          <div className="backdrop-blur-sm bg-card/80 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6">
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
      
      {/* Footer */}
      <footer className="mt-8 text-center p-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-muted-foreground">Powered by</span>
          <a href="https://www.mobix.fr" target="_blank" rel="noopener noreferrer" className="inline-block">
            <img 
              src="https://www.mobix.fr/wp-content/themes/mobix/assets/svg/mobix-logo.svg" 
              alt="MOBIX" 
              className="h-6 dark:filter dark:brightness-0 dark:invert"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;