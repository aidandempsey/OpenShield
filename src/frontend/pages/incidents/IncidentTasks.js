import { useEffect, useState } from "react"
import { useTable } from "../../hooks/restful/useTable"
import CreateIncidentTask from "./CreateIncidentTask"

export default function IncidentTasks(props) {
    const [tasks, setTasks] = useState([])
    const { tableData, tableHttpError, isTableLoading } = useTable(`tasks/search/findByIncidentId?incidentId=${props.incidentId}`)
    const [createTask, setCreateTask] = useState(false)

    useEffect(() => {
        if (tableData) {
            setTasks(tableData.tasks || [])
            console.log(tableData.tasks)
        }

    }, [tableData])

    if (tasks.length === 0) {
        return (
            <p className="loading">No tasks yet</p>
        )
    }

    return (
        <div className="incident-tasks">
            {!createTask && (
                <>
                    <button className="btn" onClick={() => { setCreateTask(true) }}>Create Task</button>
                    <div className="incident-tasks-list">
                        {tasks.length > 0 && tasks.map(task => (
                            <div className="incident-task" key={task.taskId}>
                                <p>Assigned date: {task.assignDate}</p>
                                <p>Assigned to: {task.assignedUserId}</p>
                                <p>Assigned By: {task.assignerUserId}</p>
                                <p>For incident: {task.incidentId}</p>
                                <p>Description: {task.taskDescription}</p>
                                <p>Task Name: {task.taskName}</p>
                                <p>Task status: {task.taskStatus}</p>
                                <hr />
                            </div>
                        ))
                        }
                    </div >
                </>
            )}
            {createTask && <CreateIncidentTask setCreateTask={setCreateTask} />}
        </div>
    )
}
