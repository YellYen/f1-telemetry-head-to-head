
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const drivers = ["VER", "HAM", "LEC", "NOR", "ALO"];
const sessions = ["MON - Qualifying", "MON - Race", "SPA - Qualifying", "SPA - Race"];

// Sample static data
const sampleData = [
  { distance: 0, VER: 120, HAM: 118 },
  { distance: 100, VER: 150, HAM: 148 },
  { distance: 200, VER: 180, HAM: 175 },
  { distance: 300, VER: 200, HAM: 198 },
  { distance: 400, VER: 210, HAM: 205 },
  { distance: 500, VER: 215, HAM: 210 },
];

export default function LapCompareApp() {
  const [driver1, setDriver1] = useState("");
  const [driver2, setDriver2] = useState("");
  const [session, setSession] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🏎️ F1 Telemetry Head-to-Head
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-4">
            <label className="block mb-2 text-sm font-medium">Driver 1</label>
            <Select onValueChange={setDriver1}>
              {drivers.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="block mb-2 text-sm font-medium">Driver 2</label>
            <Select onValueChange={setDriver2}>
              {drivers.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="block mb-2 text-sm font-medium">Session</label>
            <Select onValueChange={setSession}>
              {sessions.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </Select>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-6">
        <Button disabled={!driver1 || !driver2 || !session}>Compare Laps</Button>
      </div>

      <div className="mt-10 max-w-5xl mx-auto">
        <Card>
          <CardContent className="p-6 h-96">
            {driver1 && driver2 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="distance" label={{ value: "Distance (m)", position: "insideBottomRight", offset: -5 }} />
                  <YAxis label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey={driver1} stroke="#00bcd4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey={driver2} stroke="#e91e63" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>Lap Comparison Chart Placeholder</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
