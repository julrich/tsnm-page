// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!

export type NetlifyGraphFunctionOptions = {
  /**
   * The accessToken to use for the request
   */
  accessToken?: string;
  /**
   * The siteId to use for the request
   * @default process.env.SITE_ID
   */
  siteId?: string;
};

export type WebhookEvent = {
  body: string;
  headers: Record<string, string | null | undefined>;
};

export type GraphQLError = {
  path: Array<string | number>;
  message: string;
  extensions: Record<string, unknown>;
};

export type GithubStarredReposQuery = {
  /**
   * Any data from the function will be returned here
   */
  data: {
    gitHub: {
      /**
       * Lookup a user by login.
       */
      user: {
        /**
         * Repositories the user has starred.
         */
        starredRepositories: {
          /**
           * A list of edges.
           */
          edges: Array<{
            node: {
              /**
               * The repository's name with owner.
               */
              nameWithOwner: string;
              /**
               * The HTTP URL for this repository
               */
              url: string;
              /**
  * Returns a count of how many stargazers there are on this object

  */
              stargazerCount: number;
              /**
               * The description of the repository.
               */
              description: string;
            };
          }>;
        };
      };
    };
  };
  /**
   * Any errors from the function will be returned here
   */
  errors: Array<GraphQLError>;
};

/**
 * An empty query to start from
 */
export function fetchGithubStarredReposQuery(
  /**
   * Pass `{}` as no variables are defined for this function.
   */
  variables: Record<string, never>,
  options?: NetlifyGraphFunctionOptions
): Promise<GithubStarredReposQuery>;

export type SpotifyArtistCoverQueryInput = {
  /**
   * The artist id
   */
  artistId?: string;
};

export type SpotifyArtistCoverQuery = {
  /**
   * Any data from the function will be returned here
   */
  data: {
    /**
     * The root for Spotify queries
     */
    spotify: {
      artist: {
        /**
         * Images of the artist in various sizes, widest first.
         */
        images: Array<{
          /**
           * The image height in pixels. If unknown: `null` or not returned.
           */
          height: number;
          /**
           * The source URL of the image.
           */
          url: string;
          /**
           * The image width in pixels. If unknown: `null` or not returned.
           */
          width: number;
        }>;
        /**
         * A list of the genres the artist is associated with. For example: "Prog Rock" , "Post-Grunge". (If not yet classified, the array is empty.)
         */
        genres: Array<string>;
      };
    };
  };
  /**
   * Any errors from the function will be returned here
   */
  errors: Array<GraphQLError>;
};

/**
 * Query to get cover image for an artist
 */
export function fetchSpotifyArtistCoverQuery(
  variables: SpotifyArtistCoverQueryInput,
  options?: NetlifyGraphFunctionOptions
): Promise<SpotifyArtistCoverQuery>;

export type SpotifySavedTracksQuery = {
  /**
   * Any data from the function will be returned here
   */
  data: {
    /**
     * The root for Spotify queries
     */
    spotify: {
      me: {
        /**
         * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
         */
        savedTracks: {
          /**
           * SavedTracks
           */
          nodes: Array<{
            /**
             * The name of the track.
             */
            name: string;
            /**
             * The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.
             */
            artists: Array<{
              /**
               * The name of the artist.
               */
              name: string;
              /**
               * The Spotify ID for the artist.
               */
              id: string;
            }>;
            /**
             * A link to a 30 second preview (MP3 format) of the track. Can be null
             */
            previewUrl: string;
            /**
             * The track length in milliseconds.
             */
            durationMs: number;
            /**
             * Known external URLs for this track.
             */
            externalUrls: {
              /**
               * The Spotify URL for the object.
               */
              spotify: string;
            };
          }>;
        };
      };
    };
  };
  /**
   * Any errors from the function will be returned here
   */
  errors: Array<GraphQLError>;
};

/**
 * Query saved tracks from Spotify
 */
export function fetchSpotifySavedTracksQuery(
  /**
   * Pass `{}` as no variables are defined for this function.
   */
  variables: Record<string, never>,
  options?: NetlifyGraphFunctionOptions
): Promise<SpotifySavedTracksQuery>;
