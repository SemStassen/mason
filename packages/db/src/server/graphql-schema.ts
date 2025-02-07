import { buildSchema } from "drizzle-graphql";
import * as schema from "./schema";

const { schema } = buildSchema({ schema });
