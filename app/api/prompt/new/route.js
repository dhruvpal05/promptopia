import { connectToDatabase } from "@utils/database";

export const POST = async (req) => {
    const { prompt, userId, tag } = await req.json();
    try {
        await connectToDatabase();
    } catch (error) {
        
    }
}