// "use client";

// import type { PutBlobResult } from "@vercel/blob";
// import { useState, useRef } from "react";

// export default function AvatarUploadPage() {
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const inputUsernameRef = useRef<HTMLInputElement>(null);
//   const [blob, setBlob] = useState<PutBlobResult | null>(null);
//   return (
//     <>
//       <h1>Upload Your Avatar</h1>

//       <form
//         onSubmit={async (event) => {
//           event.preventDefault();

//           if (!inputFileRef.current?.files) {
//             throw new Error("No file selected");
//           }

//           const file = inputFileRef.current.files[0];
//           const username = inputUsernameRef;

//           const response = await fetch(
//             `/api/upload?filename=${file.name}&username=${username}`,
//             {
//               method: "POST",
//               body: file,
//             },
//           );

//           const newBlob = (await response.json()) as PutBlobResult;

//           setBlob(newBlob);
//         }}
//       >
//         <input name="file" ref={inputFileRef} type="file" required />
//         <input name="username" ref={inputUsernameRef} type="text" required />
//         <button type="submit">Upload</button>
//       </form>
//       {blob && (
//         <div>
//           Blob url: <a href={blob.url}>{blob.url}</a>
//         </div>
//       )}
//     </>
//   );
// }
"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputCategorieRef = useRef<HTMLInputElement>(null);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const inputArrondRef = useRef<HTMLInputElement>(null);
  const inputNpieceRef = useRef<HTMLInputElement>(null);
  const inputCniRef = useRef<HTMLInputElement>(null);
  const inputUseridRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputLieuRef = useRef<HTMLInputElement>(null);

  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files || !inputUseridRef.current?.value) {
      throw new Error("File or username not provided");
    }

    const file = inputFileRef.current.files[0];
    const userid = inputUseridRef.current.value;
    const cni = inputCniRef.current.value;
    const Npiece = inputNpieceRef.current.value;
    const arrond = inputArrondRef.current.value;
    const date = inputDateRef.current.value;
    const categorie = inputCategorieRef.current.value;
    const lieu = inputLieuRef.current.value;

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("username", username);

    try {
      const response = await fetch(
        `/api/upload?filename=${file.name}&userid=${userid}&categ=${categorie}&date=${date}&arrond=${arrond}&Npiece=${Npiece}&cni=${cni}&lieu=${lieu}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const newBlob = await response.json();

      setBlob(newBlob);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error state or feedback to the user
    }
  };

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form onSubmit={handleSubmit}>
        <p>
          <input name="file" ref={inputFileRef} type="file" required />
        </p>
        <p>
          categorie
          <input
            name="categorie"
            ref={inputCategorieRef}
            type="text"
            required
          />
        </p>
        <p>
          arrondissement
          <input
            name="arrondissement"
            ref={inputArrondRef}
            type="text"
            required
          />
        </p>
        <p>
          {" "}
          date
          <input name="date" ref={inputDateRef} type="date" required />
        </p>
        <p>
          userid
          <input name="username" ref={inputUseridRef} type="text" required />
        </p>
        <p>
          numeros de piece
          <input name="num_piece" ref={inputNpieceRef} type="text" required />
        </p>
        <p>
          Lieu de depots
          <input name="num_piece" ref={inputLieuRef} type="text" required />
        </p>
        <p>
          {" "}
          CNI
          <input name="cni" ref={inputCniRef} type="text" required />
        </p>

        <button type="submit">Upload</button>
      </form>

      {blob && (
        <div>
          Blob URL: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
