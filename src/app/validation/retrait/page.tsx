"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Search from "@/components/Datatable/search";

import Table from "@/components/Datatable/validation_retrait";
import { Create } from "@/components/Datatable/buttons";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const fields = [
  { key: "#", label: "#" },
  { key: "photo", label: "Photos", isImage: true },
  { key: "num_piece", label: "N° piece" },
  { key: "categorie", label: "Categorie" },
  { key: "date", label: "Date" },
  { key: "cni", label: "Trouveurs" },
  { key: "id", label: "N° confirmation" },
];

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/validation/depot?Pid=${session?.user?.point_depot}&type=trouve&deposer=o`,
        );
        const data = await response.json();
        if (data.success) {
          setInvoices(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Breadcrumb pageName="Retrait" />
      <div className="w-full">
        <div className="flex w-full items-center justify-between"></div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Recherchez un depôt à valider ..." />
          <Create label="Ajouter" href="#" />
        </div>

        <Table items={invoices} fields={fields} />

        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
      </div>
    </>
  );
}
