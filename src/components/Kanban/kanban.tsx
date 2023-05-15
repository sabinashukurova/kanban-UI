import React, { useState } from 'react'
import style from './kanban.module.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockdata from '../../mockdata'
import Card from '../Card'

function kanban() {
    const [data, setData] = useState(mockdata)

    const onDragEnd = (result: any) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={style.kanban}>
                {data.map((section: any) => (
                    <Droppable
                        key={section.id}
                        droppableId={section.id}
                    >
                        {(provided: any) => (
                            <div
                                className={style.kanban__section}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div className={style.kanban__section__title}>
                                    {section.title}
                                </div>
                                <div className={style.kanban__section__content}>
                                    {
                                        section.tasks.map((task: any, index: any) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            opacity: snapshot.isDragging ? '0.5' : '1'
                                                        }}
                                                    >
                                                        
                                                        <Card>
                                                            {task.title}
                                                        </Card>
                                                        
                                                    </div>
                                                )}

                                            </Draggable>
                                        ))
                                    }
                                    {provided.placeholder} 
                                </div>
                                
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    )
}

export default kanban