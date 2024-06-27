"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const options = [
  { value: "acte de naissance", label: "Acte de naissance" },
  { value: "cni", label: "CNI" },
  { value: "recepisé", label: "Recepisé" },
  { value: "permis de conduire a", label: "Permis A" },
  { value: "permis de conduire B", label: "Permis B" },
  { value: "autres", label: "Autres" },
];
const options2 = [
  { value: "mifi", label: "Mifi" },
  { value: "haut-plateau", label: "Haut-plateau" },
  { value: "nde", label: "NDE" },
  { value: "bamboutos", label: "Bamboutos" },
  { value: "nkoung-nki", label: "Nkoung-nki" },
  { value: "autres", label: "Autres" },
];
const Circonstances = [
  { value: "", label: "Veuillez selectionner" },
  { value: "Agression", label: "Agression" },
  { value: "Neglicence", label: "Neglicence" },
  { value: "Accidents", label: "Accidents" },
  { value: "RAS", label: "RAS" },
  { value: "autres", label: "Autres" },
];

interface Donnees {
  type: "";
  categorie: "";
  date: "";
  arrondissement: "";
  circonstance: "";
  photo: "";
  num_piece: "";
  cni: "";
  userID: "";
}

const FormLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Donnees>();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  //recuperation de l'id de l'utilisateur
  const userID = session?.user?.id;
  const router = useRouter();

  async function onSubmit(data: Donnees) {
    try {
      setLoading(true);
      const response = await fetch("/api/declarations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("Déclaration créée avec succès");
        reset();

        router.push("/pieces/egarees");
      } else {
        setLoading(false);
        toast.error(
          responseData.message || "Oups, quelque chose s'est mal passé",
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  }

  return (
    <div className="mt-auto">
      <Breadcrumb pageName="Signaler" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              <Link href="egaree">
                <button className="btn mr-2 rounded bg-danger px-4 py-2 text-white">
                  Egarée
                </button>
              </Link>
              <Link href="trouvee">
                <button className="btn ml-2 rounded bg-success px-4 py-2 text-white">
                  Trouvée
                </button>
              </Link>
            </h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6.5">
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Categorie <span className="text-meta-1">*</span>
                  </label>
                  <select
                    {...register("categorie", {
                      required: "Ce champ est obligatoire",
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.categorie && (
                    <small className="text-sm text-rose-600">
                      {errors.categorie.message}
                    </small>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Numéro de pièce
                  </label>
                  <input
                    {...register("num_piece", {
                      required: "Ce champ est obligatoire",
                    })}
                    type="text" // Treat as string
                    placeholder="Entrez l'id de pièce"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.num_piece && (
                    <small className="text-sm text-rose-600">
                      {errors.num_piece.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Où ?? <span className="text-meta-1">*</span>
                  </label>
                  <select
                    {...register("arrondissement", {
                      required: "Ce champ est obligatoire",
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {options2.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.arrondissement && (
                    <small className="text-sm text-rose-600">
                      {errors.arrondissement.message}
                    </small>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Quand ?? <span className="text-meta-1">*</span>
                  </label>
                  <input
                    {...register("date", {
                      required: "Ce champ est obligatoire",
                    })}
                    type="date"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.date && (
                    <small className="text-sm text-rose-600">
                      {errors.date.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <div className="xl:w-2/2 w-full">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Circonstances <span className="text-meta-1">*</span>
                  </label>
                  <select
                    {...register("circonstance", {
                      required: "Ce champ est obligatoire",
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    {Circonstances.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.circonstance && (
                    <small className="text-sm text-rose-600">
                      {errors.circonstance.message}
                    </small>
                  )}

                  {/* <div className="mb-6"></div> */}
                </div>
              </div>
              <div className="w-full xl:w-1/2">
                <input
                  {...register("userID", {
                    required: "Ce champ est obligatoire",
                  })}
                  value={userID}
                  type="hidden"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <input
                  {...register("type", {
                    required: "Ce champ est obligatoire",
                  })}
                  value="egare"
                  type="hidden"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              {loading ? (
                <div className="mb-5">
                  <input
                    type="submit"
                    value="...Patientez un instant"
                    className="mt-8 w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              ) : (
                <input
                  className="mt-8 flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                  type="submit"
                  value="Enregistrer"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;