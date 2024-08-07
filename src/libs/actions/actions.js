"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function register(formData) {
    await prisma.user.create({
        data: {
            name: formData.get("name"),
            houseNum: formData.get("houseNum"),
            email: formData.get("email"),
            password: formData.get("password"),
        }
    });

    revalidatePath("/");
}