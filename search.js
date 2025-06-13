export default {
  async fetch(request) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword");

    if (!keyword) {
      return new Response(JSON.stringify({
        textResponse: "Please provide a keyword using ?keyword=yourword"
      }), {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    }

    const res = await fetch("https://paste.ee/r/a4NQFoHN/0");
    const text = await res.text();
    const lines = text.split("\n").map(line => line.trim()).filter(Boolean);

    const matches = lines.filter(line =>
      line.toLowerCase().includes(keyword.toLowerCase())
    );

    const output = matches.length > 0
      ? matches[Math.floor(Math.random() * matches.length)]
      : "No matching line found for that keyword.";

    return new Response(
      JSON.stringify({ textResponse: String(output) }), // Ensures string
      {
        headers: { "Content-Type": "application/json" },
        status: 200
      }
    );
  }
}
