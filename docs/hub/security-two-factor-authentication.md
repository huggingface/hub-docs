# Two-Factor Authentication

Implementing two-factor authentication is a method of verifying a user's identity by using two separate authentication methods. This extra layer of security ensures that only authorized individuals can access an account, even if the password has been compromised.

If you choose to enable two-factor authentication, at every login you will need to provide:
- Username or email & password (normal login credentials)
- One-time security code via app

## Enable Two-factor Authentication (2FA)

To enable Two-factor Authentication with a one-time password:

In the Hugging Face Hub:
1. Go to your [Authentication settings](https://hf.co/settings/authentication)
2. Select Add Two-Factor Authentication

On your device (usually your phone):
1. Install a compatible application. For example:
    - Authy
    - Google Authenticator
    - Microsoft Authenticator
    - FreeOTP
2. In the application, add a new entry in one of two ways:
  - Scan the code displayed by Hugging Face Hub with your device’s camera to add the entry automatically
  - Enter the details provided to add the entry manually

In Hugging Face Hub:
1. Enter the six-digit pin number from the entry on your device into Pin code.
2. Save

<!-- screenshot -->

If you entered the correct pin, the Hub displays a list of recovery codes. Download them and keep them in a safe place.

## Recovery codes

Right after you've successfully activated 2FA with a one-time password, you're requested to download a collection of generated recovery codes. If you ever lose access to your one-time password authenticator, you can utilize one of these recovery codes to log in to your account.

- Each code can be used only **once** to sign in to your account
- You should copy and print the codes, or use "Download codes" to download them for storage in a safe place. If you choose to download them, the file is called **huggingface-recovery-codes.txt**

<!-- blurred screenshot -->

If you lose the recovery codes, or want to generate new ones, you can use the [Authentication settings](https://hf.co/settings/authentication) page.

## Regenerate two-factor authentication recovery codes

To regenerate 2FA recovery codes:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. If you’ve already configured 2FA, select Recovery Code
3. Click on Regenerate recovery codes

<Tip warning={true}>
If you regenerate 2FA recovery codes, save them. You can’t use any previously created recovery codes.
</Tip>

## Sign in with two-factor authentication enabled

When you sign in with 2FA enabled, the process is only slightly different than the standard sign-in procedure. After entering your username and password, you'll encounter an additional prompt, depending on the type of 2FA you've set up. When prompted, provide the pin from your one-time password authenticator's app or a recovery code to complete the sign-in process.

<!-- screenshot -->

## Disable two-factor authentication

To disable 2FA:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. Click on "Remove".

This clears all your 2FA registrations.

## Recovery options

If you don’t have access to your code generation device, you can recover access to your account:

- Use a saved recovery code, if you saved them when you enabled two-factor authentication
- Requesting help with two-factor authentication

### Use a recovery code

To use a recovery code:
1. Enter your username or email, and password, on the [Hub sign-in page](https://hf.co/login)
2. When prompted for a two-factor code, click on "Lost access to your two-factor authentication app? Use a recovery code"
3. Enter one of your recovery code

After you use a recovery code, you cannot re-use it. You can still use the other recovery codes you saved.

### Requesting help with two-factor authentication

In case you've forgotten your password and lost access to your two-factor authentication credentials, you can reach out to support (website@huggingface.co) to regain access to your account. You'll be required to verify your identity using a recovery authentication factor, such as an SSH key.

To complete your recovery request, you'll need to confirm an alternative authentication factor. Choose a recovery verification method:
- If you've previously established an SSH key on this account, provide your public SSH key
- If you've previously set up a personal access token, provide one of your personal access tokens

A Hugging Face support member will review your request and send you an email. If your request is approved, your account's two-factor authentication will be reset. If your request is denied, the email will include a way to contact support with any additional questions.