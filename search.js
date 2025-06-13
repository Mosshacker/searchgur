export default {
  async fetch(request) {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('keyword');

    if (!keyword) {
      return new Response('Please provide a "keyword" query parameter.', { status: 400 });
    }

    const rawUrl = 'https://paste.ee/r/a4NQFoHN/0'; // your raw file URL here
    const res = await fetch(rawUrl);
    if (!res.ok) {
      return new Response('Failed to fetch source data.', { status: 502 });
    }

    const text = await res.text();
    const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

    const found = lines.find(line => line.toLowerCase().includes(keyword.toLowerCase()));

    if (!found) {
      return new Response(`No matching lines found for "${keyword}".`, { status: 404 });
    }

    return new Response(found, {
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
    });
  }
}
