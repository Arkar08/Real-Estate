import { useState } from "react";
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
import { appointmentDummyData } from "@/utils/Dummy";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import moment from "moment";
import { useSidebar } from "@/components/ui/sidebar";

export const Appointment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = appointmentDummyData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointmentDummyData?.slice(startIndex, endIndex);

  const { open } = useSidebar();

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100";
      case "cancelled":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 hover:bg-rose-100";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const handleConfirm = (id: string | number) => {
    console.log("Confirm appointment:", id);
  };

  const handleCancel = (id: string | number) => {
    console.log("Cancel appointment:", id);
  };

  return (
    <div
      className={`space-y-4 p-4 w-full mx-auto transition-all duration-200 ${
        open ? "max-w-7xl pr-8" : "max-w-full"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Appointment Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage appointments, view details, and update status.
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-card w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-275">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Full Name</TableHead>
                <TableHead className="whitespace-nowrap">
                  Property Name
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Appointment Date
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Appointment Time
                </TableHead>
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
              {currentAppointments?.map((appointment) => {
                const status = appointment.status?.toLowerCase();

                const isAllDisabled =
                  status === "completed" ||
                  status === "cancelled" ||
                  status === "confirmed";

                return (
                  <TableRow key={appointment.id}>
                    <TableCell className="whitespace-nowrap">
                      {appointment.userName}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {appointment.propertyName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {moment(appointment.appointmentDate).format(
                        "MMMM Do YYYY",
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-center">
                      {appointment.appointmentTime}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        className={getStatusBadgeClass(appointment.status)}
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {moment(appointment.created_at).format(
                        "MMMM Do YYYY, h:mm:ss A",
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {moment(appointment.updated_at).format(
                        "MMMM Do YYYY, h:mm:ss A",
                      )}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap pr-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isAllDisabled}
                          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                          onClick={() => handleConfirm(appointment.id)}
                        >
                          <Check className="h-3.5 w-3.5" /> Confirm
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          disabled={isAllDisabled}
                          className="border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          <X className="h-3.5 w-3.5" /> Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">
            {totalItems === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">{Math.min(endIndex, totalItems)}</span>{" "}
          of <span className="font-medium">{totalItems}</span> appointments
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
