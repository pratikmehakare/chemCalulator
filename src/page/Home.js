import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [tValues, setTValues] = useState(Array(7).fill(""));
  const [t8, setT8] = useState("");
  const [r, setR] = useState("");
  const [l, setL] = useState("");
  const [v, setV] = useState("");
  const [i, setI] = useState("");
  const [hValues, setHValues] = useState([]);
  const inputRefs = useRef([]);
  const fieldRefs = useRef([]);

  const Ts = tValues.reduce((sum, val) => sum + (parseFloat(val) || 0), 0) / 7;
  const deltaT = Ts - (parseFloat(t8) || 0);
  const A = 2 * Math.PI * (parseFloat(r) || 0) * (parseFloat(l) || 0);
  const q = (parseFloat(v) || 0) * (parseFloat(i) || 0);
  const h = A !== 0 && deltaT !== 0 ? q / (A * deltaT) : 0;

  const saveHValue = () => {
    if (hValues.length < 10) {
      setHValues((prevHValues) => [...prevHValues, h]);
      setTValues(Array(7).fill(""));
      setT8("");
      setR("");
      setL("");
      setV("");
      setI("");
      fieldRefs.current[0]?.focus();
    }
  };

  const hAvg =
    hValues.length > 0
      ? hValues.reduce((sum, val) => sum + val, 0) / hValues.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6"
    >
      <motion.h1
        className="text-2xl font-bold mb-6"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Natural Convection
      </motion.h1>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label className="block font-medium">Enter values for T1 - T7:</label>
          <div className="grid grid-cols-4 gap-2">
            {tValues.map((val, index) => (
              <motion.input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="number"
                className="border p-2 rounded w-full"
                value={val}
                onChange={(e) => {
                  const newValues = [...tValues];
                  newValues[index] = e.target.value;
                  setTValues(newValues);
                  if (e.target.value && index < 6) {
                    inputRefs.current[index + 1]?.focus();
                  }
                }}
                whileFocus={{ scale: 1.05 }}
              />
            ))}
          </div>
          <p className="mt-2 font-semibold">Ts = {Ts.toFixed(2)} °C</p>
        </div>

        <div>
          <label className="block font-medium">Enter T8:</label>
          <motion.input
            ref={(el) => (fieldRefs.current[0] = el)}
            type="number"
            className="border p-2 rounded w-full"
            value={t8}
            onChange={(e) => {
              setT8(e.target.value);
              fieldRefs.current[1]?.focus();
            }}
            whileFocus={{ scale: 1.05 }}
          />
          <p className="mt-2 font-semibold">ΔT = {deltaT.toFixed(2)} °C</p>
        </div>

        <div>
          <label className="block font-medium">
            Enter Radius (r) and Length (l):
          </label>
          <div className="grid grid-cols-2 gap-2">
            <motion.input
              ref={(el) => (fieldRefs.current[1] = el)}
              type="number"
              className="border p-2 rounded w-full"
              value={r}
              onChange={(e) => {
                setR(e.target.value);
                fieldRefs.current[2]?.focus();
              }}
              placeholder="Radius"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              ref={(el) => (fieldRefs.current[2] = el)}
              type="number"
              className="border p-2 rounded w-full"
              value={l}
              onChange={(e) => {
                setL(e.target.value);
                fieldRefs.current[3]?.focus();
              }}
              placeholder="Length"
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <p className="mt-2 font-semibold">A = {A.toFixed(2)} m²</p>
        </div>

        <div>
          <label className="block font-medium">
            Enter Voltage (V) and Current (I):
          </label>
          <div className="grid grid-cols-2 gap-2">
            <motion.input
              ref={(el) => (fieldRefs.current[3] = el)}
              type="number"
              className="border p-2 rounded w-full"
              value={v}
              onChange={(e) => {
                setV(e.target.value);
                fieldRefs.current[4]?.focus();
              }}
              placeholder="Voltage"
              whileFocus={{ scale: 1.05 }}
            />
            <motion.input
              ref={(el) => (fieldRefs.current[4] = el)}
              type="number"
              className="border p-2 rounded w-full"
              value={i}
              onChange={(e) => setI(e.target.value)}
              placeholder="Current"
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <p className="mt-2 font-semibold">q = {q.toFixed(2)} watt</p>
        </div>

        <div>
          <p className="mt-2 font-semibold">h = {h.toFixed(2)} W/m²K</p>
          <motion.button
            onClick={saveHValue}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Save h Value
          </motion.button>
        </div>

        <div>
          <p className="mt-2 font-semibold">h Values:</p>
          <div className="space-y-2">
            {hValues.map((val, index) => (
              <span key={index} className="block">
                h{index + 1}: {val.toFixed(2)} W/m²K
              </span>
            ))}
          </div>
          <p className="mt-2 font-semibold">h Avg = {hAvg.toFixed(2)} W/m²K</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
