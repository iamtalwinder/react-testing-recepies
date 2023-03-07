import { render } from '@testing-library/react';
import Button from '../Button';

describe('Button Component Snapshot Tests', () => {
  it('renders correctly with default props', () => {
    const { asFragment } = render(<Button text="Click me" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly with custom color', () => {
    const { asFragment } = render(<Button text="Click me" color="blue" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const { asFragment } = render(<Button text="Click me" disabled />);
    expect(asFragment()).toMatchSnapshot();
  });
});
