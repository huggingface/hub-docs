# Git over SSH

You can access and write data in repositories on huggingface.co using SSH (Secure Shell Protocol). When you connect via SSH, you authenticate using a private key file on your local machine.

Some actions, such as pushing changes, or cloning private repositories, will require you to upload your SSH public key to your account on huggingface.co.

You can use a pre-existing SSH key, or generate a new one specifically for huggingface.co.

## Checking for existing SSH keys

If you have an existing SSH key, you can use that key to authenticate Git operations over SSH.

SSH keys are usually located under `~/.ssh` on Mac & Linux, and under `C:\\Users\\<username>\\.ssh` on Windows. List files under that directory and look for files of the form:

- id_rsa.pub
- id_ecdsa.pub
- id_ed25519.pub

Those files contain your SSH public key.

If you don't have such file under `~/.ssh`, you will have to [generate a new key](#generating-a-new-ssh-keypair). Otherwise, you can [add your existing SSH public key(s) to your huggingface.co account](#add-a-ssh-key-to-your-account).

## Generating a new SSH keypair

If you don't have any SSH keys on your machine, you can use `ssh-keygen` to generate a new SSH key pair (public + private keys):

```
$ ssh-keygen -t ed25519 -C "your.email@example.co"
```

We recommend entering a passphrase when you are prompted to. A passphrase is an extra layer of security: it is a password that will be prompted whenever you use your SSH key.

Once your new key is generated, add it to your SSH agent with `ssh-add`:

```
$ ssh-add ~/.ssh/id_ed25519
```

If you chose a different location than the default to store your SSH key, you would have to replace `~/.ssh/id_ed25519` with the file location you used.

## Add a SSH key to your account

To access private repositories with SSH, or to push changes via SSH, you will need to add your SSH public key to your huggingface.co account. You can manage your SSH keys [in your user settings](https://huggingface.co/settings/keys).

To add a SSH key to your account, click on the "Add SSH key" button.s

Then, enter a name for this key (for example, "Personal computer"), and copy and paste the content of your **public** SSH key in the area below. The public key is located in the `~/.ssh/id_XXXX.pub` file you found or generated in the previous steps.

Click on "Add key", and voilà! You have added a SSH key to your huggingface.co account.


## Testing your SSH authentication

Once you have added your SSH key to your huggingface.co account, you can test that the connection works as expected.

In a terminal, run:
```
$ ssh -T git@hf.co
```

If you see a message with your username, congrats! Everything went well, you are ready to use git over SSH.

Otherwise, if the message states something like the following, make sure your SSH key is actually used by your SSH agent.
```
Hi anonymous, welcome to Hugging Face.
```
