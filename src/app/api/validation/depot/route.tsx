import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";

const prisma = new PrismaClient();
//Fonction de validattion d'une declaration
export async function POST(request: Request) {
  try {
    console.log("POST request received");
    const { searchParams } = new URL(request.url);
    //id de la declaration
    const id = searchParams.get("id");
    const deposer = "o";

    // Assurez-vous de gérer les IDs utilisateur correctement

    const newDeclaration = await prisma.Declaration.update({
      where: { id: String(id) },
      data: {
        deposer,
      },
    });

    return NextResponse.json(
      {
        data: newDeclaration,
        message: "validation effectuéé avec succès",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur lors de la validation:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de la validation essayez encore",
      },
      { status: 500 },
    );
  }
}
// Fonction de recuperation de tous les declarations(trouvées) d'un lieu de depot
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  //id du point depot
  const Pid = searchParams.get("Pid");
  //type de declaration
  const type = searchParams.get("type");
  const Deposer = searchParams.get("deposer");
  if (!Pid || !type) {
    return NextResponse.json(
      {
        message: "UID or type are required and must be a string",
      },
      { status: 400 },
    );
  }
  try {
    const declarations = await prisma.declaration.findMany({
      where: { type: type, lieu_de_depot: Pid, deposer: Deposer },
    });

    return NextResponse.json(
      {
        success: true,
        data: declarations,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des déclarations:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur lors de la récupération des déclarations essayez encore",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "ID is required",
      },
      { status: 400 },
    );
  }
  try {
    await prisma.declaration.delete({
      where: { id: id },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 204 },
    );
  } catch (error) {
    console.error("Erreur lors de la suppression de la déclaration:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Erreur lors de la suppression de la déclaration 22222222222222222",
      },
      { status: 500 },
    );
  }
}

//Fonction de validattion d'une declaration
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    //id de la declaration
    const id = searchParams.get("id");
    const deposer = "r";

    // Assurez-vous de gérer les IDs utilisateur correctement
    const newDeclaration = await prisma.declaration.update({
      where: { id: String(id) },

      data: {
        deposer,
      },
    });

    return NextResponse.json(
      {
        data: newDeclaration,
        message: "validation effectuéé avec succès",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur lors de la validation:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de la validation essayez encore",
      },
      { status: 500 },
    );
  }
}
