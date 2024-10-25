# # Number of rows
n = int(input("Enter number of rows: "))

# Loop to print the inverted pattern
for i in range(n, 0,-1):
    # Printing spaces for alignment
    print(' ' * (n - i),end='')
    # Printing stars
    print('*' * (2 * i - 1))


# n = int(input("Enter number: "))

# for i in range(0, n + 1):
#     print(' ' * (n - i) + '*' * (2 * i - 1))
