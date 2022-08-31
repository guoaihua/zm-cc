import "tailwindcss/tailwind.css";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";
import App from "@/components/app";

const container = document.getElementById("app");
const root = createRoot(container!);

const SubApp = () => {
  return <div id="subContainer"></div>;
};

export const renderFn = (app: any) => {
  const container = document.getElementById("subContainer");
  createRoot(container!).render(app);
};

root.render(
  <>
    <App>
      <SubApp />
    </App>
  </>
);
