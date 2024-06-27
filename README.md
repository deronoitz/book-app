This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Stack Used
This project is built using:
- NextJS 14 (with pages router)
- SASS (with SCSS format)
- SWR (Cache libary)
- React Hook Form (Form handling library)

## Project Structure

```
.
└── src/
    ├── apis/
    │   └── interfaces/
    ├── components/
    │   ├── scenes/
    │   └── shared/
    ├── entities/
    ├── helpers/
    ├── hooks/
    ├── pages/
    └── styles/
```
#### Details
- **apis**: Folder to store function for API calls
  - interfaces: Store all API interface, per file per category. Example: Books, Auth, User.
- **components**: All components stored here
  - **scenes**: This folder contains page components that called in main routes
  - **shared**: This folder contains small and reusable components that called in scenes components
- **entities**: Folder to store types 
- **helpers**: Folder to store global custom function 
- **hooks**: Folder to store custom hooks
- **pages**: Main routes folder, same with NextJS structure
- **styles**: Global styles folder