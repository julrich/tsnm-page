// GENERATED VIA NETLIFY AUTOMATED DEV TOOLS, EDIT WITH CAUTION!
const buffer = require("buffer");
const crypto = require("crypto");
const https = require("https");
const process = require("process");

exports.verifySignature = (input) => {
  const secret = input.secret;
  const body = input.body;
  const signature = input.signature;

  if (!signature) {
    console.error("Missing signature");
    return false;
  }

  const sig = {};
  for (const pair of signature.split(",")) {
    const [key, value] = pair.split("=");
    sig[key] = value;
  }

  if (!sig.t || !sig.hmac_sha256) {
    console.error("Invalid signature header");
    return false;
  }

  const hash = crypto
    .createHmac("sha256", secret)
    .update(sig.t)
    .update(".")
    .update(body)
    .digest("hex");

  if (
    !crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(sig.hmac_sha256, "hex")
    )
  ) {
    console.error("Invalid signature");
    return false;
  }

  if (parseInt(sig.t, 10) < Date.now() / 1000 - 300 /* 5 minutes */) {
    console.error("Request is too old");
    return false;
  }

  return true;
};

const operationsDoc = `query GithubStarredReposQuery @netlify(id: """c16c4afc-3e65-46e8-8f1f-1c1834792fc0""", doc: """An empty query to start from""") {
  gitHub {
    user(login: "julrich") {
      starredRepositories(orderBy: {field: STARRED_AT, direction: DESC}) {
        edges {
          node {
            nameWithOwner
            url
            stargazerCount
            description
          }
        }
      }
    }
  }
}

query SpotifyArtistCoverQuery($artistId: String = "") @netlify(id: """efb0708e-1295-49dd-ac34-d6ed954e9ac1""", doc: """Query to get cover image for an artist""") {
  spotify {
    artist(id: $artistId) {
      images {
        height
        url
        width
      }
      genres
    }
    track(id: "")
  }
}

query SpotifySavedTracksQuery @netlify(id: """c108b4da-e020-47a5-8208-0cab9030cadb""", doc: """Query saved tracks from Spotify""") {
  spotify {
    me {
      savedTracks {
        nodes {
          name
          artists {
            name
            id
          }
          previewUrl
          durationMs
          externalUrls {
            spotify
          }
        }
      }
    }
  }
}
`;

const httpFetch = (siteId, options) => {
  const reqBody = options.body || null;
  const userHeaders = options.headers || {};
  const headers = {
    ...userHeaders,
    "Content-Type": "application/json",
    "Content-Length": reqBody.length,
  };

  const timeoutMs = 30_000;

  const reqOptions = {
    method: "POST",
    headers: headers,
    timeout: timeoutMs,
  };

  const url = "https://serve.onegraph.com/graphql?app_id=" + siteId;

  const respBody = [];

  return new Promise((resolve, reject) => {
    const req = https.request(url, reqOptions, (res) => {
      if (res.statusCode && (res.statusCode < 200 || res.statusCode > 299)) {
        return reject(
          new Error(
            "Netlify Graph return non-OK HTTP status code" + res.statusCode
          )
        );
      }

      res.on("data", (chunk) => respBody.push(chunk));

      res.on("end", () => {
        const resString = buffer.Buffer.concat(respBody).toString();
        resolve(resString);
      });
    });

    req.on("error", (error) => {
      console.error("Error making request to Netlify Graph:", error);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request to Netlify Graph timed out"));
    });

    req.write(reqBody);
    req.end();
  });
};

const fetchNetlifyGraph = async function fetchNetlifyGraph(input) {
  const query = input.query;
  const operationName = input.operationName;
  const variables = input.variables;

  const options = input.options || {};
  const accessToken = options.accessToken;
  const siteId = options.siteId || process.env.SITE_ID;

  const payload = {
    query: query,
    variables: variables,
    operationName: operationName,
  };

  const result = await httpFetch(siteId, {
    method: "POST",
    headers: {
      Authorization: accessToken ? "Bearer " + accessToken : "",
    },
    body: JSON.stringify(payload),
  });

  return JSON.parse(result);
};

exports.verifyRequestSignature = (request, options) => {
  const event = request.event;
  const secret =
    options.webhookSecret || process.env.NETLIFY_GRAPH_WEBHOOK_SECRET;
  const signature = event.headers["x-netlify-graph-signature"];
  const body = event.body;

  if (!secret) {
    console.error(
      "NETLIFY_GRAPH_WEBHOOK_SECRET is not set, cannot verify incoming webhook request"
    );
    return false;
  }

  return verifySignature({ secret, signature, body: body || "" });
};

exports.fetchGithubStarredReposQuery = (variables, options) => {
  return fetchNetlifyGraph({
    query: operationsDoc,
    operationName: "GithubStarredReposQuery",
    variables: variables,
    options: options || {},
  });
};

exports.fetchSpotifyArtistCoverQuery = (variables, options) => {
  return fetchNetlifyGraph({
    query: operationsDoc,
    operationName: "SpotifyArtistCoverQuery",
    variables: variables,
    options: options || {},
  });
};

exports.fetchSpotifySavedTracksQuery = (variables, options) => {
  return fetchNetlifyGraph({
    query: operationsDoc,
    operationName: "SpotifySavedTracksQuery",
    variables: variables,
    options: options || {},
  });
};

/**
 * The generated NetlifyGraph library with your operations
 */
const functions = {
  /**
   * An empty query to start from
   */
  fetchGithubStarredReposQuery: exports.fetchGithubStarredReposQuery,
  /**
   * Query to get cover image for an artist
   */
  fetchSpotifyArtistCoverQuery: exports.fetchSpotifyArtistCoverQuery,
  /**
   * Query saved tracks from Spotify
   */
  fetchSpotifySavedTracksQuery: exports.fetchSpotifySavedTracksQuery,
};

exports.default = functions;

exports.handler = () => {
  // return a 401 json response
  return {
    statusCode: 401,
    body: JSON.stringify({
      message: "Unauthorized",
    }),
  };
};
