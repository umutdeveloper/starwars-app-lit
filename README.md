# StarWars Explorer (Lit Element)

This web application is developed using Lit and Vite. It applies the Redux pattern using Redux Toolkit and is built with a Mobile First approach using the Shoelace library. The application is ready to be deployed directly with Docker or Vercel.

## Access

You can access this project at [https://starwars-lit.umutcakir.com](https://starwars-lit.umutcakir.com). It is deployed on Vercel and redirected through a subdomain created with a CNAME record.

## Features

- **State Management:** State is managed with Redux Toolkit. Async operations are handled using Thunk middleware. Custom middleware is written to manage side effects.
- **Generic Reducer and Slice Generator:** A generator for creating reducers and slices for each endpoint of the StarWars API, which is generic. You can create a slice and reducer with thunk actions by entering the necessary parameters for any endpoint.
- **Type Safety:** All requests from the StarWars API are mapped to type-safe objects using mappers. If there is a data type issue in the received JSON data, an error is thrown.
- **Performance Optimization:** Components are developed with performance in mind and lazy Components where necessary.
- **Deferred Loading:** A Higher-Order Component (HOC) named `DeferredComponent` is developed to prevent loading of Card components until they appear on the screen. Instead, a `CardPlaceholder` is shown for each Card component. Cards are loaded automatically when the user scrolls to their position.
- **Page Management Component:** An abstract component named `SwapiListPage` is developed to handle common page management logic across all pages, promoting reusability and reducing code size.
- **Error Handling:** A generic `ErrorBoundary` component is created to display an error page and inform the user in case of any errors.
- **Request Management Middleware:** A custom middleware named `swapiRequestItemMiddleware` is developed to manage data requests item by item. It sends requests in groups of 5 from the API request list, reducing the server load and preventing possible client-side freezes.
- **Search Validation:** The search bar on each page has validation and only allows numeric and character input.
- **Unit Testing:** The structure for unit testing is set up through Vite, with sample unit tests written for specific points. These can be checked with the `npm run test` command. The test command is also added before the build command to prevent builds if the tests fail.
- **Docker Deployment:** To run the project with Docker, install Docker on your computer and run `npm run build:docker`. This will start a static deployment running on Nginx in the background, available on port 80.
- **Vercel Deployment:** To run the project with Vercel, add your repository information to Vercel. The necessary settings are configured in `vercel.json`.

## Future Enhancements

- **Modal Dialogs:** Implement modal dialogs to display details when clicking on icon buttons in the People List page.
- **Card Customization:** Modify the appearance of the cards and apply customizations.
- **Direct Page Selection:** Enable direct page selection for navigation.

## Getting Started

### Prerequisites

- Node.js (^20.15.1)
- Docker (optional for Docker deployment)
- Vercel account (optional for Vercel deployment)

### Installation

1. Clone the repository:
   ```sh
   git clone <REPOSITORY_URL>
   ```
2. Navigate to the project directory:
   ```sh
   cd <REPOSITORY_NAME>
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Development

1. Run the development server:
   ```sh
   npm run dev
   ```
2. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Deployment

#### Docker

1. Build and run the Docker container:
   ```sh
   npm run build:docker
   ```
2. Access the application at [http://localhost](http://localhost).

#### Vercel

1. Connect your repository to Vercel.
2. Deploy the project from the Vercel dashboard.

## Testing

Run unit tests with the following command:

```sh
npm run test
```
