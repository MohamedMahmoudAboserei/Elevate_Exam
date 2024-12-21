"use client";

import React from "react";
import Image from "next/image";

import person from "../../../img/person/Frame 40.png";

export default function UserProfile() {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto flex flex-col md:flex-row">
            <div className="relative w-full h-48 md:w-1/3 md:h-auto">
                <Image
                    src={person}
                    alt="User"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>
            <div className="p-6 flex-1">
                <h3 className="text-lg font-bold text-blue-600">Ahmed Mohamed</h3>
                <p className="text-sm text-gray-500 mb-4">Voluptatem aut</p>
                <div className="mb-4">
                    <div className="relative h-2 rounded-full bg-gray-200">
                        <div
                            className="absolute top-0 left-0 h-2 rounded-full bg-blue-600"
                            style={{ width: "70%" }}
                        ></div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                    <div>
                        <div className="text-blue-600 font-bold text-lg">27</div>
                        <p>Quiz Passed</p>
                    </div>
                    <div>
                        <div className="text-blue-600 font-bold text-lg">13 min</div>
                        <p>Fastest Time</p>
                    </div>
                    <div>
                        <div className="text-blue-600 font-bold text-lg">200</div>
                        <p>Correct Answers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
