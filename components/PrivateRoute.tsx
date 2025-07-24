// components/PrivateRoute.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {isAuthenticated} from "@/components/auth/utils";


interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push("/")
        }
    }, [])

    return <>{children}</>
}

export default PrivateRoute
