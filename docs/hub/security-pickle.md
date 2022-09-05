# Pickle Scanning

- [TL;DR](#tldr)
- [What is a pickle?](#what-is-a-pickle)
- [Why is it dangerous?](#why-is-it-dangerous)
- [Mitigation Strategies](#mitigation-strategies)
  * [Load files from users and organizations you trust](#load-files-from-users-and-organizations-you-trust)
  * [Load model weights from TF or Flax](#load-model-weights-from-tf-or-flax)
  * [Hub’s Security Scanner](#hubs-security-scanner)
    + [What we have now](#what-we-have-now)
    + [Potential solutions](#potential-solutions)
- [Further Reading](#further-reading)

## TL;DR

Pickle is a widely used serialization format in ML. Most notably, it is the default format for PyTorch model weights.

There are dangerous arbitrary code execution attacks that can be perpetrated when you load a pickle file. We suggest loading models from users and organizations you trust, relying on signed commits, and/or loading models from TF or Jax formats with the `from_tf=True` auto-conversion mechanism. We will also alleviate this issue shortly by displaying/"vetting" the list of imports in any pickled file, directly on the Hub. 

## What is a pickle?

From the [official docs](https://docs.python.org/3/library/pickle.html) :

> The `pickle` module implements binary protocols for serializing and de-serializing a Python object structure.

What this means is that pickle is a serializing protocol, something you use to efficiently share data amongst parties.

We call a pickle the binary file that was generated while pickling.

At its core, the pickle is basically a stack of instructions or opcodes. As you probably have guessed, it’s not human readable. The opcodes are generated when pickling and read sequentially at unpickling. Based on the opcode, a given action is executed.

Here’s a small example:

```python
import pickle
import pickletools

var = "data I want to share with a friend"

# store the pickle data in a file named 'payload.pkl'
with open('payload.pkl', 'wb') as f:
    pickle.dump(var, f)

# disassemble the pickle
# and print the instructions to the command line
with open('payload.pkl', 'rb') as f:
    pickletools.dis(f)
```

When you run this, it will create a pickle file and print the following instructions in your terminal:

```python
    0: \x80 PROTO      4
    2: \x95 FRAME      48
   11: \x8c SHORT_BINUNICODE 'data I want to share with a friend'
   57: \x94 MEMOIZE    (as 0)
   58: .    STOP
highest protocol among opcodes = 4
```

Don’t worry too much about the instructions for now, just know that the [pickletools](https://docs.python.org/3/library/pickletools.html) module is very useful for analyzing pickles. It allows you to read the instructions in the file ***without*** executing any code.

Pickle is not simply a serialization protocol, it allows more flexibility by giving the ability to users to run python code at de-serialization time. Doesn’t sound good, does it?

## Why is it dangerous?

As we’ve stated above, de-serializing pickle means that code can be executed. But this comes with certain limitations: you can only reference functions and classes from the top level module; you cannot embed them in the pickle file itself.

Back to the drawing board:

```python
import pickle
import pickletools

class Data:
    def __init__(self, important_stuff: str):
        self.important_stuff = important_stuff

d = Data("42")

with open('payload.pkl', 'wb') as f:
    pickle.dump(d, f)
```

When we run this script we get the `payload.pkl` again. When we check the file’s contents:

```bash

# cat payload.pkl
__main__Data)}important_stuff42sb.%

# hexyl payload.pkl
┌────────┬─────────────────────────┬─────────────────────────┬────────┬────────┐
│00000000│ 80 04 95 33 00 00 00 00 ┊ 00 00 00 8c 08 5f 5f 6d │×•×30000┊000×•__m│
│00000010│ 61 69 6e 5f 5f 94 8c 04 ┊ 44 61 74 61 94 93 94 29 │ain__××•┊Data×××)│
│00000020│ 81 94 7d 94 8c 0f 69 6d ┊ 70 6f 72 74 61 6e 74 5f │××}××•im┊portant_│
│00000030│ 73 74 75 66 66 94 8c 02 ┊ 34 32 94 73 62 2e       │stuff××•┊42×sb.  │
└────────┴─────────────────────────┴─────────────────────────┴────────┴────────┘
```

We can see that there isn’t much in there, a few opcodes and the associated data. You might be thinking, so what’s the problem with pickle?

Let’s try something else:

```python
from fickling.pickle import Pickled
import pickle

# Create a malicious pickle
data = "my friend needs to know this"

pickle_bin = pickle.dumps(data)

p = Pickled.load(pickle_bin)

p.insert_python_exec('print("you\'ve been pwned !")')

with open('payload.pkl', 'wb') as f:
    p.dump(f)

# innocently unpickle and get your friend's data
with open('payload.pkl', 'rb') as f:
    data = pickle.load(f)
    print(data)
```

Here we’re using the [fickling](https://github.com/trailofbits/fickling) library for simplicity. It allows us to add pickle instructions to execute code contained in a string via the `exec` function. This is how you circumvent the fact that you cannot define functions or classes in your pickles: you run exec on python code saved as a string.

When you run this, it creates a `payload.pkl` and prints the following:

```
you've been pwned !
my friend needs to know this
```

If we check the contents of the pickle file, we get:

```bash
# cat payload.pkl
c__builtin__
exec
(Vprint("you've been pwned !")
tR my friend needs to know this.%

# hexyl payload.pkl
┌────────┬─────────────────────────┬─────────────────────────┬────────┬────────┐
│00000000│ 63 5f 5f 62 75 69 6c 74 ┊ 69 6e 5f 5f 0a 65 78 65 │c__built┊in___exe│
│00000010│ 63 0a 28 56 70 72 69 6e ┊ 74 28 22 79 6f 75 27 76 │c_(Vprin┊t("you'v│
│00000020│ 65 20 62 65 65 6e 20 70 ┊ 77 6e 65 64 20 21 22 29 │e been p┊wned !")│
│00000030│ 0a 74 52 80 04 95 20 00 ┊ 00 00 00 00 00 00 8c 1c │_tR×•× 0┊000000×•│
│00000040│ 6d 79 20 66 72 69 65 6e ┊ 64 20 6e 65 65 64 73 20 │my frien┊d needs │
│00000050│ 74 6f 20 6b 6e 6f 77 20 ┊ 74 68 69 73 94 2e       │to know ┊this×.  │
└────────┴─────────────────────────┴─────────────────────────┴────────┴────────┘
```

Basically, this is what’s happening when you unpickle:

```python
# ...
opcodes_stack = [exec_func, "malicious argument", "REDUCE"]
opcode = stack.pop()
if opcode == "REDUCE":
    arg = opcodes_stack.pop()
    callable = opcodes_stack.pop()
    opcodes_stack.append(callable(arg))
# ...
```

The instructions that pose a threat are `STACK_GLOBAL`, `GLOBAL` and `REDUCE`.

`REDUCE` is what tells the unpickler to execute the function with the provided arguments and `*GLOBAL` instructions are telling the unpickler to `import` stuff.

To sum up, pickle is dangerous because:

- when importing a python module, arbitrary code can be executed
- you can import builtin functions like `eval` or `exec`, which can be used to execute arbitrary code
- when instantiating an object, the constructor may be called

This is why it is stated in most docs using pickle, do not unpickle data from untrusted sources.

## Mitigation Strategies

***Don’t use pickle***

Sound advice Luc, but pickle is used profusely and isn’t going anywhere soon: finding a new format everyone is happy with and initiating the change will take some time.

So what can we do for now?

### Load files from users and organizations you trust

On the Hub, you have the ability to [sign your commits with a GPG key](./security-gpg). This does **not** guarantee that your file is safe, but it does guarantee the origin of the file.

If you know and trust user A and the commit that includes the file on the Hub is signed by user A’s GPG key, it’s pretty safe to assume that you can trust the file.

### Load model weights from TF or Flax

TensorFlow and Flax checkpoints are not affected, and can be loaded within PyTorch architectures using the `from_tf` and `from_flax` kwargs for the `from_pretrained` method to circumvent this issue.

E.g.:

```python
from transformers import AutoModel

model = AutoModel.from_pretrained("bert-base-cased", from_flax=True)
```

### Hub’s Security Scanner

#### What we have now

We have created a security scanner that scans every file pushed to the Hub and runs security checks. At the time of writing, it runs two types of scans:

- ClamAV scans
- Pickle Import scans

For ClamAV scans, files are run through the open-source antivirus [ClamAV](https://www.clamav.net). While this covers a good amount of dangerous files, it doesn’t cover pickle exploits.

We have implemented a Pickle Import scan, which extracts the list of imports referenced in a pickle file. Every time you upload a `pytorch_model.bin`, this scan is run.

We get this data thanks to `[pickletools.genops](https://docs.python.org/3/library/pickletools.html#pickletools.genops)` which allows us to read the file without executing potentially dangerous code.

Note that this is what allows to know if, when unpickling a file, it will `REDUCE` on a potentially dangerous function that was imported by `*GLOBAL`.

#### Potential solutions

One could think of creating a custom [Unpickler](https://docs.python.org/3/library/pickle.html#pickle.Unpickler) in the likes of [this one](https://github.com/facebookresearch/CrypTen/blob/main/crypten/common/serial.py). But as we can see in this [sophisticated exploit](https://ctftime.org/writeup/16723), this won’t work.

Thankfully, there is always a trace of the `eval` import, so reading the opcodes directly should allow to catch malicious usage.

The current solution I propose is creating a file resembling a `.gitignore` but for imports.

This file would be a whitelist of imports that would make a `pytorch_model.bin` file flagged as dangerous if there are imports not included in the whitelist.

One could imagine having a regex-ish format where you could allow all numpy submodules for instance via a simple line like: `numpy.*`.

## Further Reading

[Safe way of loading only weights from *.pt file by default](https://github.com/pytorch/pytorch/issues/52181)

[pickle - Python object serialization - Python 3.10.6 documentation](https://docs.python.org/3/library/pickle.html#what-can-be-pickled-and-unpickled)

[Dangerous Pickles - Malicious Python Serialization](https://intoli.com/blog/dangerous-pickles/)

[GitHub - trailofbits/fickling: A Python pickling decompiler and static analyzer](https://github.com/trailofbits/fickling)

[Exploiting Python pickles](https://davidhamann.de/2020/04/05/exploiting-python-pickle/)

[cpython/pickletools.py at 3.10 · python/cpython](https://github.com/python/cpython/blob/3.10/Lib/pickletools.py)

[cpython/pickle.py at 3.10 · python/cpython](https://github.com/python/cpython/blob/3.10/Lib/pickle.py)

[CrypTen/serial.py at main · facebookresearch/CrypTen](https://github.com/facebookresearch/CrypTen/blob/main/crypten/common/serial.py)

[CTFtime.org / Balsn CTF 2019 / pyshv1 / Writeup](https://ctftime.org/writeup/16723)

[https://github.com/moreati/pickle-fuzz](https://github.com/moreati/pickle-fuzz)
