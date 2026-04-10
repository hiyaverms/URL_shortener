import { redirect } from "next/navigation";
import getCollection, { LINKS_COLLECTION } from "@/db";

interface RedirectPageProps {
  params: Promise<{ alias: string }>;
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { alias } = await params;
  const collection = await getCollection(LINKS_COLLECTION);
  const entry = await collection.findOne({ alias: alias });

  if (entry) {
    redirect(entry.url);
  } else {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404 - Link Not Found</h1>
        <p>The alias <strong>{alias}</strong> does not exist in our system.</p>
      </div>
    );
  }
}