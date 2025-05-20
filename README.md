# Linked

Linked is a web application that allows users to search for and view company financial data.

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Vite](https://vite.dev/)

## Installation

```bash
npm install
```

## Running the app

```bash
npm run dev
```

## Usage & UI

1. Start the app: `npm run dev`
2. Type at least 3 characters in the search bar.
3. Matching companies display in a list with key data:
   - Basic info (name, industry, country)
   - Latest financials (revenue)
   - Details (CEO name, size, headquarters)
4. If no matches are found, displays “No results found.”
5. Results can be filtered further using the filter select inputs at the top of the page.
6. Results can be sorted using the sort select inputs at the top of the page.
7. Results are paginated and can be navigated using the pagination controls at the bottom of the page.
8. Detailed company information can be viewed by clicking on the company name in the list.

## Data Model & Storage

- **Company**: `name`, `country`, `industry`, `foundedYear`
- **FinancialData**: `year`, `revenue`, `netIncome`
- **CompanyDetails**: `companyType`, `size`, `ceoName`, `headquarters`
- All data is generated in-memory by `src/data/mockData.ts` and processed in a web worker.
- Number of generated companies can be adjusted in `src/constants/number-of-companies.const.ts` (default is 1000).

## Search Behavior

- Search triggers automatically when the user types at least 3 characters.
- Searches across all fields: `name`, `country`, `industry`, `foundedYear`, `year`, `revenue`, `netIncome`, `companyType`, `size`, `ceoName`, `headquarters`.
- Debounced input prevents excessive worker calls.

## Extensions

- **Filtering & Sorting**: Added filters by `industry`, `companySize`, and `companyType`, and sort by `name`, `revenue`, `foundedYear` to improve data exploration.
- **Pagination**: Added pagination to improve performance and user experience.
- **Company Detail**: Added company detail view to provide more information about the company.

## Project Structure

```
src/
  components/
    ui/           Shadcn UI components
    ...           UI components (SearchBar, CompanyCard)
  constants/      Constants (mock data generation, sorting, filtering)
  data/
    mockData.ts   In-memory data source
  interfaces/     Interfaces for data models
  lib/            Utility functions (filter, sort, format)
  providers/      Providers (theme provider)
  store/          Zustand store (company.store.ts)
  types/          Types for data models
  workers/        Web worker for filtering
README.md         Project documentation
```
