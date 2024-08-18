import React from 'react'
import DeleteButton from './DeleteButton'

const TaskItem = ({ title, description, updateHandler, id, deletehandler,isCompleted }) => {
    return (
        <div className="w-full max-w-lg mx-auto mt-6">
      <details className="collapse bg-white text-black rounded-lg border border-gray-300 relative">
        <summary className="collapse-title text-xl font-medium flex items-center justify-between">
          <div className="flex items-center flex-grow">
            <span className="flex-grow">{title}</span>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => updateHandler(id)}
              className="checkbox checkbox-accent mx-2"
            />
            <DeleteButton onClick={() => deletehandler(id)} />
          </div>
        </summary>
        <div className="collapse-content p-4">
          <p>{description}</p>
        </div>
      </details>
    </div>
    )
}

export default TaskItem
