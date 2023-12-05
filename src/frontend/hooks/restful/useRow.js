import { useEffect, useState } from "react"

export const useRow = (row, id) => {
    const [rowData, setRowData] = useState(null)
    const [rowHttpError, setRowHttpError] = useState(null)

    useEffect(() => {
        const get = async () => {
            try {
                const apiUrl = `http://localhost:8080/api/${row}/${id}`;
                const response = await fetch(apiUrl, { method: "GET" });
                const responseJson = await response.json();
                setRowData(responseJson);
            } catch (error) {
                setRowHttpError(error.message);
            }
        };

        get()
    }, [row])

    return { rowData, rowHttpError }
}