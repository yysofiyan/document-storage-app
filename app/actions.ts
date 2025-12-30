'use server'

import { getDb } from "@/db";
import { documents } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getDocuments() {
    try {
        const db = getDb();
        const allDocs = await db.select().from(documents).orderBy(desc(documents.createdAt));
        return allDocs.map(doc => ({
            ...doc,
            uploadDate: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '',
            // Map schema fields to frontend interface if needed, though we aligned them mostly
            driveLink: doc.driveLink || '',
            fileSize: doc.fileSize || '',
            description: doc.description || '',
        }));
    } catch (error) {
        console.error("Failed to fetch documents:", error);
        return [];
    }
}

export async function createDocument(formData: FormData) {
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const driveLink = formData.get("driveLink") as string;
    const fileSize = formData.get("fileSize") as string;

    if (!name || !category) {
        throw new Error("Name and Category are required");
    }

    try {
        const db = getDb();
        await db.insert(documents).values({
            name,
            category,
            description,
            driveLink,
            fileSize,
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to create document:", error);
        return { success: false, error: "Failed to create document" };
    }
}

export async function deleteDocument(id: number) {
    try {
        const db = getDb();
        await db.delete(documents).where(eq(documents.id, id));
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete document:", error);
        return { success: false, error: "Failed to delete document" };
    }
}
