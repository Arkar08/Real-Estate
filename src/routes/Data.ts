import MainLayout from "@/layout/MainLayout";
import { Appointment } from "@/pages/Appointment/Appointment";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { Properties } from "@/pages/Properties/Properties";
import { Transaction } from "@/pages/Transaction/Transaction";
import { CreateUser } from "@/pages/User/CreateUser";
import { UpdateUser } from "@/pages/User/UpdateUser";
import { User } from "@/pages/User/User";

export const Data = [
  {
    path: "/",
    children: [
      {
        path: "",
        Component: MainLayout,
        children: [
          {
            path: "dashboard",
            Component: Dashboard,
          },
          {
            path: "user",
            Component: User,
          },
          {
            path:"user/create",
            Component:CreateUser,
          },
          {
            path:"user/:id",
            Component:UpdateUser,
          },
          {
            path: "properties",
            Component:Properties,
          },
          {
            path:"appointment",
            Component:Appointment,
          },
          {
            path:"transaction",
            Component:Transaction
          }
        ],
      },
    ],
  },
];
