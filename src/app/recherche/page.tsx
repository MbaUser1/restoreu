"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";

import MultiSelect from "@/components/FormElements/MultiSelect";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const options = [
  { value: "acte de naissance", label: "Acte de naissance" },
  { value: "cni", label: "CNI" },
  { value: "recepisé", label: "Recepisé" },
  { value: "permis de conduire a", label: "Permis A" },
  { value: "permis de conduire B", label: "Permis B" },
  { value: "autres", label: "Autres" },
];

const FormElements = () => {
  return (
    <>
      <Breadcrumb pageName="Recherche" />

      <div className="flex flex-col gap-9">
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-5/6">
                <input
                  type="text"
                  placeholder="Entrez le n° du document"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-15 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-gray-500 peer-focus:text-gray-900 top-8/12 absolute left-22 h-[18px] w-[18px] "
                />
              </div>
              <div className="w-full xl:w-1/6">
                <button className="flex w-full justify-center rounded bg-danger p-3 font-medium text-gray hover:bg-opacity-90">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Ou</h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Categorie <span className="text-meta-1">*</span>
                </label>
                <select className="w-full rounded border-[1.5px] border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Nom
                </label>
                <input
                  type="text" // Treat as string
                  placeholder="Entrez l'id de pièce"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-2.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Prénom
                </label>
                <input
                  type="text" // Treat as string
                  placeholder="Entrez l'id de pièce"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-2 block text-sm font-medium text-black dark:text-white">
                  Numéro de pièce
                </label>
                <input
                  type="text" // Treat as string
                  placeholder="Entrez l'id de pièce"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Toggle switch input --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Toggle switch input
            </h3>
          </div>

          <div className="flex flex-col gap-5.5 p-6.5">
            <SwitcherOne />
            <SwitcherTwo />
            <SwitcherThree />
            <SwitcherFour />
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <CheckboxOne />
            <CheckboxTwo />
            <CheckboxThree />
            <CheckboxFour />
            <CheckboxFive />
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <SelectGroupTwo title={""} options={[]} />
            <MultiSelect id="multiSelect" />
          </div>
        </div>

        {/* <!-- File upload --> */}
      </div>
    </>
  );
};

export default FormElements;
