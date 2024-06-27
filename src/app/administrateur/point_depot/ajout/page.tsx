"use client";
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { useForm, FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
// import { useRouter } from "next/router";

const options = [
  { value: "commissariat", label: "Commissariat" },
  { value: "Mairie", label: "Mairie" },
  { value: "poste de police", label: "Poste de police" },
  { value: "secretariat", label: "Secretariat" },
];
const arrond = [
  { value: "mifi", label: "Mifi" },
  { value: "haut-plateau", label: "Haut-plateau" },
  { value: "nde", label: "Nde" },
  { value: "bamboutos", label: "Bamboutos" },
];

interface ValeursPD {
  nom: string;
  arrondissement: string;
  institution: string;
  telephone: number;
  longitude: number;
  lagitude: number;
  email: string;
  tel: number;
  password: string;
}

const FormLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValeursPD>();

  // const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: ValeursPD) {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const response = await fetch(`${baseUrl}/api/point_depot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        setLoading(false);
        toast.success("Point de dépôt créé avec succès");
        reset();
        //router.push("/login");
      } else {
        setLoading(false);
        if (response.status === 409) {
          console.error("Server Error:", responseData.message);
          toast.error("Oups, quelque chose s'est mal passé");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      toast.error("Oups, quelque chose s'est mal passé, essayez encore");
    }
  }

  return (
    <>
      <div className="mt-auto">
        <Breadcrumb pageName="Point de dépôt" />
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Ajouter un point
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-6.5">
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Nom du lieu<span className="text-meta-1"> *</span>
                    </label>
                    <input
                      {...register("nom", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="text"
                      placeholder="Nom du lieu"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.nom && (
                      <small className="text-sm text-rose-600 ">
                        {errors.nom.message}
                      </small>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Arrondissement <span className="text-meta-1"> *</span>
                    </label>
                    <select
                      {...register("arrondissement", {
                        required: "Ce champ est obligatoire",
                      })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-8 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      {arrond.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.arrondissement && (
                      <small className="text-sm text-rose-600 ">
                        {errors.arrondissement.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      institution <span className="text-meta-1"> *</span>
                    </label>
                    <select
                      {...register("institution", {
                        required: "Ce champ est obligatoire",
                      })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-8 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.institution && (
                      <small className="text-sm text-rose-600 ">
                        {errors.institution.message}
                      </small>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Téléphone <span className="text-meta-1"> *</span>
                    </label>
                    <input
                      {...register("telephone", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="number"
                      placeholder="Téléphone"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.telephone && (
                      <small className="text-sm text-rose-600 ">
                        {errors.telephone.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Longitude
                    </label>
                    <input
                      {...register("longitude", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="number"
                      placeholder="Longitude"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.longitude && (
                      <small className="text-sm text-rose-600 ">
                        {errors.longitude.message}
                      </small>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Latitude
                    </label>
                    <input
                      {...register("lagitude", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="number"
                      placeholder="Latitude"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.lagitude && (
                      <small className="text-sm text-rose-600 ">
                        {errors.lagitude.message}
                      </small>
                    )}
                  </div>
                </div>
                <div className=" mb-5 border-b border-stroke px-1.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Information du gerant
                  </h3>
                </div>
                <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="text"
                      placeholder="Longitude"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.email && (
                      <small className="text-sm text-rose-600 ">
                        {errors.email.message}
                      </small>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Téléphone
                    </label>
                    <input
                      {...register("tel", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="number"
                      placeholder="+237 60000000"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.tel && (
                      <small className="text-sm text-rose-600 ">
                        {errors.tel.message}
                      </small>
                    )}
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                      Mot de passe
                    </label>
                    <input
                      {...register("password", {
                        required: "Ce champ est obligatoire",
                      })}
                      type="password"
                      placeholder="Laitude"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {errors.password && (
                      <small className="text-sm text-rose-600 ">
                        {errors.password.message}
                      </small>
                    )}
                  </div>
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
    </>
  );
};

export default FormLayout;