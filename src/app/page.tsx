import Image from "next/image";
import NavbarSide from "./_components/NavbarSide/NavbarSide";
import HeaderSections from "./_components/HeaderSections/HeaderSections";
import UserProfile from "./_components/UserProfile/UserProfile";
import Subjects from "./_components/Subjects/Subjects";

export default function Home() {
  return <>
    <div className="relative flex mt-4">
      <NavbarSide />
      <main className="w-[86%] mx-auto space-y-4">
        <HeaderSections />
        <UserProfile />
        <Subjects />
      </main>
    </div>
  </>;
}
