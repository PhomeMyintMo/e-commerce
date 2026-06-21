import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { Slash } from "lucide-react";

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNames: Record<string, string> = {
    "/": "Home",

  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.map((path, index) => {
          const href = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="text-gray-500">
                <Slash size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href={href}>
                  {breadcrumbNames[href] || path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
