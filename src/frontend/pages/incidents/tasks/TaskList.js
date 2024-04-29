import { useState } from "react"
import { useGet } from "../../../hooks/restful/useGet"
import { useEffect } from "react"
import CreateTask from "./CreateTask"
import Task from "./Task"
import "./Tasks.css"

export default function TaskList(props) {
    const [usersList, setUsersList] = useState([])

    const { data: organizationId, httpError: organizationIdHttpError, isOrganizationIdLoading } = useGet(`secure/organizations/getOrganizationIdFromUserId`);
    const [search, setSearch] = useState(`users/search/findByOrganizationId?organizationId=${organizationId}`)
    const { data: users, httpError: usersHttpError, isLoading: isUsersLoading } = useGet(search)

    const { data: tasks, httpError: tasksHttpError, isLoading: isTaskLoading } = useGet(`tasks/search/findByIncidentId?incidentId=${props.incidentId}`)
    const [createTask, setCreateTask] = useState(false)

    useEffect(() => { if (organizationId) { setSearch(`users/search/findByOrganizationId?organizationId=${organizationId}`) } }, [organizationId])

    useEffect(() => {
        if (users?._embedded?.users) {
            users?._embedded?.users.forEach(user => {
                setUsersList(prevUsers => {
                    return [...prevUsers, { value: user.userId, label: user.displayName }]
                })
            });
        }

    }, [users])

    if (tasksHttpError) return <div className="error">{tasksHttpError}</div>
    if (isTaskLoading) return <div className="loading">loading...</div>

    return (
        <div className="tasks">
            {!createTask && (
                <button className="btn" onClick={() => { setCreateTask(true) }}>Create Task</button>
            )}

            {!createTask && tasks?._embedded?.tasks.length > 0 && (
                <ul>
                    {tasks?._embedded?.tasks.length > 0 && tasks._embedded.tasks.map(task => (
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
