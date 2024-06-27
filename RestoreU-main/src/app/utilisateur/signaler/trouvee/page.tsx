import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import SelectGroupFour from "@/components/SelectGroup/SelectGroupFour";
import Link from "next/link";

const options = [
  { value: "USA", label: "USA" },
  { value: "UK", label: "UK" },
  { value: "Canada", label: "Canada" },
  { value: "test", label: "test" },
];

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  return (
    <>
      <Breadcrumb pageName="Signaler" />

      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
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
          <form action="#">
            <div className="p-6.5">
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <SelectGroupOne title={"Categorie"} options={options} />

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Numéro de piece
                  </label>
                  <input
                    type="number"
                    placeholder="Entrez l'id de piece"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
                <SelectGroupTwo title={"Où ??"} options={options} />

                <div className="w-full xl:w-1/2">
                  <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                    Quand ?? <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <SelectGroupFour />
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
