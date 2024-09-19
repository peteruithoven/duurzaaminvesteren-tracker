import { createClient } from "redis";

console.log("process.env.REDIS_HOST: ", process.env.REDIS_HOST);

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;
