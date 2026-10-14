import { app } from "./app";
import { config } from "./config";
import { connectMongo } from "./models/db";
import { store } from "./models/store";

const PORT = config.port;

app.listen(PORT, async () => {
  console.log(`=======================================================`);
  console.log(`🚀 ILI Languages Backend API Server running`);
  console.log(`📍 Campus: Apollo Tower, New Palasia, Indore, India`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🔒 Environment: ${config.nodeEnv}`);
  console.log(`🌐 Allowed CORS: ${config.corsOrigins.join(", ")}`);
  console.log(`=======================================================`);

  // Connect to live MongoDB Atlas
  const mongo = await connectMongo();
  if (mongo) {
    await store.loadFromMongo();
  }
});
