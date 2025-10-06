const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SPOTIFY_CLIENT_ID = '56f85b2745a54d1b9c54e64ce573ef6f';
const SPOTIFY_CLIENT_SECRET = Deno.env.get('SPOTIFY_CLIENT_SECRET');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { artist, song } = await req.json();
    
    console.log(`Searching for: ${artist} - ${song}`);

    // Get Spotify access token (client credentials flow)
    console.log('Client ID:', SPOTIFY_CLIENT_ID);
    console.log('Client Secret exists:', !!SPOTIFY_CLIENT_SECRET);
    
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Spotify token error:', errorData);
      throw new Error(`Failed to get Spotify access token: ${errorData}`);
    }

    const { access_token } = await tokenResponse.json();

    // Search for the track
    const searchQuery = encodeURIComponent(`track:${song} artist:${artist}`);
    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      }
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to search Spotify');
    }

    const searchData = await searchResponse.json();
    const track = searchData.tracks?.items?.[0];

    if (!track) {
      return new Response(
        JSON.stringify({ error: 'Track not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    console.log(`Found track: ${track.name} by ${track.artists[0].name}`);

    return new Response(
      JSON.stringify({
        previewUrl: track.preview_url,
        trackName: track.name,
        artistName: track.artists[0].name,
        albumArt: track.album.images[0]?.url,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
