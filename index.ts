import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function handler(req) {
  // Create a post request
  const request = new Request("https://chatgpt-deno.vercel.app/api/ask", {
    method: "POST",
    body: JSON.stringify({
      question: req.body.question || req.query.question,
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