"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

const SignIn: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>();

  interface LoginProps {
    email: string;
    mot_de_passe: string;
    role: string;
  }

  const [loading, setLoading] = useState(false);

  async function onSubmit(data: LoginProps) {
    try {
      setLoading(true);
      const loginData = await signIn("credentials", {
        email: data.email,
        password: data.mot_de_passe,
        role: data.role,
        redirect: false,
      });

      if (loginData?.error) {
        setLoading(false);
        toast.error(
          "Une erreur est survenue, l'utilisateur est peut-être introuvable.",
        );
      } else {
        toast.success("Connexion réussie");
        reset();
        if (data.role === "point_depot") {
          router.push("/point_depot");
        } else if (data.role === "administrateur") {
          router.push("/administrateur");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Erreur réseau:", error);
      toast.error("Il semble qu'il y ait un problème avec votre réseau.");
    }
  }
  // const { data: session, status } = useSession();
  // const role = session.user?.role;
  // if (role === "point_depot") {
  //   router.push("/point_depot");
  // }

  return (
    <section className="relative z-10 overflow-hidden bg-[#f4f6f6] pb-16 pt-36 dark:bg-[#181c24] md:pb-20 lg:pb-28 lg:pt-[180px] ">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-[#181c24] dark:bg-black  sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Connectez-vous à votre compte
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                <div className="mb-4">
                  <label className="text-dark mb-3 block text-sm dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="Entrez votre adresse email"
                      className="dark:text-body-color-dark text-body-color dark:shadow-two w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.email && (
                      <small className="text-red-600 text-sm">
                        Ce champ est requis.
                      </small>
                    )}
                    <span className="absolute right-3 top-3">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-dark mb-3 block text-sm dark:text-white">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      {...register("mot_de_passe", { required: true })}
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      className="dark:text-body-color-dark text-body-color dark:shadow-two w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    {errors.mot_de_passe && (
                      <small className="text-red-600 text-sm">
                        Ce champ est requis.
                      </small>
                    )}
                    <span className="absolute right-3 top-3">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-dark mb-3 block text-sm dark:text-white">
                    Role
                  </label>
                  <select
                    {...register("role", { required: true })}
                    name="role"
                    className="dark:text-body-color-dark text-body-color dark:shadow-two w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                  >
                    <option value="point_depot">Point de dépôt</option>
                    <option value="administrateur">Administrateur</option>
                  </select>
                  {errors.role && (
                    <small className="text-red-600 text-sm">
                      Ce champ est requis.
                    </small>
                  )}
                </div>

                {loading ? (
                  <button
                    type="submit"
                    className="w-full cursor-wait rounded-md bg-primary px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    disabled
                  >
                    ...Patientez un instant
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  >
                    Login
                  </button>
                )}

                <div className="mt-4 text-center"></div>
              </form>
              <p className="text-body-color text-center text-base font-medium">
                Pas de compte?{" "}
                <Link href="" className="text-primary hover:underline">
                  Inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
