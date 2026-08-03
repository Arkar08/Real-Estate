import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  UserPlus,
  Building,
  Phone,
  User as UserIcon,
  Camera,
  Upload,
  X,
} from "lucide-react";

export const CreateUser = () => {
  const [role, setRole] = useState<string>("");
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    status: "Active",
    licenseNumber: "",
    agencyName: "",
    experienceYears: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (selectedRole: string | null) => {
    const roleValue = selectedRole ?? "";
    setRole(roleValue);
    if (roleValue !== "Agent") {
      setFormData((prev) => ({
        ...prev,
        licenseNumber: "",
        agencyName: "",
        experienceYears: "",
        bio: "",
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      role,
      profileImage: imageFile,
    };
    console.log("Submitted User Data:", payload);
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create New User</h1>
          <p className="text-sm text-muted-foreground">
            Add a new system user, assign roles, and configure agent information.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 cursor-pointer"
          onClick={handleCancel}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Users
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-3">
            <Camera className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">1. Profile Picture</h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
            <div className="relative group w-28 h-28 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted/40">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    title="Remove Photo"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <UserIcon className="h-12 w-12 text-muted-foreground/50" />
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <Label htmlFor="profileImage" className="text-sm font-medium">
                Upload User Avatar
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  id="profileImage"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 cursor-pointer"
                  onClick={() =>
                    document.getElementById("profileImage")?.click()
                  }
                >
                  <Upload className="h-4 w-4" /> Select File
                </Button>
                {imageFile && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveImage}
                    className="text-destructive hover:text-destructive cursor-pointer"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Supported formats: PNG, JPG, or WEBP (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-3">
            <UserIcon className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">2. Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="e.g. Aung Aung"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. aungaung@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-3">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">3. Account & Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="09XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                onValueChange={(value: string | null) =>
                  handleRoleChange(value)
                }
                value={role}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Agent">Agent</SelectItem>
                  <SelectItem value="Buyer">Buyer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                onValueChange={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: val ?? prev.status,
                  }))
                }
                value={formData.status}
              >
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {role === "Agent" && (
          <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50/30 dark:bg-slate-900/40 p-6 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-2 border-b pb-3 border-blue-200">
              <Building className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-blue-950 dark:text-blue-300">
                4. Agent Professional Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  name="licenseNumber"
                  placeholder="e.g. 1234567890"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agencyName">Agency Name</Label>
                <Input
                  id="agencyName"
                  name="agencyName"
                  placeholder="e.g. Aung Real Estate Co."
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience (Years)</Label>
                <Input
                  id="experienceYears"
                  name="experienceYears"
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Agent Biography</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={3}
                placeholder="Brief description of experience, specializations, and coverage areas..."
                value={formData.bio}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="destructive"
            className="cursor-pointer"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" className="gap-2 cursor-pointer">
            <UserPlus className="h-4 w-4" /> Save User
          </Button>
        </div>
      </form>
    </div>
  );
};