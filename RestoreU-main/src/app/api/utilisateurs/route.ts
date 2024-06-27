// import { NextApiRequest, NextApiResponse } from "next";
// import db from "@/lib/db";
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";

// interface User {
//   nom: string;
//   email: string;
//   telephone: number;
//   mot_de_passe: string;
//   role: string;
// }

// export default async function handler(
//   request: NextApiRequest,
//   response: NextApiResponse
// ) {
//   if (request.method === "POST") {
//     try {
//       const { nom, email, telephone, role }: User = await request.body;

//       const existingUser = await db.utilisateur.findUnique({
//         where: {
//           email,
//         },
//       });

//       if (existingUser) {
//         return response.status(409).json({
//           data: null,
//           message: `User with this email (${email}) already exists in the Database`,
//         });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = await db.utilisateur.create({
//         data: {
//           name,
//           email,
//           password,
//           hashedPassword,
//           role,
//         },
//       });

//       console.log(newUser);

//       return response.status(201).json({
//         data: newUser,
//         message: "User Created Successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       return response.status(500).json({
//         error,
//         message: "Server Error: Something went wrong",
//       });
//     }
//   } else if (request.method === "GET") {
//     try {
//       const users = await db.utilisateur.findMany({
//         orderBy: {
//           dateCreation: "desc",
//         },
//       });

//       return response.json(users);
//     } catch (error) {
//       console.log(error);
//       return response.status(500).json({
//         message: "Failed to Fetch Users",
//         error,
//       });
//     }
//   }
// }


import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    //extract the credentials
    const { nom, email,telephone, mot_de_passe, role } = await request.json();
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
        { status: 409 }
      );
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    const newUser = await db.utilisateur.create({
      data: {
        nom,
        email,
        telephone,
        motDePasseHache: hashedPassword,
        role,
      },
    });
    console.log(newUser);
    return NextResponse.json(
      {
        data: newUser,
        message: "Utilisateur créé avec succès",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something went wrong",
      },
      { status: 500 }
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
      { status: 500 }
    );
  }
}
