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

export async function getPendingPayouts() {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    try {
        const pendingPayouts = await db.payout.findMany({
            where: {
                status: "PROCESSING",
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        specialty: true,
                        credits: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return { payouts: pendingPayouts };
    } catch (error) {
        console.error("Failed to fetch pending payouts:", error);
        throw new Error("Failed to fetch pending payouts");
    }
}

export async function approvePayout(formData) {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) throw new Error("Unauthorized");

    const payoutId = formData.get("payoutId");

    if (!payoutId) {
        throw new Error("Payout ID is required");
    }

    try {
        // Get admin user info
        const { userId } = await auth();
        const admin = await db.user.findUnique({
            where: { clerkUserId: userId },
        });

        // Find the payout request
        const payout = await db.payout.findUnique({
            where: {
                id: payoutId,
                status: "PROCESSING",
            },
            include: {
                doctor: true,
            },
        });

        if (!payout) {
            throw new Error("Payout request not found or already processed");
        }

        // Check if doctor has enough credits
        if (payout.doctor.credits < payout.credits) {
            throw new Error("Doctor doesn't have enough credits for this payout");
        }

        // Process the payout in a transaction
        await db.$transaction(async (tx) => {
            // Update payout status to PROCESSED
            await tx.payout.update({
                where: {
                    id: payoutId,
                },
                data: {
                    status: "PROCESSED",
                    processedAt: new Date(),
                    processedBy: admin?.id || "unknown",
                },
            });

            // Deduct credits from doctor's account
            await tx.user.update({
                where: {
                    id: payout.doctorId,
                },
                data: {
                    credits: {
                        decrement: payout.credits,
                    },
                },
            });

            // Create a transaction record for the deduction
            await tx.creditTransaction.create({
                data: {
                    userId: payout.doctorId,
                    amount: -payout.credits,
                    type: "ADMIN_ADJUSTMENT",
                },
            });
        });

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to approve payout:", error);
        throw new Error(`Failed to approve payout: ${error.message}`);
    }
}