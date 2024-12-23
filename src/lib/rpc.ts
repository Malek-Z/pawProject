import {hc} from "hono/client"

import { appType } from "@/app/api/[[...route]]/route"


export const client = hc<appType>(process.env.NEXT_PUBLIC_APP_URL!);