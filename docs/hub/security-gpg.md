# Signing commits with GPG

`git` has an authentication layer to control who can push commits to a repo, but it does not authenticate the actual commit authors.

In other words, you can commit changes as `Elon Musk <elon@tesla.com>`, push them to your preferred `git` host (for instance github.com), and your commit will link to Elon's GitHub profile. (Try it! But don't blame us if Elon gets mad at you for impersonating him.)

The reasons we implemented GPG signing were:
- To provide finer-grained security, especially as more and more Enterprise users rely on the Hub.
- To provide ML benchmarks backed by a cryptographically-secure source.

See Ale Segala's [How (and why) to sign `git` commits](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html) for more context.

You can prove a commit was authored by you with GNU Privacy Guard (GPG) and a key server. GPG is a cryptographic tool used to verify the authenticity of a message's origin. We'll explain how to set this up on Hugging Face below.

The Pro Git book is, as usual, a good resource about commit signing: [Pro Git: Signing your work](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work).

## Setting up signed commits verification

You will need to install [GPG](https://gnupg.org/) on your system in order to execute the following commands.
> It's included by default in most Linux distributions.
> On Windows, it is included in Git Bash (which comes with `git` for Windows).

You can sign your commits locally using [GPG](https://gnupg.org/).
Then configure your profile to mark these commits as **verified** on the Hub,
so other people can be confident that they come from a trusted source.

For a more in-depth explanation of how git and GPG interact, please visit the the [git documentation on the subject](https://git-scm.com/book/en/v2/Git-Tools-Signing-Your-Work)

Commits can have the following signing statuses:

| Status            | Explanation                                                  |
| ----------------- | ------------------------------------------------------------ |
| Verified          | The commit is signed and the signature is verified           |
| Unverified        | The commit is signed but the signature could not be verified |
| No signing status | The commit is not signed                                     |

For a commit to be marked as **verified**, you need to upload the public key used to sign it on your Hugging Face account.

Use the `gpg --list-secret-keys` command to list the GPG keys for which you have both a public and private key.
A private key is required for signing commits or tags.

If you don't have a GPG key pair or you don't want to use the existing keys to sign your commits, go to **Generating a new GPG key**.

Otherwise, go straight to  [Adding a GPG key to your account](#adding-a-gpg-key-to-your-account).

## Generating a new GPG key

To generate a GPG key, run the following:

```bash
gpg --gen-key
```

GPG will then guide you through the process of creating a GPG key pair.

Make sure you specify an email address for this key, and that the email address matches the one you specified in your Hugging Face [account](https://huggingface.co/settings/account).

## Adding a GPG key to your account

1. First, select or generate a GPG key on your computer. Make sure the email address of the key matches the one in your Hugging Face [account](https://huggingface.co/settings/account) and that the email of your account is verified.

2. Export the public part of the selected key:

```bash
gpg --armor --export <YOUR KEY ID>
```

3. Then visit your profile [settings page](https://huggingface.co/settings/keys) and click on **Add GPG Key**.

Copy & paste the output of the `gpg --export` command in the text area and click on **Add Key**.

4. Congratulations! 🎉  You've just added a GPG key to your account!

## Configure git to sign your commits with GPG

The last step is to configure git to sign your commits:

```bash
git config user.signingkey <Your GPG Key ID>
git config user.email <Your email on hf.co>
```

Then add the `-S` flag to your `git commit` commands to sign your commits!

```bash
git commit -S -m "My first signed commit"
```

Once pushed on the Hub, you should see the commit with a "Verified" badge.