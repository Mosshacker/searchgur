export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get("keyword");

    if (!keyword) {
      return new Response(
        JSON.stringify({ textResponse: "Please provide a keyword using ?keyword=yourword" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const response = await fetch(`https://api.gurbaninow.com/v2/shabads/search/${encodeURIComponent(keyword)}`);
      const data = await response.json();

      // Check if there are results
      if (!data || !data.shabads || data.shabads.length === 0) {
        return new Response(
          JSON.stringify({ textResponse: `No results found for "${keyword}".` }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // Pick a random line from the first matching shabad
      const shabad = data.shabads[0];
      const randomLineIndex = Math.floor(Math.random() * shabad.lines.length);
      const line = shabad.lines[randomLineIndex];

      // Return the line text (assuming 'line.gurmukhi' or similar)
      return new Response(
        JSON.stringify({ textResponse: line.gurmukhi || line.line || "No text found." }),
        { headers: { "Content-Type": "application/json" } }
      );

    } catch (err) {
      return new Response(
        JSON.stringify({ textResponse: "An error occurred while fetching data." }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
