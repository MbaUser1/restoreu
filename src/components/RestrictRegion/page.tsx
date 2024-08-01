"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const RestrictRegion = ({ children }) => {
  const router = useRouter();
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const IPINFO_API_KEY = process.env.IPINFO_API_KEY; // Clé d'API pour obtenir l'adresse IP et les informations de géolocalisation
  useEffect(() => {
    const fetchUserRegion = async () => {
      try {
        // Faire une requête pour récupérer les régions autorisées depuis /api/region
        const response = await axios.get("/api/region");
        const regionsAutorisees = response.data;
        // Utilisation d'un service externe pour obtenir l'adresse IP et les informations de géolocalisation
        const userResponse = await axios.get(
          `https://ipinfo.io/json?token=${IPINFO_API_KEY}`,
        ); // Exemple de service de géolocalisation
        const { region } = userResponse.data;
        // Vérifie si la région de l'utilisateur est dans la liste des régions autorisées
        if (regionsAutorisees.includes(region)) {
          setIsAllowed(true);
        } else {
          alert(
            "Désolé, notre plateforme est actuellement disponible uniquement pour les résidents de la région de l'Ouest du Cameroun.",
          );
          router.push("/restricted");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de géolocalisation :",
          error,
        );
        alert(
          "Une erreur est survenue lors de la vérification de votre région. Veuillez réessayer plus tard.",
        );
        router.push("/restricted");
      } finally {
        setLoading(false);
      }
    };
    fetchUserRegion();
  }, [router]);

  if (loading) {
    return <p>Chargement...</p>; // Affiche un message de chargement pendant la vérification
  }
  if (!isAllowed) return null; // Empêche le rendu des enfants si l'accès est refusé

  return children;
};

export default RestrictRegion;
