export default async function handler(req, res) {
  const apiKey = process.env.API_FOOTBALL_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: "API_FOOTBALL_KEY is missing in Vercel."
    });
  }

  const endpoint = req.query.endpoint;

  const allowedEndpoints = [
    "fixtures",
    "standings",
    "leagues",
    "teams",
    "players",
    "countries"
  ];

  if (!endpoint) {
    return res.status(400).json({
      success: false,
      error: "No football API endpoint was specified."
    });
  }

  if (!allowedEndpoints.includes(endpoint)) {
    return res.status(400).json({
      success: false,
      error: "This football API endpoint is not allowed."
    });
  }

  const params = new URLSearchParams();

  Object.keys(req.query).forEach((key) => {
    if (key !== "endpoint") {
      const value = req.query[key];

      if (typeof value === "string") {
        params.append(key, value);
      }
    }
  });

  const apiUrl =
    `https://v3.football.api-sports.io/${endpoint}` +
    (params.toString()
      ? `?${params.toString()}`
      : "");

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey,
        "Accept": "application/json"
      }
    });

    const data = await response.json();

    return res.status(response.status).json(data);

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: "Server could not connect to API-Football.",
      details: error.message
    });

  }
}
