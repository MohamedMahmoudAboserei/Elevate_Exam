import Image from "next/image";
import Link from "next/link";

import Rectangle from "../../../img/person/Rectangle 289.png";

export default function HeaderSections() {

    return <>
        <div className="flex items-center gap-4 px-4 py-2">
            <div className="relative flex-grow">
                <i className="fas fa-search absolute left-3 top-1/3 text-gray-400"></i>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full h-12 pl-10 pr-4 shadow-lg rounded-3xl border border-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4461F2]"
                />
            </div>
            <Link href={'/exams'} className="h-12 px-6 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-800 transition duration-300">
                Start Quiz
            </Link>
            <div className="h-12 w-12 rounded-full overflow-hidden">
                <Image
                    src={Rectangle}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    </>;
}