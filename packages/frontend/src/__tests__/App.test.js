import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);

const renderApp = () => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );
};

describe('App Component', () => {
  test('renders TODO App heading', async () => {
    renderApp();
    const headingElement = await screen.findByText(/TODO App/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('displays empty state message when no todos', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
        ok: true,
      })
    );

    renderApp();
    
    await waitFor(() => {
      expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    });
  });

  test('calculates and displays correct stats', async () => {
    const mockTodos = [
      { id: 1, title: 'Test 1', completed: false },
      { id: 2, title: 'Test 2', completed: true },
      { id: 3, title: 'Test 3', completed: false },
    ];

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTodos),
        ok: true,
      })
    );

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/2 items left/i)).toBeInTheDocument();
    });
    
    expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
  });

  test('delete button calls API and removes todo', async () => {
    const mockTodos = [
      { id: 1, title: 'Test Todo', completed: false },
    ];

    global.fetch
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockTodos),
          ok: true,
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve({}),
          ok: true,
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
          ok: true,
        })
      );

    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/1'),
        expect.objectContaining({ method: 'DELETE' })
      );
    });
  });

  test('displays error message when API fails', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    renderApp();

    await waitFor(() => {
      expect(screen.getByText(/error loading todos/i)).toBeInTheDocument();
    });
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
