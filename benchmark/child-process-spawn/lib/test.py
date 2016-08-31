# python_launched_from_nodejs.py
import sys
#from __future__ import print_function

first_arg = sys.argv[1]
second_arg = sys.argv[2]

#data = first_arg + ", " + second_arg + "!"
data = first_arg + ", " + second_arg
#print(data)
print(data, end="")
#sys.stdout.write(data)

sys.stdout.flush()
