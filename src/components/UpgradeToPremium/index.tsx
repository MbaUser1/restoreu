"use client";
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

declare global {
    interface Window {
        CinetPay: any;
    }
}

const UpgradeToPremium = () => {
    const apiKey = process.env.API_KEY || '';
    const siteId = process.env.SITE_ID || '';
    const notifyUrl = process.env.NOTIFY_URL || '';

    useEffect(() => {
        // Charger le script CinetPay seulement côté client
        const script = document.createElement('script');
        script.src = 'https://cdn.cinetpay.com/seamless/main.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.CinetPay) {
                window.CinetPay.setConfig({
                    apikey: '52299249666a35af675c81.82838404',
                    site_id: '5873821',
                    notify_url: 'http://mondomaine.com/notify/',
                    mode: 'PRODUCTION',
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleUpgrade = () => {
        if (!window.CinetPay) {
            console.error('CinetPay script not loaded');
            return;
        }

        window.CinetPay.getCheckout({
            transaction_id: Math.floor(Math.random() * 100000000).toString(), // YOUR TRANSACTION ID
            amount: 100,
            currency: 'XAF',
            channels: 'ALL',
            description: 'Upgrade to Premium',
            customer_name: 'Joe', // Le nom du client
            customer_surname: 'Down', // Le prenom du client
            customer_email: 'down@test.com', // l'email du client
            customer_phone_number: '656932636', // le numéro de téléphone du client
            customer_address: 'BP 0024', // adresse du client
            customer_city: 'Antananarivo', // La ville du client
            customer_country: 'CM', // le code ISO du pays
            customer_state: 'CM', // le code ISO de l'état
            customer_zip_code: '06510', // code postal
        });

        // window.CinetPay.waitResponse((data: any) => {
        //     if (data.status === 'REFUSED') {
        //         if (alert('Votre paiement a échoué')) {
        //             window.location.reload();
        //         }
        //     } else if (data.status === 'ACCEPTED') {
        //         if (alert('Votre paiement a été effectué avec succès')) {
        //             window.location.reload();
        //         }
        //     }
        // });

        window.CinetPay.onError((data: any) => {
            console.error(data);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md   w-full text-center W-10">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Passez à un compte Premium</h2>
                <p className="text-gray-600 mb-6">Profitez de fonctionnalités exclusives et une expérience améliorée.</p>
                <ul className="text-left text-gray-600 mb-6">
                    <li className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-500 mr-2" />
                        Notifications par SMS en cas de pièce trouvée
                    </li>
                    <li className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-500 mr-2" />
                        Accès à toutes les fonctionnalités
                    </li>
                    <li className="flex items-center mb-2">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-500 mr-2" />
                        Mises à jour régulières
                    </li>
                </ul>
                <button
                    onClick={handleUpgrade}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 w-full"
                >
                    Devenir Premium
                </button>
            </div>
        </div>
    );
};

export default UpgradeToPremium;
