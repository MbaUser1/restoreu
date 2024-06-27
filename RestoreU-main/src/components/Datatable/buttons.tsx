"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPencil,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export function CreateInvoice() {
  return (
    <Link
      href=""
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Ajouter une piece</span>{" "}
      <FontAwesomeIcon icon={faPlus} className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href="/dashboard/invoices"
      className="hover:bg-gray-100 rounded-md border p-2"
    >
      <FontAwesomeIcon icon={faPencil} className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <>
      <button className="hover:bg-gray-100 rounded-md border p-2">
        <span className="sr-only">Delete</span>
        <FontAwesomeIcon icon={faTrash} className="w-5" />
      </button>
    </>
  );
}
export function SeeAll({ id }: { id: string }) {
  return (
    <>
      <button
        className="hover:bg-gray-100 rounded-md border p-2"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        <span className="sr-only">Delete</span>
        <FontAwesomeIcon icon={faEye} className="w-5" />
      </button>
    </>
  );
}
