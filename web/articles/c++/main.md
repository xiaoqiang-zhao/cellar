# C++

> 作为一个 jser 怎么想起来学习 C++,无它 --- 情已.此篇只是学习笔记高手就飘过吧.

## Hello world

    // hello-world.app
    #include <iostream>
    using namespace std;
    
    int main(){
        cout<<"Hello Word!"<<endl;
        return 0;
    }

命令行编译,运行:

    g++ -o a hello-world.cpp
    ./test

## 变量

**变量类型**

void 无返回值类型

short 短整型(整数,2字节)

unsigned short 零和正整数

int 整型(4字节)
 
long 长整型(8字节)

chart 字符创类型

bool 布尔类型

**类型定义**

    // 简化类型声明
    typedef unsigned short us;
    us age = 5;

## 常量

编码中一般将常量用全大写字母表示

**符号常量**
    
    // 指定数据类型的常量
    const int NUM = 5;
    // 不指定数据类型的常量,编译时直接替换,可能编译通过而运行报错
    #define NUM 5;
    
**枚举常量**
    
    // 常量值默认从 0 开始递增
    enum WEEK{Mon,Tue,Wed,Thu,Fri,San,Sun};
    // 也可以赋值,后面未赋值的递增
    enum WEEK{Mon=100,Tue,Wed,Thu,Fri,San=200,Sun};
    
## 输出

如果采用了 `using namespace std;` 来声明命名空间,可以直接使用 `cout` 来输出,否则需要在前面加 std::.
字符串和变量之间的拼接可以使用 `>>`.

    #include <iostream>
    int main () {
        int age = 5;
        std::cout<<"My age is "<<age<<"\n";
        return 0;
    }
    
## 运算
    
复杂语句
    
    z = x = y + 13;
    // 这条语句有四个功效:
    // 1 计算 y + 13
    // 2 将上面的计算结果赋值给 x
    // 3 将 x 的值赋给 x
    // 返回 z 的值
    
符号运算和逻辑运算和其他语言类似
    

## 函数

main()是独特的 C++ 函数,因为程序启动时需要调用它, main 函数的数据类型必须是 int.

函数的两个部分:函数头(函数名,参数,返回类型) 和 函数体;无返回类型时用 void.下面是函数定义范例:

    #include <iostream>
    using namespace std;
    
    // 函数声明,
    int getArea(int width,int height);
    
    int main() {
        int width,height,area;
        cout<<"width:";
        // 接受参数
        cin>>width;
        cout<<"height:";
        cin>>height;
        // 调用函数
        area = getArea(width, height);
        // 打印输出
        cout<<"area:"<<area<<"\n";
    }
    
    // 函数定义
    int getArea(int width,int height) {
        return width * height;
    }




