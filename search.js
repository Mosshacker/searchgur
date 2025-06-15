export default {
  async fetch(request) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword');

    if (!keyword) {
      return new Response('Please provide a "keyword" query parameter.', { status: 400 });
    }

    const rawUrl = 'https://paste.ee/r/a4NQFoHN/0'; // replace if needed
    const res = await fetch(rawUrl);
    if (!res.ok) {
      return new Response('Failed to fetch source data.', { status: 502 });
    }

    const text = await res.text();
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && line.toLowerCase().includes(keyword.toLowerCase()));

    if (lines.length === 0) {
      return new Response(`No matching lines found for "${keyword}".`, { status: 404 });
    }

    const randomLine = lines[Math.floor(Math.random() * lines.length)];

    return new Response(randomLine, {
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    });
  }
}
