import "./App.css";
import { DataTable } from "./data-table";
// import { DATA } from "./data";
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

  // Wrap fetch calls with authentication header
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
        .then((res) => res.json())
        .then((data) => setData(data.petitions))
        .catch(() => setIsAuthenticated(false));
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
      alert("Please upload a PDF file");
      return;
    }

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

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      authenticatedFetch(`${backendUrl}/retrieval/documents`)
        .then((res) => res.json())
        .then((data) => setData(data.petitions));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
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
            <Dialog>
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
                      <Input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file);
                          }
                        }}
                      />
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
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
                        <p className="text-sm text-gray-600">
                          Click to browse or drag and drop your file here
                        </p>
                        <p className="text-xs text-gray-500">
                          Supported formats: PDF, DOC, DOCX
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    onClick={() => {
                      // Handle upload
                    }}
                  >
                    Upload
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
