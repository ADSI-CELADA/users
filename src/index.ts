import { json } from "express";
import app from "./app"

import {PORT} from "./config/Config"

app.use(json())

app.listen(PORT, () => {
  console.log(`Server running uvub ${PORT}`)
});
