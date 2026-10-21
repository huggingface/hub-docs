# Two-Factor Authentication (2FA)

Using two-factor authentication verifies a user's identity with two methods, adding extra security to ensure only authorized individuals can access an account, even if the password is compromised.

If you choose to enable two-factor authentication, at every login you will need to provide:
- Username or email & password (normal login credentials)
- One-time security code via app, or a [passkey](./security-passkeys)

You can set up an authenticator app, passkeys, or both. If you set up both, you can choose which one to use when you sign in.

## Enable Two-factor Authentication (2FA)

To enable two-factor authentication with passkeys, see [Use passkeys for two-factor authentication](./security-passkeys#use-passkeys-for-two-factor-authentication).

To enable Two-factor Authentication with a one-time password:

On the Hugging Face Hub:
1. Go to your [Authentication settings](https://hf.co/settings/authentication)
2. In the **Authenticator app** section, select **Set up an authenticator app**

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

> [!TIP]
> You will be prompted for 2FA every time you log in, and every 30 days

## Recovery codes

Right after you've successfully activated 2FA with a one-time password or a passkey, you're requested to download a collection of generated recovery codes. If you ever lose access to your one-time password authenticator or your passkeys, you can use one of these recovery codes to log in to your account.

- Each code can be used only **once** to sign in to your account
- You should copy and print the codes, or download them for storage in a safe place. If you choose to download them, the file is called **huggingface-recovery-codes.txt**

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/recovery-codes.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/recovery-codes-dark.png" />
</div>

If you lose the recovery codes, or want to generate new ones, you can use the [Authentication settings](https://hf.co/settings/authentication) page.

## Regenerate two-factor authentication recovery codes

To regenerate 2FA recovery codes:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. If you’ve already configured 2FA, select **View Recovery codes** (authenticator app) or **Recovery codes** (passkeys)
3. Click on Regenerate recovery codes

> [!WARNING]
> If you regenerate 2FA recovery codes, save them. You can’t use any previously created recovery codes.

## Sign in with two-factor authentication enabled

When you sign in with 2FA enabled, the process is only slightly different than the standard sign-in procedure. After entering your username and password, you'll encounter an additional prompt, depending on the type of 2FA you've set up. When prompted, confirm with one of your passkeys, or provide the pin from your one-time password authenticator's app or a recovery code to complete the sign-in process. If you have set up both passkeys and an authenticator app, you can switch between them from the prompt.

If you [sign in with a passkey](./security-passkeys#sign-in-with-a-passkey) instead of your password, you aren't prompted for a second factor.

<div class="flex justify-center">
    <img class="block dark:hidden" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/totp-confirm.png"/>
    <img class="hidden dark:block" src="https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/two-fa/totp-confirm-dark.png" />
</div>

## Disable two-factor authentication

To disable 2FA with an authenticator app:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. In the **Authenticator app** section, click on "Turn off".

To disable 2FA with passkeys:
1. Access your [Authentication settings](https://hf.co/settings/authentication)
2. In the **Passkeys** section, click on "Turn off" next to **Two-factor authentication**.

If you have set up both methods, turning off one of them keeps two-factor authentication enabled with the other.

## Recovery options

If you no longer have access to your authentication device, you can still recover access to your account:

- Use a saved recovery code, if you saved them when you enabled two-factor authentication
- Requesting help with two-factor authentication

### Use a recovery code

To use a recovery code:
1. Enter your username or email, and password, on the [Hub sign-in page](https://hf.co/login)
2. When prompted for a second factor, click on "Use a recovery code"
3. Enter one of your recovery codes

After you use a recovery code, you cannot re-use it. You can still use the other recovery codes you saved.

### Requesting help with two-factor authentication

In case you've forgotten your password and lost access to your two-factor authentication credentials, you can reach out to support (website@huggingface.co) to regain access to your account. You'll be required to verify your identity using a recovery authentication factor, such as an SSH key or personal access token.