import { useEffect, useState } from "react"
import { TableTrainer, type TableTrainerData } from "../trainers/moduleOne/TableTrainer"

export const Nine = () => {
    const [mData, setMdata] = useState<TableTrainerData | null>(null);
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    useEffect(() => {
        const fetchData = async () => {
            setStatus("loading");
            try {
                const response = await fetch("http://localhost:3000/table");
                if (!response.ok) {
                    throw new Error(`Http error, ${response.status}`);
                }
                const result = await response.json();
                setMdata(result);
                setStatus("success");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setMdata(null);
                console.log(err.message)
                setStatus("error");
            }
        }
        fetchData();
    }, [])
    return <main className="Page Main">
        <section className="MainSection">
            <div className="Card">
                {status === "loading" && "Loading"}
                {status === "success" && mData ? <TableTrainer questions={mData?.questions} tableCols={mData?.tableCols} /> : status === "error" ? "Error" : ""}
            </div>
        </section>
    </main>
}