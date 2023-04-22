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
    - [Testing with Timer](#testing-with-timer)
    - [Testing user integractions](#testing-user-integractions)
    - [Testing with error boundaries](#testing-with-error-boundaries)
    - [Testing with router](#testing-with-router)
    - [Testing effects](#testing-effects)
    - [Testing custom Hooks](#testing-custom-hooks)
    - [Testing contest API](#testing-contest-api)
    - [Testing Redux](#testing-redux)
    - [Testing components with router](#testing-components-with-router)
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

   ```tsx
   import React from 'react';

   type ButtonProps = {
     text?: string;
     onClick?: () => void;
     color?: string;
     disabled?: boolean;
   };

   function Button({ text, onClick, color, disabled }: ButtonProps) {
     return (
       <button
         onClick={onClick}
         style={{ backgroundColor: color }}
         disabled={disabled}>
         {text}
       </button>
     );
   };

   export default Button;
   ```


   ```tsx
   import { render } from '@testing-library/react';
   import Button from '../Button';

   describe('[Snapshot testing] Button Component', () => {
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
   ```

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

   ```tsx
   import { useEffect, useState } from 'react';
   import { Post } from './Post';
   import './PostList.css';

   type Props = {
     limit?: number;
     page?: number;
   };

   function PostListFetch({ limit = 5, page: initialPage = 1 }: Props) {
     const [posts, setPosts] = useState<Post[]>([]);
     const [page, setPage] = useState<number>(initialPage);
     const [error, setError] = useState<string>('');

     useEffect(() => {
       fetch(
         `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
       )
         .then((response) => {
           if (!response.ok) {
             throw new Error('Something went wrong!');
           }
           return response.json();
         })
         .then((data) => setPosts(data))
         .catch((err) => setError(err.message));
     }, [limit, page]);

     const renderPageList = (start: number, end: number) => {
       const list = [];

       for (let pageNumber = start; pageNumber <= end; pageNumber++) {
         list.push(
           <button
             key={pageNumber}
             className={pageNumber === page ? 'active' : ''}
             onClick={() => setPage(pageNumber)}
           >
             {pageNumber}
           </button>
         );
       }

       return list;
     };

     return (
       <>
         <div>
           <h1>Post list</h1>
           <ul>
             {posts.map((post: Post) => (
               <li key={post.id}>{[post.title]}</li>
             ))}
           </ul>
         </div>

         { error && <p className='error'>{error}</p>}

         <div>
           <div className="page-list">{renderPageList(1, 10)}</div>
         </div>

       </>
     );
   }

   export default PostListFetch;
   ```


   ```tsx
   import { render, waitFor, screen } from '@testing-library/react';
   import PostListFetch from '../PostListFetch';

   // Mock global fetch API
   global.fetch = jest.fn() as jest.Mock;

   const mockedFetch = fetch as jest.Mock;

   describe("[Testing with API call] PostListFetch", () => {
     beforeEach(() => {
       mockedFetch.mockClear();
     });

     test("successfully fetches and displays posts", async () => {
       mockedFetch.mockResolvedValueOnce({
         ok: true,
         json: async () => [{ id: 1, title: "Test Post" }],
       });

       render(<PostListFetch />);

       await waitFor(() => {
         expect(screen.getByText("Test Post")).toBeInTheDocument();
       });
     });

     test("displays an error message on fetch failure", async () => {
       mockedFetch.mockResolvedValueOnce({ ok: false });

       render(<PostListFetch />);

       await waitFor(() => {
         expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
       });
     });
   });

   ```

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


  ### Testing with Timer
  ### Testing user integractions
  ### Testing with error boundaries
  ### Testing with router
  ### Testing effects
  ### Testing custom Hooks
  ### Testing contest API
  ### Testing Redux
  ### Testing components with router

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Talwinder Singh - [Email](mailto:singhtalwinder790@gmail.com)
