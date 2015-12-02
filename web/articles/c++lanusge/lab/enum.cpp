#include <iostream>
#include <stdio.h>

int main()
{
    enum Color { red=1, blue };
    // std::cout<<"color:"<<Color red<<"\n";
    printf("color:%d \n", Color red);
    return 0;
}