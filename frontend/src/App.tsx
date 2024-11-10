import "./App.css";
import { DataTable } from "./data-table";
// import { DATA } from "./data";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Petition } from "./types";
import { Spinner } from "./components/ui/spinner";

function App() {
  const [data, setData] = useState<Petition[]>([]);
  const [petitionGuidance, setPetitionGuidance] = useState<
    Record<string, unknown>
  >({});
  const [petitionDetails, setPetitionDetails] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/retrieval/documents")
      .then((res) => res.json())
      .then((data) => setData(data.petitions));
  }, []);

  const generatePetitionGuidance = async (details: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/petition/generate-guidance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petitionDetails: details }),
        }
      );
      const data = await response.json();
      console.log(`response: ${JSON.stringify(data)}`);
      setPetitionGuidance(data.guidance);
    } finally {
      setIsLoading(false);
    }
  };

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
          <DataTable columns={columns} data={data} />
        </TabsContent>

        <TabsContent value="analytics" className="border-none p-0 mt-6 w-full">
          <div className="space-y-6 w-[1000px]">
            <Card>
              <CardHeader>
                <CardTitle>Petition Details</CardTitle>
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
                  onClick={() =>
                    generatePetitionGuidance(JSON.stringify(petitionGuidance))
                  }
                  disabled={isLoading}
                >
                  Help me write a petition
                </Button>
              </CardContent>
            </Card>

            {isLoading ? (
              <Spinner className="mr-2 h-4 w-4" />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Petition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">Background</h3>
                      <p className="text-gray-600">
                        OUTPUT HERE RIHGT NOW:
                        {JSON.stringify(petitionGuidance)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Legal Basis</h3>
                      <p className="text-gray-600">
                        Relevant legal statutes and precedents...
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        Relief Requested
                      </h3>
                      <p className="text-gray-600">
                        Specific actions requested from the court...
                      </p>
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
