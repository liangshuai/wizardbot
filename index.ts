import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function addCorsIfNeeded(response: Response) {
    const headers = new Headers(response.headers);
  
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    headers.set('Access-Control-Allow-Credentials', 'true');
    return headers;
}

async function handler(req) {
    const corsHeaders = addCorsIfNeeded(new Response());
    if (req.method.toUpperCase() === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

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

  const res = await fetch(request);
  const headers = addCorsIfNeeded(res);
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

serve(handler);