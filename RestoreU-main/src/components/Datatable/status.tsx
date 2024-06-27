import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

import clsx from "clsx";

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "paid",
        },
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <FontAwesomeIcon icon={faClock} className="text-gray-500 ml-1 w-4" />
        </>
      ) : null}
      {status === "paid" ? (
        <>
          Paid
          <FontAwesomeIcon icon={faCheck} className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
