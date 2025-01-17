"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Search from "@/components/Datatable/search";
import Modal from "@/components/Modal/Modal";
import Modal_valider from "@/components/Modal/Modal_valider";
import Table from "@/components/Datatable/validation_table";
import { Create } from "@/components/Datatable/buttons";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const fields = [
  { key: "#", label: "#" },
  { key: "photo", label: "Photos", isImage: true },
  { key: "num_piece", label: "Numeros document" },
  { key: "date", label: "Date", isDate: true },
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
          `/api/validation/depot?Pid=${session?.user?.point_depot}&type=trouve&deposer=n`,
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
  }, [query, currentPage, session?.user?.point_depot]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Breadcrumb pageName="Dépôts" />
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
