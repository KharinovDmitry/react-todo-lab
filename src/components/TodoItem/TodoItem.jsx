import React from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {useDeleteTodoItem} from "../../data/hooks/useData";
import {PrioritySelector} from "./TodoItemPriority";

const checkedCss = css`
  color: #B5B5BA;
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    ${props.checked ? checkedCss : ''};
  `;
})

const Delete = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-image: url(assets/images/png/delete.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: 13px;
  cursor: pointer;
`;

export const TodoItem = ({id, title, checked, priority}) => {
    const {mutate} = useDeleteTodoItem();

    const deleteHandler = () => {
        if(window.confirm("Точно? Не откладывай")) {
            mutate({id: id})
        }
    }

  return (
    <TodoItemContainer>
      <TodoItemCheckbox id={id} checked={checked} />
      <Title checked={checked}>
        {title}
      </Title>
      <PrioritySelector id={id} priority={priority}/>
      <Delete onClick={deleteHandler}/>
    </TodoItemContainer>
  )
}
