import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    console.log("POST request received");

    const {
      type,
      categorie,
      date,
      arrondissement,
      lieu_de_depot,
      circonstance,
      num_piece,
      cni,
      userID,
    } = await request.json();

    // Assurez-vous de gérer les IDs utilisateur correctement

    const newDeclaration = await prisma.Declaration.create({
      data: {
        type: type as TypeDeclaration,
        categorie,
        date: new Date(date),
        arrondissement,
        circonstance,
        lieu_de_depot,
        num_piece,
        cni,
        userID,
      },
    });

    return NextResponse.json(
      {
        data: newDeclaration,
        message: "Déclaration ajoutée avec succès",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur lors de l'ajout de déclaration:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de l'ajout de déclaration essayer encore",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const Uid = searchParams.get("Uid");
  const type = searchParams.get("type");
  if (!Uid || !type) {
    return NextResponse.json(
      {
        message: "UID or type are required and must be a string",
      },
      { status: 400 },
    );
  }
  try {
    const declarations = await prisma.declaration.findMany({
      where: { type: type, userID: Uid },
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

export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      categorie,
      date,
      arrondissement,
      lieu_de_depot,
      photo,
      num_piece,
      cni,
      userID,
    } = await request.json();

    const updatedDeclaration = await prisma.declaration.update({
      where: { id: String(id) },
      data: {
        categorie,
        date: new Date(date),
        arrondissement,
        lieu_de_depot,
        photo,
        num_piece,
        cni,
        userID,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: updatedDeclaration,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la déclaration:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la mise à jour de la déclaration",
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