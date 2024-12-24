import React from 'react';
import styled from 'styled-components';
import {useChangePriorityTodoItem} from "../../data/hooks/useData";

// Определим цвета приоритетов
const priorityColors = {
    low: '#00ff00',
    medium: '#fdb800',
    high: '#ff0000'
};

const Select = styled.select`
  border: 2px solid #C4C4C4;
  border-radius: 6px;
  padding: 5px;
  cursor: pointer;
  background-color: ${(props) => priorityColors[props.value] || '#fff'};
`;

export const PrioritySelector = ({ id, priority }) => {
    const {mutate} = useChangePriorityTodoItem()

    const priorityHandler = (event) => {
        const newPriority = event.target.value
        mutate({id: id, priority: newPriority})
    }

    return (
        <Select value={priority} onChange={priorityHandler}>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
        </Select>
    );
};