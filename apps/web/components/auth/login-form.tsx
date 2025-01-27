"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@founderswap/design-system/components/ui/button";
import { Input } from "@founderswap/design-system/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";

export const LoginForm = () => {
    const auth = useAuth();
    const router = useRouter();

    const submitMutation = useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            if (!auth) {
                throw new Error("Auth not found");
            }
            try {
                const result = await auth.signIn(email, password);
                return result;
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        onSuccess: () => {
            // Forza un refresh dei server components
            router.refresh();

            // Poi fai il redirect
            setTimeout(() => {
                router.push('/');
            }, 100);
        },
        onError: (error) => {
            console.error('Mutation error:', error);
        }
    });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        submitMutation.mutate({ email, password });
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 self-center">
            <div>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"

                />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                />
            </div>
            <Button type="submit">
                Sign In
            </Button>

            <Button variant="link">
                <Link href="/signup">
                    Don't you have an account yet?{" "}
                    <p className="underline">Sign Up</p>
                </Link>
            </Button>
            {submitMutation.isError && (
                <p

                    className="text-center text-destructive"
                >
                    {submitMutation.error.message}
                </p>
            )}
        </form>
    );
};

