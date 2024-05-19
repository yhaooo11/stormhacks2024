import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Login() {
    // @ts-ignore
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
        return <div>Not logged in</div>;
    }
    return <div>Protected</div>;
}
