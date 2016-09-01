# python_launched_from_nodejs.py
####import sys
#print(sys.version, ", ", end="")

####print(sys.argv, end="")

####first_arg = sys.argv[2]
####second_arg = sys.argv[3]
####filename = sys.argv[0]

#data = first_arg + ", " + second_arg + "!"
####data = first_arg + ", " + second_arg
####print(data, end="")
#sys.stdout.write(data)

####sys.stdout.flush()

####def main(argv):
####    first_arg = sys.argv[2]
####    second_arg = sys.argv[3]
####    data = first_arg + ", " + second_arg
####    print(data, end="")
####
####if __name__ == "__main__":
####    main(sys.argv[1:])
####
####sys.stdout.flush()


import argparse

def main():
    # Parse arguments from command line
    parser = argparse.ArgumentParser()

    # Set up required arguments this script
    parser.add_argument('function', type=str, help='function to call')
    parser.add_argument('first_arg', type=str, help='first argument')
    parser.add_argument('second_arg', type=str, help='second argument')

    # Parse the given arguments
    args = parser.parse_args()

    # Get the function based on the command line argument and
    # call it with the other two command line arguments as
    # function arguments
    eval(args.function)(args.first_arg, args.second_arg)

def test(first_arg, second_arg):
    #print(first_arg, end="")
    #print(second_arg, end="")
    data = first_arg + ", " + second_arg
    print(data, end="")

if __name__ == '__main__':
    main()
