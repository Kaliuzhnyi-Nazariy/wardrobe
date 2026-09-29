# WARDROBE

A simple, user-friendly mobile application designed to help you organize your wardrobe and create new outfits.

## Download

[Insert download link here]

---

## Test Account

Use these credentials to test the application:

```bash
Email: user@email.com
Password: PAssword11!!
```

---

## Features

### Authentication
* **JWT-based** authentication flow
* **Persisted** authentication state

### Items & Styles
* **CRUD operations:** Create, read, update, and delete wardrobe items
* **Media support:** Image upload capabilities for clothes and outfits
* **Advanced filtering:** Search and sort items easily

### UI/UX
* **Multi-language support:** Available in 4 languages (English, Polish, Ukrainian, and Russian)
* **Robust UX:** Dedicated loading and error states
* **Dynamic UI:** Conditional rendering for forms

---

## Tech Stack

* **Core:** React Native, TypeScript
* **State Management:** Redux Toolkit, TanStack Query (React Query)
* **Form Handling:** React Hook Form, Zod

### Services & Infrastructure
* **Cloudinary:** Image hosting and management
* **Expo:** Development and deployment ecosystem

---

## Architecture Decisions

### State Management
* **Redux Toolkit:** Chosen for managing global UI states and persistent authentication data.
* **TanStack Query:** Handles server state, caching, asynchronous request lifecycles, and automatic data refetching/invalidation.

### Validation Strategy
* **Zod & React Hook Form:** Combined to achieve scalable form validation, predictable form behavior, and type-safe request payload handling.

---

## How to Run Locally

1. Clone the repository and navigate to the project folder.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Create a `.env` file in the root directory and add the following variable:

```env
EXPO_PUBLIC_API_URL=
```

---

## Future Improvements

* **Home Screen:** Introduce a personalized outfit recommendation list.
* **AI Integration:** Generate virtual try-on photos based on user-uploaded pictures.
* **Offline First:** Implement offline support (syncing data automatically once internet connection is restored).

---

## What I Learned

Building this project helped me strengthen my skills in:
* React Native core concepts and mobile layout paradigms
* Strict-mode TypeScript for safer codebases
* Internationalization (i18n) and multi-language application flows
* Asynchronous server-state management
* Expo workflow configurations and environment management
