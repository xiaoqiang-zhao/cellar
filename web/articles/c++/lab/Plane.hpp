#include <iostream>
using namespace std;

// 声明一个飞机类
class Plane {
    public:
    Plane(int speed);
    //~Plane();
    void setSpeed(int speed);
    int getSpeed() const; // 常量函数,不可修改成员变量
    void printCurrentSpeed();
    int speedUp(int num);
    void speedDown(int num);

    private:
    int speed;
    void doSomething();
};

// 构造函数,用来初始化对象
Plane::Plane(int speed) {
    setSpeed(speed);
}

// 析构函数,用来释放对象内存空间
//Plane::~Plane() {
//
//}

void Plane::setSpeed(int newSpeed) {
    speed = newSpeed;
}
void Plane::printCurrentSpeed() {
    cout<<"current speed:"<< speed <<"\n";
}
int Plane::getSpeed() const{
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
