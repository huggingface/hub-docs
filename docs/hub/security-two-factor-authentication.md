# Two-Factor Authentication

Implementing two-factor authentication is a method of verifying a user's identity by using two separate authentication methods. This extra layer of security ensures that only authorized individuals can access an account, even if the password has been compromised.

The two current methods employed for two-factor authentication include:
- Username and password (normal login credentials)
- One-time security code via app

## Enable Two-factor Authentication

To enable 2FA with a one-time password:

In the Hub:
1. Access your Settings
2. Select Authentication
3. Select Add Two-Factor Authentication

On your device (usually your phone):
- Install a compatible application. For example:
    - Authy
    - Google Authenticator
    - Microsoft Authenticator
    - FreeOTP

- In the application, add a new entry in one of two ways:
  - Scan the code displayed by Hugging Face Hub with your device’s camera to add the entry automatically
  - Enter the details provided to add the entry manually

In Hugging Face Hub:
1. Enter the six-digit pin number from the entry on your device into Pin code.
2. Save

<!-- screenshot -->


If you entered the correct pin, the Hub displays a list of recovery codes. Download them and keep them in a safe place.

## Recovery codes

Immediately after successfully enabling 2FA with a one-time password, you're prompted to download a set of generated recovery codes. If you ever lose access to your one-time password authenticator, you can use one of these recovery codes to sign in to your account.

- Each code can be used only once to sign in to your account.
- You should copy and print the codes, or use Download codes to download them for storage in a safe place. If you choose to download them, the file is called huggingface-recovery-codes.txt

<!-- blurred screenshot -->


If you lose the recovery codes, or want to generate new ones, you can use the 2FA account settings page.

### Regenerate two-factor authentication recovery codes

To regenerate 2FA recovery codes, you need access to a desktop browser:
1. Access your settings
2. Select Authentication
3. If you’ve already configured 2FA, select Backup Recovery Code
4. Click on Regenerate recovery codes

If you regenerate 2FA recovery codes, save them. You can’t use any previously created 2FA codes.

## Sign in with two-factor authentication enabled

Signing in with 2FA enabled is only slightly different than the typical sign-in process. Enter your username and password and you’re presented with a second prompt, depending on which type of 2FA you’ve enabled.
When asked, enter the pin from your one-time password authenticator’s application or a recovery code to sign in.

<!-- screenshot -->

## Disable two-factor authentication

To disable 2FA:
1. Access your User settings
2. Select Authentication
3. Click on Remove.

This clears all your 2FA registrations.

## Recovery options

If you don’t have access to your code generation device, you can recover access to your account:

- Use a saved recovery code, if you saved them when you enabled two-factor authentication
- Requesting help with two-factor authentication

### Use a saved recovery code

To use a recovery code:
1. Enter your username or email, and password, on the Hub sign-in page
2. When prompted for a two-factor code, click on "Lost access to your two-factor authentication app? Use a recovery code"
3. Enter one of your recovery code

After you use a recovery code, you cannot re-use it. You can still use the other recovery codes you saved.

### Requesting help with two-factor authentication

If you have forgotten your password and you've lost access to your two-factor authentication credentials, you can email support (website@huggingface.co) to regain access to your account. You'll need to verify your identity using a recovery authentication factor, such as an SSH key.

To complete your recovery request, you'll need to verify an alternative authentication factor. Choose a recovery verification factor.
- If you've previously set up an SSH key on this account, provide your public SSH key
- If you've previously set up a personal access token, provide one of your personal access tokens

A member of Hugging Face support will review your request and email you. If your request is approved, your account 2fa will be reset. If your request is denied, the email will include a way to contact support with any additional questions.