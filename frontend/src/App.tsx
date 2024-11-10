import "./App.css";
import { DataTable } from "./data-table";
import { DATA } from "./data";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  return (
    <div className="container mx-auto py-10 min-h-screen">
      <h1 style={{ marginBottom: "40px" }}>Housing Case Navigator</h1>
      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Case Analyzer</TabsTrigger>
          <TabsTrigger value="analytics">Petition Writer</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="border-none p-0 mt-6 w-full">
          <DataTable columns={columns} data={DATA} />
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
                />
                <Button className="mt-4">Help me write a petition</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Generated Petition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Background</h3>
                    <p className="text-gray-600">
                      Sample background information about the case...
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Legal Basis</h3>
                    <p className="text-gray-600">
                      Relevant legal statutes and precedents...
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Relief Requested</h3>
                    <p className="text-gray-600">
                      Specific actions requested from the court...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
