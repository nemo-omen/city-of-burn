import {
    ClientSQLite,
    NessieConfig,
} from "https://deno.land/x/nessie@2.0.5/mod.ts";

const client = new ClientSQLite("./sqlite.db");

/** This is the final config object */
const config: NessieConfig = {
    client,
    migrationFolders: ["./server/db/migrations"],
    seedFolders: ["./server/db/seeds"],
};

export default config;
