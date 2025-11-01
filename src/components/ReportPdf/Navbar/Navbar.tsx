import { format } from "date-fns";
import React from "react";

type NavbarPropsType = {
  page: number;
  created_at: string | undefined;
  sector_code: string | undefined;
  reference: string | undefined;
};

const Navbar: React.FC<NavbarPropsType> = ({
  page,
  created_at,
  sector_code = "",
  reference = "",
}) => {
  return (
    <div className="h-[106px] w-full px-[48px] flex flex-row items-center text-dark-blue ">
      <div className="font-medium text-dark-blue text-sm">{page}</div>
      <div className="h-[12px] w-[1px] bg-dark-blue ml-1"></div>
      <div className="ml-2 text-xs font-light">
        {sector_code} | Reference: {reference} | Created on{" "}
        {format(new Date(created_at || "2024-01-01"), "dd MMMM yyyy")}
      </div>
      <div className="relative flex flex-row items-center  ml-auto">
        <a href="https://unmapt.io" target="_blank">
          <img
            src={
              "https://unmapt-assets-dev.innoida.utho.io/web-assets/Unmapt+Logo.webp"
            }
            alt="logo"
            width={120}
          />
        </a>
        <div className="absolute -right-2 top-2">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            className="h-2 w-2"
          >
            <path d="M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m.25-6.73h-1.44v3.23H9V7.71h3.26c1.03 0 1.83.23 2.4.69.56.47.84 1.1.84 1.96 0 .6-.13 1.1-.39 1.5-.26.4-.65.72-1.18.95l1.9 3.59v.1h-1.94l-1.64-3.23m-1.44-1.46h1.46c.45 0 .8-.12 1.05-.35.25-.23.37-.55.37-.96 0-.41-.11-.73-.35-.97-.23-.24-.59-.35-1.08-.35h-1.45v2.63z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
