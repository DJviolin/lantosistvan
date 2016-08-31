# python_launched_from_nodejs.py
import sys
#print(sys.version, ", ", end="")

first_arg = sys.argv[2]
second_arg = sys.argv[3]
filename = sys.argv[0]

#data = first_arg + ", " + second_arg + "!"
data = first_arg + ", " + second_arg
print(data, end="")
#sys.stdout.write(data)

sys.stdout.flush()

####def main(argv):
####    first_arg = argv[2]
####    second_arg = argv[3]
####    data = first_arg + ", " + second_arg
####    print(data, end="")
####
####if __name__ == "__main__":
####    main(sys.argv[1:])
####
####sys.stdout.flush()
