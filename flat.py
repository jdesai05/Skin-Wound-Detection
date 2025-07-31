list_1 = [[["hai"],[12],[23,45,12,"seb"]],["1231"],[12,1]]

l2 = lambda l:[i for item in l for i in (l2(item) if isinstance(item,list) else [item])]

print(l2(list_1))