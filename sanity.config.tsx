"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// 1. Create the custom Navbar component
function CustomNavbar(props: any) {
  return (
    <div className="flex flex-col">
      <div className="bg-[#0a1c43] px-5 py-3 flex justify-between items-center text-white">
        <span className="font-bold text-sm tracking-wider">
          Lokayan IAS Academy - Admin Dashboard
        </span>

        {/* Using a standard <a> tag guarantees a clean exit from the Studio context */}
        <a
          href="/"
          className="bg-[#ed1c24] hover:bg-red-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors shadow-sm"
        >
           Go to Live Website
        </a>
      </div>
      {/* 2. Render the default Sanity navbar directly below our custom one */}
      {props.renderDefault(props)}
    </div>
  );
}

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  // 3. Inject the custom Navbar into the studio
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
});
