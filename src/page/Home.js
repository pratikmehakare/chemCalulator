import { useState } from "react";

export default function Home() {
  const [tValues, setTValues] = useState(Array(7).fill(""));
  const [t8, setT8] = useState("");
  const [r, setR] = useState("");
  const [l, setL] = useState("");
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  
  const Ts = tValues.reduce((sum, val) => sum + (parseFloat(val) || 0), 0) / 7;
  const deltaT = Ts - (parseFloat(t8) || 0);
  const A = 2 * Math.PI * (parseFloat(r) || 0) * (parseFloat(l) || 0);
  const q = (parseFloat(v) || 0) * (parseFloat(i) || 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Natural Convection</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <div>
          <label className="block font-medium">Enter values for T1 - T7:</label>
          <div className="grid grid-cols-4 gap-2">
            {tValues.map((val, index) => (
              <input
                key={index}
                type="number"
                className="border p-2 rounded w-full"
                value={val}
                onChange={(e) => {
                  const newValues = [...tValues];
                  newValues[index] = e.target.value;
                  setTValues(newValues);
                }}
              />
            ))}
          </div>
          <p className="mt-2 font-semibold">Ts = {Ts.toFixed(2)}</p>
        </div>

        <div>
          <label className="block font-medium">Enter T8:</label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={t8}
            onChange={(e) => setT8(e.target.value)}
          />
          <p className="mt-2 font-semibold">ΔT = {deltaT.toFixed(2)}</p>
        </div>

        <div>
          <label className="block font-medium">Enter Radius (r) and Length (l):</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={r}
              onChange={(e) => setR(e.target.value)}
              placeholder="Radius"
            />
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={l}
              onChange={(e) => setL(e.target.value)}
              placeholder="Length"
            />
          </div>
          <p className="mt-2 font-semibold">A = {A.toFixed(2)}</p>
        </div>

        <div>
          <label className="block font-medium">Enter Voltage (V) and Current (I):</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={v}
              onChange={(e) => setV(e.target.value)}
              placeholder="Voltage"
            />
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={i}
              onChange={(e) => setI(e.target.value)}
              placeholder="Current"
            />
          </div>
          <p className="mt-2 font-semibold">q = {q.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
