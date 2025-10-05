import { Artist } from "./ArtistInput";
import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LineupPosterProps {
  festivalName: string;
  date: string;
  location: string;
  artists: Artist[];
  onRemoveArtist: (id: string) => void;
}

const tierStyles = {
  headliner: "text-5xl md:text-7xl font-black tracking-tight animate-glow-pulse",
  subheadliner: "text-3xl md:text-5xl font-bold",
  midtier: "text-xl md:text-3xl font-semibold",
  supporting: "text-base md:text-xl font-medium",
};

const tierOrder = ["headliner", "subheadliner", "midtier", "supporting"] as const;

export const LineupPoster = ({
  festivalName,
  date,
  location,
  artists,
  onRemoveArtist,
}: LineupPosterProps) => {
  const groupedArtists = tierOrder.reduce((acc, tier) => {
    acc[tier] = artists.filter((a) => a.tier === tier);
    return acc;
  }, {} as Record<string, Artist[]>);

  return (
    <div className="relative bg-gradient-to-br from-card via-background to-card border-2 border-primary/30 rounded-2xl p-8 md:p-12 shadow-glow-primary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="relative z-10 space-y-8">
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-festival bg-clip-text text-transparent tracking-tighter">
            {festivalName || "Festival Name"}
          </h1>
          <p className="text-xl md:text-2xl text-accent font-semibold">
            {date || "Date"} • {location || "Location"}
          </p>
        </div>

        <div className="space-y-10">
          {tierOrder.map((tier) => {
            const tierArtists = groupedArtists[tier];
            if (tierArtists.length === 0) return null;

            return (
              <div key={tier} className="space-y-4 animate-slide-up">
                {tierArtists.map((artist, index) => (
                  <div
                    key={artist.id}
                    className="group relative text-center transition-all hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h2
                      className={`${tierStyles[tier]} text-foreground uppercase leading-none`}
                    >
                      {artist.name}
                    </h2>
                    {artist.songs && artist.songs.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                        {artist.songs.map((song, songIndex) => (
                          <div key={songIndex} className="inline-flex items-center gap-1 text-sm md:text-base text-muted-foreground font-normal">
                            <span>{song}</span>
                            <button
                              onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(artist.name + ' ' + song)}`, '_blank')}
                              className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
                              aria-label={`Preview ${song}`}
                            >
                              <Play className="h-3 w-3 text-primary fill-primary" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onRemoveArtist(artist.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {tier !== "supporting" && tierArtists.length > 0 && (
                  <div className="border-t border-primary/20 pt-2" />
                )}
              </div>
            );
          })}
        </div>

        {artists.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">
              Add artists to see your lineup poster
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
