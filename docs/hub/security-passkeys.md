# Passkeys

Passkeys let you sign in to the Hugging Face Hub with your fingerprint, face, device screen lock, or a hardware security key instead of your password. They are based on the [WebAuthn](https://www.w3.org/TR/webauthn/) standard and are resistant to phishing, since a passkey only works on the website it was created for.

Passkeys can be used in two ways:
- As a **sign-in method**, replacing your username and password
- As a **second factor** for [two-factor authentication (2FA)](./security-2fa), asked for after you sign in with your password

## Add a passkey

1. Go to your [Authentication settings](https://hf.co/settings/authentication)
2. In the **Passkeys** section, click **Add a passkey**
3. Follow the instructions from your browser, device, or password manager to create the passkey

You can register several passkeys, for example one per device or one in your password manager and one on a hardware security key. Passkeys that are synced across your devices by a password manager are marked with a **Synced** badge.

> [!NOTE]
> If your organization requires you to sign in with [SSO](./security-sso), you can't add passkeys to your account.

## Sign in with a passkey

On the [Hub sign-in page](https://hf.co/login), click on the username or email field. If you have a passkey for Hugging Face, your browser or password manager suggests it. Select it and confirm with your device to sign in, without typing your password.

Signing in with a passkey already verifies your identity with your device, so you aren't prompted for an additional two-factor authentication code.

## Use passkeys for two-factor authentication

Once you've added at least one passkey, you can use passkeys as a second factor when you sign in with your password:

1. Go to your [Authentication settings](https://hf.co/settings/authentication)
2. In the **Passkeys** section, click **Turn on** next to **Two-factor authentication**

If you didn't already have two-factor authentication enabled, the Hub then displays a list of recovery codes. Download them and keep them in a safe place. See [Recovery codes](./security-2fa#recovery-codes) for more details.

After signing in with your password, you'll be asked to confirm with one of your passkeys. If you have also set up an authenticator app, you can choose to use it instead, or use a recovery code.

To stop using passkeys as a second factor, click **Turn off** next to **Two-factor authentication** in the **Passkeys** section. This doesn't remove your passkeys, and you can still use them to sign in.

## Manage your passkeys

In the **Passkeys** section of your [Authentication settings](https://hf.co/settings/authentication), you can see when each passkey was added and last used, and:
- **Rename** a passkey to recognize it more easily
- **Remove** a passkey. You won't be able to sign in with it anymore.

> [!TIP]
> If passkeys are enabled for two-factor authentication, you need to turn off two-factor authentication with passkeys before you can remove your last passkey.

When you remove a passkey from the Hub, it may still be stored on your device or in your password manager. You can delete it there as well.
