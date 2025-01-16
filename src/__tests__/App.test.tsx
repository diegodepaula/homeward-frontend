import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';


describe('App component', () => {
  it('renders the initial count as 0', () => {
    render(<App />);
    const countButton = screen.getByRole('button', { name: /count is 0/i });
    expect(countButton).toBeInTheDocument();
  });

  it('increments the count when the button is clicked', () => {
    render(<App />);
    const countButton = screen.getByRole('button', { name: /count is 0/i });
    fireEvent.click(countButton);
    expect(countButton).toHaveTextContent('count is 1');
  });

  it('renders the correct heading', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /Vite \+ React/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the instruction text', () => {
    render(<App />);
    const instructionText = screen.getByText((_content, element) => {
      const hasText = (node: Element | null) => node?.textContent === 'Edit src/App.tsx and save to test HMR';
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element!.children).every(
        (child) => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    });
    expect(instructionText).toBeInTheDocument();
  });

  it('renders the documentation link text', () => {
    render(<App />);
    const docsText = screen.getByText(/Click on the Vite and React logos to learn more/i);
    expect(docsText).toBeInTheDocument();
  });
});