import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

const authHeader =
  "App edb577e05c3871184cbe46fc1f0e6a31-f5963932-e653-44f1-b758-ff688c340baf";

export async function POST(req: NextRequest) {
  try {
    const postData = {
      name: "2fa test application",
      enabled: true,
      configuration: {
        pinAttempts: 10,
        allowMultiplePinVerifications: true,
        pinTimeToLive: "15m",
        verifyPinLimit: "1/3s",
        sendPinPerApplicationLimit: "100/1d",
        sendPinPerPhoneNumberLimit: "10/1d",
      },
    };

    const response = await fetch(
      "https://k28ky1.api.infobip.com/2fa/2/applications",
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: "Request failed", error: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
