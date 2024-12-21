import NavbarSide from "../../_components/NavbarSide/NavbarSide";
import HeaderSections from "../../_components/HeaderSections/HeaderSections";

export default function Exams() {

    return <>
        <div className="relative flex mt-4">
            <NavbarSide />
            <main className="w-[86%] mx-auto space-y-4">
                <HeaderSections />
            </main>
        </div>
    </>;
}