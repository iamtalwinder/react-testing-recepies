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
    - [Testing effects](#testing-effects)
    - [Testing custom Hooks](#testing-custom-hooks)
    - [Testing with router](#testing-with-router)
    - [Testing contest API](#testing-contest-api)
    - [Testing Redux](#testing-redux)
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
   Your `Countdown` component is an ideal case for timer testing. It decrements a counter every second, demonstrating a common use of `setTimeout`.

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
  ### Testing effects
  ### Testing custom Hooks
  ### Testing with router
  ### Testing contest API
  ### Testing Redux

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Talwinder Singh - [Email](mailto:singhtalwinder790@gmail.com)
