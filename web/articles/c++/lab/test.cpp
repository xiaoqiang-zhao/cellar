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