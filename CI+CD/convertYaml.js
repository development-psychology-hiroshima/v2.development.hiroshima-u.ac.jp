import fs from "fs";
import jsyaml from "js-yaml";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertYaml(yamlPath, jsonPath) {
  const file = fs.readFileSync(yamlPath, "utf8");

  const data = jsyaml.load(file);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 0));
}

const paths = [
  {
    yamlPath: path.join(__dirname, "..", "public", "configs", "main.yml"),
    jsonPath: path.join(
      __dirname,
      "..",
      "public",
      "configs",
      "fallback",
      "main.json"
    ),
  },
  {
    yamlPath: path.join(
      __dirname,
      "..",
      "public",
      "configs",
      "membersResearch.yml"
    ),
    jsonPath: path.join(
      __dirname,
      "..",
      "public",
      "configs",
      "fallback",
      "membersResearch.json"
    ),
  },
];

paths.forEach(({ yamlPath, jsonPath }) => {
  try {
    convertYaml(yamlPath, jsonPath);
    console.log(`In:  ${yamlPath} \nOut: ${jsonPath}\x1b[33m Success\x1b[0m\n`);
  } catch (e) {
    console.error(`\x1b[31m${e}\x1b[0m`);
  }
});
