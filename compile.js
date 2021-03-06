const fs = require("fs");
const path = require("path");

const { assocPath, forEach, forEachObjIndexed, keys } = require("ramda");

const fields = require("./schemas/fields.schema.json");
let tiles = require("./src/tiles.schema.json");

const elements = {
  "definitions.goods.items.properties": ["text", "svg", "font", "position"],
  "definitions.labels.items.properties": ["font", "position"],
  "definitions.cities.items.properties": ["position"],
  "definitions.companies.items.properties": ["position"],
  "definitions.divides.items.properties": ["position"],
  "definitions.companyToken.properties": ["position"],
  "definitions.genericToken.properties": ["text", "position", "font"],
  "definitions.industries.items.properties": ["position"],
  "definitions.name.properties": ["font", "position"],
  "definitions.offBoardRevenue.properties": ["position"],
  "definitions.mediumCities.items.properties": ["position"],
  "definitions.centerTowns.items.properties": ["position"],
  "definitions.towns.items.properties": ["position"],
  "definitions.shapes.items.properties": ["text", "svg", "font", "position"],
  "definitions.bridges.items.properties": ["svg", "font", "position"],
  "definitions.tunnels.items.properties": ["svg", "font", "position"],
  "definitions.terrain.items.properties": ["position"],
  "definitions.routeBonus.items.properties": ["position"],
  "definitions.icons.items.properties": ["position"],
  "definitions.track.items.properties": ["position"],
  "definitions.tunnelEntrances.items.properties": ["position"],
  "definitions.values.items.properties": ["position"],
};

forEach((path) => {
  arrayPath = path.split(".");

  forEach((type) => {
    forEachObjIndexed((field, name) => {
      tiles = assocPath([...arrayPath, name], field, tiles);
    }, fields.definitions[type].properties);
  }, elements[path]);
}, keys(elements));

fs.writeFileSync(
  path.join("schemas", "tiles.schema.json"),
  JSON.stringify(tiles, null, 2)
);
