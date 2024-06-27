import Link from "next/link";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    // <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
    <div className="mb-4 flex flex-col gap-3 rounded-md bg-white p-6 dark:bg-black sm:flex-row sm:items-center  sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
    // </div>
  );
};

export default Breadcrumb;