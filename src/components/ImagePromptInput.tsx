import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";

interface ImagePromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ImagePromptInput = ({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
}: ImagePromptInputProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-700">
          Image Description
        </label>
        <div className="flex gap-2">
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a detailed description of the image you want to generate..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onGenerate();
              }
            }}
          />
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="min-w-[100px]"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Press Enter to generate or click the Generate button
      </p>
    </div>
  );
};