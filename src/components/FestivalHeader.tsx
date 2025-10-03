import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FestivalHeaderProps {
  festivalName: string;
  date: string;
  location: string;
  onNameChange: (name: string) => void;
  onDateChange: (date: string) => void;
  onLocationChange: (location: string) => void;
}

export const FestivalHeader = ({
  festivalName,
  date,
  location,
  onNameChange,
  onDateChange,
  onLocationChange,
}: FestivalHeaderProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div>
        <Label htmlFor="festival-name" className="text-foreground/80 mb-2 block">
          Festival Name
        </Label>
        <Input
          id="festival-name"
          value={festivalName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter festival name..."
          className="text-lg font-bold bg-card border-border"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date" className="text-foreground/80 mb-2 block">
            Date
          </Label>
          <Input
            id="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            placeholder="e.g., June 15-17, 2024"
            className="bg-card border-border"
          />
        </div>
        <div>
          <Label htmlFor="location" className="text-foreground/80 mb-2 block">
            Location
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="e.g., Los Angeles, CA"
            className="bg-card border-border"
          />
        </div>
      </div>
    </div>
  );
};
