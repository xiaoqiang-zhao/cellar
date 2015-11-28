// 这里定义一个类，在其他文件就可以引用了 #include "Plane.hpp"，测试方法在最末尾给出

#include <iostream>
using namespace std;

// 声明一个飞机类
class Plane {
    public:
    Plane(int speed);
    ~Plane();
    void setSpeed(int speed);
    int getSpeed() const  // 常量函数,不可修改成员变量
    {// 可以直接定义实现
        return speed;
    };
    // 也可在下面定义
    void printCurrentSpeed();
    int speedUp(int num);
    void speedDown(int num);

    private:
    int speed;
    void doSomething();
};

/* 测试方法，可以放在任何文件中进行测试

#include <iostream>
using namespace std;
#include "Plane.hpp"

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

*/