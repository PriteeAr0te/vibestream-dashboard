"use client";

import Image from "next/image";
import Logo from "../../public/img/logo.png";
import Google from "../../public/img/google.png";
import InputComponent from "@/components/ui/InputComponent";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const LoginForm = () => {
    const router = useRouter();
    const params = useSearchParams();
    const google = params.get("googleLogin");

    const toastEnabled = useSelector((s: RootState) => s.uiPreferences.toastEnabled);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (res?.error) {
            setError("Invalid email or password.");
            return;
        }
        if (toastEnabled) {
            toast.success("Login Successful")
        }
        router.push("/");
    };

    if (google === "success" && toastEnabled) {
        toast.success("Logged in with Google");
    }

    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="w-full h-screen flex justify-center items-center py-8 px-3 bg-background">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-xl bg-accent border border-br flex flex-col items-center shadow-lg rounded-lg p-5"
            >
                <div className="mb-5 text-center w-full flex flex-col items-center">
                    <Image src={Logo} alt="Vibestream Logo" width={150} height={100} />
                    <h3 className="mt-4 text-foreground text-4xl font-semibold tracking-wide mb-1.5">
                        Log in to continue
                    </h3>
                    <p className="text-para text-sm">
                        Enter your details to access your dashboard
                    </p>
                </div>

                <div className="space-y-4 mb-5 w-full">
                    <InputComponent
                        type="email"
                        name="email"
                        placeholder="Enter your email id."
                        onChange={handleChange}
                        label="Email"
                        value={formData.email}
                        error=""
                    />

                    <InputComponent
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        label="Password"
                        value={formData.password}
                        error=""
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-3">{error}</p>
                )}

                <Button text="Log In" width="full" type="submit" />

                <div className="my-4 w-full flex flex-nowrap gap-2 justify-center items-center">
                    <span className="w-[40%] h-1 bg-br"></span>
                    <span className="text-lg font-semibold text-foreground w-[24px]">OR</span>
                    <span className="w-[40%] h-1 bg-br"></span>
                </div>

                <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="w-full py-2 px-3 border border-gray-800 bg-transparent text-foreground rounded-lg 
                               text-center hover:border-primary transition-all duration-300 flex gap-2 justify-center items-center"
                >
                    <Image src={Google} alt="Google" width={20} height={20} />
                    <span>Continue with Google</span>
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
