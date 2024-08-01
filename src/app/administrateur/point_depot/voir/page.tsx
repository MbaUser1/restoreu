"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Search from "@/components/Datatable/search";
import Modal from "@/components/Modal/Modal";
import Table from "@/components/Datatable/table";
import { Create } from "@/components/Datatable/buttons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const fields = [
  { key: "nom", label: "Nom" },
  { key: "arrondissement", label: "Arrondissement" },
  { key: "institution", label: "Institution" },
  { key: "telephone", label: "Téléphone" },
  { key: "longitude", label: "Longitude" },
  { key: "lagitude", label: "Latitude" },
];

export default function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/lieu_depot");
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

  if (status === "authenticated") {
    const nom = session.user?.id;

    return (
      <>
        <Breadcrumb pageName="Points de dépôts" />
        <div className="w-full">
          <div className="flex w-full items-center justify-between"></div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Rechercher un point..." />
            <Create label="Ajouter" href="ajout" />
          </div>

          <Table items={invoices} fields={fields} />

          <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
          </div>
          <Modal />
        </div>
      </>
    );
  } else {
    router.push("/");
  }
}
