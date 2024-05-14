import { useState } from "react"
import { useGet } from "../../../hooks/restful/useGet"
import { useEffect } from "react"
import CreateTask from "./CreateTask"
import Task from "./Task"
import "./Tasks.css"

export default function TaskList(props) {
    const [usersList, setUsersList] = useState([])

    const { data: users, httpError: usersHttpError, isLoading: isUsersLoading } = useGet("users/findByOrganizationId")
    const { data: tasks, httpError: tasksHttpError, isLoading: isTaskLoading } = useGet(`tasks/search/findByIncidentId?incidentId=${props.incidentId}`)
    const [createTask, setCreateTask] = useState(false)

    useEffect(() => {
        if (users) {
            users.forEach(user => {
                setUsersList(prevUsers => {
                    return [...prevUsers, { value: user.userId, label: user.displayName }]
                })
            });
        }

    }, [users])

    if (tasksHttpError || usersHttpError) return <div className="error">{tasksHttpError || usersHttpError}</div>
    if (isTaskLoading || isUsersLoading) return <div className="loading">loading...</div>

    return (
        <div className="tasks">
            {!createTask && (
                <button className="btn" onClick={() => { setCreateTask(true) }}>Create Task</button>
            )}

            {!createTask && tasks?._embedded?.tasks.length > 0 && (
                <ul>
                    {tasks._embedded.tasks.map(task => (
                        <Task key={task.taskId} task={task} usersList={usersList} />
                    ))
                    }
                </ul >
            )}
            {tasks?._embedded?.tasks?.length === 0 && <p>No Tasks Yet!</p>}
            {createTask && <CreateTask setCreateTask={setCreateTask} incidentId={props.incidentId} usersList={usersList} />}
        </div>
    )
}
