import { Card } from "@/components/ui/card";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageDisplayProps {
  image: string | null;
  isLoading: boolean;
}

export const ImageDisplay = ({ image, isLoading }: ImageDisplayProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleDownload = () => {
    if (!image) return;
    
    const link = document.createElement("a");
    link.href = image;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/80">
      <div className="space-y-4">
        <div className="min-h-[300px] flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="text-sm">Generating your image...</span>
            </div>
          ) : image ? (
            <div className="relative w-full">
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              )}
              <img
                src={image}
                alt="Generated image"
                className={cn(
                  "w-full h-full object-contain transition-opacity duration-300",
                  isImageLoading ? "opacity-0" : "opacity-100"
                )}
                onLoad={() => setIsImageLoading(false)}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <span className="text-sm">Your generated image will appear here</span>
            </div>
          )}
        </div>
        
        {image && !isLoading && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};