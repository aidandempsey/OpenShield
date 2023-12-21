import { useEffect, useState } from "react"

export const useTable = table => {
    const [tableData, setTableData] = useState([])
    const [tableHttpError, setTableHttpError] = useState(null)
    const [isTableLoading, setIsTableLoading] = useState(true)

    useEffect(() => {
        const get = async () => {
            setIsTableLoading(true)
            try {
                const apiUrl = `http://localhost:8080/api/${table}`;
                const response = await fetch(apiUrl, { method: "GET" });
                const responseJson = await response.json();
                setTableData(responseJson._embedded || []);
            } catch (error) {
                setTableHttpError(error.message);
            }
            setIsTableLoading(false)
        };

        get()

    }, [table])

    return { tableData, tableHttpError, isTableLoading }
}