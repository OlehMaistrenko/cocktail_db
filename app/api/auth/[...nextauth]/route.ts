import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoClient, ServerApiVersion } from 'mongodb';
import User from '@/types/User';

const client = new MongoClient(process.env.DB_URI!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        try {
          const database = await client.db("cocktail_db");
          // Specifying a Schema is optional, but it enables type hints on
          // finds and inserts
          const users = await database.collection<User>("users");
          const user = await users.findOne({ mail: profile.email });
          if (!user) {
            const result = await users.insertOne({
              mail: profile.email,
              name: profile.name,
              image: profile.picture,
            });
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
          }
          
          
        } finally {
          await client.close();
        }
        return {
          id: profile.email,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      }
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
