"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.ok) {
            router.push("/admin/trips");
        } else {
            alert("Error information!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
            >
                <h1 className="text-2xl font-bold text-[#004D3C] mb-6 text-center">
                    Rupin Admin
                </h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border text-[#004D3C] rounded-lg outline-[#004D3C]"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border text-[#004D3C] rounded-lg outline-[#004D3C]"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-[#004D3C] text-white p-3 rounded-lg font-bold hover:bg-[#003d30] transition">
                        Log In
                    </button>
                </div>
            </form>
        </div>
    );
}
