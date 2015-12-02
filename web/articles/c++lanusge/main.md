# C++ 语言层面学习笔记

> 作为一个 jser 怎么想起来学习 C++，无它 --- 为了帮媳妇写作业，但是学下来收获满满，不经多了一个装逼的技能，在语言层面上也多了一些感觉。此篇只是C++语言层面的学习笔记，高手就飘过吧，但如果你和我同样是 jser 出于某种目的想要了解 C++ 那此篇就再适合不过了，快速扫完此篇可进入下一篇 [C++ 工程化学习笔记](../../c++project.html)。

## Hello world

    // hello-world.app
    #include <iostream>
    using namespace std;
    
    int main(){
        cout<<"Hello Word!"<<endl;
        return 0;
    }

命令行编译，运行：

    g++ -o a hello-world.cpp
    ./test

## 变量

**变量类型**

void 无返回值类型

short 短整型(整数，2字节)

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
    // 不指定数据类型的常量，编译时直接替换，可能编译通过而运行报错
    #define NUM 5;
    
**枚举常量**
    
    // 常量值默认从 0 开始递增
    enum WEEK{Mon,Tue,Wed,Thu,Fri,San,Sun};
    // 也可以赋值，后面未赋值的递增
    enum WEEK{Mon=100,Tue,Wed,Thu,Fri,San=200,Sun};
    
## 输出

如果采用了 `using namespace std;` 来声明命名空间，可以直接使用 `cout` 来输出，否则需要在前面加 std::。
字符串和变量之间的拼接可以使用 `>>`。

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

main()是独特的 C++ 函数，因为程序启动时需要调用它， main 函数的数据类型必须是 int。

函数需要先声明在定义。

函数的两个部分:函数头(函数名，参数，返回类型) 和 函数体;无返回类型时用 void。下面是函数定义范例:

    #include <iostream>
    using namespace std;
    
    // 函数声明
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

C++ 函数的参数与 js 不同，不同的参数定义方式可对同名方法进行重载:

    int store(int, int);
    int store(long, long);

## 流程控制

while，do-while，for

break:结束循环，continue:跳到下一次循环

switch

    switch(name) {
        case 'jack':
            work = 'coder';
            break;
        case 'tony':
            work = 'actor';
            break;
        default :
            work = 'unknown';
    }

if else

## 数组

