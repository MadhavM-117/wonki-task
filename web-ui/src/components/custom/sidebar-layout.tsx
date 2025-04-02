import { Separator } from "@radix-ui/react-separator";
import React, { useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Outlet, useLocation, useNavigate } from "react-router";
import { whoAmI } from "@/utils/api";

export const SidebarLayout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    whoAmI()
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.clear();
          navigate("/login");
        }
      })
      .catch(() => {
        console.error("Couldn't get user data");
        localStorage.clear();
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Wonki Waste Tracker</BreadcrumbLink>
                </BreadcrumbItem>
                {pathname.length === 1 ? (
                  <></>
                ) : (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {pathname.endsWith("user")
                          ? "Manage User Data"
                          : "Analytics Dashboard"}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </>
  );
};
