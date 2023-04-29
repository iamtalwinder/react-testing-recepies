# React testing recepies

## Table of Contents
- [React testing recepies](#react-testing-recepies)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Recepies](#recepies)
    - [Snapshot testing](#snapshot-testing)
      - [Overview](#overview-1)
      - [The `Button` Component Example](#the-button-component-example)
      - [Test Scenarios](#test-scenarios)
      - [How Snapshot Testing Works](#how-snapshot-testing-works)
      - [Purpose](#purpose)
      - [Best Practices](#best-practices)
    - [Testing with API call](#testing-with-api-call)
      - [Overview](#overview-2)
      - [The `PostListFetch` Component Example](#the-postlistfetch-component-example)
      - [Test Scenarios](#test-scenarios-1)
      - [How to Test Components with API Calls](#how-to-test-components-with-api-calls)
      - [Purpose](#purpose-1)
      - [Best Practices](#best-practices-1)
    - [Testing user integractions](#testing-user-integractions)
      - [Overview](#overview-3)
      - [The `Form` Component Example](#the-form-component-example)
      - [Test Scenarios](#test-scenarios-2)
      - [How to Test User Interactions](#how-to-test-user-interactions)
      - [Purpose](#purpose-2)
      - [Best Practices](#best-practices-2)
    - [Testing with Timer](#testing-with-timer)
      - [Overview](#overview-4)
      - [The `Countdown` Component Example](#the-countdown-component-example)
      - [Test Scenario](#test-scenario)
      - [How to Test Components with Timers](#how-to-test-components-with-timers)
      - [Purpose](#purpose-3)
      - [Best Practices](#best-practices-3)
    - [Testing with error boundaries](#testing-with-error-boundaries)
      - [Overview](#overview-5)
      - [The `ErrorBoundary` Component Example](#the-errorboundary-component-example)
      - [Test Scenarios](#test-scenarios-3)
      - [How to Test Error Boundaries](#how-to-test-error-boundaries)
      - [Purpose](#purpose-4)
      - [Best Practices](#best-practices-4)
    - [Testing effects](#testing-effects)
      - [Overview](#overview-6)
      - [The `WindowWidth` Component Example](#the-windowwidth-component-example)
      - [Test Scenarios](#test-scenarios-4)
      - [How to Test Components with Effects](#how-to-test-components-with-effects)
      - [Purpose](#purpose-5)
      - [Best Practices](#best-practices-5)
    - [Testing custom Hooks](#testing-custom-hooks)
      - [Overview](#overview-7)
      - [The `useFetchData` Hook Example](#the-usefetchdata-hook-example)
      - [Test Scenarios](#test-scenarios-5)
      - [How to Test Custom Hooks](#how-to-test-custom-hooks)
      - [Purpose](#purpose-6)
      - [Best Practices](#best-practices-6)
    - [Testing with router](#testing-with-router)
      - [Overview](#overview-8)
      - [The `Profile` Component Example](#the-profile-component-example)
      - [Test Scenarios](#test-scenarios-6)
      - [How to Test Components with React Router](#how-to-test-components-with-react-router)
      - [Purpose](#purpose-7)
      - [Best Practices](#best-practices-7)
    - [Testing context API](#testing-context-api)
      - [Overview](#overview-9)
      - [The `ThemeSwitcher` Component Example](#the-themeswitcher-component-example)
      - [Test Scenario](#test-scenario-1)
      - [How to Test Components with Context API](#how-to-test-components-with-context-api)
      - [Purpose](#purpose-8)
      - [Best Practices](#best-practices-8)
  - [Contributing](#contributing)
  - [Contact](#contact)

## Overview
Explore best practices for testing key React concepts, including API integration, routing with React Router, context management, custom hooks, timers, and Redux state management.

## Prerequisites
Before starting, ensure you have the following installed:
- Node.js
- npm

## Installation
To set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/iamtalwinder/react-testing-recepies.git
   ```

2. Change directory to the project folder:
    ```bash
    cd react-testing-recepies
    ```

3. Install the required npm packages:
    ```bash
    npm install
    ```


## Recepies

  ### Snapshot testing
   #### Overview
   Snapshot testing in React is a technique used to ensure that the UI does not change unexpectedly. It involves capturing the rendered output of a component and comparing it to a reference snapshot file stored alongside the test.

   #### The `Button` Component Example

   [Button.tsx](src/recepies/snapshot-testing/Button.tsx)

   [Button.test.tsx](src/recepies/snapshot-testing/tests/Button.test.tsx)

   In this example, a `Button` component is tested using snapshots. This component has props for text, color, onClick event, and a disabled state.

   #### Test Scenarios

   1. **Default Props:** Renders the button with default settings.
   2. **Custom Color:** Renders the button with a specified color.
   3. **Disabled State:** Renders the button in a disabled state.

   #### How Snapshot Testing Works

   4. **Initial Run:** The first time a test is run, a snapshot of the component's rendered output is created and stored in a file. This snapshot includes the rendered HTML structure and the applied styles.

   5. **Subsequent Runs:** In future test runs, the rendered output of the component is compared to the stored snapshot. If there are any differences, the test fails, indicating that there has been an unexpected change in the component's rendering.

   #### Purpose

   - **Detect Changes:** Snapshot testing is primarily used to detect unintended changes in a component's UI rendering.
   - **Review Changes:** When a snapshot test fails, it requires developers to review the changes. If the change is intentional, the snapshot can be updated to reflect the new expected output.

   #### Best Practices

   - **Readable Snapshots:** Keep snapshots small and focused on specific components to make them easier to read and review.
   - **Commit Snapshots:** Always commit snapshot files along with the component and test changes.
   - **Regular Updates:** Update snapshots when intentional changes are made to the component's UI.

   Snapshot testing is a powerful tool for safeguarding against unexpected changes in the UI, ensuring consistency and reliability in a component's visual appearance over time.



  ### Testing with API call

   #### Overview
   Testing components that make API calls involves simulating these calls and controlling their responses. This ensures that the component's behavior in response to API interactions—success, failure, or data processing—is as expected.

   #### The `PostListFetch` Component Example

   [PostListFetch.tsx](src/recepies/testing-with-api-call/PostListFetch.tsx)

   [PostListFetch.test.tsx](src/recepies/testing-with-api-call/tests/PostListFetch.test.tsx)

   In the `PostListFetch` component, there are two key behaviors:
   1. **Fetching Posts:** The component fetches a list of posts from an API.
   2. **Error Handling:** It handles and displays errors if the fetch operation fails.

   #### Test Scenarios

   3. **Successful Fetch:** Tests that the component correctly fetches and displays posts.
   4. **Fetch Failure:** Tests the component's error-handling behavior when the API call fails.

   #### How to Test Components with API Calls

   5. **Mocking Fetch:** The global `fetch` function is mocked using Jest. This allows you to specify custom responses for the fetch calls made by the component.

      ```javascript
      global.fetch = jest.fn() as jest.Mock;
      ```

   6. **Simulating API Responses:** For each test, `fetch` is configured to return a resolved promise with mock data or a failure status.

      - Successful response:
        ```javascript
        mockedFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => [{ id: 1, title: "Test Post" }],
        });
        ```

      - Failed response:
        ```javascript
        mockedFetch.mockResolvedValueOnce({ ok: false });
        ```

   7. **Rendering and Assertions:** The component is rendered using `@testing-library/react`. `waitFor` and other utilities are used to assert that the component behaves as expected in response to the mocked fetch calls.

   #### Purpose

   - **Validate Behavior:** Ensure the component correctly handles data fetched from API calls.
   - **Error Handling:** Verify that errors are appropriately caught and displayed.
   - **Isolation:** Test the component in isolation without relying on actual API calls, leading to more reliable and faster tests.

   #### Best Practices

   - **Mock Restoration:** Reset or restore mocks before each test to prevent test interference.
   - **Realistic Mock Data:** Use realistic mock responses for greater accuracy in tests.
   - **Async Testing:** Use `waitFor` or similar utilities from `@testing-library/react` for testing asynchronous behavior.

   By following these practices, you can effectively test React components that rely on API calls, ensuring they handle data fetching and error scenarios correctly.


  ### Testing user integractions

   #### Overview
   Testing user interactions involves simulating user events like clicking, typing, and form submission to ensure that components respond as expected. This type of testing is crucial for validating the interactive aspects of a UI.

   #### The `Form` Component Example

   [Form.tsx](src/recepies/testing-user-interactions/Form.tsx)

   [Form.test.tsx](src/recepies/testing-user-interactions/tests/Form.test.tsx)

   The `Form` component is a perfect example for this kind of testing. It includes input fields for a username and email, validation logic, and form submission handling.

   #### Test Scenarios

   1. **Render Input Fields:** Ensures that the form renders necessary input fields.
   2. **Validation Checks:** Tests that the form validates required fields and correct email format.
   3. **Form Submission:** Verifies that the form submits correctly with valid data.

   #### How to Test User Interactions

   4. **Rendering and Locating Elements:** Use `@testing-library/react` to render the component and locate elements using `screen.getByTestId`.

      ```javascript
      render(<Form />);
      const input = screen.getByTestId('username-input');
      ```

   5. **Simulating Events:** Use `fireEvent` to simulate user actions like clicking buttons or typing in inputs.

      ```javascript
      fireEvent.change(input, { target: { value: 'JohnDoe' } });
      fireEvent.click(screen.getByTestId('submit-button'));
      ```

   6. **Asserting Responses:** Check the component’s response to these events, such as displaying validation errors or the submitted data.

      ```javascript
      expect(screen.getByTestId('username-error')).toHaveTextContent('Username is required');
      ```

   #### Purpose

   - **Interaction Testing:** Ensure that the component correctly handles user inputs and events.
   - **Validation Logic:** Verify that the form's validation logic works as expected for different user inputs.
   - **Feedback to User:** Confirm that appropriate feedback (errors, confirmation messages) is provided to the user.

   #### Best Practices

   - **Data-Testid Attributes:** Use `data-testid` attributes for elements that need to be targeted in tests.
   - **Realistic Interactions:** Simulate real user behavior as closely as possible.
   - **Async Handling:** Use `waitFor` or similar utilities for testing asynchronous behaviors (like API calls after submission).

   By following these practices, you can thoroughly test the interactive parts of your React components, ensuring they handle user input and provide feedback appropriately.

  ### Testing with Timer

  [Countdown.tsx](src/recepies/testing-with-timer/Countdown.tsx)

  [Countdown.test.tsx](src/recepies/testing-with-timer/tests/Countdown.test.tsx)

   #### Overview
   Testing components with timers involves simulating time-related functionalities like delays, countdowns, or intervals. This type of testing ensures that components behave correctly over time, particularly when they depend on JavaScript's `setTimeout` or `setInterval`.

   #### The `Countdown` Component Example
   The `Countdown` decrements a counter every second, demonstrating a common use of `setTimeout`.

   #### Test Scenario

   - **Countdown Functionality:** Ensuring the component correctly counts down from the initial value and updates the display accordingly.

   #### How to Test Components with Timers

   1. **Jest Fake Timers:** Use Jest's fake timers to control the passage of time in tests.

      ```javascript
      jest.useFakeTimers();
      ```

   2. **Rendering and Simulating Time:** Render the component and use `jest.advanceTimersByTime` to simulate the passage of time.

      ```javascript
      render(<Countdown initialCount={10} />);
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      ```

   3. **Asserting State Changes:** Check that the component's displayed state updates correctly as time advances.

      ```javascript
      expect(screen.getByText(`Time left: 4 seconds`)).toBeInTheDocument();
      ```

   #### Purpose

   - **Time-Based Behavior:** Test how components behave as time progresses, especially when they depend on `setTimeout` or `setInterval`.
   - **Control over Time:** Fake timers give you control over time in your tests, allowing you to simulate scenarios that would otherwise take too long in real time.

   #### Best Practices

   - **Clear Timers:** Always clear or reset timers after each test to avoid interference with other tests.
   - **Use `act` for State Updates:** Wrap timer advances in `act` to ensure state updates are processed correctly.
   - **Accurate Simulations:** Ensure the time you advance in tests accurately reflects the behavior you're trying to test.

   By following these practices, you can effectively test components that rely on JavaScript timers, ensuring they respond correctly to time-based changes.

  ### Testing with error boundaries

   #### Overview
   Error boundaries in React are components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI. Testing error boundaries involves simulating errors in child components and verifying that the error boundary behaves as expected.

   #### The `ErrorBoundary` Component Example

   [ErrorBoundary.tsx](src/recepies/testing-with-error-boundaries/ErrorBoundary.tsx)

   [ErrorBoundary.test.tsx](src/recepies/testing-with-error-boundaries/tests/ErrorBoundary.test.tsx)

   The `ErrorBoundary` component provides a mechanism to gracefully handle errors in development and production environments. It displays an error message in development and a generic message in production.

   #### Test Scenarios

   1. **Error Display in Development:** Tests that the component displays a specific error message when an error occurs in development mode.
   2. **Error Logging in Production:** Checks that the component logs the error and displays a generic error message in production mode.

   #### How to Test Error Boundaries

   3. **Mock Environment Configuration:** Use `jest.mock` to control the return value of `getAppEnv` to simulate different environments.

      ```javascript
      jest.mock('../getAppEnv', () => ({
        getAppEnv: jest.fn(),
      }));
      ```

   4. **Simulating Errors:** Create a test component (`ProblematicComponent`) that throws an error to trigger the error boundary.

      ```javascript
      const ProblematicComponent = () => {
        throw new Error('Test error');
      };
      ```

   5. **Assertions:**
      - In development, verify that the specific error message is displayed.
      - In production, confirm that the generic error message is shown and that `console.error` is called.

   #### Purpose

   - **Error Handling:** Ensure that the application provides a user-friendly response to unexpected errors.
   - **Environment-Specific Behavior:** Verify that the error boundary behaves differently in development and production environments.

   #### Best Practices

   - **Console Mocking:** Temporarily mock `console.error` in tests to prevent error logs from cluttering the test output.
   - **Resetting Mocks:** Reset or restore mocks and modules after each test to ensure clean test states.
   - **Accessible Error Messages:** Ensure error messages are clear and helpful for both development and production users.

   By carefully testing your error boundaries, you can guarantee that your application handles errors gracefully and provides a better user experience in the face of unexpected failures.

  ### Testing effects

   #### Overview
   Testing components with side effects, like those using `useEffect` for handling events or asynchronous operations, involves ensuring that these effects are triggered as expected and that the component's state updates accordingly.

   #### The `WindowWidth` Component Example

   [WindowWidth.tsx](src/recepies/testing-effects/WindowWidth.tsx)

   [WindowWidth.test.tsx](src/recepies/testing-effects/tests/WindowWidth.test.tsx)

   The `WindowWidth` component listens to window resize events and updates its state with the window's width. This is a classic example of using effects in React.

   #### Test Scenarios

   1. **Set Width on Resize:** Ensures the `setWidth` function is called with the new window width when a resize event occurs.
   2. **Attach/Detach Resize Listener:** Checks that the resize listener is attached on component mount and removed on unmount.
   3. **Update Width on Resize Event:** Verifies that the component updates its displayed width when a resize event is dispatched.

   #### How to Test Components with Effects

   4. **Mocking and Simulating Events:**
      - Mock `window.addEventListener` and `window.removeEventListener`.
      - Simulate window resize by changing `window.innerWidth` and dispatching a resize event.

   5. **Testing the Resize Handler:**
      - Create a mock `setWidth` function.
      - Call `handleResize` with the mock `setWidth` and trigger it to see if it's called correctly.

   6. **Rendering and Assertions:**
      - Render the component and assert that event listeners are added/removed.
      - Verify the component’s response to window resize events.

   #### Purpose

   - **Effect Verification:** Ensure that side effects are correctly triggered in response to events or conditions.
   - **State Update Checks:** Confirm that the component's state is updated in response to side effects.

   #### Best Practices

   - **Cleanup in Tests:** Use `afterEach(cleanup)` to unmount components after each test to prevent test interference.
   - **Mock Global Objects and Events:** Mock global objects like `window` and their methods to simulate real-world scenarios.
   - **Async State Updates:** Use `waitFor` from `@testing-library/react` for assertions involving asynchronous state updates.

   By meticulously testing the side effects in your React components, you ensure that they respond correctly to external events and manage their internal state effectively. This approach is crucial for components that interact with browser APIs or rely on external data sources.

  ### Testing custom Hooks

   #### Overview
   Custom hooks in React encapsulate reusable logic and can have complex behaviors, including side effects and state management. Testing custom hooks ensures that they function correctly across different scenarios and use cases.

   #### The `useFetchData` Hook Example

   [useFetchData.ts](src/recepies/testing-custom-hooks/useFetchData.ts)

   [useFetchData.test.ts](src/recepies/testing-custom-hooks/tests/useFetchData.ts)

   The `useFetchData` hook demonstrates a common pattern: fetching data from an API, handling loading states, and dealing with errors. This makes it an excellent example for testing custom hooks.

   #### Test Scenarios

   1. **Successful Data Fetch:** Verifies that the hook fetches and returns data successfully.
   2. **Error Handling:** Checks that the hook handles errors correctly during the fetch operation.

   #### How to Test Custom Hooks

   3. **Mocking Fetch:** Mock the global `fetch` function to control the response of network requests.

      ```javascript
      global.fetch = jest.fn();
      ```

   4. **Rendering Hook with `renderHook`:**
      - Use `@testing-library/react-hooks`' `renderHook` to render the custom hook.
      - Supply any necessary arguments (like the URL for the `useFetchData` hook).

   5. **Simulating Scenarios and Assertions:**
      - Mock different responses from fetch for success and error scenarios.
      - Use `waitFor` to handle asynchronous updates.
      - Assert that the hook returns the expected state (`data`, `loading`, `error`) for each scenario.

   #### Purpose

   - **Validate Hook Logic:** Ensure that the hook correctly manages state and side effects based on external interactions (like API calls).
   - **Robustness and Reliability:** Confirm that the hook can handle various situations, including successful responses, errors, and loading states.

   #### Best Practices

   - **Isolate Hook Logic:** Test hooks independently from the components that might use them.
   - **Realistic Mocks:** Use realistic data and scenarios when mocking API responses or other external dependencies.
   - **Cleanup and Reset:** Reset or restore mocks after each test to ensure a clean state for subsequent tests.

   By thoroughly testing your custom hooks, you ensure that they behave reliably and handle various real-world situations effectively. This is crucial for maintaining the integrity and robustness of your React application's logic.

  ### Testing with router

   #### Overview
   Testing components that rely on React Router involves simulating routing contexts and ensuring that components correctly respond to route changes. This includes testing components that use hooks like `useParams` to extract parameters from the route.

   #### The `Profile` Component Example

    [Profile.tsx](src/recepies/testing-with-router/Profile.tsx)

    [Profile.test.tsx](src/recepies/testing-with-router/tests/Profile.test.tsx)

   The `Profile` component fetches and displays user data based on a user ID obtained from the URL parameters. This makes it an ideal candidate for testing with React Router.

   #### Test Scenarios

   - **Fetching and Displaying Data:** Ensures the component fetches data based on the URL parameter and displays it correctly.

   #### How to Test Components with React Router

   1. **Mocking Fetch and Simulating Routes:**
      - Mock the global `fetch` function to control the response of network requests.
      - Use `MemoryRouter` and `Routes` from `react-router-dom` to simulate the routing context for the component.

   2. **Rendering with Route Parameters:**
      - Render the `Profile` component within `MemoryRouter` and `Routes`, providing the initial route that includes the necessary parameter.

   3. **Assertions:**
      - Mock different responses from fetch for success scenarios.
      - Use `waitFor` from `@testing-library/react` to wait for asynchronous data fetching.
      - Assert that the component renders the fetched data correctly.

   #### Purpose

   - **Route Parameter Handling:** Verify that the component correctly reads and uses route parameters.
   - **Dynamic Data Fetching:** Ensure that the component fetches data corresponding to the route parameters and handles loading and error states.

   #### Best Practices

   - **Realistic Route Environment:** Use `MemoryRouter` to provide a realistic routing context for the component during testing.
   - **Async Handling:** Use asynchronous utilities like `waitFor` for components that perform data fetching or other asynchronous operations.
   - **Mock Cleanup:** Reset or restore mocks after each test to ensure a clean testing environment.

   By applying these testing practices, you can effectively verify the integration and functionality of React Router in your components, ensuring they respond correctly to routing changes and handle route parameters as expected.

  ### Testing context API

   #### Overview
   Testing components that use the Context API involves verifying that they correctly interact with context values and respond to context changes. This ensures that context-dependent logic and UI updates function as expected.

   #### The `ThemeSwitcher` Component Example

   [ThemeContext.tsx](src/recepies/testing-context-api/ThemeContext.tsx)

   [ThemeSwitcher.tsx](src/recepies/testing-context-api/ThemeSwitcher.tsx)

   [ThemeSwitcher.test.tsx](src/recepies/testing-context-api/tests/ThemeSwitcher.test.tsx)

   The `ThemeSwitcher` component, which uses a `ThemeContext`, is an excellent example of a context-dependent component. It reads the current theme and provides a button to toggle it.

   #### Test Scenario

   - **Toggle Theme Functionality:** Ensures that clicking the button toggles the theme between light and dark.

   #### How to Test Components with Context API

   1. **Rendering within Context Provider:**
      - Render the `ThemeSwitcher` component within the `ThemeProvider` to provide the necessary context.

   2. **Simulating User Interaction:**
      - Use `fireEvent` from `@testing-library/react` to simulate user interactions, such as clicking the button.

   3. **Assertions:**
      - After the button click, assert that the button's text content updates to reflect the new theme state.

   #### Purpose

   - **Context Interaction:** Verify that the component correctly reads and reacts to context values.
   - **UI Responsiveness:** Ensure that UI updates appropriately in response to context changes.

   #### Best Practices

   - **Provide Necessary Context:** Always render context-dependent components within their respective context providers when testing.
   - **User Interaction Simulation:** Simulate real user interactions as closely as possible to test the component's functionality.
   - **Assert on UI Changes:** Focus on testing the changes in the UI and behavior of the component in response to context updates.

   By following these testing practices, you can ensure that your components integrate seamlessly with the React Context API and behave as expected in different context states. This approach is crucial for components that rely heavily on context for their logic and rendering.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Talwinder Singh - [Email](mailto:singhtalwinder790@gmail.com)
