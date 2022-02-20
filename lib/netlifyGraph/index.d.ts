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

export type ExampleQuery = {
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
            }>;
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
 * An example query to start with.
 */
export function fetchExampleQuery(
  /**
   * Pass `{}` as no variables are defined for this function.
   */
  variables: Record<string, never>,
  options?: NetlifyGraphFunctionOptions
): Promise<ExampleQuery>;

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
            }>;
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
export function fetchSpotifySavedTracksQuery(
  /**
   * Pass `{}` as no variables are defined for this function.
   */
  variables: Record<string, never>,
  options?: NetlifyGraphFunctionOptions
): Promise<SpotifySavedTracksQuery>;
