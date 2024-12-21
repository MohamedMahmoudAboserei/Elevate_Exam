import Link from "next/link";

export default function NavbarAuth() {

    return <>
        <div className="flex items-center gap-4 justify-end mb-4">
            <select className=" text-sm p-2 rounded">
                <option>English</option>
                <option>Arabic</option>
            </select>
            <div className="flex items-center gap-4">
                <Link href={'/signin'} className="text-blue-600 rounded-lg px-4 py-1 hover:border hover:border-blue-600 hover:bg-blue-700 hover:text-white duration-700">
                    Sign in
                </Link>
                <Link
                    href={'/register'}
                    className="rounded-lg border border-blue-600 px-4 py-1 text-blue-600 hover:bg-blue-700 hover:text-white duration-700"
                >
                    Register
                </Link>
            </div>
        </div>
    </>
}