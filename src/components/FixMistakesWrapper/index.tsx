import { useState } from "react"
import { FixMistakesInTextMockData } from "../../mocks/data"
import { FixMistakesInText } from "../../trainers/moduleTwo/fixMistakesInText"
import type { Status } from "../../types/types"

export const FixMistakesWrapper = () => {
    const [status, setStatus] = useState<Status>("idle");
    return <FixMistakesInText
        data={FixMistakesInTextMockData}
        handleError={() => alert("error")}
        handleSuccess={() => alert("success")}
        setStatus={setStatus}
        status={status} />
}