"use client";

import { SliceSimulator } from "../../../node_modules/@slicemachine/adapter-next/dist/simulator/";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

export default function SliceSimulatorPage() {
  return (
    <SliceSimulator
      // sliceZone={(props) => <SliceZone {...props} components={components} />}
      sliceZone={(props) => <SliceZone {...props} components={components} />}
    />
  );
}
