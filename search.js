export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword");

    if (!keyword) {
      return new Response(
        JSON.stringify({ textResponse: "Please provide a keyword using ?keyword=yourword" }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const lines = [
      "The Lord is my shepherd.",
      "Truth is high, but higher still is truthful living.",
      "Even kings and emperors with heaps of wealth and vast dominion cannot compare with an ant filled with love."
    ];

    const matched = lines.find((line) =>
      line.toLowerCase().includes(keyword.toLowerCase())
    );

    const chosenLine = matched || lines[Math.floor(Math.random() * lines.length)];

    return new Response(
      JSON.stringify({ textResponse: chosenLine }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
};
