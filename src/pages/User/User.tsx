import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userDummyData } from "@/utils/Dummy";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSidebar } from "@/components/ui/sidebar";

export const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = userDummyData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = userDummyData?.slice(startIndex, endIndex);

  const navigate = useNavigate();
  const { open } = useSidebar();

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100";
      case "inactive":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 hover:bg-rose-100";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 hover:bg-purple-100 border-purple-200";
      case "agent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100 border-blue-200";
      case "buyer":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300 hover:bg-cyan-100 border-cyan-200";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const createUser = () => {
    navigate("/user/create");
  };

  return (
    <div
      className={`space-y-4 p-4  w-full mx-auto transition-all duration-200 ${
        open ? "max-w-7xl pr-8" : "max-w-full"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage system users, roles, permissions, and view status.
          </p>
        </div>
        <Button className="w-fit gap-2 cursor-pointer" onClick={createUser}>
          <Plus className="h-4 w-4" /> Add New User
        </Button>
      </div>

      <div className="rounded-md border bg-card w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-275">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Profile</TableHead>
                <TableHead className="whitespace-nowrap">Full Name</TableHead>
                <TableHead className="whitespace-nowrap">Email</TableHead>
                <TableHead className="whitespace-nowrap">
                  Phone Number
                </TableHead>
                <TableHead className="whitespace-nowrap">Role</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">
                  Created Date & Time
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Updated Date & Time
                </TableHead>
                <TableHead className="text-right whitespace-nowrap pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.profileImage}
                        alt={user.full_name}
                      />
                      <AvatarFallback>
                        {user.full_name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {user.full_name}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {user.email}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {user.phone}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={getRoleBadgeClass(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge className={getStatusBadgeClass(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {moment(user.created_at).format("MMMM Do YYYY, h:mm:ss A")}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {moment(user.updated_at).format("MMMM Do YYYY, h:mm:ss A")}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer"
                        onClick={() => navigate(`/user/${user.id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50 cursor-pointer"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">{Math.min(endIndex, totalItems)}</span>{" "}
          of <span className="font-medium">{totalItems}</span> users
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <span className="text-sm font-medium px-2">
            Page {currentPage} of {totalPages || 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="flex items-center gap-1 cursor-pointer"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
