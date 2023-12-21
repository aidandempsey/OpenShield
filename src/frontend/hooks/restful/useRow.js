import { useEffect, useState } from "react"

export const useRow = (table, row) => {
    const [rowData, setRowData] = useState(null)
    const [rowHttpError, setRowHttpError] = useState(null)

    useEffect(() => {
        const get = async () => {
            try {
                const apiUrl = `http://localhost:8080/api/${table}/${row}`;
                const response = await fetch(apiUrl, { method: "GET" });
                const responseJson = await response.json();
                setRowData(responseJson);
            } catch (error) {
                setRowHttpError(error.message);
            }
        };

        get()
    }, [table])

    return { rowData, rowHttpError }
}