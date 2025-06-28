import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { type paths } from "~/lib/api";
import getBaseUrl from "~/lib/get-base-url";

const fetchClient = createFetchClient<paths>({
  baseUrl: getBaseUrl(),
});

export const api = createClient(fetchClient);
