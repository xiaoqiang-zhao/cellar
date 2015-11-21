# C++

> 作为一个 jser 怎么想起来学习 C++,无它 --- 情已.此篇只是学习笔记高手就飘过吧.

## Hello world
 
    #include <iostream>
    using namespace std;
    
    int main(){
        cout<<"Hello Word!"<<endl;
        return 0;
    }

命令行编译,运行:

    g++ -o a hello-world.cpp
    ./test

## 函数

main()是独特的 C++ 函数,因为程序启动时需要调用它, main 函数的数据类型必须是 int.

函数的两个部分:函数头(函数名,参数,返回类型) 和 函数体;无返回类型时 用 void.下面是函数定义范例:

    /**
     * 打印字符串
     * @param char str 要打印的字符串
     */
    void printString(char str) {
        cout<<str<<endl;
    }

## 变量

void 无返回值类型

short 短整型

int 整型
 
long 长整型

chart 字符创类型

bool 布尔类型

