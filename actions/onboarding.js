"use server";

import { auth } from "@clerk/nextjs/server";

export async function setUserRole(formData) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }
}