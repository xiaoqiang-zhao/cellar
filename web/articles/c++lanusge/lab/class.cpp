#include <iostream>
using namespace std;

// 定义类,要放在 main 的前面
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
