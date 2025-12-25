// src/index.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. จัดการ CORS preflight (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://devnid.xyz",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    try {
      // 2. โหมด Contact Form
      if (path === "/contact" && request.method === "POST") {
        const body = await request.json();
        const formData = body.formData;

        if (!formData || typeof formData !== "object") {
          return new Response(JSON.stringify({ error: "Invalid formData" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const message = `🔔 ติดต่องานใหม่!
👤 ชื่อ: ${formData.name || "(ไม่ระบุ)"}
📱 Line ID: ${formData.lineId || "(ไม่ระบุ)"}
🏗️ ประเภทงาน: ${formData.projectType || "(ไม่ระบุ)"}
📝 รายละเอียด: ${formData.details?.substring(0, 3500) || "(ไม่ระบุ)"}
🌐 มาจากเว็บไซต์: ${env.SITE_URL || "Portfolio"}
⏰ เวลา: ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}`;

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_CONTACT_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: env.TELEGRAM_CHAT_CHAT_ID,
              text: message.trim(),
              disable_web_page_preview: true,
            }),
          }
        );

        const result = await telegramRes.json();
        return new Response(JSON.stringify(result), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://devnid.xyz",
          },
        });
      }

      // 3. โหมด Chat (ส่งข้อความจากแชทสด)
      if (path === "/chat" && request.method === "POST") {
        const body = await request.json();
        const { message: userMessage, sessionId } = body;

        if (!userMessage || typeof userMessage !== "string") {
          return new Response(JSON.stringify({ error: "Invalid message" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const telegramMessage = `🔔 แชทสดจากเว็บไซต์
━━━━━━━━━━━━━━━━━━━━
👤 ผู้ใช้: Anonymous User
📱 Session: ${sessionId || "unknown"}
💬 ข้อความ: ${userMessage}
⏰ เวลา: ${new Date().toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}
🌐 ที่มา: Portfolio Website Chat
━━━━━━━━━━━━━━━━━━━━

📞 ตอบกลับในแชทนี้เพื่อสื่อสารกับผู้ใช้โดยตรง`;

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_CHAT_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: env.TELEGRAM_CHAT_CHAT_ID,
              text: telegramMessage.trim(),
            }),
          }
        );

        const result = await telegramRes.json();
        return new Response(JSON.stringify(result), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://devnid.xyz",
          },
        });
      }

      // 4. โหมด Polling (ดึงข้อความตอบกลับจาก Telegram)
      if (path === "/poll" && request.method === "GET") {
        const offset = url.searchParams.get("offset") || "0";
        const timeout = url.searchParams.get("timeout") || "10";

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_CHAT_BOT_TOKEN}/getUpdates?offset=${offset}&timeout=${timeout}`,
          { method: "GET" }
        );

        const result = await telegramRes.json();
        return new Response(JSON.stringify(result), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "https://devnid.xyz",
          },
        });
      }

      // 5. Route ไม่รองรับ
      return new Response("Not found", { status: 404 });
    } catch (err) {
      // 6. จัดการ error ทั่วไป (ไม่เปิดเผย token)
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
};