数组的初始化

    // array.cpp
    // 一维数组初始化
    int arr[] = {1, 2, 3};
    // 二维数组初始化
    int arr2[2][3] = {1, 2, 3, 4, 5, 6};
    
    // 二维数组初始化，代码更可读
    int arr2[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

通过自带的字符串处理函数库使用数组来定义字符串。

    #include <iostream>
    #include <string.h>
    using namespace std;
    
    int main() {
        // 字符串
        char str[] = "I am a string";
        cout<<"str:"<<str<<"\n";
    }

数组和字符串的的拼接需要借助指针来实现。

## 类

类定义，构造函数，析构函数，私有变量和方法，公有变量和方法，实例化对象，常量函数 等概念，语法如下就不一一介绍了。

    // class.cpp
    #include <iostream>
    using namespace std;
    
    // 定义类，要放在 main 的前面
    class Plane {
        public:
        Plane(int speed);
        //~Plane();
        void setSpeed(int speed);
        int getSpeed() const;
        void printCurrentSpeed();
        int speedUp(int num);
        void speedDown(int num);
    
        private:
        int speed;
        void doSomething();
    };
    
    // 构造函数，用来初始化对象
    Plane::Plane(int speed) {
        setSpeed(speed);
    }
    
    // 析构函数，用来释放对象内存空间
    //Plane::~Plane() {
    //
    //}
    
    void Plane::setSpeed(int newSpeed) {
        speed = newSpeed;
    }
    void Plane::printCurrentSpeed() {
        cout<<"current speed:"<< speed <<"\n";
    }
    int Plane::getSpeed() {
        return speed;
    }
    
    /**
     * 加速
     *
     * @param {int} num 要增加的速度
     * @return {int} speed 增加之后的速度
     */
    int Plane::speedUp(int num) {
         speed += num;
         doSomething();
         return speed;
    }
    void Plane::speedDown(int num) {
        speed -= num;
        if (speed < 0) {
            speed = 0;
            cout<<"speed has benn zero.\n";
        }
        doSomething();
    }
    void Plane::doSomething() {
        cout<<"please bee careful, speed is changing.\n";
    }
    
    int main() {
        // 像定义一个变量一样定义一个对象
        Plane mh370(10);
    
        // 读取当前速度
        cout<<"current speed:"<< mh370.getSpeed()<<"\n";
    
        cout<<"speed up 5"<<"\n";
        mh370.speedUp(5);
        mh370.printCurrentSpeed();
    
        cout<<"speed down 15"<<"\n";
        mh370.speedDown(15);
    
        mh370.printCurrentSpeed();
        mh370.speedDown(20);
    }

怎样封装一个类供其他程序调用？在 Plane.hpp 中给出了示例，下面是关键代码：

    // Plane.hpp
    #include <iostream>
    using namespace std;
    
    // 声明一个飞机类
    class Plane {
        public:
        Plane(int speed);
        {// 可以直接定义实现
            return speed;
        };
    
        private:
        int speed;
    };
    
    // 构造函数,用来初始化对象
    Plane::Plane(int newSpeed) {
        speed = newSpeed;
    }
    
    // 在 test.cpp 中调用
    #include "Plane.hpp"
    
    int main() {
        Plane mh370(10);
    }

类的组合形成新类也非常简单，可直接将类看成 int 等原生对象即可，只要 #include 进来就可以。

## 指针

编码规范：第一个字母是 p 第一个单词首字母大写。

声明：

    int *num = NULL;
    
指针声明后必须赋值，否则特别危险，没有被赋值的指针称作野指针。在变量前加 & 符号就可拿到变量的地址并可把它赋值给指针变量：
    
    int num = 5;
    int *pNum = &num;

\* 符号是间接运算符，也称作解除引用，可直接取值和赋值：

    int num = 5;
    int *pNum = &num;
    // 此时 *pNum 的输出值是 5
    *pNum = 10;
    // 此时 num 的值已被变为 10

指针的存在在于对堆的支持，使内部产生的复杂数据可以向外传递。说到堆不得不提栈，作用域的实现多依赖于栈。

要分配堆中的内存需要关键字 new:

    Plane *pPlan = new Plane(5);
    delete pPlan;

new 出来的变量不会自动释放，需要手动 delete 才能释放，如果不释放就留在了堆中，而不再需要的信息留在堆中称之为内存泄露。另外需要注意的是 delete 释放的是指针指向的内存，而指针依然存在，可被赋值其他内存地址；但是如果赋新值是没有对旧值指向的内存做释放也会造成内存泄露，如下：

    Plane *pPlan = new Plane(5);
    ppPlan = new Plane(10);
    delete pPlan;
    // 此时 new Plane(5) 创建出的那片内存将永远得不到释放

使用指针访问数据成员

    Plane *pPlan = new Plane(5);
    pPlan->printCurrentSpeed();
    
类可能有一个或多个数据成员为指针，指向堆中的对象。可在构造函数或成员函数中分配内存，并在析构函数中释放内存。

this 指针指向其函数被调用的对象，通常不需要它，而只是调用函数并设置成员变量，但偶尔需要访问对象本身（可能旨在返回一个指向当前对象的指针），在这种情况下，this 指针将很有用。

const 指针

    // 指向常量的指针，当 *pOne = 5; 这样操作时会报错
    const int *pOne;
    // 指向常量的常量指针，当 pTow = &x; 这样操作会报错
    int * const pTow;
    // 上面两种的结合体
    const int * const pThree;

## 引用

待续...

## 类库使用

自定义一个类，类的定义写在 .hpp 文件中，类的实现写在 .cpp 文件中(记得在.cpp中 include .hpp)，编译目标文件的时候需要带上类文件，如下：

    g++ -o a Plane-class-test.cpp Plane.cpp

然后用下面命令直接运行：

    ./a

具体的代码在 Plane.hpp、Plane.cpp、Plane-class-test.cpp 三个文件中。 