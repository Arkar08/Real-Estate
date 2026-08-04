import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { propertyDummyData } from "@/utils/Dummy";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = propertyDummyData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = propertyDummyData?.slice(startIndex, endIndex);

  const navigate = useNavigate();
  const { open } = useSidebar();

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100";
      case "rented":
        return "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 hover:bg-teal-100";
      case "sold":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 hover:bg-purple-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  const getListingTypeBadgeClass = (type: string) => {
    switch (type?.toLowerCase()) {
      case "for sale":
      case "sale":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100";
      case "for rent":
      case "rent":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-100";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
    }
  };

  return (
    <div
      className={`space-y-4 p-4  w-full mx-auto transition-all duration-200 ${
        open ? "max-w-7xl pr-8" : "max-w-full"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pr-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Property Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage system properties, types, and view details.
          </p>
        </div>
        <Button className="w-fit gap-2 cursor-pointer">
          <Plus className="h-4 w-4" /> Add New Property
        </Button>
      </div>

      <div className="rounded-md border bg-card w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-275">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead className="whitespace-nowrap">
                  Property Name
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Property Type
                </TableHead>
                <TableHead className="whitespace-nowrap">
                  Listing Type
                </TableHead>
                <TableHead className="whitespace-nowrap">Bed Rooms</TableHead>
                <TableHead className="whitespace-nowrap">Bath Rooms</TableHead>
                <TableHead className="whitespace-nowrap">Area Sqft</TableHead>
                <TableHead className="whitespace-nowrap">Price</TableHead>
                <TableHead className="whitespace-nowrap">Agent Name</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Favourite</TableHead>
                <TableHead className="whitespace-nowrap">Review</TableHead>
                <TableHead className="whitespace-nowrap">View</TableHead>
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
              {currentProperties?.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={property.propertyImage?.[0]?.url}
                        alt={property.title}
                      />
                      <AvatarFallback>
                        {property.title
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">
                    {property.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {property.property_type}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      className={getListingTypeBadgeClass(
                        property.listing_type,
                      )}
                    >
                      {property.listing_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {property.bedrooms}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {property.bathrooms}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {property.area_sqft} ft
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    ${property.price?.toLocaleString()}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {property.agentName}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    <Badge className={getStatusBadgeClass(property.status)}>
                      {property.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {property.faviourite?.length}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {property.review?.length}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-center">
                    {property.propertyView?.length}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {moment(property.created_at).format(
                      "MMMM Do YYYY, h:mm:ss A",
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {moment(property.updated_at).format(
                      "MMMM Do YYYY, h:mm:ss A",
                    )}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-500 text-gray-500 hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/property/${property.id}`)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer"
                        onClick={() => navigate(`/property/${property.id}`)}
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
          of <span className="font-medium">{totalItems}</span> properties
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
