import "./App.css";
import { DataTable } from "./data-table";
import { DATA } from "./data";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  return (
    <div className="container mx-auto py-10 min-h-screen">
      <h1 style={{ marginBottom: "40px" }}>Housing Case Navigator</h1>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <DataTable columns={columns} data={DATA} />
        </TabsContent>

        <TabsContent value="analytics">
          <div>Analytics content goes here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
