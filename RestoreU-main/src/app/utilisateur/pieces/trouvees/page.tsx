//import Pagination from '@/app/ui/invoices/pagination';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Search from "@/components/Datatable/search";
import Modal from "@/components/Modal/Modal";

import Table from "@/components/Datatable/table";
import { CreateInvoice } from "@/components/Datatable/buttons";
// import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Breadcrumb pageName="Trouvées" />
      <div className="w-full">
        <div className="flex w-full items-center justify-between"></div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Rechercher une piece..." />
          <CreateInvoice />
        </div>

          <Table query={query} currentPage={currentPage} />

        <div className="mt-5 flex w-full justify-center">
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
        <Modal />
      </div>
    </>
  );
}
