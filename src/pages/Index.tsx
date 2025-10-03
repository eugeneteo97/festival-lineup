import { useState } from "react";
import { FestivalHeader } from "@/components/FestivalHeader";
import { ArtistInput, Artist } from "@/components/ArtistInput";
import { LineupPoster } from "@/components/LineupPoster";
import { Music } from "lucide-react";

const Index = () => {
  const [festivalName, setFestivalName] = useState("Summer Sounds");
  const [date, setDate] = useState("June 15-17, 2024");
  const [location, setLocation] = useState("Los Angeles, CA");
  const [artists, setArtists] = useState<Artist[]>([]);

  const handleAddArtist = (artist: Omit<Artist, "id">) => {
    const newArtist = {
      ...artist,
      id: crypto.randomUUID(),
    };
    setArtists([...artists, newArtist]);
  };

  const handleRemoveArtist = (id: string) => {
    setArtists(artists.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Music className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-black bg-gradient-festival bg-clip-text text-transparent">
              Festival Lineup Creator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Design your dream festival lineup with style
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-8">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Festival Details</h2>
              <FestivalHeader
                festivalName={festivalName}
                date={date}
                location={location}
                onNameChange={setFestivalName}
                onDateChange={setDate}
                onLocationChange={setLocation}
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-foreground mb-6">Add Artist</h2>
              <ArtistInput onAddArtist={handleAddArtist} />
            </div>
          </div>

          <div>
            <LineupPoster
              festivalName={festivalName}
              date={date}
              location={location}
              artists={artists}
              onRemoveArtist={handleRemoveArtist}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
