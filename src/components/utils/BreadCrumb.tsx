import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { useBreadCrumbStore } from "@/stores/breadCrumbStore";
import { matchPath, useLocation } from "react-router";

const BreadCrumb = ({
  flow,
}: {
  flow: {
    link: string;
    label: string;
    searchParams?: string;
    disabled?: boolean;
  }[];
}) => {
  const location = useLocation();
  const breadCrumbs = useBreadCrumbStore((state) => state.breadCrumbs);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {flow.map((item, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                to={item.disabled ? "" : `${item.link}`}
                state={breadCrumbs[item.link] || {}}
                className={cn(
                  matchPath(item.link, location.pathname)
                    ? "text-white bg-[#f6bc25] px-1 rounded py-1"
                    : "text-gray-300",
                  item.disabled
                    ? "cursor-not-allowed text-gray-400"
                    : "cursor-pointer",
                  "text-[10px] hover:text-white"
                )}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== flow.length - 1 && (
              <BreadcrumbSeparator className="text-gray-400" />
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
