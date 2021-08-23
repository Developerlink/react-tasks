import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);  

  const httpData = useHttp();
  // Destructuring the data so it is easier to reference. This could also be done on the left of calling useHttp
  // but I'm keeping this line because I think it's more readable what happens.
  // Also here renaming sendRequest to fetchTasks.
  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    }; 

    fetchTasks({
      url: "https://react-http-e1048-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
    },
    transformTasks);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
