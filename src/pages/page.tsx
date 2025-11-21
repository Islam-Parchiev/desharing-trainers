import type { ReactNode } from "react"

export const Page = ({ children }: { children: ReactNode }) => {
    return (
        <main className="Page Main">
            <section className="MainSection">
                <div className="Card">
                    {children}
                </div>
            </section>
        </main>
    )
}