import fs from "fs";
import readline from "readline";

async function readCSVIntoMatrix(
  filePath: string,
  linePrefix: string,
  keys: string[],
): Promise<string[]> {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity,
  });

  // this will map a key into the index
  let keyNameToIndexMap: Record<string, number> = {};
  const matrix = new Array<string>();

  rl.on("line", (line) => {
    if (Object.keys(keyNameToIndexMap).length === 0) {
      // it's the header line
      keyNameToIndexMap = line
        .split(",")
        .reduce((acc, key, index) => ({ ...acc, [key]: index }), {});
    } else {
      // it's a data line
      const row = line.split(",");
      const rowObject =
        linePrefix +
        keys
          .map((key) => {
            const index = keyNameToIndexMap[key];
            return row[index];
          })
          .join(`,`);
      matrix.push(rowObject);
    }
  });

  await new Promise((res) => rl.once("close", res));
  return matrix;
}

export interface CityCsvRow {
  id: string;
  iata_code: string;
  iata_country_code: string;
  name: string;
  inserted_at: string;
  updated_at: string;
  metropolitan_area: string;
}

async function loadCities() {
  return await readCSVIntoMatrix("./data/cities.csv", "C,", [
    "name",
    "iata_code",
  ]);
}

export interface AirportCsvRow {
  id: string;
  iata_code: string;
  iata_city_code: string;
  iata_country_code: string;
  name: string;
  inserted_at: string;
  updated_at: string;
  source_type: string;
  alternative_names: string;
  icao_code: string;
  disabled_at: string;
  city_name: string;
  latitude: string;
  longitude: string;
  time_zone: string;
}

async function loadAirports() {
  return await readCSVIntoMatrix("./data/airports.csv", "A,", [
    "name",
    "iata_code",
    "latitude",
    "longitude",
  ]);
}

async function main() {
  // load airports csv
  const airports = await loadAirports();

  // load cities csv
  const cities = await loadCities();

  fs.writeFileSync(
    "./data/__generated__iata-lookup.json",
    JSON.stringify([...cities, ...airports]),
  );
}

export default main();
