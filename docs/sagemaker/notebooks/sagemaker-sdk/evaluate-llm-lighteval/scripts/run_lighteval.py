import sys
import types

try:
    import readline  # noqa: F401
except ModuleNotFoundError:
    sys.modules["readline"] = types.ModuleType("readline")

from lighteval.__main__ import app

app()
