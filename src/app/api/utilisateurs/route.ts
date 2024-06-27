import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    //extract the credentials
    const { nom, email, image, telephone, mot_de_passe, role, numero_cni } =
      await request.json();
    //Check if the user Already exists in the db
    const existingUser = await db.utilisateur.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User with this email ( ${email})  already exists in the Database`,
        },
        { status: 409 },
      );
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await db.utilisateur.create({
      data: {
        nom,
        email,
        image,
        telephone,
        motDePasseHache: hashedPassword,
        role,
        numero_cni,
      },
    });
    console.log(newUser);
    return NextResponse.json(
      {
        data: newUser,
        message: "Utilisateur créé avec succès",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 },
    );
  }
}
export async function GET(request: any) {
  try {
    const users = await db.utilisateur.findMany({
      orderBy: {
        dateCreation: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to Fetch Users",
        error,
      },
      { status: 500 },
    );
  }
}

export async function GETU(request: any) {
  try {
    const { id } = request.query; // Récupère l'identifiant de l'utilisateur depuis les paramètres de la requête

    const user = await db.utilisateur.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      // Si aucun utilisateur correspondant n'est trouvé, renvoie une erreur 404
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to fetch user",
        error,
      },
      { status: 500 },
    );
  }
}
