"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

function Nav() {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggledropdown, settoggledropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            try {
                const response = await getProviders();
                setProviders(response);
            } catch (error) {
                console.error("Error fetching providers:", error);
            }
        }
        setUpProviders();
    }, []);

    return (
        <nav className="w-full pt-3 mb-16 flex-between">
            <Link href="/" className="flex gap-2 flex-center ">
                <Image src="/assets/images/logo.svg" alt="promptopia logo" width={30} height={30} className="object-contain" />
                <p className="logo_text">Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex">
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black-btn">
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut} className="outline-btn">Sign Out</button>
                        <Link href="/profile">
                            <Image src={session?.user.image || "/assets/images/profile-user.png"} width={25} height={25} />
                        </Link>
                    </div>

                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                signIn
                            </button>
                        ))}
                    </>
                )}
            </div>
            {/* Mobile Navigation */}
            <div className="relative flex sm:hidden">
                {session?.user ? (
                    <div className="flex">
                        <Image src={session?.user.image || "/assets/images/profile-user.png"} width={25} height={25} alt="profile" onClick={() => settoggledropdown((prev) => !prev)} />
                        {toggledropdown && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdown_link" onClick={() => settoggledropdown(false)}>
                                    My Profile
                                </Link>
                                <Link href="/create-prompt" className="dropdown_link" onClick={() => settoggledropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button type="button" className="w-full mt-5 black-btn" onClick={() => { settoggledropdown(false); signOut(); }}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && Object.values(providers).map((provider) => (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                signIn
                            </button>
                        ))}
                    </>
                )}
            </div>

        </nav>
    )
}

export default Nav;
