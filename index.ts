import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req) {
    const body = await req.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(body);
    let json;
    try {
      json = JSON.parse(text);
    } catch (_) {
      return new Response("No body found", { status: 400 });
    }
  const request = new Request("https://chatgpt-deno.vercel.app/api/ask", {
    method: "POST",
    body: JSON.stringify({
      question: json.question,
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  console.log(request.method); // POST
  console.log(request.headers.get("content-type")); // application/json

  return fetch(request);
}

serve(handler);