import type { Context } from "https://portfolio-6881e.firebaseapp.com/";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith("/api/")) {
    return await handleAPI(request, context);
  }

  // Handle contact form submissions
  if (url.pathname === "/api/contact" && request.method === "POST") {
    return await handleContactForm(request, context);
  }

  // Default response
  return context.next();
};

async function handleAPI(request: Request, context: Context) {
  // API logic here
  return new Response(JSON.stringify({ message: "API endpoint" }), {
    headers: { "Content-Type": "application/json" },
  });
}

async function handleContactForm(request: Request, context: Context) {
  try {
    const body = await request.json();

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${Deno.env.get(
        "TELEGRAM_BOT_TOKEN"
      )}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: Deno.env.get("TELEGRAM_CHAT_ID"),
          text: `New contact form submission:\n\nName: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
        }),
      }
    );

    if (telegramResponse.ok) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      throw new Error("Failed to send to Telegram");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to process form" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = {
  path: ["/api/*", "/contact"],
};
