import getCollection, { LINKS_COLLECTION } from "@/db";

export async function createShortLink(url: string, alias: string) {
    const collection = await getCollection(LINKS_COLLECTION);
    
    //duplicate?
    const existing = await collection.findOne({ alias });
    if (existing) {
        throw new Error("ALIAS_TAKEN");
    }

    return await collection.insertOne({
        url,
        alias,
        createdAt: new Date(),
    });
}