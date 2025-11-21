"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function verifyAdmin() {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    try {
        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId
            }
        })

        return user.role === "ADMIN";
    } catch (error) {
        console.log("failed to verify admin", error)
        return false;
    }
}

export async function getPendingDoctors() {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
        throw new Error("Only admins can view pending doctors");
    }

    try {
        const pendingDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "PENDING"
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return { doctors: pendingDoctors };
    } catch (error) {
        console.log("failed to get pending doctors", error)
        throw new Error("Failed to get pending doctors");
    }
}

export async function getVerifiedDoctors() {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
        throw new Error("Only admins can view verified doctors");
    }

    try {
        const verifiedDoctors = await db.user.findMany({
            where: {
                role: "DOCTOR",
                verificationStatus: "VERIFIED"
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return { doctors: verifiedDoctors };
    } catch (error) {
        console.log("failed to get verified doctors", error)
        throw new Error("Failed to get verified doctors");
    }
}

export async function updateDoctorStatus(formData) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        throw new Error("Only admins can update doctor status");
    }

    const doctorId = formData.get("doctorId");
    const status = formData.get("status");

    if (!doctorId || !["VERIFIED", "PENDING"].includes(status)) {
        throw new Error("Invalid doctorId or status");
    }

    try {
        await db.user.update({
            where: {
                id: doctorId
            },
            data: {
                verificationStatus: status
            }
        })
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.log("failed to update doctor status", error)
        throw new Error("Failed to update doctor status");
    }
}

export async function updateDoctorActiveStatus(formData) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const doctorId = formData.get("doctorId");
    const suspend = formData.get("suspend") === "true";

    if (!doctorId) {
        throw new Error("Doctor ID is required");
    }

    try {
        const status = suspend ? "PENDING" : "VERIFIED";

        await db.user.update({
            where: {
                id: doctorId,
            },
            data: {
                verificationStatus: status,
            },
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update doctor active status:", error);
        throw new Error(`Failed to update doctor status: ${error.message}`);
    }
}