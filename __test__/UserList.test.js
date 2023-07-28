import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../components/UserList';

test('UserList вызывает handleSortChange с правильными аргументами при выборе опции сортировки', () => {
  const mockHandleSortChange = jest.fn();
  const users = [/* Некоторые данные пользователей */];
  render(<UserList users={users} handleSortChange={mockHandleSortChange} />);

  const sortSelect = screen.getByRole('combobox');

  const sortOption = screen.getByText(/Sort by Repos Desc/i); // Предполагаем, что такая опция сортировки доступна
  fireEvent.change(sortSelect, { target: { value: 'desc' } });

  expect(mockHandleSortChange).toHaveBeenCalledWith('desc');
});

test('UserList вызывает handlePageChange с правильными аргументами при нажатии кнопок пагинации', () => {
  const mockHandlePageChange = jest.fn();
  const users = [/* Некоторые данные пользователей */];
  render(<UserList users={users} handlePageChange={mockHandlePageChange} />);

  const prevButton = screen.getByRole('button', { name: /< Prev/i });
  const nextButton = screen.getByRole('button', { name: /Next >/i });

  fireEvent.click(prevButton);
  expect(mockHandlePageChange).toHaveBeenCalledWith('prev');

  fireEvent.click(nextButton);
  expect(mockHandlePageChange).toHaveBeenCalledWith('next');
});