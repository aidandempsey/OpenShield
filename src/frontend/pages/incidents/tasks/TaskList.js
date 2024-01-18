import { useState } from "react"
import { useGet } from "../../../hooks/restful/useGet"

import CreateTask from "./CreateTask"
import Task from "./Task"
import "./Tasks.css"

export default function TaskList(props) {
    const { data, httpError, isLoading } = useGet(`tasks/search/findByIncidentId?incidentId=${props.incidentId}`)
    const [createTask, setCreateTask] = useState(false)

    if (httpError) return <div className="error">{httpError}</div>
    if (isLoading) return <div className="Loading">loading...</div>

    return (
        <div className="tasks">
            {!createTask && data?._embedded?.tasks.length > 0 && (
                <>
                    <button className="btn" onClick={() => { setCreateTask(true) }}>Create Task</button>
                    <ul>
                        {data?._embedded?.tasks.length > 0 && data._embedded.tasks.map(task => (
                            <Task key={task.taskId} task={task} />
                        ))
                        }
                    </ul >
                </>
            )}
            {data?._embedded?.tasks?.length === 0 && <p>No Tasks Yet!</p>}
            {createTask && <CreateTask setCreateTask={setCreateTask} />}
        </div>
    )
}
