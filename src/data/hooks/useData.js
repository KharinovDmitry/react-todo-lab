import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, 'low');
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useDeleteTodoItem = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: ({id}) => {
      return LocalStorage.deleteTodoItemFromLocalStorage(id)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate
  }
}

export const useSwitchCheckboxTodoItem = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn:async ({id}) => {
      let items = await LocalStorage.getTodoItemsFromLocalStorage()
      const item = items.find(item => item.id === id);

      item.isDone = !item.isDone

      return LocalStorage.updateTodoItemInLocalStorage(item)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate
  }
}

export const useChangePriorityTodoItem = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn:async ({id, priority}) => {
      let items = await LocalStorage.getTodoItemsFromLocalStorage()
      const item = items.find(item => item.id === id);

      item.priority = priority

      return LocalStorage.updateTodoItemInLocalStorage(item)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate
  }
}