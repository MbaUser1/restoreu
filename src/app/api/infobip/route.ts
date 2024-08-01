// src/app/api/infobip/route.ts

import { NextRequest, NextResponse } from "next/server";
import https from "follow-redirects/https";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { message, phoneNumber, name, numberPoint } = await req.json();
  const phoneNumber1 = `237${phoneNumber}`;
  // Set the request options for Infobip API
  const options = {
    method: "POST",
    hostname: "dkv3qv.api.infobip.com",
    path: "/sms/2/text/advanced",
    headers: {
      Authorization:
        "App 235705488a7a9a2fd30170289b9bb4c2-89f5d269-5900-4e18-b52d-f6458ce275b0",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    maxRedirects: 20,
  };

  return new Promise((resolve) => {
    // Create the request
    const infobipReq = https.request(options, function (infobipRes) {
      let chunks: any[] = [];

      infobipRes.on("data", function (chunk) {
        chunks.push(chunk);
      });

      infobipRes.on("end", function () {
        const body = Buffer.concat(chunks).toString();
        console.log(body);
        resolve(NextResponse.json({ response: body }));
      });

      infobipRes.on("error", function (error) {
        console.error(error);
        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
      });
    });

    // Define the SMS message details
    const postData = JSON.stringify({
      messages: [
        {
          destinations: [{ to: phoneNumber1 }],
          from: "ServiceSMS",
          text: `Bonjour M/Mme ${message},Votre Document a été retouvé et est situé au lieu de depôt :${name}\n Nous vous invitons à vous rendre sur place dans les plus brefs délais pour récupérer votre document.\n Contactez le ${numberPoint} pour plus d'informations`,
        },
      ],
    });

    // Write the data and end the request
    infobipReq.write(postData);
    infobipReq.end();
  });
}
