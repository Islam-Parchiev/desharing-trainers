import { useState } from "react"
import { TableTrainer, type TableTrainerData } from "../trainers/moduleOne/TableTrainer"
const mockData = {
    tableCols: [
        {
            colHeader: "Первый"
        },
        {
            colHeader: "Второй"
        }
    ],
    questions: [
        {
            id: 1,
            question: "Заполните пропущенные числа",
            variants: [
                {
                    id: 1,
                    content: "5"
                },
                {
                    id: 2,
                    content: "10"
                }
            ],
            slots: [
                {
                    id: 1,
                    correctValue: "5",
                    currentValue: null
                },
                {
                    id: 2,
                    correctValue: "10",
                    currentValue: null
                }
            ]
        },
        {
            id: 2,
            question: "Выберите цвета",
            variants: [
                {
                    id: 3,
                    content: "Красный"
                },
                {
                    id: 4,
                    content: "Синий"
                }
            ],
            slots: [
                {
                    id: 3,
                    correctValue: "Красный",
                    currentValue: null
                },
                {
                    id: 4,
                    correctValue: "Синий",
                    currentValue: null
                }
            ]
        },
        {
            id: 3,
            question: "Сопоставьте животных",
            variants: [
                {
                    id: 5,
                    content: "Собака"
                },
                {
                    id: 6,
                    content: "Кошка"
                }
            ],
            slots: [
                {
                    id: 5,
                    correctValue: "Собака",
                    currentValue: null
                },
                {
                    id: 6,
                    correctValue: "Кошка",
                    currentValue: null
                }
            ]
        }
    ]
}
export const Nine = () => {
    const [mData] = useState<TableTrainerData | null>(mockData);
    const [status] = useState<"loading" | "success" | "error">("success");
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setStatus("loading");
    //         try {
    //             const response = await fetch("http://localhost:3000/table");
    //             if (!response.ok) {
    //                 throw new Error(`Http error, ${response.status}`);
    //             }
    //             const result = await response.json();
    //             setMdata(result);
    //             setStatus("success");
    //             // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //         } catch (err: any) {
    //             setMdata(null);
    //             console.log(err.message)
    //             setStatus("error");
    //         }
    //     }
    //     fetchData();
    // }, [])
    return <main className="Page Main">
        <section className="MainSection">
            <div className="Card">
                {status === "loading" && "Loading"}
                {status === "success" && mData ? <TableTrainer questions={mData?.questions} tableCols={mData?.tableCols} /> : status === "error" ? "Error" : ""}
            </div>
        </section>
    </main>
}