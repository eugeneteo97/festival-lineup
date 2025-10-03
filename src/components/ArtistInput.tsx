import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

export type ArtistTier = "headliner" | "subheadliner" | "midtier" | "supporting";

export interface Artist {
  id: string;
  name: string;
  tier: ArtistTier;
}

interface ArtistInputProps {
  onAddArtist: (artist: Omit<Artist, "id">) => void;
}

export const ArtistInput = ({ onAddArtist }: ArtistInputProps) => {
  const [artistName, setArtistName] = useState("");
  const [tier, setTier] = useState<ArtistTier>("midtier");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (artistName.trim()) {
      onAddArtist({ name: artistName.trim(), tier });
      setArtistName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <Label htmlFor="artist-name" className="text-foreground/80 mb-2 block">
          Artist Name
        </Label>
        <Input
          id="artist-name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          placeholder="Enter artist name..."
          className="bg-card border-border"
        />
      </div>
      <div>
        <Label htmlFor="tier" className="text-foreground/80 mb-2 block">
          Tier
        </Label>
        <Select value={tier} onValueChange={(value) => setTier(value as ArtistTier)}>
          <SelectTrigger id="tier" className="bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="headliner">Headliner</SelectItem>
            <SelectItem value="subheadliner">Sub-Headliner</SelectItem>
            <SelectItem value="midtier">Mid-Tier</SelectItem>
            <SelectItem value="supporting">Supporting</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-gradient-festival hover:opacity-90">
        <Plus className="mr-2 h-4 w-4" />
        Add Artist
      </Button>
    </form>
  );
};
