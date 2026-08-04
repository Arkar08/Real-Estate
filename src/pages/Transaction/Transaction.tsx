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
import { transactionDummyData } from "@/utils/Dummy";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { useSidebar } from "@/components/ui/sidebar";

export const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = transactionDummyData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactionDummyData?.slice(startIndex, endIndex);

  const { open } = useSidebar();

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 hover:bg-green-100";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 hover:bg-red-100";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100";
      case "refunded":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 hover:bg-yellow-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
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
            Transaction Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage transactions, view details, and update status.
          </p>
        </div>
      </div>

      <div className="rounded-md border bg-card w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-275">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  Property Name
                </TableHead>
                <TableHead className="whitespace-nowrap">Buyer Name</TableHead>
                <TableHead className="whitespace-nowrap">Agent Name</TableHead>
                <TableHead className="whitespace-nowrap">Amount</TableHead>
                <TableHead className="whitespace-nowrap">
                  Payment Status
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Transaction Date & Time
                </TableHead>
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
              {currentTransactions?.map((transaction) => {
                return (
                  <TableRow key={transaction.id}>
                    <TableCell className="whitespace-nowrap">
                      {transaction.propertyName}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {transaction.buyerName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {transaction.agentName}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      ${transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        className={getStatusBadgeClass(
                          transaction.paymentStatus,
                        )}
                      >
                        {transaction.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {moment(transaction.transactionDate).format(
                        "MMMM Do YYYY, h:mm:ss A",
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {moment(transaction.created_at).format(
                        "MMMM Do YYYY, h:mm:ss A",
                      )}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {moment(transaction.updated_at).format(
                        "MMMM Do YYYY, h:mm:ss A",
                      )}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap pr-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-500 text-gray-500 hover:bg-gray-50 cursor-pointer"
                        >
                          View
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
          of <span className="font-medium">{totalItems}</span> transactions
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
