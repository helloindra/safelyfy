import type { NextPage } from "next"
import { DashboardLayout, DashboardOverview, Settings } from "../../../../components/app"
import { Login, Register, Setup } from "../../../../components/auth"
import { useRecoilValue } from "recoil"
import { authModeState } from "../../../../core/recoil/auth"
import { Manufacturer } from "../../../../components/masterdata"

const HomePage: NextPage = () => {
    const authMode = useRecoilValue(authModeState)

    if (authMode === "authenticated") {
        return (
            <DashboardLayout withHeader={false}>
                <Manufacturer />
            </DashboardLayout>
        )
    } else if (authMode === "register") {
        return <Register />
    }
    return <Login />
}

export default HomePage
