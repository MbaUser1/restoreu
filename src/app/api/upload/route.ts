import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { PrismaClient, TypeDeclaration } from "@prisma/client";
//import type { PutBlobResult } from "@vercel/blob";
const prisma = new PrismaClient();
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  const userid = searchParams.get("userid");
  const categ = searchParams.get("categ");
  const date = searchParams.get("date");
  const arrond = searchParams.get("arrond");
  const Npiece = searchParams.get("Npiece");
  const cni = searchParams.get("cni");
  const lieu = searchParams.get("lieu");

  const blob = await put(filename, request.body, {
    access: "public",
  });

  //   const [blob2, setBlob] = useState<PutBlobResult | null>(null);
  //   const newBlob = await response.json();
  // setBlob(newBlob);
  if (blob) {
    console.log(userid, categ, date, arrond, Npiece, cni, blob.url);
    const type = "trouve";
    try {
      const newDeclaration = await prisma.Declaration.create({
        data: {
          type: type as TypeDeclaration,
          categorie: categ,
          date: new Date(date),
          arrondissement: arrond,
          lieu_de_depot: lieu,
          num_piece: Npiece,
          photo: blob.url,
          cni: Npiece,
          userID: userid,
        },
      });
      return NextResponse.json(
        {
          data: blob,
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
  } else {
    console.error("Erreur lors de l'ajout de la photo");
    return NextResponse.json(
      {
        data: null,
        message: "Erreur lors de l'ajout de la photo",
      },
      { status: 500 },
    );
  }
}
