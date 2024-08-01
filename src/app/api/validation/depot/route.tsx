import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";

const prisma = new PrismaClient();
//Fonction de validattion d'un depot
export async function POST(request: NextRequest) {
  try {
    console.log("POST request received");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          data: null,
          message: "ID de la déclaration manquant",
        },
        { status: 400 },
      );
    }

    const deposer = "o";

    // Mettre à jour la déclaration
    const newDeclaration = await prisma.declaration.update({
      where: { id: String(id) },
      data: {
        deposer,
      },
    });

    // Récupération de la pièce correspondante
    console.log(newDeclaration.PieceID);
    console.log("fffffff");
    const document1 = await prisma.piece.findUnique({
      where: { id: String(newDeclaration.PieceID) },
    });

    if (!document1) {
      return NextResponse.json(
        {
          data: null,
          message: "Document non trouvé",
        },
        { status: 404 },
      );
    }

    // Rechercher si la pièce a été déclarée perdue
    const document2 = await prisma.piece.findMany({
      where: {
        num_piece: document1.num_piece,
        // nom: document1.nom,
        // prenom: document1.prenom,
        // nee_le: document1.nee_le,
        // lieu: document1.lieu,
        status: "p",
      },
    });
    const document8 = await prisma.piece.findMany({
      where: {
        //num_piece: document1.num_piece,
        nom: document1.nom,
        prenom: document1.prenom,
        nee_le: document1.nee_le,
        lieu: document1.lieu,
        status: "p",
      },
    });

    if (document2.length > 0 || document8.length > 0) {
      //modification du statut de la piece en t
      // const documentUpdate = await prisma.piece.update({
      //   where: {
      //     id: document2[0].id,
      //   },
      //   data: { status: "t" },
      // });

      // Rechercher la déclaration correspondante
      const declarationT = await prisma.declaration.findMany({
        where: { PieceID: document2[0].id },
      });

      //modification du statut de la déclaration
      const declarationUpdate = await prisma.declaration.update({
        where: { id: declarationT[0].id },
        data: { type: "trouve", deposer: "o" },
      });

      if (declarationT.length > 0) {
        // Rechercher l'utilisateur correspondant
        const utilisateur = await prisma.utilisateur.findUnique({
          where: { id: declarationT[0].userID },
        });
        //verification si l'utilisateur est en premium

        //Recuperation du lieu de depot
        if (utilisateur) {
          const point = await prisma.Lieu_depot.findUnique({
            where: { id: newDeclaration.lieu_de_depot },
          });
          // Envoi du message de notification
          const response = await fetch(
            `${request.nextUrl.origin}/api/infobip`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: utilisateur.nom,
                phoneNumber: utilisateur.telephone,
                name: point.nom,
                numberPoint: "+237 654468855", // Numéro du point de dépôt à gérer
              }),
            },
          );

          const data = await response.json();
          console.log("Notification response:", data);
          return NextResponse.json(
            {
              message:
                "Une notification a éte envoyée au proprietaire de la carte ",
            },
            { status: 201 },
          );
        }
      }
    }
    return NextResponse.json(
      {
        message: "Validation effectuée avec succès",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur lors de la validation:", error);
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de la validation, veuillez réessayer",
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

//Fonction de validattion d'un retrait
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
