# Next.js SSO Authentication App

This is a Next.js project with TypeScript, Tailwind CSS, and SSO authentication features, including common login, signup, forgot-password, reset-password, Google login, link-account, setup-password, and account settings.

## Project Structure

```
src/
├── assets/
│ ├── scss/
│ │ ├── components/
│ │ │ ├── \_elements.scss
│ │ │ └── \_form.scss
│ │ ├── \_theme.scss
│ │ └── styles.scss
│ ├── svgs/
│ │ └── index.tsx
├── components/
│ ├── config/
│ │ ├── metaTags.tsx
│ │ └── site.js
│ ├── global/
│ │ ├── shimmerImage/
│ │ │ └── index.tsx
│ │ ├── authLayout/
│ │ │ └── index.tsx
│ │ ├── basicModal/
│ │ │ └── index.tsx
│ │ ├── button/
│ │ │ └── index.tsx
│ │ ├── forms/
│ │ │ ├── Input.tsx
│ │ │ └── label.tsx
│ │ ├── image/
│ │ │ └── index.tsx
│ │ ├── layout/
│ │ │ └── index.tsx
│ │ ├── shimmers/
│ │ │ └── index.tsx
│ │ └── userDropdown/
│ │   └── index.tsx
│ ├── header/
│ │ └── index.tsx
│ ├── hoc/
│ │ ├── withAuthentication.tsx
│ │ └── withoutAuthentication.tsx
│ ├── modals/
│ │ ├── accountCreated.tsx
│ │ ├── accountVerified.tsx
│ │ ├── email.tsx
│ │ ├── index.ts
│ │ ├── logout.tsx
│ │ ├── passwordUpdated.tsx
│ │ ├── signup.tsx
│ │ └── verifyOTP.tsx
│ ├── modules/
│ │ ├── auth/
│ │ │ ├── forgotPassword/
│ │ │ │ └── index.tsx
│ │ │ ├── linkAccount/
│ │ │ │ └── index.tsx
│ │ │ ├── login/
│ │ │ │ ├── index.tsx
│ │ │ │ └── password.tsx
│ │ │ ├── otpVerification/
│ │ │ │ └── index.tsx
│ │ │ ├── resetPassword/
│ │ │ │ └── index.tsx
│ │ │ ├── signup/
│ │ │ │ ├── index.tsx
│ │ │ │ └── password.tsx
│ │ │ └── verifyEmail/
│ │ │ └── index.tsx
│ │ └── settings/
│ │ ├── components/
│ │ │ ├── passwordSettings.tsx
│ │ │ ├── profileSettings.tsx
│ │ │ └── settingsTabs.tsx
│ │ └── index.tsx
│ └── socialAuth/
│ └── index.tsx
├── enums/
│ ├── modals.enum.ts
│ ├── providers.enum.ts
│ ├── routes.enum.ts
│ ├── steps.enum.ts
│ └── text.enum.ts
├── hooks/
│ ├── useDebouncedClick.tsx
│ ├── useLoggedInStatus.ts
│ ├── useLoggedInUser.tsx
│ ├── useRedirectAuthenticatedUser.ts
│ ├── useRedirectUnAuthenticatedUser.ts
│ └── useSocialAuthLogin.tsx
├── interfaces/
│ ├── button.ts
│ ├── container.ts
│ ├── response.ts
│ ├── token.ts
│ └── user.ts
├── pages/
│ ├── login/
│ │ ├── google.tsx
│ │ ├── index.tsx
│ │ └── password.tsx
│ ├── signup/
│ │ ├── index.tsx
│ │ ├── password.tsx
│ │ └── setup-password.tsx
│ ├── 404.tsx
│ ├── \_app.tsx
│ ├── \_document.tsx
│ ├── forgot-password.tsx
│ ├── link-account.tsx
│ ├── otp-verify.tsx
│ ├── reset-password.tsx
│ ├── settings.tsx
│ └── verify-email.tsx
├── services/
│ ├── auth.service.ts
│ ├── base.service.ts
│ ├── helper.service.ts
│ ├── social-auth.service.ts
│ └── user.service.ts
├── styles/
│ └── Components/
├── utils/
│ ├── decodeTokenHandler.ts
│ ├── errorHandler.ts
│ ├── getCookie.ts
│ ├── images.ts
└── validations/
├── auth/
│ ├── forgotPassword.ts
│ ├── identify.ts
│ ├── linkAccount.ts
│ ├── login.ts
│ ├── register.ts
│ ├── resetPassword.ts
│ ├── setupPassword.ts
│ └── verifyOTP.ts
├── updatePassword.ts
├── updateProfile.ts
└── uploadDocument.ts
```

## Features

- **User Authentication**: Register, login, and manage user sessions using JWT for secure authentication.
- **Password Management**: Allow users to securely reset and update their passwords.
- **Email Verification**: Verify user emails using OTP for enhanced security during registration and account updates.
- **Social Authentication with Google**: Authenticate users seamlessly using their Google accounts for quick access.
- **Link-Account Feature with OTP**: Enable users to link multiple accounts with OTP verification for added account management flexibility.
- **Responsive Design**: Ensure a seamless user experience across devices with responsive design principles.
- **Email Notifications**: Send formatted emails using HTML templates rendered with Jinja2 for various user actions and notifications.
- **User Profile Management**: Allow users to update their profile information, including avatar, bio, and other details.
- **Password Update**: Provide functionality for users to securely update their passwords with proper validation.
- **Session Management**: Manage user sessions securely to maintain login state and protect user data.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/Renesis-Tech-Inc/next-sso-auth.git
    cd next-sso-auth
    ```

2.  ```bash
    yarn install
    ```

3.  ```bash
          yarn run dev
    ```
    Open http://localhost:3000 with your browser to see the application.

## Docker commands:
- Build the Docker image:
        ```sh
        make docker-build
        ```
    - Run the Docker container:
        ```sh
        make docker-run
        ```
    - Stop the Docker container:
        ```sh
        make docker-stop
        ```
    - Remove the Docker container:
        ```sh
        make docker-remove
        ```
    - Clean up Docker images:
        ```sh
        make docker-clean
        ```
    - Rebuild and run the Docker container:
        ```sh
        make docker-rebuild
        ```

## Contributing

Contributions are welcome! If you find any issues or have suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
