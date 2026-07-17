import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
    ArrowRight,
    BrainCircuit,
    FileSearch,
    ShieldCheck
} from "lucide-react";

import logo from "../resunexus-logo.png";

export default function HomePage() {

    const navigate = useNavigate();

    return (

        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

            {/* Background blobs */}

            <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

            <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

            <motion.div

                initial={{ opacity:0,y:30 }}
                animate={{ opacity:1,y:0 }}
                transition={{ duration:0.8 }}

                className="relative flex min-h-screen items-center justify-center p-8"

            >

                <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center">

                    <div>

                        <motion.img

                            whileHover={{ scale:1.05, rotate:3 }}

                            src={logo}

                            className="w-28 rounded-3xl shadow-2xl"

                        />

                        <h1 className="text-6xl font-black mt-8 leading-tight">

                            Resu<span className="text-cyan-400">Nexus</span>

                        </h1>

                        <p className="mt-6 text-slate-300 text-xl leading-9">

                            Intelligent Resume Screening powered by Generative AI.

                            Upload a Job Description, scan hundreds of resumes,

                            rank candidates instantly and export recruiter-ready reports.

                        </p>

                        <div className="flex flex-wrap gap-5 mt-12">

                            <button

                                onClick={() => navigate("/login")}

                                className="group px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold flex items-center gap-3 shadow-xl shadow-cyan-500/30"

                            >

                                Login

                                <ArrowRight className="group-hover:translate-x-1 transition"/>

                            </button>

                            <button

                                onClick={() => navigate("/register")}

                                className="px-8 py-4 rounded-2xl border border-cyan-400 hover:bg-cyan-400/10 transition"

                            >

                                Create Account

                            </button>

                        </div>

                    </div>

                    <motion.div

                        initial={{ opacity:0,x:40 }}

                        animate={{ opacity:1,x:0 }}

                        transition={{ duration:1 }}

                        className="backdrop-blur-xl bg-white/5 rounded-[40px] border border-white/10 p-10 shadow-2xl"

                    >

                        <h2 className="text-3xl font-bold mb-10">

                            Why ResuNexus?

                        </h2>

                        <div className="space-y-8">

                            <Feature

                                icon={<BrainCircuit size={34}/>}

                                title="AI Candidate Ranking"

                                text="Automatically evaluates every resume using advanced LLM reasoning."

                            />

                            <Feature

                                icon={<FileSearch size={34}/>}

                                title="Bulk Resume Processing"

                                text="Upload ZIP files containing hundreds of resumes in seconds."

                            />

                            <Feature

                                icon={<ShieldCheck size={34}/>}

                                title="Secure Authentication"

                                text="JWT Authentication with persistent user sessions."

                            />

                        </div>

                    </motion.div>

                </div>

            </motion.div>

        </div>

    );

}

function Feature({icon,title,text}){

    return(

        <motion.div

            whileHover={{x:8}}

            className="flex gap-5 items-start"

        >

            <div className="bg-cyan-500/20 p-4 rounded-2xl text-cyan-300">

                {icon}

            </div>

            <div>

                <h3 className="font-bold text-xl">

                    {title}

                </h3>

                <p className="text-slate-400 mt-2 leading-7">

                    {text}

                </p>

            </div>

        </motion.div>

    );

}