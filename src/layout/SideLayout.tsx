import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { menuItem } from "@/utils/Dummy";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const SideLayout = () => {
  const route = window.location.pathname;
  const { open } = useSidebar();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {open && (
            <div className="my-4 flex flex-col justify-center items-center">
              <Avatar className="w-15 h-15 shadow-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p className="mt-2 font-bold text-2xl capitalize text-[#59008c]">
                John Doe
              </p>
            </div>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItem.map((item) => (
                <SidebarMenuItem key={item.text} className="w-full py-2">
                  <SidebarMenuButton
                    isActive={route === item.route ? true : false}
                    className="w-full h-12"
                  >
                    <a href={item.route} className="my-1 py-2 px-2 flex items-center gap-2">
                      {/* <item.icon /> */}
                      {/* <img src={item.image} alt="sidebarImage" /> */}
                      <span>{item.text}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SideLayout;
