"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import useStorage from "@/hooks/merchandise/useStorage";

function ProgressBar({ file, setFile }: any) {
    const { progress, url } = useStorage(file);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);

    return (
        <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}
        ></motion.div>
    );
}

export default ProgressBar;
