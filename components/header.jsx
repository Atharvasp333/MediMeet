import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'


const header = () => {
    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 cursor-pointer">
                    <Image
                        src="/logo-single.png"
                        alt="Medimeet Logo"
                        width={200}
                        height={60}
                        className="h-10 w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center space-x-2">
                    <SignedOut>
                        <SignInButton>
                            <Button variant="secondary">Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn appearance = {{
                        elements: {
                            avatarBox: "w-8 h-8 rounded-full",
                            userButtonPopoverCard: "shadow-md",
                            userPreviewMainIdentifier: "font-medium"
                        }
                    }}>
                        <UserButton />
                    </SignedIn>
                </div>
            </nav>
        </header>
    )
}

export default header
