import "./App.css";
import { DataTable } from "./data-table";
import { DATA } from "./data";
import { columns } from "./columns";

function App() {
  return (
    <div className="container mx-auto py-10 min-h-screen">
      <h1 style={{ marginBottom: "40px" }}>Housing Case Navigator</h1>
      <DataTable columns={columns} data={DATA} />
    </div>
  );
}

export default App;
