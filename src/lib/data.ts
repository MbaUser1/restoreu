import { PrismaClient, Declaration } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<Declaration[]> {
  // Assurez-vous que la fonction retourne un tableau de Déclarations
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await prisma.declaration.findMany({
      where: {
        OR: [
          { categorie: { mode: "insensitive" } },
          { arrondissement: { mode: "insensitive" } },
          { lieu_de_depot: { mode: "insensitive" } },
          { num_piece: { mode: "insensitive" } },
          { cni: { mode: "insensitive" } },
        ],
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
      orderBy: { date: "desc" },
      include: {
        user: true,
        Piece: true,
      },
    });

    return invoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
