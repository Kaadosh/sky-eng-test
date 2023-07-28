import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

test('SearchForm вызывает onSearch с правильными аргументами при отправке формы', () => {
  const mockOnSearch = jest.fn();
  render(<SearchForm onSearch={mockOnSearch} />);

  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /Search/i });

  const username = 'testuser';
  fireEvent.change(input, { target: { value: username } });
  fireEvent.click(searchButton);

  expect(mockOnSearch).toHaveBeenCalledWith(username);
});