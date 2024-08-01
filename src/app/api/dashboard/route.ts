import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

//Declaration egareé
export async function POST(request: NextRequest) {
  try {
    const count = await db.declaration.count({
      where: { type: "egare" },
    });
    return NextResponse.json({
      success: true,
      data: {
        count: count,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categorie",
        error: "error.message",
      },
      { status: 500 },
    );
  }
}
//Declaration Trouvée
export async function PUT(request: NextRequest) {
  try {
    const count = await db.declaration.count({
      where: { type: "trouve" },
    });
    return NextResponse.json({
      success: true,
      data: {
        count: count,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categorie",
        error: "error.message",
      },
      { status: 500 },
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    // Compter le nombre d'utilisateurs
    const count = await db.utilisateur.count();

    return NextResponse.json({
      success: true,
      data: {
        userCount: count,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user count",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
