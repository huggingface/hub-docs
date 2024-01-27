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

To add a SSH key to your account, click on the "Add SSH key" button.

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

## HuggingFace's SSH key fingerprints

Public key fingerprints can be used to validate a connection to a remote server.

These are HuggingFace's public key fingerprints:

SHA256:aBG5R7IomF4BSsx/h6tNAUVLhEkkaNGB8Sluyh/Q/qY (ECDSA)
SHA256:skgQjK2+RuzvdmHr24IIAJ6uLWQs0TGtEUt3FtzqirQ (DSA - deprecated)
SHA256:dVjzGIdV7d6cwKIeZiCoRMa2gMvSKfGZAvHf4gMiMao (ED25519)
SHA256:uqjYymysBGCXXiMVebB8L8RIuWbPSKGBxQQNhcT5a3Q (RSA)

You can add the following ssh key entries to your ~/.ssh/known_hosts file to avoid manually verifying HuggingFace hosts:

hf.co ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDtPB+snz63eZvTrbMY2Qt39a6HYile89JOum55z3lhIqAqUHxLtXFd+q+ED8izQvyORFPSmFIaPw05rtXo37bm+ixL6wDmvWrHN74oUUWmtrv2MNCLHE5VDb3+Q6MJjjDVIoK5QZIuTStlq0cUbGGxQk7vFZZ2VXdTPqgPjw4hMV7MGp3RFY/+Wy8rIMRv+kRCIwSAOeuaLPT7FzL0zUMDwj/VRjlzC08+srTQHqfoh0RguZiXZQneZKmM75AFhoMbP5x4AW2bVoZam864DSGiEwL8R2jMiyXxL3OuicZteZqll0qfRlNopKnzoxS29eBbXTr++ILqYz1QFqaruUgqSi3MIC9sDYEqh2Q8UxP5+Hh97AnlgWDZC0IhojVmEPNAc7Y2d+ctQl4Bt91Ik4hVf9bU+tqMXgaTrTMXeTURSXRxJEm2zfKQVkqn3vS/zGVnkDS+2b2qlVtrgbGdU/we8Fux5uOAn/dq5GygW/DUlHFw412GtKYDFdWjt3nJCY8=
hf.co ssh-dss AAAAB3NzaC1kc3MAAACBAORXmoE8fn/UTweWy7tCYXZxigmODg71CIvs/haZQN6GYqg0scv8OFgeIQvBmIYMnKNJ7eoo5ZK+fk1yPv8aa9+8jfKXNJmMnObQVyObxFVzB51x8yvtHSSrL4J3z9EAGX9l9b+Fr2+VmVFZ7a90j2kYC+8WzQ9HaCYOlrALzz2VAAAAFQC0RGD5dE5Du2vKoyGsTaG/mO2E5QAAAIAHXRCMYdZij+BYGC9cYn5Oa6ZGW9rmGk98p1Xc4oW+O9E/kvu4pCimS9zZordLAwHHWwOUH6BBtPfdxZamYsBgO8KsXOWugqyXeFcFkEm3c1HK/ysllZ5kM36wI9CUWLedc2vj5JC+xb5CUzhVlGp+Xjn59rGSFiYzIGQC6pVkHgAAAIBve2DugKh3x8qq56sdOH4pVlEDe997ovEg3TUxPPIDMSCROSxSR85fa0aMpxqTndFMNPM81U/+ye4qQC/mr0dpFLBzGuum4u2dEpjQ7B2UyJL9qhs1Ubby5hJ8Z3bmHfOK9/hV8nhyN8gf5uGdrJw6yL0IXCOPr/VDWSUbFrsdeQ==
hf.co ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBL0wtM52yIjm8gRecBy2wRyEMqr8ulG0uewT/IQOGz5K0ZPTIy6GIGHsTi8UXBiEzEIznV3asIz2sS7SiQ311tU=
hf.co ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINJjhgtT9FOQrsVSarIoPVI1jFMh3VSHdKfdqp/O776s
