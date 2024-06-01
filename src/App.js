import React from "react";
import EventTypeChart from "./EventTypeChart";
import ProtocolChart from "./ProtocolChart";
import SeverityChart from "./SeverityChart";
import data from "./data/eve.json";

const App = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Event Types</h2>
          <EventTypeChart data={data} />
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Protocols</h2>
          <ProtocolChart data={data} />
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Severities</h2>
          <SeverityChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default App;
