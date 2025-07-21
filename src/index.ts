import "reflect-metadata";
import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized");
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  })
  .catch((error) => console.error("Error during Data Source initialization:", error));
