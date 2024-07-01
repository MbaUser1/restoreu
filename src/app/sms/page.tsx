"use client";
import React from "react";

const Create2FAApplication: React.FC = () => {
  const createApplication = async () => {
    try {
      const response = await fetch("/api/sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error creating 2FA application:", error);
    }
  };

  return (
    <div>
      <h1>Create 2FA Application</h1>
      <button className="bg-primary p-3 text-white" onClick={createApplication}>
        Create
      </button>
    </div>
  );
};

export default Create2FAApplication;
