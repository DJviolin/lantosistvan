# python_launched_from_nodejs.py
import sys

print(sys.version, ", ", end="")

first_arg = sys.argv[1]
second_arg = sys.argv[2]

#data = first_arg + ", " + second_arg + "!"
data = first_arg + ", " + second_arg + ", " + sys.argv[0]
print(data, end="")
#sys.stdout.write(data)

sys.stdout.flush()
