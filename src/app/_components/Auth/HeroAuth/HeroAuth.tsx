import Image from 'next/image';
import heroImg from '../../../../img/banner/bro.png';

export default function HeroAuth() { 

    return <>
        <div className="">
            <div className="max-lg:hidden bg-[#F0F4FC] w-1/2 h-full absolute top-0 left-0 bottom-0 z-0 rounded-e-[50px] shadow-2xl"></div>
            <div className="relative z-10">
                <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                    Welcome to
                    <span className="mt-2 block text-[#122D9C]">Elevate</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Quidem autem voluptatibus qui quaerat aspernatur
                    <br></br>
                    architecto natus
                </p>
                <div className="">
                    <Image
                        src={heroImg}
                        alt="Hero Image"
                    />
                </div>
            </div>
        </div>
    </>
}