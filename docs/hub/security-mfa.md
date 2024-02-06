# Multiple-factor Authentication

Using multiple-factor authentication verifies a user's identity with two methods, adding extra security to ensure only authorized individuals can access an account, even if the password is compromised.

If you choose to enable multiple-factor authentication, at every login you will need to provide:
- Username or email & password (normal login credentials)
- One-time security code via app

## Enable Multiple-Factor Authentication (MFA)

To enable multiple-factor authentication with a one-time password:

In the Hugging Face Hub:
1. Go to your [Authentication settings](https://hf.co/settings/authentication)
2. Select Add multiple-factor Authentication

On your device (usually your phone):
1. Install a compatible application. For example:
    - Authy
    - Google Authenticator
    - Microsoft Authenticator
    - FreeOTP
2. In the application, add a new entry in one of two ways:
    - Scan the code displayed on screen Hub with your device’s camera to add the entry automatically
    - Enter the details provided to add the entry manually

In Hugging Face Hub:
1. Enter the six-digit pin number from your authentication device into "Code"
2. Save

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/settings.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/settings-dark.png" />
</div>

If you entered the correct pin, the Hub displays a list of recovery codes. Download them and keep them in a safe place.

## Recovery codes

Right after you've successfully activated MFA with a one-time password, you're requested to download a collection of generated recovery codes. If you ever lose access to your one-time password authenticator, you can use one of these recovery codes to log in to your account.

- Each code can be used only **once** to sign in to your account
- You should copy and print the codes, or use "Download codes" to download them for storage in a safe place. If you choose to download them, the file is called **huggingface-recovery-codes.txt**

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/recovery-codes.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/recovery-codes-dark.png" />
</div>

If you lose the recovery codes, or want to generate new ones, you can use the [Authentication settings](https://hf.co/settings/authentication) page.

## Regenerate multiple-factor authentication recovery codes

To regenerate MFA recovery codes:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. If you’ve already configured MFA, select Recovery Code
3. Click on Regenerate recovery codes

<Tip warning={true}>
If you regenerate MFA recovery codes, save them. You can’t use any previously created recovery codes.
</Tip>

## Sign in with multiple-factor authentication enabled

When you sign in with MFA enabled, the process is only slightly different than the standard sign-in procedure. After entering your username and password, you'll encounter an additional prompt, depending on the type of MFA you've set up. When prompted, provide the pin from your one-time password authenticator's app or a recovery code to complete the sign-in process.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/totp-confirm.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/totp-confirm-dark.png" />
</div>

## Disable multiple-factor authentication

To disable MFA:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. Click on "Remove".

This clears all your MFA registrations.

## Recovery options

If you no longer have access to your authentication device, you can still recover access to your account:

- Use a saved recovery code, if you saved them when you enabled multiple-factor authentication
- Requesting help with multiple-factor authentication

### Use a recovery code

To use a recovery code:
1. Enter your username or email, and password, on the [Hub sign-in page](https://hf.co/login)
2. When prompted for a multiple-factor code, click on "Lost access to your multiple-factor authentication app? Use a recovery code"
3. Enter one of your recovery codes

After you use a recovery code, you cannot re-use it. You can still use the other recovery codes you saved.

### Requesting help with multiple-factor authentication

In case you've forgotten your password and lost access to your multiple-factor authentication credentials, you can reach out to support (website@huggingface.co) to regain access to your account. You'll be required to verify your identity using a recovery authentication factor, such as an SSH key or personal access token.