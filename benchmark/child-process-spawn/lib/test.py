# python_launched_from_nodejs.py
import sys

first_arg = sys.argv[1]
second_arg = sys.argv[2]
data = first_arg + ", " + second_arg + "!"
print(data)
sys.stdout.flush()
