export default {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return new Response(JSON.stringify({ error: "Missing ?q= prompt" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://paste.ee/r/a4NQFoHN/0");
    const text = await res.text();
    const lines = text.split("\n").filter(line => line.trim());

    const scored = lines.map(line => {
      const score = query
        .toLowerCase()
        .split(/\s+/)
        .filter(word => line.toLowerCase().includes(word)).length;
      return { line, score };
    });

    const best = scored.sort((a, b) => b.score - a.score)[0];

    return new Response(
      JSON.stringify({
        textResponse: best?.score > 0
          ? best.line
          : "No matching Gurbani line found.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
