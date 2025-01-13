import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2, Image as ImageIcon, Camera, Images } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ImagePromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const imageTypes = [
  { id: 'realistic', icon: Camera, label: 'Realistic' },
  { id: 'artistic', icon: ImageIcon, label: 'Artistic' },
  { id: 'cartoon', icon: Images, label: 'Cartoon' },
];

export const ImagePromptInput = ({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating,
}: ImagePromptInputProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {imageTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.id}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col items-center gap-2 border-2 hover:border-blue-500"
              onClick={() => setPrompt(`${prompt} (${type.label.toLowerCase()} style)`)}
            >
              <Icon className="h-6 w-6 text-gray-600" />
              <span className="text-sm font-medium">{type.label}</span>
            </Card>
          );
        })}
      </div>
      <div className="space-y-2">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
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
            className="min-w-[120px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
        Press Enter to generate or click the Generate button. Click on an image style to append it to your prompt.
      </p>
    </div>
  );
};