"use client";
import { useState } from "react";
import Image from "next/image";
import {
  faPlus,
  faCheck,
  faPencil,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InvoiceStatus from "@/components/Datatable/status";
import {
  formatDateToLocal,
  formatCurrency,
} from "@/components/Datatable/utils";
import Modal from "@/components/Modal/Modal";
import Modal_valider from "@/components/Modal/Modal_valider";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DataTable({
  items,
  fields,
}: {
  items: any[];
  fields: {
    key: string;
    label: string;
    isImage?: boolean;
    isStatus?: boolean;
    isCurrency?: boolean;
    isDate?: boolean;
  }[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  // fonction de validation
  const handleValidate = async (id: string) => {
    try {
      const response = await fetch(`/api/validation/depot?id=${id}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la validation de la déclaration");
      }

      toast.success("Validé avec succès");
      setSelectedId(null); // Réinitialiser selectedId après la validation
      router.push("/validation/retrait");
    } catch (error) {
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  };

  return (
    <div className="mt-6 flow-root">
      <Modal />
      <Modal_valider id={selectedId} onValidate={handleValidate} />
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50 rounded-lg p-2 md:pt-0">
          <div className="md:hidden">
            {items?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {fields.map((field) =>
                        field.isImage ? (
                          <Image
                            key={field.key}
                            src={item[field.key]}
                            className="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${item.name}'s profile picture`}
                          />
                        ) : (
                          <p key={field.key}>{item[field.key]}</p>
                        ),
                      )}
                    </div>
                  </div>
                  {fields.map((field) =>
                    field.isStatus ? (
                      <InvoiceStatus key={field.key} status={item[field.key]} />
                    ) : null,
                  )}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {fields.map((field) =>
                      field.isCurrency ? (
                        <p key={field.key} className="text-xl font-medium">
                          {formatCurrency(item[field.key])}
                        </p>
                      ) : field.isDate ? (
                        <p key={field.key}>
                          {formatDateToLocal(item[field.key])}
                        </p>
                      ) : null,
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    {/* <SeeAll id={item.id} /> */}
                    <button
                      className="hover:bg-gray-100 rounded-md border p-2"
                      onClick={() => {
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      <span className="sr-only">View</span>
                      <FontAwesomeIcon icon={faEye} className="w-5" />
                    </button>
                    {/* <Update id={item.id} /> */}
                    <Link
                      href="/dashboard/invoices"
                      className="hover:bg-gray-100 rounded-md border p-2"
                    >
                      <FontAwesomeIcon icon={faPencil} className="w-5" />
                    </Link>
                    {/* <Delete id={item.id} /> */}
                    <button
                      className="hover:bg-gray-100 rounded-md border p-2"
                      onClick={() => {
                        setSelectedId(item.id);
                        document.getElementById("modal_valider").showModal();
                      }}
                    >
                      <span className="sr-only">Valider</span>
                      <FontAwesomeIcon icon={faCheck} className="w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="text-gray-900 hidden min-w-full md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {fields.map((field) => (
                  <th
                    key={field.key}
                    scope="col"
                    className="px-4 py-5 font-medium sm:pl-6"
                  >
                    {field.label}
                  </th>
                ))}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  {fields.map((field) => (
                    <td
                      key={field.key}
                      className="whitespace-nowrap py-3 pl-6 pr-3"
                    >
                      {field.isImage ? (
                        <div className="flex items-center gap-3">
                          <Image
                            src={item[field.key]}
                            className="rounded-full"
                            width={28}
                            height={28}
                            alt={`${item.name}'s profile picture`}
                          />
                          <p>{item.name}</p>
                        </div>
                      ) : field.isStatus ? (
                        <InvoiceStatus status={item[field.key]} />
                      ) : field.isCurrency ? (
                        formatCurrency(item[field.key])
                      ) : field.isDate ? (
                        formatDateToLocal(item[field.key])
                      ) : (
                        item[field.key]
                      )}
                    </td>
                  ))}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {/* <SeeAll id={item.id} /> */}
                      <button
                        className="hover:bg-gray-100 rounded-md border p-2"
                        onClick={() => {
                          document.getElementById("my_modal_2").showModal();
                        }}
                      >
                        <span className="sr-only">View</span>
                        <FontAwesomeIcon icon={faEye} className="w-5" />
                      </button>
                      {/* <Update id={item.id} /> */}
                      <Link
                        href="/dashboard/invoices"
                        className="hover:bg-gray-100 rounded-md border p-2"
                      >
                        <FontAwesomeIcon icon={faPencil} className="w-5" />
                      </Link>
                      {/* <Delete id={item.id} /> */}
                      <button
                        className="hover:bg-gray-100 rounded-md border p-2"
                        onClick={() => {
                          setSelectedId(item.id);
                          document.getElementById("modal_valider").showModal();
                        }}
                      >
                        <span className="sr-only">Valider</span>
                        <FontAwesomeIcon icon={faCheck} className="w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
