import type { NextPage } from "next"
import { DashboardLayout, CreateWorkspace } from "../../../components/app"
import { Login, Register, Setup } from "../../../components/auth"
import { useRecoilValue } from "recoil"
import { authModeState } from "../../../core/recoil/auth"
import { useEffect } from "react"
import { supabase } from "../../../utils/supabase"

const HomePage: NextPage = () => {
    const handleCheckUser = async () => {
        const user = supabase.auth.user()
        console.log(user)
    }

    useEffect(() => {
        handleCheckUser()
    }, [])

    const authMode = useRecoilValue(authModeState)
    if (authMode === "authenticated") {
        return <CreateWorkspace />
    } else if (authMode === "register") {
        return <Register />
    }
    return <Login />
}

export default HomePage
