/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:UL4VpknI8Ydl@ep-sweet-math-a5sb9jey.us-east-2.aws.neon.tech/Ai-Gen?sslmode=require",
    }
  };
  