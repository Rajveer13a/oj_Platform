import { BrainCircuit, CodeXml } from "lucide-react";

export default function Logo(){

    return <div className="text-3xl font-bold text-mist-300 flex items-center p-2">
        {"<"}
        <BrainCircuit className="text-blue-400" />
        {/* <CodeXml /> */}
        {"/>"}
        {/* <span className="text-blue-400">B</span>rainy<span className="text-red-300">J</span>udge */}
    </div>
}