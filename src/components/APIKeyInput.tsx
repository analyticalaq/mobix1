import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key } from "lucide-react";

interface APIKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const APIKeyInput = ({ apiKey, setApiKey }: APIKeyInputProps) => {
  const [showKey, setShowKey] = useState(false);

  const handleKeyChange = (value: string) => {
    setApiKey(value);
    localStorage.setItem("hf_api_key", value);
  };

  return (
    <Card className="p-6 backdrop-blur-sm bg-white/80">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Key className="w-4 h-4" />
          <span>HuggingFace API Key</span>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              placeholder="Enter your HuggingFace API key"
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Your API key is stored locally and never sent to our servers.
        </p>
      </div>
    </Card>
  );
};