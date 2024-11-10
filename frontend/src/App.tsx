import "./App.css";
import { DataTable } from "./data-table";
// import { DATA } from "./data";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Petition, PetitionGuidance } from "./types";
import { Spinner } from "./components/ui/spinner";

function App() {
  const [data, setData] = useState<Petition[]>([]);
  const [petitionGuidance, setPetitionGuidance] = useState<
    PetitionGuidance["guidance"] | null
  >(null);
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
