import "./App.css";
import { DataTable } from "./data-table";
// import { DATA } from "./data"; // <-- Removed DATA import
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { Petition, PetitionGuidance } from "./types";
import { Spinner } from "./components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner"; // <-- Restored sonner import

function App() {
  const [data, setData] = useState<Petition[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [petitionGuidance, setPetitionGuidance] = useState<
    PetitionGuidance["guidance"] | null
  >(null);
  const [petitionDetails, setPetitionDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

  const validatePassword = useCallback(
    async (pwd: string) => {
      try {
        const response = await fetch(`${backendUrl}/auth`, {
          method: "POST",
          body: JSON.stringify({ password: pwd }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
          localStorage.setItem("auth_password", pwd);
          setAuthError("");
        } else {
          console.error("Failed to validate password: ", await response.text());
          setAuthError("Invalid password");
          localStorage.removeItem("auth_password");
        }
      } catch (error) {
        console.error("Error validating password:", error);
        setAuthError("Failed to validate password");
        localStorage.removeItem("auth_password");
      }
    },
    [backendUrl]
  );

  useEffect(() => {
    const storedPassword = localStorage.getItem("auth_password");
    if (storedPassword) {
      validatePassword(storedPassword);
    }
  }, [validatePassword]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validatePassword(password);
  };

  const authenticatedFetch = (url: string, options: RequestInit = {}) => {
    const storedPassword = localStorage.getItem("auth_password");
    if (!storedPassword) {
      setIsAuthenticated(false);
      return Promise.reject(new Error("No authentication token"));
    }

    const headers = {
      ...options.headers,
      "X-Password": storedPassword,
    };

    return fetch(url, { ...options, headers });
  };

  useEffect(() => {
    if (isAuthenticated) {
      authenticatedFetch(`${backendUrl}/retrieval/documents`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setData(data);
          } else {
            console.error("Invalid data structure received:", data);
            toast.error(
              // <-- Restored toast
              "Received invalid data format from the server. Please check the data source."
            );
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch documents:", error);
          toast.error("Failed to load documents. Please try again later."); // <-- Restored toast
          setIsAuthenticated(false);
        });
    }
  }, [isAuthenticated, backendUrl]);

  const generatePetitionGuidance = async (details: string) => {
    setIsLoading(true);
    try {
      console.log(`sending request: petition/generate-guidance`);
      const response = await authenticatedFetch(
        `${backendUrl}/petition/generate-guidance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petitionDetails: details }),
        }
      );
      const data = await response.json();
      console.log(`got response ${JSON.stringify(data)}`);
      setPetitionGuidance(data.guidance);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a PDF file"); // <-- Restored toast
      setUploadError("Please upload a PDF file");
      return;
    }
    setUploadError("");
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await authenticatedFetch(
        `${backendUrl}/process/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (!response.ok) {
        const errorMsg = result.detail || "Upload failed due to server error";
        toast.error(errorMsg); // <-- Restored toast
        setUploadError(errorMsg);
        throw new Error(errorMsg);
      }

      console.log("Upload successful:", result);
      setIsUploadDialogOpen(false);
      toast.success("Document uploaded successfully"); // <-- Restored toast

      authenticatedFetch(`${backendUrl}/retrieval/documents`)
        .then((res) => res.json())
        .then((fetchedData) => {
          if (Array.isArray(fetchedData)) {
            setData(fetchedData);
          } else {
            console.error("Fetched data is not an array:", fetchedData);
            toast.error("Failed to refresh documents: Invalid data format."); // <-- Restored toast
            setData([]);
          }
        })
        .catch((error) => {
          console.error("Error refreshing documents after upload:", error);
          toast.error("Failed to refresh documents list."); // <-- Restored toast
        });
    } catch (error) {
      console.error("Error uploading file:", error);
      if (!uploadError) {
        const errorMsg =
          error instanceof Error ? error.message : "Failed to upload file";
        toast.error(errorMsg); // <-- Restored toast
        setUploadError(errorMsg);
      }
    } finally {
      setIsUploading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-10 min-h-screen flex items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Enter your password to continue</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {authError && (
                  <p className="text-sm text-red-500">{authError}</p>
                )}
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-10 text-gray-900">
        Tenant Case Navigator
      </h1>
      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Case Analyzer</TabsTrigger>
          <TabsTrigger value="analytics">Petition Writer</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="border-none p-0 mt-6 w-full">
          <div className="flex justify-end mb-4">
            <Dialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload Document
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Document</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="file">File</Label>
                    <div
                      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() => document.getElementById("file")?.click()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file) {
                          handleFileUpload(file);
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <input
                        type="file"
                        accept="application/pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadError("");
                            // handleFileUpload(e.target.files[0]);
                          }
                        }}
                        disabled={isUploading}
                      />
                      <div className="flex flex-col items-center gap-2">
                        {isUploading ? (
                          <Spinner className="h-6 w-6" />
                        ) : (
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                        )}
                        <p className="text-sm text-gray-600">
                          {isUploading
                            ? "Uploading..."
                            : "Click to browse or drag and drop your file here"}
                        </p>
                        {!isUploading && (
                          <p className="text-xs text-gray-500">
                            Supported formats: PDF
                          </p>
                        )}
                        {uploadError && (
                          <p className="text-sm text-red-500 mt-2">
                            {uploadError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isUploading}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      const fileInput =
                        document.querySelector<HTMLInputElement>(
                          'input[type="file"]'
                        );
                      if (fileInput?.files?.length) {
                        handleFileUpload(fileInput.files[0]);
                      } else {
                        setUploadError("Please select a file first.");
                      }
                    }}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <DataTable columns={columns} data={data} />
        </TabsContent>

        <TabsContent value="analytics" className="border-none p-0 mt-6 w-full">
          <div className="space-y-6 w-[1000px]">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Petition Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your petition details here..."
                  className="min-h-[150px]"
                  value={petitionDetails}
                  onChange={(e) => setPetitionDetails(e.target.value)}
                />
                <Button
                  className="mt-4"
                  onClick={() => generatePetitionGuidance(petitionDetails)}
                  disabled={isLoading}
                >
                  Help me write a petition
                </Button>
              </CardContent>
            </Card>

            {isLoading ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : petitionGuidance == null ? null : (
              <Card className="bg-white shadow-lg">
                <CardHeader className="text-center border-b pb-4">
                  <CardTitle className="text-3xl font-bold text-gray-900">
                    Petition Guidance
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                        Petition Type:{" "}
                        <span className="font-normal">
                          {petitionGuidance.petitionType}
                        </span>
                      </h3>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Supporting Cases
                      </h3>
                      <ul className="space-y-2">
                        {petitionGuidance.supportingCases.map(
                          (supportingCase, index) => (
                            <li
                              key={index}
                              className="flex text-black justify-center text-center"
                            >
                              <span className="mr-4">•</span>
                              <span>{supportingCase}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Legal Grounds
                      </h3>
                      <ul className="space-y-2">
                        {petitionGuidance?.keyLegalGrounds.map(
                          (ground, index) => (
                            <li
                              key={index}
                              className="flex text-black justify-center text-center"
                            >
                              <span className="mr-4 flex-shrink-0">•</span>
                              <span>{ground}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Evidence to Gather
                      </h3>
                      <ul className="space-y-2">
                        {petitionGuidance.evidenceToGather.map(
                          (evidence, index) => (
                            <li
                              key={index}
                              className="flex text-black justify-center text-center"
                            >
                              <span className="mr-4">•</span>
                              <span>{evidence}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Key Points
                      </h3>
                      <ul className="space-y-2">
                        {petitionGuidance?.keyPoints.map((point, index) => (
                          <li
                            key={index}
                            className="flex text-black justify-center text-center"
                          >
                            <span className="mr-4 flex-shrink-0">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Remedies to Request
                      </h3>
                      <ul className="space-y-2">
                        {petitionGuidance.remediesToRequest.map(
                          (remedy, index) => (
                            <li
                              key={index}
                              className="flex text-black justify-center text-center"
                            >
                              <span className="mr-4">•</span>
                              <span>{remedy}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
