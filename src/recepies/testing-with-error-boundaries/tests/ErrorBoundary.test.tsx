import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';
import * as config from '../getAppEnv';

jest.mock('../getAppEnv', () => ({
  getAppEnv: jest.fn(),
}));

const ProblematicComponent = () => {
  throw new Error('Test error');
};

const mockedConfig = config as jest.Mocked<any>;

describe('[Testing ErrorBoundaries] ErrorBoundary', () => {

  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Spy on console.error to suppress error logs
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore(); // Restore the original implementation of console.error
    jest.resetModules(); // This resets the modules to ensure the mock takes effect
  });

  it('displays an error message on the screen in development', () => {
    mockedConfig.getAppEnv.mockReturnValue('development');

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/An error occurred: Test error/)).toBeInTheDocument();
  });

  it('logs an error in production and displays generic message', () => {
    mockedConfig.getAppEnv.mockReturnValue('production');

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalledWith(expect.anything(), expect.anything());
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
  });
});

