import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutModal from '../AboutModal';

describe('AboutModal', () => {
  const mockSetIsOpen = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    const { container } = render(<AboutModal isOpen={false} setIsOpen={mockSetIsOpen} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal content when open', () => {
    render(<AboutModal isOpen={true} setIsOpen={mockSetIsOpen} />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText(/A simple and elegant note-taking application/)).toBeInTheDocument();
    expect(screen.getByText('notes-app')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('calls setIsOpen when clicking close button', () => {
    render(<AboutModal isOpen={true} setIsOpen={mockSetIsOpen} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });

  it('calls setIsOpen when clicking overlay', () => {
    render(<AboutModal isOpen={true} setIsOpen={mockSetIsOpen} />);

    const overlay = screen.getByRole('button', { name: 'Close modal' });
    fireEvent.click(overlay);

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
}); 