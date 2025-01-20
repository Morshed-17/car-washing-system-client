import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../ui/button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Manage CarWash System",
      url: "#",
      items: [
        {
          title: "Bookings",
          url: "/dashboard/bookings",
        },
        {
          title: "Services",
          url: "/dashboard/services",
        },
        {
          title: "Slots",
          url: "/dashboard/slots",
        },
        {
          title: "Users",
          url: "/dashboard/users",
        },
      ],
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="text-xl">
        <div className="flex items-center gap-3">
          <Button asChild size={"icon"}>
            <Link to="/">
              <Home />
            </Link>
          </Button>
          CarWash
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
